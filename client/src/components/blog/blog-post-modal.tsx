import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import { X, Heart, MessageCircle, Share2, Calendar, Clock, Smile, Paperclip } from "lucide-react";
import type { BlogPost, User, Comment } from "@shared/schema";

export default function BlogPostModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleOpenModal = (event: CustomEvent) => {
      setSelectedPostId(event.detail.postId);
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    };

    window.addEventListener('openBlogModal', handleOpenModal as EventListener);
    return () => window.removeEventListener('openBlogModal', handleOpenModal as EventListener);
  }, []);

  const { data: post, isLoading: postLoading } = useQuery({
    queryKey: ['/api/blog/posts', selectedPostId],
    queryFn: async () => {
      if (!selectedPostId) return null;
      const response = await fetch(`/api/blog/posts/${selectedPostId}`);
      if (!response.ok) throw new Error('Failed to fetch blog post');
      return response.json() as Promise<BlogPost & { author: User }>;
    },
    enabled: !!selectedPostId,
  });

  const { data: comments = [], isLoading: commentsLoading } = useQuery({
    queryKey: ['/api/blog/posts', selectedPostId, 'comments'],
    queryFn: async () => {
      if (!selectedPostId) return [];
      const response = await fetch(`/api/blog/posts/${selectedPostId}/comments`);
      if (!response.ok) throw new Error('Failed to fetch comments');
      return response.json() as Promise<(Comment & { author: User })[]>;
    },
    enabled: !!selectedPostId,
  });

  const likeMutation = useMutation({
    mutationFn: async (postId: string) => {
      await apiRequest('POST', `/api/blog/posts/${postId}/like`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog/posts'] });
      queryClient.invalidateQueries({ queryKey: ['/api/blog/posts', selectedPostId] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to like post",
        variant: "destructive",
      });
    },
  });

  const commentMutation = useMutation({
    mutationFn: async ({ postId, content }: { postId: string; content: string }) => {
      await apiRequest('POST', `/api/blog/posts/${postId}/comments`, { content });
    },
    onSuccess: () => {
      setCommentText("");
      queryClient.invalidateQueries({ queryKey: ['/api/blog/posts', selectedPostId, 'comments'] });
      toast({
        title: "Success",
        description: "Comment posted successfully",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to post comment",
        variant: "destructive",
      });
    },
  });

  const closeModal = () => {
    setIsOpen(false);
    setSelectedPostId(null);
    document.body.style.overflow = 'auto';
  };

  const handleLike = () => {
    if (!selectedPostId) return;
    likeMutation.mutate(selectedPostId);
  };

  const handleComment = () => {
    if (!selectedPostId || !commentText.trim()) return;
    commentMutation.mutate({ postId: selectedPostId, content: commentText.trim() });
  };

  const handleShare = () => {
    if (!post) return;
    if (navigator.share) {
      navigator.share({
        title: post.title,
        url: `${window.location.origin}/blog/${post.slug}`,
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/blog/${post.slug}`);
      toast({
        title: "Copied",
        description: "Link copied to clipboard",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50" data-testid="blog-modal">
      <div className="min-h-full flex items-start justify-center p-4 pt-16">
        <div className="bg-card border border-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
            <h2 className="text-2xl font-playfair font-bold text-primary">
              {post?.title || "Loading..."}
            </h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={closeModal}
              data-testid="button-close-modal"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="p-6">
            {postLoading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-muted rounded w-1/3"></div>
                <div className="h-64 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </div>
            ) : post ? (
              <>
                {/* Blog Content */}
                <div className="prose prose-lg max-w-none mb-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                    {post.category && (
                      <Badge variant="secondary">{post.category}</Badge>
                    )}
                    {post.readTime && (
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime} min read
                      </span>
                    )}
                  </div>
                  {post.featuredImage && (
                    <img 
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-64 object-cover rounded-xl mb-6" 
                      data-testid="img-blog-featured"
                    />
                  )}
                  <div className="space-y-4 text-foreground">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  </div>
                </div>

                {/* Blog Interactions */}
                <div className="border-t border-border pt-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-6">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={handleLike}
                        disabled={likeMutation.isPending}
                        className="flex items-center space-x-2 text-muted-foreground hover:text-accent transition-colors"
                        data-testid="button-like-post"
                      >
                        <Heart className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </Button>
                      <span className="flex items-center space-x-2 text-muted-foreground">
                        <MessageCircle className="h-4 w-4" />
                        <span>{comments.length}</span>
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={handleShare}
                        className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
                        data-testid="button-share-post"
                      >
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </Button>
                    </div>
                  </div>

                  {/* Comments Section */}
                  <div className="space-y-6">
                    <h4 className="text-lg font-inter font-semibold text-primary">Comments</h4>
                    
                    {/* Comment Form */}
                    {isAuthenticated ? (
                      <div className="bg-muted rounded-lg p-4">
                        <Textarea 
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          className="resize-none" 
                          rows={3} 
                          placeholder="Share your thoughts... Use @username to tag someone"
                          data-testid="textarea-comment"
                        />
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="sm" title="Add emoji">
                              <Smile className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" title="Attach file">
                              <Paperclip className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button 
                            onClick={handleComment}
                            disabled={!commentText.trim() || commentMutation.isPending}
                            data-testid="button-post-comment"
                          >
                            Comment
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-muted rounded-lg p-4 text-center">
                        <p className="text-muted-foreground mb-4">Please sign in to leave a comment</p>
                        <Button onClick={() => window.location.href = '/api/login'}>
                          Sign In
                        </Button>
                      </div>
                    )}

                    {/* Existing Comments */}
                    {commentsLoading ? (
                      <div className="space-y-4">
                        {[...Array(2)].map((_, i) => (
                          <div key={i} className="border border-border rounded-lg p-4 animate-pulse">
                            <div className="flex items-start space-x-3">
                              <div className="w-10 h-10 bg-muted rounded-full"></div>
                              <div className="flex-1 space-y-2">
                                <div className="h-4 bg-muted rounded w-1/4"></div>
                                <div className="h-16 bg-muted rounded"></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {comments.map((comment) => (
                          <div key={comment.id} className="border border-border rounded-lg p-4" data-testid={`comment-${comment.id}`}>
                            <div className="flex items-start space-x-3">
                              {comment.author?.profileImageUrl ? (
                                <img 
                                  src={comment.author.profileImageUrl}
                                  alt={`${comment.author.firstName || 'User'} avatar`}
                                  className="w-10 h-10 rounded-full object-cover" 
                                  data-testid={`img-comment-avatar-${comment.id}`}
                                />
                              ) : (
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                  <span className="text-primary font-medium">
                                    {comment.author?.firstName?.[0] || comment.author?.email?.[0] || 'U'}
                                  </span>
                                </div>
                              )}
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <h5 className="font-medium text-foreground text-comment-author">
                                    {comment.author?.firstName && comment.author?.lastName 
                                      ? `${comment.author.firstName} ${comment.author.lastName}`
                                      : comment.author?.email || 'Anonymous'}
                                  </h5>
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(comment.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-muted-foreground text-sm leading-relaxed text-comment-content">
                                  {comment.content}
                                </p>
                                <div className="flex items-center space-x-4 mt-3">
                                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Heart className="h-3 w-3" />
                                    {comment.likes}
                                  </span>
                                  <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-secondary">
                                    Reply
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {comments.length === 0 && (
                          <div className="text-center py-8 text-muted-foreground">
                            No comments yet. Be the first to share your thoughts!
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Post not found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
