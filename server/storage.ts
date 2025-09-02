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
  employmentExperience,
  projects,
  certifications,
  skills,
  achievements,
  education,
  socialLinks,
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
  type EmploymentExperience,
  type InsertEmploymentExperience,
  type Project,
  type InsertProject,
  type Certification,
  type InsertCertification,
  type Skill,
  type InsertSkill,
  type Achievement,
  type InsertAchievement,
  type Education,
  type InsertEducation,
  type SocialLink,
  type InsertSocialLink,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, like, sql } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createLocalUser(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    isEmailVerified: boolean;
  }): Promise<User>;
  updateUserLastLogin(id: string): Promise<void>;
  savePasswordResetToken(id: string, token: string, expires: Date): Promise<void>;
  getUserByResetToken(token: string): Promise<User | undefined>;
  updateUserPassword(id: string, hashedPassword: string): Promise<void>;
  
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
  getContactMessagesInDateRange(startDate: Date, endDate: Date): Promise<ContactMessage[]>;
  markContactMessageAsRead(id: string): Promise<void>;

  // Professional data operations
  // Employment Experience
  getEmploymentExperience(): Promise<EmploymentExperience[]>;
  createEmploymentExperience(experience: InsertEmploymentExperience): Promise<EmploymentExperience>;
  updateEmploymentExperience(id: string, experience: Partial<InsertEmploymentExperience>): Promise<EmploymentExperience>;
  deleteEmploymentExperience(id: string): Promise<void>;

  // Projects
  getProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project>;
  deleteProject(id: string): Promise<void>;

  // Certifications
  getCertifications(): Promise<Certification[]>;
  getFeaturedCertifications(): Promise<Certification[]>;
  createCertification(certification: InsertCertification): Promise<Certification>;
  updateCertification(id: string, certification: Partial<InsertCertification>): Promise<Certification>;
  deleteCertification(id: string): Promise<void>;

  // Skills
  getSkills(): Promise<Skill[]>;
  getSkillsByCategory(): Promise<Record<string, Skill[]>>;
  getFeaturedSkills(): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  updateSkill(id: string, skill: Partial<InsertSkill>): Promise<Skill>;
  deleteSkill(id: string): Promise<void>;

  // Achievements
  getAchievements(): Promise<Achievement[]>;
  getFeaturedAchievements(): Promise<Achievement[]>;
  createAchievement(achievement: InsertAchievement): Promise<Achievement>;
  updateAchievement(id: string, achievement: Partial<InsertAchievement>): Promise<Achievement>;
  deleteAchievement(id: string): Promise<void>;

  // Education
  getEducation(): Promise<Education[]>;
  createEducation(education: InsertEducation): Promise<Education>;
  updateEducation(id: string, education: Partial<InsertEducation>): Promise<Education>;
  deleteEducation(id: string): Promise<void>;

  // Social Links
  getSocialLinks(): Promise<SocialLink[]>;
  getSocialLinksByCategory(): Promise<Record<string, SocialLink[]>>;
  getFeaturedSocialLinks(): Promise<SocialLink[]>;
  createSocialLink(socialLink: InsertSocialLink): Promise<SocialLink>;
  updateSocialLink(id: string, socialLink: Partial<InsertSocialLink>): Promise<SocialLink>;
  deleteSocialLink(id: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createLocalUser(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    isEmailVerified: boolean;
  }): Promise<User> {
    const [user] = await db.insert(users).values({
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      isEmailVerified: userData.isEmailVerified,
      isAdmin: false
    }).returning();
    return user;
  }

  async updateUserLastLogin(id: string): Promise<void> {
    await db.update(users)
      .set({ lastLoginAt: new Date() })
      .where(eq(users.id, id));
  }

  async savePasswordResetToken(id: string, token: string, expires: Date): Promise<void> {
    await db.update(users)
      .set({ 
        resetPasswordToken: token,
        resetPasswordExpires: expires
      })
      .where(eq(users.id, id));
  }

  async getUserByResetToken(token: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.resetPasswordToken, token));
    return user;
  }

  async updateUserPassword(id: string, hashedPassword: string): Promise<void> {
    await db.update(users)
      .set({ 
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null
      })
      .where(eq(users.id, id));
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

  async getContactMessagesInDateRange(startDate: Date, endDate: Date): Promise<ContactMessage[]> {
    return await db.select()
      .from(contactMessages)
      .where(and(
        sql`${contactMessages.createdAt} >= ${startDate}`,
        sql`${contactMessages.createdAt} <= ${endDate}`
      ))
      .orderBy(desc(contactMessages.createdAt));
  }

  async markContactMessageAsRead(id: string): Promise<void> {
    await db
      .update(contactMessages)
      .set({ isRead: true })
      .where(eq(contactMessages.id, id));
  }

  // Professional data implementations
  // Employment Experience
  async getEmploymentExperience(): Promise<EmploymentExperience[]> {
    return await db
      .select()
      .from(employmentExperience)
      .where(eq(employmentExperience.isVisible, true))
      .orderBy(desc(employmentExperience.startDate), desc(employmentExperience.sortOrder));
  }

  async createEmploymentExperience(experience: InsertEmploymentExperience): Promise<EmploymentExperience> {
    const [newExperience] = await db
      .insert(employmentExperience)
      .values(experience)
      .returning();
    return newExperience;
  }

  async updateEmploymentExperience(id: string, experience: Partial<InsertEmploymentExperience>): Promise<EmploymentExperience> {
    const [updatedExperience] = await db
      .update(employmentExperience)
      .set({ ...experience, updatedAt: new Date() })
      .where(eq(employmentExperience.id, id))
      .returning();
    return updatedExperience;
  }

  async deleteEmploymentExperience(id: string): Promise<void> {
    await db.delete(employmentExperience).where(eq(employmentExperience.id, id));
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    return await db
      .select()
      .from(projects)
      .where(eq(projects.isVisible, true))
      .orderBy(desc(projects.startDate), desc(projects.sortOrder));
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return await db
      .select()
      .from(projects)
      .where(and(eq(projects.isVisible, true), eq(projects.isFeatured, true)))
      .orderBy(desc(projects.startDate), desc(projects.sortOrder));
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db
      .insert(projects)
      .values(project)
      .returning();
    return newProject;
  }

  async updateProject(id: string, project: Partial<InsertProject>): Promise<Project> {
    const [updatedProject] = await db
      .update(projects)
      .set({ ...project, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();
    return updatedProject;
  }

  async deleteProject(id: string): Promise<void> {
    await db.delete(projects).where(eq(projects.id, id));
  }

  // Certifications
  async getCertifications(): Promise<Certification[]> {
    return await db
      .select()
      .from(certifications)
      .where(eq(certifications.isVisible, true))
      .orderBy(desc(certifications.issueDate), desc(certifications.sortOrder));
  }

  async getFeaturedCertifications(): Promise<Certification[]> {
    return await db
      .select()
      .from(certifications)
      .where(and(eq(certifications.isVisible, true), eq(certifications.isFeatured, true)))
      .orderBy(desc(certifications.issueDate), desc(certifications.sortOrder));
  }

  async createCertification(certification: InsertCertification): Promise<Certification> {
    const [newCertification] = await db
      .insert(certifications)
      .values(certification)
      .returning();
    return newCertification;
  }

  async updateCertification(id: string, certification: Partial<InsertCertification>): Promise<Certification> {
    const [updatedCertification] = await db
      .update(certifications)
      .set({ ...certification, updatedAt: new Date() })
      .where(eq(certifications.id, id))
      .returning();
    return updatedCertification;
  }

  async deleteCertification(id: string): Promise<void> {
    await db.delete(certifications).where(eq(certifications.id, id));
  }

  // Skills
  async getSkills(): Promise<Skill[]> {
    return await db
      .select()
      .from(skills)
      .where(eq(skills.isVisible, true))
      .orderBy(desc(skills.proficiencyLevel), skills.sortOrder);
  }

  async getSkillsByCategory(): Promise<Record<string, Skill[]>> {
    const allSkills = await this.getSkills();
    return allSkills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {} as Record<string, Skill[]>);
  }

  async getFeaturedSkills(): Promise<Skill[]> {
    return await db
      .select()
      .from(skills)
      .where(and(eq(skills.isVisible, true), eq(skills.isFeatured, true)))
      .orderBy(desc(skills.proficiencyLevel), skills.sortOrder);
  }

  async createSkill(skill: InsertSkill): Promise<Skill> {
    const [newSkill] = await db
      .insert(skills)
      .values(skill)
      .returning();
    return newSkill;
  }

  async updateSkill(id: string, skill: Partial<InsertSkill>): Promise<Skill> {
    const [updatedSkill] = await db
      .update(skills)
      .set({ ...skill, updatedAt: new Date() })
      .where(eq(skills.id, id))
      .returning();
    return updatedSkill;
  }

  async deleteSkill(id: string): Promise<void> {
    await db.delete(skills).where(eq(skills.id, id));
  }

  // Achievements
  async getAchievements(): Promise<Achievement[]> {
    return await db
      .select()
      .from(achievements)
      .where(eq(achievements.isVisible, true))
      .orderBy(desc(achievements.year), achievements.sortOrder);
  }

  async getFeaturedAchievements(): Promise<Achievement[]> {
    return await db
      .select()
      .from(achievements)
      .where(and(eq(achievements.isVisible, true), eq(achievements.isFeatured, true)))
      .orderBy(desc(achievements.year), achievements.sortOrder);
  }

  async createAchievement(achievement: InsertAchievement): Promise<Achievement> {
    const [newAchievement] = await db
      .insert(achievements)
      .values(achievement)
      .returning();
    return newAchievement;
  }

  async updateAchievement(id: string, achievement: Partial<InsertAchievement>): Promise<Achievement> {
    const [updatedAchievement] = await db
      .update(achievements)
      .set({ ...achievement, updatedAt: new Date() })
      .where(eq(achievements.id, id))
      .returning();
    return updatedAchievement;
  }

  async deleteAchievement(id: string): Promise<void> {
    await db.delete(achievements).where(eq(achievements.id, id));
  }

  // Education
  async getEducation(): Promise<Education[]> {
    return await db
      .select()
      .from(education)
      .where(eq(education.isVisible, true))
      .orderBy(desc(education.endDate), education.sortOrder);
  }

  async createEducation(educationData: InsertEducation): Promise<Education> {
    const [newEducation] = await db
      .insert(education)
      .values(educationData)
      .returning();
    return newEducation;
  }

  async updateEducation(id: string, educationData: Partial<InsertEducation>): Promise<Education> {
    const [updatedEducation] = await db
      .update(education)
      .set({ ...educationData, updatedAt: new Date() })
      .where(eq(education.id, id))
      .returning();
    return updatedEducation;
  }

  async deleteEducation(id: string): Promise<void> {
    await db.delete(education).where(eq(education.id, id));
  }

  // Social Links
  async getSocialLinks(): Promise<SocialLink[]> {
    return await db
      .select()
      .from(socialLinks)
      .where(eq(socialLinks.isVisible, true))
      .orderBy(socialLinks.category, socialLinks.sortOrder);
  }

  async getSocialLinksByCategory(): Promise<Record<string, SocialLink[]>> {
    const allLinks = await this.getSocialLinks();
    return allLinks.reduce((acc, link) => {
      if (!acc[link.category]) {
        acc[link.category] = [];
      }
      acc[link.category].push(link);
      return acc;
    }, {} as Record<string, SocialLink[]>);
  }

  async getFeaturedSocialLinks(): Promise<SocialLink[]> {
    return await db
      .select()
      .from(socialLinks)
      .where(and(eq(socialLinks.isVisible, true), eq(socialLinks.isFeatured, true)))
      .orderBy(socialLinks.category, socialLinks.sortOrder);
  }

  async createSocialLink(socialLinkData: InsertSocialLink): Promise<SocialLink> {
    const [newSocialLink] = await db
      .insert(socialLinks)
      .values(socialLinkData)
      .returning();
    return newSocialLink;
  }

  async updateSocialLink(id: string, socialLinkData: Partial<InsertSocialLink>): Promise<SocialLink> {
    const [updatedSocialLink] = await db
      .update(socialLinks)
      .set({ ...socialLinkData, updatedAt: new Date() })
      .where(eq(socialLinks.id, id))
      .returning();
    return updatedSocialLink;
  }

  async deleteSocialLink(id: string): Promise<void> {
    await db.delete(socialLinks).where(eq(socialLinks.id, id));
  }
}

export const storage = new DatabaseStorage();
