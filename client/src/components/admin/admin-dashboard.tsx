import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PortfolioManagement from "./portfolio-management";
import BlogManagement from "./blog-management";
import type { BlogPost, User, ContactMessage } from "@shared/schema";

export default function AdminDashboard() {
  const { data: blogPosts = [] } = useQuery({
    queryKey: ['/api/blog/posts'],
    queryFn: async () => {
      const response = await fetch('/api/blog/posts');
      if (!response.ok) throw new Error('Failed to fetch blog posts');
      return response.json() as Promise<(BlogPost & { author: User })[]>;
    },
  });

  const { data: contactMessages = [] } = useQuery({
    queryKey: ['/api/contact/messages'],
    queryFn: async () => {
      const response = await fetch('/api/contact/messages');
      if (!response.ok) throw new Error('Failed to fetch contact messages');
      return response.json() as Promise<ContactMessage[]>;
    },
  });

  const stats = [
    {
      label: "Portfolio Views",
      value: "2,847",
      dataTestId: "stat-portfolio-views",
    },
    {
      label: "Blog Posts",
      value: blogPosts.length.toString(),
      dataTestId: "stat-blog-posts",
    },
    {
      label: "Comments",
      value: "156",
      dataTestId: "stat-comments",
    },
    {
      label: "Contact Messages",
      value: contactMessages.length.toString(),
      dataTestId: "stat-contact-messages",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-playfair font-bold text-primary mb-2">Admin Dashboard</h2>
        <p className="text-muted-foreground">Manage your portfolio content and settings</p>
      </div>

      <Tabs defaultValue="portfolio" className="space-y-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="portfolio" data-testid="tab-portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="blog" data-testid="tab-blog">Blog Posts</TabsTrigger>
          <TabsTrigger value="community" data-testid="tab-community">Community</TabsTrigger>
          <TabsTrigger value="settings" data-testid="tab-settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <PortfolioManagement />
            </div>
            <div>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-inter font-semibold mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    {stats.map((stat, index) => (
                      <div key={index} className="flex justify-between" data-testid={stat.dataTestId}>
                        <span className="text-muted-foreground">{stat.label}</span>
                        <span className="font-medium text-stat-value">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="blog" className="space-y-8">
          <BlogManagement />
        </TabsContent>

        <TabsContent value="community" className="space-y-8">
          <Card>
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-inter font-semibold text-primary mb-4">Community Management</h3>
              <p className="text-muted-foreground mb-6">
                Community features including contests, FAQ management, and forum moderation will be available here.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-semibold mb-2">Contest Management</h4>
                  <p className="text-sm text-muted-foreground">Create and manage contests</p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-semibold mb-2">FAQ Management</h4>
                  <p className="text-sm text-muted-foreground">Add and edit frequently asked questions</p>
                </div>
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-semibold mb-2">Forum Moderation</h4>
                  <p className="text-sm text-muted-foreground">Moderate forum posts and replies</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-8">
          <Card>
            <CardContent className="p-8">
              <h3 className="text-xl font-inter font-semibold text-primary mb-6">Contact Messages</h3>
              {contactMessages.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No contact messages yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {contactMessages.slice(0, 10).map((message) => (
                    <div 
                      key={message.id} 
                      className={`border rounded-lg p-4 ${message.isRead ? 'bg-muted/50' : 'bg-card'}`}
                      data-testid={`contact-message-${message.id}`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-message-name">{message.name}</h4>
                          <p className="text-sm text-muted-foreground text-message-email">{message.email}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(message.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {message.subject && (
                        <p className="font-medium text-sm mb-2 text-message-subject">{message.subject}</p>
                      )}
                      <p className="text-sm text-muted-foreground text-message-content">
                        {message.message}
                      </p>
                      {!message.isRead && (
                        <div className="mt-2">
                          <span className="inline-block px-2 py-1 bg-accent text-accent-foreground text-xs rounded">
                            New
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
