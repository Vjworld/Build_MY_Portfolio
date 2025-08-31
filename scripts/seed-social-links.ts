import { db } from "../server/db";
import { socialLinks } from "../shared/schema";

const socialLinksData = [
  // Professional Links
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/vaibhav-selukar",
    username: "vaibhav-selukar",
    displayName: "Vaibhav Selukar",
    category: "Professional",
    description: "Connect with me on LinkedIn for professional networking and career updates",
    icon: "linkedin",
    isVisible: true,
    isFeatured: true,
    sortOrder: 1,
  },
  {
    platform: "Credly",
    url: "https://www.credly.com/users/vaibhav-selukar",
    username: "vaibhav-selukar",
    displayName: "Vaibhav Selukar - Credly",
    category: "Professional",
    description: "View my professional certifications and digital badges",
    icon: "award",
    isVisible: true,
    isFeatured: true,
    sortOrder: 2,
  },
  {
    platform: "Medium",
    url: "https://medium.com/p/a1c739a654fa",
    username: "vaibhav-selukar",
    displayName: "Vaibhav Selukar on Medium",
    category: "Professional",
    description: "Read my thought leadership articles and industry insights",
    icon: "pen-tool",
    isVisible: true,
    isFeatured: true,
    sortOrder: 3,
  },

  // Social Media Links
  {
    platform: "YouTube",
    url: "https://youtube.com/shorts/aZFCWtmKb0Q",
    username: "vaibhav-selukar",
    displayName: "Vaibhav Selukar Video Introduction",
    category: "Social",
    description: "Watch my video introduction and get to know me better",
    icon: "youtube",
    isVisible: true,
    isFeatured: true,
    sortOrder: 1,
  },
  {
    platform: "Facebook",
    url: "https://www.facebook.com/vaibhav.selukar",
    username: "vaibhav.selukar",
    displayName: "Vaibhav Selukar",
    category: "Social",
    description: "Connect with me on Facebook for personal updates and community",
    icon: "facebook",
    isVisible: true,
    isFeatured: false,
    sortOrder: 2,
  },
  {
    platform: "Instagram",
    url: "https://www.instagram.com/vjvaibhu?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    username: "vjvaibhu",
    displayName: "VJ Vaibhu",
    category: "Social",
    description: "Follow my Instagram for lifestyle and professional moments",
    icon: "instagram",
    isVisible: true,
    isFeatured: true,
    sortOrder: 3,
  },
  {
    platform: "Twitter",
    url: "https://x.com/SelukaV",
    username: "SelukaV",
    displayName: "Vaibhav Selukar (@SelukaV)",
    category: "Social",
    description: "Follow me on X (Twitter) for industry updates and thoughts",
    icon: "twitter",
    isVisible: true,
    isFeatured: false,
    sortOrder: 4,
  },
  {
    platform: "Pinterest",
    url: "https://www.pinterest.com/vselukar",
    username: "vselukar",
    displayName: "Vaibhav Selukar",
    category: "Social",
    description: "Explore my Pinterest boards for creative inspiration",
    icon: "pinterest",
    isVisible: true,
    isFeatured: false,
    sortOrder: 5,
  },

  // Communication Tools
  {
    platform: "Skype",
    url: "skype:vaibhav.selukar?chat",
    username: "vaibhav.selukar",
    displayName: "Vaibhav Selukar",
    category: "Communication",
    description: "Connect with me on Skype for professional consultations",
    icon: "phone",
    isVisible: true,
    isFeatured: false,
    sortOrder: 1,
  },

  // AI Tools & Creations
  {
    platform: "InterviewPro Buddy",
    url: "https://aistudio.instagram.com/ai/4265674450327484?utm_source=ai_agent",
    username: "interviewpro-buddy",
    displayName: "InterviewPro Buddy on Instagram",
    category: "AI Tools",
    description: "Try my AI-powered interview preparation assistant on Instagram",
    icon: "bot",
    isVisible: true,
    isFeatured: true,
    sortOrder: 1,
  },

  // Websites & Products
  {
    platform: "Ruvab IT",
    url: "https://ruvab.it.com",
    username: "ruvab-it",
    displayName: "Ruvab IT - Main Website",
    category: "Websites",
    description: "Visit our main technology solutions website",
    icon: "globe",
    isVisible: true,
    isFeatured: true,
    sortOrder: 1,
  },
  {
    platform: "TrendSolver",
    url: "https://trendsolver.ruvab.it.com",
    username: "trendsolver",
    displayName: "TrendSolver - Analytics Platform",
    category: "Websites",
    description: "Explore our trend analysis and business intelligence platform",
    icon: "trending-up",
    isVisible: true,
    isFeatured: true,
    sortOrder: 2,
  },
  {
    platform: "LangScribe",
    url: "https://langscribe.ruvab.it.com",
    username: "langscribe",
    displayName: "LangScribe - Language Learning",
    category: "Websites",
    description: "Try our AI-powered language learning and translation tool",
    icon: "languages",
    isVisible: true,
    isFeatured: true,
    sortOrder: 3,
  },
  {
    platform: "FypPal",
    url: "https://fyppal.ruvab.it.com",
    username: "fyppal",
    displayName: "FypPal - Academic Assistant",
    category: "Websites",
    description: "Academic project management and final year project assistant",
    icon: "graduation-cap",
    isVisible: true,
    isFeatured: true,
    sortOrder: 4,
  },
  {
    platform: "QR Generator",
    url: "https://qr-gen.ruvab.it.com",
    username: "qr-gen",
    displayName: "QR Gen - QR Code Generator",
    category: "Websites",
    description: "Generate custom QR codes for various business needs",
    icon: "qr-code",
    isVisible: true,
    isFeatured: false,
    sortOrder: 5,
  },
];

async function seedSocialLinks() {
  console.log("🌱 Seeding social links data...");

  try {
    console.log("📱 Inserting social links...");
    
    for (const linkData of socialLinksData) {
      await db.insert(socialLinks).values(linkData);
      console.log(`✓ Added ${linkData.platform} - ${linkData.displayName}`);
    }

    console.log("✅ Social links seeding completed successfully!");
    console.log(`📊 Total social links added: ${socialLinksData.length}`);
    
    // Summary by category
    const categories = socialLinksData.reduce((acc, link) => {
      acc[link.category] = (acc[link.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    console.log("📈 Links by category:");
    Object.entries(categories).forEach(([category, count]) => {
      console.log(`  ${category}: ${count} links`);
    });

  } catch (error) {
    console.error("❌ Error seeding social links:", error);
    throw error;
  }
}

// Run the seed function
seedSocialLinks()
  .then(() => {
    console.log("🎉 Social links seeding process completed!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Social links seeding failed:", error);
    process.exit(1);
  });

export { seedSocialLinks };