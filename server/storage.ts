import {
  users,
  portfolioSections,
  blogPosts,
  comments,
  forumPosts,
  forumReplies,
  contests,
  faqs,
  contactMessages,
  type User,
  type UpsertUser,
  type PortfolioSection,
  type InsertPortfolioSection,
  type BlogPost,
  type InsertBlogPost,
  type Comment,
  type InsertComment,
  type ForumPost,
  type InsertForumPost,
  type ForumReply,
  type InsertForumReply,
  type Contest,
  type InsertContest,
  type Faq,
  type InsertFaq,
  type ContactMessage,
  type InsertContactMessage,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, like, sql } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Portfolio operations
  getPortfolioSections(): Promise<PortfolioSection[]>;
  getPortfolioSection(id: string): Promise<PortfolioSection | undefined>;
  createPortfolioSection(section: InsertPortfolioSection): Promise<PortfolioSection>;
  updatePortfolioSection(id: string, section: Partial<InsertPortfolioSection>): Promise<PortfolioSection>;
  deletePortfolioSection(id: string): Promise<void>;
  togglePortfolioSectionVisibility(id: string): Promise<PortfolioSection>;
  
  // Blog operations
  getBlogPosts(published?: boolean): Promise<(BlogPost & { author: User })[]>;
  getBlogPost(id: string): Promise<(BlogPost & { author: User }) | undefined>;
  getBlogPostBySlug(slug: string): Promise<(BlogPost & { author: User }) | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost>;
  deleteBlogPost(id: string): Promise<void>;
  incrementBlogPostViews(id: string): Promise<void>;
  likeBlogPost(id: string): Promise<void>;
  
  // Comment operations
  getComments(postId: string): Promise<(Comment & { author: User })[]>;
  createComment(comment: InsertComment): Promise<Comment>;
  likeComment(id: string): Promise<void>;
  
  // Forum operations
  getForumPosts(): Promise<(ForumPost & { author: User; replyCount: number })[]>;
  getForumPost(id: string): Promise<(ForumPost & { author: User }) | undefined>;
  createForumPost(post: InsertForumPost): Promise<ForumPost>;
  getForumReplies(postId: string): Promise<(ForumReply & { author: User })[]>;
  createForumReply(reply: InsertForumReply): Promise<ForumReply>;
  
  // Contest operations
  getContests(): Promise<Contest[]>;
  createContest(contest: InsertContest): Promise<Contest>;
  updateContest(id: string, contest: Partial<InsertContest>): Promise<Contest>;
  deleteContest(id: string): Promise<void>;
  
  // FAQ operations
  getFaqs(): Promise<Faq[]>;
  createFaq(faq: InsertFaq): Promise<Faq>;
  updateFaq(id: string, faq: Partial<InsertFaq>): Promise<Faq>;
  deleteFaq(id: string): Promise<void>;
  
  // Contact operations
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  markContactMessageAsRead(id: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Portfolio operations
  async getPortfolioSections(): Promise<PortfolioSection[]> {
    return await db.select().from(portfolioSections).orderBy(portfolioSections.sortOrder);
  }

  async getPortfolioSection(id: string): Promise<PortfolioSection | undefined> {
    const [section] = await db.select().from(portfolioSections).where(eq(portfolioSections.id, id));
    return section;
  }

  async createPortfolioSection(section: InsertPortfolioSection): Promise<PortfolioSection> {
    const [newSection] = await db.insert(portfolioSections).values(section).returning();
    return newSection;
  }

  async updatePortfolioSection(id: string, section: Partial<InsertPortfolioSection>): Promise<PortfolioSection> {
    const [updatedSection] = await db
      .update(portfolioSections)
      .set({ ...section, updatedAt: new Date() })
      .where(eq(portfolioSections.id, id))
      .returning();
    return updatedSection;
  }

  async deletePortfolioSection(id: string): Promise<void> {
    await db.delete(portfolioSections).where(eq(portfolioSections.id, id));
  }

  async togglePortfolioSectionVisibility(id: string): Promise<PortfolioSection> {
    const [section] = await db.select().from(portfolioSections).where(eq(portfolioSections.id, id));
    const [updatedSection] = await db
      .update(portfolioSections)
      .set({ isVisible: !section.isVisible, updatedAt: new Date() })
      .where(eq(portfolioSections.id, id))
      .returning();
    return updatedSection;
  }

  // Blog operations
  async getBlogPosts(published?: boolean): Promise<(BlogPost & { author: User })[]> {
    const query = db
      .select({
        ...blogPosts,
        author: users,
      })
      .from(blogPosts)
      .leftJoin(users, eq(blogPosts.authorId, users.id))
      .orderBy(desc(blogPosts.createdAt));

    if (published !== undefined) {
      return await query.where(eq(blogPosts.isPublished, published));
    }

    return await query;
  }

  async getBlogPost(id: string): Promise<(BlogPost & { author: User }) | undefined> {
    const [post] = await db
      .select({
        ...blogPosts,
        author: users,
      })
      .from(blogPosts)
      .leftJoin(users, eq(blogPosts.authorId, users.id))
      .where(eq(blogPosts.id, id));
    return post;
  }

  async getBlogPostBySlug(slug: string): Promise<(BlogPost & { author: User }) | undefined> {
    const [post] = await db
      .select({
        ...blogPosts,
        author: users,
      })
      .from(blogPosts)
      .leftJoin(users, eq(blogPosts.authorId, users.id))
      .where(eq(blogPosts.slug, slug));
    return post;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db.insert(blogPosts).values(post).returning();
    return newPost;
  }

  async updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost> {
    const [updatedPost] = await db
      .update(blogPosts)
      .set({ ...post, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return updatedPost;
  }

  async deleteBlogPost(id: string): Promise<void> {
    await db.delete(blogPosts).where(eq(blogPosts.id, id));
  }

  async incrementBlogPostViews(id: string): Promise<void> {
    await db
      .update(blogPosts)
      .set({ views: sql`${blogPosts.views} + 1` })
      .where(eq(blogPosts.id, id));
  }

  async likeBlogPost(id: string): Promise<void> {
    await db
      .update(blogPosts)
      .set({ likes: sql`${blogPosts.likes} + 1` })
      .where(eq(blogPosts.id, id));
  }

  // Comment operations
  async getComments(postId: string): Promise<(Comment & { author: User })[]> {
    return await db
      .select({
        ...comments,
        author: users,
      })
      .from(comments)
      .leftJoin(users, eq(comments.authorId, users.id))
      .where(eq(comments.postId, postId))
      .orderBy(comments.createdAt);
  }

  async createComment(comment: InsertComment): Promise<Comment> {
    const [newComment] = await db.insert(comments).values(comment).returning();
    return newComment;
  }

  async likeComment(id: string): Promise<void> {
    await db
      .update(comments)
      .set({ likes: sql`${comments.likes} + 1` })
      .where(eq(comments.id, id));
  }

  // Forum operations
  async getForumPosts(): Promise<(ForumPost & { author: User; replyCount: number })[]> {
    return await db
      .select({
        ...forumPosts,
        author: users,
        replyCount: sql<number>`cast(count(${forumReplies.id}) as int)`,
      })
      .from(forumPosts)
      .leftJoin(users, eq(forumPosts.authorId, users.id))
      .leftJoin(forumReplies, eq(forumPosts.id, forumReplies.postId))
      .groupBy(forumPosts.id, users.id)
      .orderBy(desc(forumPosts.createdAt));
  }

  async getForumPost(id: string): Promise<(ForumPost & { author: User }) | undefined> {
    const [post] = await db
      .select({
        ...forumPosts,
        author: users,
      })
      .from(forumPosts)
      .leftJoin(users, eq(forumPosts.authorId, users.id))
      .where(eq(forumPosts.id, id));
    return post;
  }

  async createForumPost(post: InsertForumPost): Promise<ForumPost> {
    const [newPost] = await db.insert(forumPosts).values(post).returning();
    return newPost;
  }

  async getForumReplies(postId: string): Promise<(ForumReply & { author: User })[]> {
    return await db
      .select({
        ...forumReplies,
        author: users,
      })
      .from(forumReplies)
      .leftJoin(users, eq(forumReplies.authorId, users.id))
      .where(eq(forumReplies.postId, postId))
      .orderBy(forumReplies.createdAt);
  }

  async createForumReply(reply: InsertForumReply): Promise<ForumReply> {
    const [newReply] = await db.insert(forumReplies).values(reply).returning();
    return newReply;
  }

  // Contest operations
  async getContests(): Promise<Contest[]> {
    return await db.select().from(contests).orderBy(desc(contests.createdAt));
  }

  async createContest(contest: InsertContest): Promise<Contest> {
    const [newContest] = await db.insert(contests).values(contest).returning();
    return newContest;
  }

  async updateContest(id: string, contest: Partial<InsertContest>): Promise<Contest> {
    const [updatedContest] = await db
      .update(contests)
      .set({ ...contest, updatedAt: new Date() })
      .where(eq(contests.id, id))
      .returning();
    return updatedContest;
  }

  async deleteContest(id: string): Promise<void> {
    await db.delete(contests).where(eq(contests.id, id));
  }

  // FAQ operations
  async getFaqs(): Promise<Faq[]> {
    return await db.select().from(faqs).where(eq(faqs.isVisible, true)).orderBy(faqs.sortOrder);
  }

  async createFaq(faq: InsertFaq): Promise<Faq> {
    const [newFaq] = await db.insert(faqs).values(faq).returning();
    return newFaq;
  }

  async updateFaq(id: string, faq: Partial<InsertFaq>): Promise<Faq> {
    const [updatedFaq] = await db
      .update(faqs)
      .set({ ...faq, updatedAt: new Date() })
      .where(eq(faqs.id, id))
      .returning();
    return updatedFaq;
  }

  async deleteFaq(id: string): Promise<void> {
    await db.delete(faqs).where(eq(faqs.id, id));
  }

  // Contact operations
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [newMessage] = await db.insert(contactMessages).values(message).returning();
    return newMessage;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }

  async markContactMessageAsRead(id: string): Promise<void> {
    await db
      .update(contactMessages)
      .set({ isRead: true })
      .where(eq(contactMessages.id, id));
  }
}

export const storage = new DatabaseStorage();
