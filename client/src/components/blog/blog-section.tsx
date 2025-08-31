import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, Calendar, Clock } from "lucide-react";
import type { BlogPost, User } from "@shared/schema";

export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  const { data: blogPosts = [], isLoading } = useQuery({
    queryKey: ['/api/blog/posts'],
    queryFn: async () => {
      const response = await fetch('/api/blog/posts?published=true');
      if (!response.ok) throw new Error('Failed to fetch blog posts');
      return response.json() as Promise<(BlogPost & { author: User })[]>;
    },
  });

  const handlePostClick = (postId: string) => {
    setSelectedPost(postId);
    // Dispatch custom event to open modal
    window.dispatchEvent(new CustomEvent('openBlogModal', { detail: { postId } }));
  };

  const handleShare = (e: React.MouseEvent, postId: string) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: 'Blog Post',
        url: `${window.location.origin}/blog/${postId}`,
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/blog/${postId}`);
    }
  };

  const handleLike = async (e: React.MouseEvent, postId: string) => {
    e.stopPropagation();
    try {
      await fetch(`/api/blog/posts/${postId}/like`, { method: 'POST' });
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  if (isLoading) {
    return (
      <section id="blog" className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold text-primary mb-4">Latest Blog Posts</h2>
            <p className="text-xl text-muted-foreground">Insights on technology, leadership, and innovation</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-muted rounded-t-lg"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-muted rounded mb-4"></div>
                  <div className="h-6 bg-muted rounded mb-3"></div>
                  <div className="h-16 bg-muted rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-playfair font-bold text-primary mb-4">Latest Blog Posts</h2>
          <p className="text-xl text-muted-foreground">Insights on technology, leadership, and innovation</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogPosts.slice(0, 3).map((post) => (
            <article 
              key={post.id}
              className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handlePostClick(post.id)}
              data-testid={`blog-post-${post.slug}`}
            >
              {post.featuredImage && (
                <img 
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-48 object-cover" 
                  data-testid={`img-blog-${post.slug}`}
                />
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  {post.category && (
                    <Badge variant="secondary" data-testid={`badge-category-${post.slug}`}>
                      {post.category}
                    </Badge>
                  )}
                  {post.readTime && (
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime} min read
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-inter font-semibold text-foreground mb-3 line-clamp-2" data-testid={`title-blog-${post.slug}`}>
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-muted-foreground mb-4 line-clamp-3" data-testid={`excerpt-blog-${post.slug}`}>
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                    <button 
                      className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-accent transition-colors"
                      onClick={(e) => handleLike(e, post.id)}
                      data-testid={`button-like-${post.slug}`}
                    >
                      <Heart className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </button>
                    <span className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <MessageCircle className="h-4 w-4" />
                      <span>0</span>
                    </span>
                  </div>
                  <button 
                    className="text-primary hover:text-primary/80 transition-colors"
                    onClick={(e) => handleShare(e, post.id)}
                    data-testid={`button-share-${post.slug}`}
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Blog Interaction Features */}
        <Card className="p-8">
          <h3 className="text-2xl font-playfair font-bold text-primary mb-6">Join the Conversation</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <MessageCircle className="text-primary h-8 w-8" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Comment & Discuss</h4>
              <p className="text-sm text-muted-foreground">Share your thoughts and engage with fellow readers</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Share2 className="text-secondary h-8 w-8" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Share Articles</h4>
              <p className="text-sm text-muted-foreground">Spread knowledge across your professional network</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-accent text-2xl font-bold">@</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Tag Colleagues</h4>
              <p className="text-sm text-muted-foreground">Mention others to join specific discussions</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
