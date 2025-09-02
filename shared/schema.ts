import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  boolean,
  integer,
  date,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Session storage table.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  password: varchar("password"), // For local authentication
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  isAdmin: boolean("is_admin").default(false),
  isEmailVerified: boolean("is_email_verified").default(false),
  resetPasswordToken: varchar("reset_password_token"),
  resetPasswordExpires: timestamp("reset_password_expires"),
  lastLoginAt: timestamp("last_login_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User portfolios table
export const userPortfolios = pgTable("user_portfolios", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  templateId: varchar("template_id").references(() => portfolioTemplates.id),
  title: varchar("title").notNull(),
  slug: varchar("slug").unique().notNull(),
  description: text("description"),
  themeConfig: jsonb("theme_config"), // Custom theme settings
  isPublished: boolean("is_published").default(false),
  isPublic: boolean("is_public").default(true),
  customDomain: varchar("custom_domain"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Portfolio templates table
export const portfolioTemplates = pgTable("portfolio_templates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  description: text("description"),
  category: varchar("category").notNull(), // 'creative', 'professional', 'minimal', etc.
  previewImage: varchar("preview_image"),
  templateConfig: jsonb("template_config"), // Template structure and default settings
  isActive: boolean("is_active").default(true),
  isFeatured: boolean("is_featured").default(false),
  usageCount: integer("usage_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User delete requests table
export const userDeleteRequests = pgTable("user_delete_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  portfolioId: varchar("portfolio_id").references(() => userPortfolios.id),
  requestType: varchar("request_type").notNull(), // 'portfolio', 'account'
  reason: text("reason"),
  status: varchar("status").default("pending"), // 'pending', 'approved', 'rejected'
  adminNotes: text("admin_notes"),
  requestedAt: timestamp("requested_at").defaultNow(),
  processedAt: timestamp("processed_at"),
  processedBy: varchar("processed_by").references(() => users.id),
});

// Portfolio sections table
export const portfolioSections = pgTable("portfolio_sections", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title").notNull(),
  content: text("content"),
  type: varchar("type").notNull(), // 'hero', 'about', 'experience', 'skills', etc.
  isVisible: boolean("is_visible").default(true),
  sortOrder: integer("sort_order").default(0),
  metadata: jsonb("metadata"), // For storing additional data like images, links, etc.
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Blog posts table
export const blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title").notNull(),
  slug: varchar("slug").unique().notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  featuredImage: varchar("featured_image"),
  category: varchar("category"),
  tags: text("tags").array(),
  isPublished: boolean("is_published").default(false),
  readTime: integer("read_time"), // in minutes
  likes: integer("likes").default(0),
  views: integer("views").default(0),
  authorId: varchar("author_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Comments table
export const comments = pgTable("comments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  content: text("content").notNull(),
  authorId: varchar("author_id").references(() => users.id),
  postId: varchar("post_id").references(() => blogPosts.id),
  parentId: varchar("parent_id").references(() => comments.id),
  likes: integer("likes").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Forum posts table
export const forumPosts = pgTable("forum_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title").notNull(),
  content: text("content").notNull(),
  category: varchar("category"),
  authorId: varchar("author_id").references(() => users.id),
  isAnswered: boolean("is_answered").default(false),
  views: integer("views").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Forum replies table
export const forumReplies = pgTable("forum_replies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  content: text("content").notNull(),
  postId: varchar("post_id").references(() => forumPosts.id),
  authorId: varchar("author_id").references(() => users.id),
  isAccepted: boolean("is_accepted").default(false),
  likes: integer("likes").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Contests table
export const contests = pgTable("contests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title").notNull(),
  description: text("description"),
  rules: text("rules"),
  prize: varchar("prize"),
  deadline: timestamp("deadline"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// FAQs table
export const faqs = pgTable("faqs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  question: varchar("question").notNull(),
  answer: text("answer").notNull(),
  category: varchar("category"),
  isVisible: boolean("is_visible").default(true),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Contact messages table
export const contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  subject: varchar("subject"),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Employment experience table
export const employmentExperience = pgTable("employment_experience", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  company: varchar("company").notNull(),
  position: varchar("position").notNull(),
  location: varchar("location"),
  startDate: date("start_date").notNull(),
  endDate: date("end_date"),
  isCurrent: boolean("is_current").default(false),
  description: text("description"),
  achievements: text("achievements").array(),
  technologies: text("technologies").array(),
  responsibilities: text("responsibilities").array(),
  domain: varchar("domain"), // Banking, SaaS, etc.
  sortOrder: integer("sort_order").default(0),
  isVisible: boolean("is_visible").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Projects table
export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title").notNull(),
  description: text("description"),
  company: varchar("company"),
  client: varchar("client"),
  domain: varchar("domain"), // Banking, EduTech, etc.
  technologies: text("technologies").array(),
  methodology: varchar("methodology"), // Agile, Scrum, etc.
  teamSize: varchar("team_size"),
  duration: varchar("duration"),
  role: varchar("role"),
  achievements: text("achievements").array(),
  challenges: text("challenges").array(),
  outcomes: text("outcomes").array(),
  startDate: date("start_date"),
  endDate: date("end_date"),
  isVisible: boolean("is_visible").default(true),
  isFeatured: boolean("is_featured").default(false),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Certifications table
export const certifications = pgTable("certifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  provider: varchar("provider").notNull(),
  credentialId: varchar("credential_id"),
  credentialUrl: varchar("credential_url"),
  issueDate: date("issue_date"),
  expiryDate: date("expiry_date"),
  description: text("description"),
  skills: text("skills").array(),
  badgeUrl: varchar("badge_url"),
  isVisible: boolean("is_visible").default(true),
  isFeatured: boolean("is_featured").default(false),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Skills and technologies table
export const skills = pgTable("skills", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  category: varchar("category").notNull(), // Technical, Soft Skills, Tools, etc.
  proficiencyLevel: integer("proficiency_level").default(1), // 1-5 scale
  yearsOfExperience: integer("years_of_experience"),
  description: text("description"),
  isVisible: boolean("is_visible").default(true),
  isFeatured: boolean("is_featured").default(false),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Awards and achievements table
export const achievements = pgTable("achievements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: varchar("title").notNull(),
  description: text("description"),
  organization: varchar("organization"),
  year: integer("year"),
  category: varchar("category"), // Award, Recognition, etc.
  impact: text("impact"),
  isVisible: boolean("is_visible").default(true),
  isFeatured: boolean("is_featured").default(false),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Education table
export const education = pgTable("education", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  institution: varchar("institution").notNull(),
  degree: varchar("degree").notNull(),
  field: varchar("field"),
  location: varchar("location"),
  startDate: date("start_date"),
  endDate: date("end_date"),
  grade: varchar("grade"),
  description: text("description"),
  achievements: text("achievements").array(),
  isVisible: boolean("is_visible").default(true),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Social links table
export const socialLinks = pgTable("social_links", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  platform: varchar("platform").notNull(), // LinkedIn, YouTube, Twitter, etc.
  url: varchar("url").notNull(),
  username: varchar("username"),
  displayName: varchar("display_name"),
  category: varchar("category").notNull(), // Professional, Social, Portfolio, Tools, etc.
  description: text("description"),
  icon: varchar("icon"), // Icon name for display
  isVisible: boolean("is_visible").default(true),
  isFeatured: boolean("is_featured").default(false),
  sortOrder: integer("sort_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  blogPosts: many(blogPosts),
  comments: many(comments),
  forumPosts: many(forumPosts),
  forumReplies: many(forumReplies),
}));

export const blogPostsRelations = relations(blogPosts, ({ one, many }) => ({
  author: one(users, {
    fields: [blogPosts.authorId],
    references: [users.id],
  }),
  comments: many(comments),
}));

export const commentsRelations = relations(comments, ({ one, many }) => ({
  author: one(users, {
    fields: [comments.authorId],
    references: [users.id],
  }),
  post: one(blogPosts, {
    fields: [comments.postId],
    references: [blogPosts.id],
  }),
  parent: one(comments, {
    fields: [comments.parentId],
    references: [comments.id],
  }),
  replies: many(comments),
}));

export const forumPostsRelations = relations(forumPosts, ({ one, many }) => ({
  author: one(users, {
    fields: [forumPosts.authorId],
    references: [users.id],
  }),
  replies: many(forumReplies),
}));

export const forumRepliesRelations = relations(forumReplies, ({ one }) => ({
  post: one(forumPosts, {
    fields: [forumReplies.postId],
    references: [forumPosts.id],
  }),
  author: one(users, {
    fields: [forumReplies.authorId],
    references: [users.id],
  }),
}));

// Professional data relations
export const projectsRelations = relations(projects, ({ one }) => ({
  // Add relations if needed
}));

export const certificationsRelations = relations(certifications, ({ one }) => ({
  // Add relations if needed
}));

export const skillsRelations = relations(skills, ({ one }) => ({
  // Add relations if needed
}));

export const achievementsRelations = relations(achievements, ({ one }) => ({
  // Add relations if needed
}));

export const educationRelations = relations(education, ({ one }) => ({
  // Add relations if needed
}));

export const employmentExperienceRelations = relations(employmentExperience, ({ one }) => ({
  // Add relations if needed
}));

export const socialLinksRelations = relations(socialLinks, ({ one }) => ({
  // Add relations if needed
}));

// New platform relations
export const usersPortfolioRelations = relations(users, ({ many }) => ({
  portfolios: many(userPortfolios),
  deleteRequests: many(userDeleteRequests),
  processedRequests: many(userDeleteRequests, {
    relationName: "processedBy"
  })
}));

export const userPortfoliosRelations = relations(userPortfolios, ({ one }) => ({
  user: one(users, {
    fields: [userPortfolios.userId],
    references: [users.id],
  }),
  template: one(portfolioTemplates, {
    fields: [userPortfolios.templateId],
    references: [portfolioTemplates.id],
  }),
}));

export const portfolioTemplatesRelations = relations(portfolioTemplates, ({ many }) => ({
  userPortfolios: many(userPortfolios),
}));

export const userDeleteRequestsRelations = relations(userDeleteRequests, ({ one }) => ({
  user: one(users, {
    fields: [userDeleteRequests.userId],
    references: [users.id],
  }),
  portfolio: one(userPortfolios, {
    fields: [userDeleteRequests.portfolioId],
    references: [userPortfolios.id],
  }),
  processedByUser: one(users, {
    fields: [userDeleteRequests.processedBy],
    references: [users.id],
    relationName: "processedBy"
  }),
}));

// Schema types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export const insertPortfolioSectionSchema = createInsertSchema(portfolioSections).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertPortfolioSection = z.infer<typeof insertPortfolioSectionSchema>;
export type PortfolioSection = typeof portfolioSections.$inferSelect;

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  likes: true,
  views: true,
});
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;

export const insertCommentSchema = createInsertSchema(comments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  likes: true,
});
export type InsertComment = z.infer<typeof insertCommentSchema>;
export type Comment = typeof comments.$inferSelect;

export const insertForumPostSchema = createInsertSchema(forumPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  views: true,
});
export type InsertForumPost = z.infer<typeof insertForumPostSchema>;
export type ForumPost = typeof forumPosts.$inferSelect;

export const insertForumReplySchema = createInsertSchema(forumReplies).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  likes: true,
});
export type InsertForumReply = z.infer<typeof insertForumReplySchema>;
export type ForumReply = typeof forumReplies.$inferSelect;

export const insertContestSchema = createInsertSchema(contests).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertContest = z.infer<typeof insertContestSchema>;
export type Contest = typeof contests.$inferSelect;

export const insertFaqSchema = createInsertSchema(faqs).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertFaq = z.infer<typeof insertFaqSchema>;
export type Faq = typeof faqs.$inferSelect;

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
});
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

// Professional data schemas
export const insertEmploymentExperienceSchema = createInsertSchema(employmentExperience).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertEmploymentExperience = z.infer<typeof insertEmploymentExperienceSchema>;
export type EmploymentExperience = typeof employmentExperience.$inferSelect;

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export const insertCertificationSchema = createInsertSchema(certifications).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertCertification = z.infer<typeof insertCertificationSchema>;
export type Certification = typeof certifications.$inferSelect;

export const insertSkillSchema = createInsertSchema(skills).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type Skill = typeof skills.$inferSelect;

export const insertAchievementSchema = createInsertSchema(achievements).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;
export type Achievement = typeof achievements.$inferSelect;

export const insertEducationSchema = createInsertSchema(education).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertEducation = z.infer<typeof insertEducationSchema>;
export type Education = typeof education.$inferSelect;

export const insertSocialLinkSchema = createInsertSchema(socialLinks).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertSocialLink = z.infer<typeof insertSocialLinkSchema>;
export type SocialLink = typeof socialLinks.$inferSelect;

// New platform schema types
export const insertUserPortfolioSchema = createInsertSchema(userPortfolios).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertUserPortfolio = z.infer<typeof insertUserPortfolioSchema>;
export type UserPortfolio = typeof userPortfolios.$inferSelect;

export const insertPortfolioTemplateSchema = createInsertSchema(portfolioTemplates).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  usageCount: true,
});
export type InsertPortfolioTemplate = z.infer<typeof insertPortfolioTemplateSchema>;
export type PortfolioTemplate = typeof portfolioTemplates.$inferSelect;

export const insertUserDeleteRequestSchema = createInsertSchema(userDeleteRequests).omit({
  id: true,
  requestedAt: true,
  processedAt: true,
});
export type InsertUserDeleteRequest = z.infer<typeof insertUserDeleteRequestSchema>;
export type UserDeleteRequest = typeof userDeleteRequests.$inferSelect;

// Authentication schemas
export const userSignUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
});
export type UserSignUp = z.infer<typeof userSignUpSchema>;

export const userSignInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});
export type UserSignIn = z.infer<typeof userSignInSchema>;

export const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});
export type ResetPassword = z.infer<typeof resetPasswordSchema>;

export const newPasswordSchema = z.object({
  token: z.string().min(1, "Reset token is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export type NewPassword = z.infer<typeof newPasswordSchema>;
