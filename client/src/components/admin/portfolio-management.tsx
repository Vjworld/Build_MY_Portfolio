import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import { insertPortfolioSectionSchema, type InsertPortfolioSection, type PortfolioSection } from "@shared/schema";
import { Plus, Edit, Eye, EyeOff, Trash2 } from "lucide-react";

export default function PortfolioManagement() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<PortfolioSection | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: portfolioSections = [], isLoading } = useQuery({
    queryKey: ['/api/portfolio/sections'],
    queryFn: async () => {
      const response = await fetch('/api/portfolio/sections');
      if (!response.ok) throw new Error('Failed to fetch portfolio sections');
      return response.json() as Promise<PortfolioSection[]>;
    },
  });

  const form = useForm<InsertPortfolioSection>({
    resolver: zodResolver(insertPortfolioSectionSchema),
    defaultValues: {
      title: "",
      content: "",
      type: "about",
      isVisible: true,
      sortOrder: 0,
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertPortfolioSection) => {
      await apiRequest('POST', '/api/portfolio/sections', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/portfolio/sections'] });
      setIsCreateDialogOpen(false);
      form.reset();
      toast({
        title: "Success",
        description: "Portfolio section created successfully",
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
        description: "Failed to create portfolio section",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertPortfolioSection> }) => {
      await apiRequest('PUT', `/api/portfolio/sections/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/portfolio/sections'] });
      setEditingSection(null);
      form.reset();
      toast({
        title: "Success",
        description: "Portfolio section updated successfully",
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
        description: "Failed to update portfolio section",
        variant: "destructive",
      });
    },
  });

  const toggleVisibilityMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest('PATCH', `/api/portfolio/sections/${id}/toggle-visibility`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/portfolio/sections'] });
      toast({
        title: "Success",
        description: "Visibility updated successfully",
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
        description: "Failed to update visibility",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest('DELETE', `/api/portfolio/sections/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/portfolio/sections'] });
      toast({
        title: "Success",
        description: "Portfolio section deleted successfully",
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
        description: "Failed to delete portfolio section",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertPortfolioSection) => {
    if (editingSection) {
      updateMutation.mutate({ id: editingSection.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (section: PortfolioSection) => {
    setEditingSection(section);
    form.reset({
      title: section.title,
      content: section.content || "",
      type: section.type,
      isVisible: section.isVisible,
      sortOrder: section.sortOrder,
    });
  };

  const handleToggleVisibility = (id: string) => {
    toggleVisibilityMutation.mutate(id);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this portfolio section?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-muted rounded w-1/3"></div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border border-border rounded-lg p-4">
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-inter font-semibold">Portfolio Sections</h3>
          <Dialog open={isCreateDialogOpen || !!editingSection} onOpenChange={(open) => {
            setIsCreateDialogOpen(open);
            if (!open) {
              setEditingSection(null);
              form.reset();
            }
          }}>
            <DialogTrigger asChild>
              <Button onClick={() => setIsCreateDialogOpen(true)} data-testid="button-add-section">
                <Plus className="mr-2 h-4 w-4" />
                Add Section
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingSection ? "Edit Portfolio Section" : "Create Portfolio Section"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" data-testid="form-portfolio-section">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    {...form.register("title")}
                    placeholder="Section title"
                    data-testid="input-section-title"
                  />
                  {form.formState.errors.title && (
                    <p className="text-sm text-destructive mt-1">
                      {form.formState.errors.title.message}
                    </p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={form.watch("type")}
                    onValueChange={(value) => form.setValue("type", value)}
                  >
                    <SelectTrigger data-testid="select-section-type">
                      <SelectValue placeholder="Select section type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hero">Hero</SelectItem>
                      <SelectItem value="about">About</SelectItem>
                      <SelectItem value="experience">Experience</SelectItem>
                      <SelectItem value="skills">Skills</SelectItem>
                      <SelectItem value="testimonials">Testimonials</SelectItem>
                      <SelectItem value="contact">Contact</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    {...form.register("content")}
                    placeholder="Section content"
                    rows={6}
                    data-testid="textarea-section-content"
                  />
                </div>

                <div>
                  <Label htmlFor="sortOrder">Sort Order</Label>
                  <Input
                    id="sortOrder"
                    type="number"
                    {...form.register("sortOrder", { valueAsNumber: true })}
                    placeholder="0"
                    data-testid="input-sort-order"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isVisible"
                    {...form.register("isVisible")}
                    className="rounded border-border"
                    data-testid="checkbox-is-visible"
                  />
                  <Label htmlFor="isVisible">Visible</Label>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsCreateDialogOpen(false);
                      setEditingSection(null);
                      form.reset();
                    }}
                    data-testid="button-cancel"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={createMutation.isPending || updateMutation.isPending}
                    data-testid="button-save-section"
                  >
                    {(createMutation.isPending || updateMutation.isPending) ? "Saving..." : "Save"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {portfolioSections.map((section) => (
            <div key={section.id} className="border border-border rounded-lg p-4" data-testid={`portfolio-section-${section.id}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${section.isVisible ? 'bg-success' : 'bg-muted'}`}></div>
                  <h4 className="font-medium text-section-title">{section.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded ${
                    section.isVisible ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
                  }`}>
                    {section.isVisible ? 'Visible' : 'Hidden'}
                  </span>
                  <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded">
                    {section.type}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(section)}
                    data-testid={`button-edit-${section.id}`}
                  >
                    <Edit className="h-4 w-4 text-secondary" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleVisibility(section.id)}
                    disabled={toggleVisibilityMutation.isPending}
                    data-testid={`button-toggle-visibility-${section.id}`}
                  >
                    {section.isVisible ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-success" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(section.id)}
                    disabled={deleteMutation.isPending}
                    data-testid={`button-delete-${section.id}`}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
              {section.content && (
                <p className="text-sm text-muted-foreground text-section-content">
                  {section.content.length > 100 
                    ? `${section.content.substring(0, 100)}...` 
                    : section.content
                  }
                </p>
              )}
            </div>
          ))}

          {portfolioSections.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No portfolio sections created yet. Click "Add Section" to get started.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
