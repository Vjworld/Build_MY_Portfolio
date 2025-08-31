import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { 
  insertPortfolioSectionSchema,
  insertBlogPostSchema,
  insertCommentSchema,
  insertForumPostSchema,
  insertForumReplySchema,
  insertContestSchema,
  insertFaqSchema,
  insertContactMessageSchema,
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Portfolio routes
  app.get('/api/portfolio/sections', async (req, res) => {
    try {
      const sections = await storage.getPortfolioSections();
      res.json(sections);
    } catch (error) {
      console.error("Error fetching portfolio sections:", error);
      res.status(500).json({ message: "Failed to fetch portfolio sections" });
    }
  });

  app.post('/api/portfolio/sections', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      const validatedData = insertPortfolioSectionSchema.parse(req.body);
      const section = await storage.createPortfolioSection(validatedData);
      res.json(section);
    } catch (error) {
      console.error("Error creating portfolio section:", error);
      res.status(500).json({ message: "Failed to create portfolio section" });
    }
  });

  app.put('/api/portfolio/sections/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      const { id } = req.params;
      const section = await storage.updatePortfolioSection(id, req.body);
      res.json(section);
    } catch (error) {
      console.error("Error updating portfolio section:", error);
      res.status(500).json({ message: "Failed to update portfolio section" });
    }
  });

  app.delete('/api/portfolio/sections/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      const { id } = req.params;
      await storage.deletePortfolioSection(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting portfolio section:", error);
      res.status(500).json({ message: "Failed to delete portfolio section" });
    }
  });

  app.patch('/api/portfolio/sections/:id/toggle-visibility', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      const { id } = req.params;
      const section = await storage.togglePortfolioSectionVisibility(id);
      res.json(section);
    } catch (error) {
      console.error("Error toggling portfolio section visibility:", error);
      res.status(500).json({ message: "Failed to toggle visibility" });
    }
  });

  // Blog routes
  app.get('/api/blog/posts', async (req, res) => {
    try {
      const { published } = req.query;
      const posts = await storage.getBlogPosts(published === 'true');
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get('/api/blog/posts/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const post = await storage.getBlogPost(id);
      
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      // Increment view count
      await storage.incrementBlogPostViews(id);
      
      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  app.get('/api/blog/posts/slug/:slug', async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await storage.getBlogPostBySlug(slug);
      
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post by slug:", error);
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  app.post('/api/blog/posts', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      const validatedData = insertBlogPostSchema.parse({
        ...req.body,
        authorId: userId,
      });
      const post = await storage.createBlogPost(validatedData);
      res.json(post);
    } catch (error) {
      console.error("Error creating blog post:", error);
      res.status(500).json({ message: "Failed to create blog post" });
    }
  });

  app.put('/api/blog/posts/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      const { id } = req.params;
      const post = await storage.updateBlogPost(id, req.body);
      res.json(post);
    } catch (error) {
      console.error("Error updating blog post:", error);
      res.status(500).json({ message: "Failed to update blog post" });
    }
  });

  app.delete('/api/blog/posts/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      const { id } = req.params;
      await storage.deleteBlogPost(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting blog post:", error);
      res.status(500).json({ message: "Failed to delete blog post" });
    }
  });

  app.post('/api/blog/posts/:id/like', async (req, res) => {
    try {
      const { id } = req.params;
      await storage.likeBlogPost(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error liking blog post:", error);
      res.status(500).json({ message: "Failed to like blog post" });
    }
  });

  // Comment routes
  app.get('/api/blog/posts/:postId/comments', async (req, res) => {
    try {
      const { postId } = req.params;
      const comments = await storage.getComments(postId);
      res.json(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ message: "Failed to fetch comments" });
    }
  });

  app.post('/api/blog/posts/:postId/comments', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { postId } = req.params;
      
      const validatedData = insertCommentSchema.parse({
        ...req.body,
        postId,
        authorId: userId,
      });
      
      const comment = await storage.createComment(validatedData);
      res.json(comment);
    } catch (error) {
      console.error("Error creating comment:", error);
      res.status(500).json({ message: "Failed to create comment" });
    }
  });

  app.post('/api/comments/:id/like', async (req, res) => {
    try {
      const { id } = req.params;
      await storage.likeComment(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error liking comment:", error);
      res.status(500).json({ message: "Failed to like comment" });
    }
  });

  // Forum routes
  app.get('/api/forum/posts', async (req, res) => {
    try {
      const posts = await storage.getForumPosts();
      res.json(posts);
    } catch (error) {
      console.error("Error fetching forum posts:", error);
      res.status(500).json({ message: "Failed to fetch forum posts" });
    }
  });

  app.get('/api/forum/posts/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const post = await storage.getForumPost(id);
      
      if (!post) {
        return res.status(404).json({ message: "Forum post not found" });
      }

      res.json(post);
    } catch (error) {
      console.error("Error fetching forum post:", error);
      res.status(500).json({ message: "Failed to fetch forum post" });
    }
  });

  app.post('/api/forum/posts', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      
      const validatedData = insertForumPostSchema.parse({
        ...req.body,
        authorId: userId,
      });
      
      const post = await storage.createForumPost(validatedData);
      res.json(post);
    } catch (error) {
      console.error("Error creating forum post:", error);
      res.status(500).json({ message: "Failed to create forum post" });
    }
  });

  app.get('/api/forum/posts/:postId/replies', async (req, res) => {
    try {
      const { postId } = req.params;
      const replies = await storage.getForumReplies(postId);
      res.json(replies);
    } catch (error) {
      console.error("Error fetching forum replies:", error);
      res.status(500).json({ message: "Failed to fetch forum replies" });
    }
  });

  app.post('/api/forum/posts/:postId/replies', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { postId } = req.params;
      
      const validatedData = insertForumReplySchema.parse({
        ...req.body,
        postId,
        authorId: userId,
      });
      
      const reply = await storage.createForumReply(validatedData);
      res.json(reply);
    } catch (error) {
      console.error("Error creating forum reply:", error);
      res.status(500).json({ message: "Failed to create forum reply" });
    }
  });

  // Contest routes
  app.get('/api/contests', async (req, res) => {
    try {
      const contests = await storage.getContests();
      res.json(contests);
    } catch (error) {
      console.error("Error fetching contests:", error);
      res.status(500).json({ message: "Failed to fetch contests" });
    }
  });

  app.post('/api/contests', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      const validatedData = insertContestSchema.parse(req.body);
      const contest = await storage.createContest(validatedData);
      res.json(contest);
    } catch (error) {
      console.error("Error creating contest:", error);
      res.status(500).json({ message: "Failed to create contest" });
    }
  });

  // FAQ routes
  app.get('/api/faqs', async (req, res) => {
    try {
      const faqs = await storage.getFaqs();
      res.json(faqs);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      res.status(500).json({ message: "Failed to fetch FAQs" });
    }
  });

  app.post('/api/faqs', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      const validatedData = insertFaqSchema.parse(req.body);
      const faq = await storage.createFaq(validatedData);
      res.json(faq);
    } catch (error) {
      console.error("Error creating FAQ:", error);
      res.status(500).json({ message: "Failed to create FAQ" });
    }
  });

  // Contact routes
  app.post('/api/contact', async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.json(message);
    } catch (error) {
      console.error("Error creating contact message:", error);
      res.status(500).json({ message: "Failed to send contact message" });
    }
  });

  app.get('/api/contact/messages', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      res.status(500).json({ message: "Failed to fetch contact messages" });
    }
  });

  // Professional Data Routes
  
  // Employment Experience routes
  app.get('/api/employment-experience', async (req, res) => {
    try {
      const experience = await storage.getEmploymentExperience();
      res.json(experience);
    } catch (error) {
      console.error('Error fetching employment experience:', error);
      res.status(500).json({ error: 'Failed to fetch employment experience' });
    }
  });

  app.post('/api/employment-experience', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      const experience = await storage.createEmploymentExperience(req.body);
      res.json(experience);
    } catch (error) {
      console.error('Error creating employment experience:', error);
      res.status(500).json({ error: 'Failed to create employment experience' });
    }
  });

  // Projects routes
  app.get('/api/projects', async (req, res) => {
    try {
      const projects = req.query.featured === 'true' 
        ? await storage.getFeaturedProjects()
        : await storage.getProjects();
      res.json(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ error: 'Failed to fetch projects' });
    }
  });

  // Certifications routes
  app.get('/api/certifications', async (req, res) => {
    try {
      const certifications = req.query.featured === 'true'
        ? await storage.getFeaturedCertifications()
        : await storage.getCertifications();
      res.json(certifications);
    } catch (error) {
      console.error('Error fetching certifications:', error);
      res.status(500).json({ error: 'Failed to fetch certifications' });
    }
  });

  // Skills routes
  app.get('/api/skills', async (req, res) => {
    try {
      const skills = req.query.featured === 'true'
        ? await storage.getFeaturedSkills()
        : req.query.byCategory === 'true'
        ? await storage.getSkillsByCategory()
        : await storage.getSkills();
      res.json(skills);
    } catch (error) {
      console.error('Error fetching skills:', error);
      res.status(500).json({ error: 'Failed to fetch skills' });
    }
  });

  // Achievements routes
  app.get('/api/achievements', async (req, res) => {
    try {
      const achievements = req.query.featured === 'true'
        ? await storage.getFeaturedAchievements()
        : await storage.getAchievements();
      res.json(achievements);
    } catch (error) {
      console.error('Error fetching achievements:', error);
      res.status(500).json({ error: 'Failed to fetch achievements' });
    }
  });

  // Education routes
  app.get('/api/education', async (req, res) => {
    try {
      const education = await storage.getEducation();
      res.json(education);
    } catch (error) {
      console.error('Error fetching education:', error);
      res.status(500).json({ error: 'Failed to fetch education' });
    }
  });

  // Social Links routes
  app.get('/api/social-links', async (req, res) => {
    try {
      const socialLinks = req.query.featured === 'true'
        ? await storage.getFeaturedSocialLinks()
        : req.query.byCategory === 'true'
        ? await storage.getSocialLinksByCategory()
        : await storage.getSocialLinks();
      res.json(socialLinks);
    } catch (error) {
      console.error('Error fetching social links:', error);
      res.status(500).json({ error: 'Failed to fetch social links' });
    }
  });

  app.post('/api/social-links', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      const socialLink = await storage.createSocialLink(req.body);
      res.json(socialLink);
    } catch (error) {
      console.error('Error creating social link:', error);
      res.status(500).json({ error: 'Failed to create social link' });
    }
  });

  app.put('/api/social-links/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      const { id } = req.params;
      const socialLink = await storage.updateSocialLink(id, req.body);
      res.json(socialLink);
    } catch (error) {
      console.error('Error updating social link:', error);
      res.status(500).json({ error: 'Failed to update social link' });
    }
  });

  app.delete('/api/social-links/:id', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      
      if (!user?.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }

      const { id } = req.params;
      await storage.deleteSocialLink(id);
      res.json({ success: true });
    } catch (error) {
      console.error('Error deleting social link:', error);
      res.status(500).json({ error: 'Failed to delete social link' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
