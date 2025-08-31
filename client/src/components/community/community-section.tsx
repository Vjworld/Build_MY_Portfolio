import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Trophy, HelpCircle, Users, Calendar, MapPin } from "lucide-react";
import type { Contest, Faq, ForumPost, User } from "@shared/schema";

export default function CommunitySection() {
  // Fetch contests
  const { data: contests = [] } = useQuery({
    queryKey: ['/api/contests'],
    queryFn: async () => {
      const response = await fetch('/api/contests');
      if (!response.ok) throw new Error('Failed to fetch contests');
      return response.json() as Promise<Contest[]>;
    },
  });

  // Fetch FAQs
  const { data: faqs = [] } = useQuery({
    queryKey: ['/api/faqs'],
    queryFn: async () => {
      const response = await fetch('/api/faqs');
      if (!response.ok) throw new Error('Failed to fetch FAQs');
      return response.json() as Promise<Faq[]>;
    },
  });

  // Fetch forum posts
  const { data: forumPosts = [] } = useQuery({
    queryKey: ['/api/forum/posts'],
    queryFn: async () => {
      const response = await fetch('/api/forum/posts');
      if (!response.ok) throw new Error('Failed to fetch forum posts');
      return response.json() as Promise<(ForumPost & { author: User; replyCount: number })[]>;
    },
  });

  return (
    <section id="community" className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-playfair font-bold text-primary mb-4">Community Hub</h2>
          <p className="text-xl text-muted-foreground">Connect, learn, and grow together</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contests Section */}
          <Card>
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Trophy className="text-accent h-6 w-6" />
                </div>
                <h3 className="text-2xl font-playfair font-bold text-primary">Contests</h3>
              </div>
              <div className="space-y-4 mb-6">
                {contests.slice(0, 2).map((contest) => (
                  <div key={contest.id} className="border-l-4 border-accent pl-4" data-testid={`contest-${contest.id}`}>
                    <h4 className="font-semibold text-foreground text-contest-title">{contest.title}</h4>
                    {contest.deadline && (
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Ends {new Date(contest.deadline).toLocaleDateString()}
                      </p>
                    )}
                    {contest.description && (
                      <p className="text-sm text-muted-foreground mt-2">{contest.description}</p>
                    )}
                  </div>
                ))}
                
                {contests.length === 0 && (
                  <div className="text-center py-4 text-muted-foreground">
                    No active contests at the moment
                  </div>
                )}
              </div>
              <Button className="w-full" data-testid="button-view-contests">
                View All Contests
              </Button>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card>
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <HelpCircle className="text-secondary h-6 w-6" />
                </div>
                <h3 className="text-2xl font-playfair font-bold text-primary">FAQ</h3>
              </div>
              <div className="mb-6">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.slice(0, 3).map((faq, index) => (
                    <AccordionItem key={faq.id} value={`faq-${index}`} data-testid={`faq-${faq.id}`}>
                      <AccordionTrigger className="text-left text-faq-question">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground text-faq-answer">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                
                {faqs.length === 0 && (
                  <div className="text-center py-4 text-muted-foreground">
                    No FAQs available
                  </div>
                )}
              </div>
              <Button variant="outline" className="w-full" data-testid="button-view-faqs">
                View All FAQs
              </Button>
            </CardContent>
          </Card>

          {/* Q&A Forum */}
          <Card>
            <CardContent className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Users className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-2xl font-playfair font-bold text-primary">Q&A Forum</h3>
              </div>
              <div className="space-y-4 mb-6">
                {forumPosts.slice(0, 2).map((post) => (
                  <div key={post.id} className="border border-border rounded-lg p-4" data-testid={`forum-post-${post.id}`}>
                    <div className="flex items-start space-x-3">
                      {post.author?.profileImageUrl ? (
                        <img 
                          src={post.author.profileImageUrl}
                          alt={`${post.author.firstName || 'User'} avatar`}
                          className="w-10 h-10 rounded-full object-cover" 
                          data-testid={`img-forum-avatar-${post.id}`}
                        />
                      ) : (
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-primary font-medium">
                            {post.author?.firstName?.[0] || post.author?.email?.[0] || 'U'}
                          </span>
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground text-sm text-forum-title">{post.title}</h4>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-xs text-muted-foreground">
                            @{post.author?.email?.split('@')[0] || 'user'}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </span>
                          <span className="text-xs text-success text-forum-replies">
                            {post.replyCount} {post.replyCount === 1 ? 'reply' : 'replies'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {forumPosts.length === 0 && (
                  <div className="text-center py-4 text-muted-foreground">
                    No forum posts yet
                  </div>
                )}
              </div>
              <Button className="w-full" data-testid="button-join-discussion">
                Join Discussion
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
