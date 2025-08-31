import { storage } from "../server/storage";

// Professional data extracted from Vaibhav's documents
const professionalData = {
  // Employment Experience from documents
  employmentExperience: [
    {
      company: "RightZero",
      position: "Founder / Director / Senior Consultant - Project Management Office",
      location: "Nagpur",
      startDate: "2024-01-01",
      endDate: "2024-07-31",
      isCurrent: false,
      description: "Founded and led a project management consultancy, collaborating with cross-functional teams and developing SaaS solutions.",
      achievements: [
        "Collaborated with cross-functional teams (consulting, architecture, sales, customer success)",
        "Developed and implemented consistent SaaS project processes and procedures",
        "Conducted regular project progress reviews with clients and management",
        "Established robust talent pool focused on employee engagement"
      ],
      technologies: ["Agile", "Scrum", "SaaS", "Project Management", "Stakeholder Management"],
      responsibilities: [
        "SaaS Project Collaboration & Delivery",
        "Process Development & Implementation", 
        "Project Monitoring, Reporting, & Stakeholder Management",
        "Leadership & Talent Development"
      ],
      domain: "SaaS & Consulting",
      sortOrder: 1,
      isVisible: true
    },
    {
      company: "Pragmatyc (Formerly Maximess)",
      position: "Senior Consultant - Project Management Office",
      location: "Nagpur",
      startDate: "2021-09-01",
      endDate: "2023-12-31",
      isCurrent: false,
      description: "Led PMO activities for IT projects across BFSI, SaaS, and tech domains with focus on Agile delivery and process improvements.",
      achievements: [
        "Awarded 'Super Squad 2021' for exceptional project delivery and teamwork",
        "Improved project delivery time by 25% through process improvements",
        "Successfully collaborated with teams (70-90 members)",
        "Implemented process automation and introduced new tools"
      ],
      technologies: ["Jira", "Confluence", "Asana", "Trello", "Microsoft Project", "Zoho Projects", "Figma", "Balsamiq"],
      responsibilities: [
        "Collaborated with CXOs, Account Managers, PMO Managers, Project Managers",
        "Tracked project progress, identified risks and gaps",
        "Delivered high-quality reports to senior management and clients",
        "Implemented process automation and drove tool adoption"
      ],
      domain: "BFSI & SaaS",
      sortOrder: 2,
      isVisible: true
    },
    {
      company: "SimpleCRM / SimpleWorks Solutions",
      position: "Senior Business Analyst – Implementation SPOC",
      location: "Nagpur",
      startDate: "2020-12-01",
      endDate: "2021-09-30",
      isCurrent: false,
      description: "Served as SPOC for PaaS project delivery with expertise in Agile methodology and customer engagement.",
      achievements: [
        "Contributed to multiple PaaS project demos and implementations",
        "Established comprehensive documentation framework",
        "Facilitated user adoption through engaging videos and virtual events",
        "Refined Agile techniques for efficient delivery cycles"
      ],
      technologies: ["PaaS", "CRM", "Agile", "Scrum", "Documentation Tools"],
      responsibilities: [
        "PaaS project demos, implementations, and post-go-live support",
        "Agile methodology implementation and team guidance",
        "Customer engagement and requirements gathering",
        "Proposal and solution development"
      ],
      domain: "PaaS & CRM",
      sortOrder: 3,
      isVisible: true
    },
    {
      company: "Maximess (Now Pragmatyc)",
      position: "Associate Business Analyst / Associate Project Management Office",
      location: "Nagpur",
      startDate: "2018-08-01",
      endDate: "2020-12-31",
      isCurrent: false,
      description: "Delivered SaaS and banking projects using Agile Scrum framework with focus on documentation and team leadership.",
      achievements: [
        "Received 'Emerging Face of the year 2020' Award for outstanding SaaS project delivery",
        "Successfully delivered wireframes, prototypes, and process documentation",
        "Led AI/ML internship program for engineering colleges",
        "Coordinated formal and cultural events"
      ],
      technologies: ["Jira", "Confluence", "Zoho Projects", "Agile", "Scrum", "Wireframing"],
      responsibilities: [
        "Banking project management using Agile Scrum",
        "Sprint/Product Backlog management in Jira",
        "Documentation creation and maintenance",
        "AI/ML internship program leadership"
      ],
      domain: "Banking & SaaS",
      sortOrder: 4,
      isVisible: true
    },
    {
      company: "Walbro Software Pvt. Ltd.",
      position: "Business Analyst",
      location: "Nagpur",
      startDate: "2017-10-01",
      endDate: "2018-03-31",
      isCurrent: false,
      description: "Assisted in development of cloud-based task management tool and e-commerce platform with focus on content creation and prototyping.",
      achievements: [
        "Developed PlanMyWork - Cloud-Based Task Management Tool",
        "Created DoodlyDeals - E-commerce Platform for Daily Deals",
        "Content creation and prototyping",
        "User documentation development"
      ],
      technologies: ["Cloud Technologies", "Task Management", "E-commerce", "Prototyping"],
      responsibilities: [
        "Cloud-based application development assistance",
        "Content creation and prototyping",
        "User documentation",
        "E-commerce platform features"
      ],
      domain: "Cloud & E-commerce",
      sortOrder: 5,
      isVisible: true
    },
    {
      company: "Principal Financial Group",
      position: "Senior Process Associate / Training Specialist",
      location: "Pune",
      startDate: "2006-12-01",
      endDate: "2015-12-31",
      isCurrent: false,
      description: "Managed client relationships, team administration, and special projects in financial services domain.",
      achievements: [
        "9 years of consistent performance in financial services",
        "Client relationship management excellence",
        "Team administration and training delivery",
        "Special projects and initiatives leadership"
      ],
      technologies: ["Financial Systems", "Training Tools", "Process Management"],
      responsibilities: [
        "Client relationship management",
        "Team administration",
        "Training and development",
        "Special projects and initiatives"
      ],
      domain: "Financial Services",
      sortOrder: 6,
      isVisible: true
    },
    {
      company: "IBM Daksh Bharti Airtel",
      position: "Floor Support / Customer Care Executive",
      location: "Pune",
      startDate: "2005-10-01",
      endDate: "2006-11-30",
      isCurrent: false,
      description: "Provided floor support for new joiners and handled customer service escalations for Bharti Airtel.",
      achievements: [
        "Floor support for onboarding new joiners",
        "Handled escalations effectively",
        "Provided customer service plan details",
        "Resolved queries on new plan offers"
      ],
      technologies: ["Customer Service Systems", "Telecom Platforms"],
      responsibilities: [
        "Floor support and onboarding",
        "Escalation handling",
        "Customer service delivery",
        "Plan and offer consultation"
      ],
      domain: "Telecommunications",
      sortOrder: 7,
      isVisible: true
    }
  ],

  // Certifications from documents
  certifications: [
    {
      name: "Professional Scrum Master (PSM I)",
      provider: "Scrum.org",
      issueDate: "2024-09-01",
      description: "Certified Professional Scrum Master demonstrating understanding of Scrum framework, accountability, and servant leadership.",
      skills: ["Scrum", "Agile", "Team Leadership", "Servant Leadership"],
      isVisible: true,
      isFeatured: true,
      sortOrder: 1
    },
    {
      name: "DevOps Pro – From basics to advanced topics",
      provider: "EdYoda for Business",
      issueDate: "2024-08-01",
      description: "Comprehensive DevOps training covering CI/CD, automation, and deployment practices.",
      skills: ["DevOps", "CI/CD", "Automation", "Deployment"],
      isVisible: true,
      isFeatured: false,
      sortOrder: 2
    },
    {
      name: "Deluge on a Luge - Learn Zoho Programming",
      provider: "Jeremy Nagel, Mario Cabrera on Udemy",
      issueDate: "2024-08-01",
      description: "Advanced Zoho programming and automation techniques.",
      skills: ["Zoho", "Programming", "Automation"],
      isVisible: true,
      isFeatured: false,
      sortOrder: 3
    },
    {
      name: "Zoho Creator: Learn How to Build Applications step-by-step",
      provider: "Zenith Business School on Udemy",
      issueDate: "2024-08-01",
      description: "Application development using Zoho Creator platform.",
      skills: ["Zoho Creator", "Application Development", "Low-Code"],
      isVisible: true,
      isFeatured: false,
      sortOrder: 4
    },
    {
      name: "Project Management Professional Certification",
      provider: "Institute of Management, Technology & Finance",
      issueDate: "2023-08-01",
      description: "Comprehensive project management certification covering PMBOK methodologies.",
      skills: ["Project Management", "PMBOK", "Leadership", "Risk Management"],
      isVisible: true,
      isFeatured: true,
      sortOrder: 5
    },
    {
      name: "SWAYAM Certified New Product Development",
      provider: "Indian Institute of Management Bangalore (IIM Bangalore)",
      issueDate: "2023-07-01",
      description: "New product development strategies and innovation management.",
      skills: ["Product Development", "Innovation", "Strategy"],
      isVisible: true,
      isFeatured: true,
      sortOrder: 6
    },
    {
      name: "Project Management Skills for Leaders",
      provider: "Project Management Institute",
      issueDate: "2023-06-01",
      description: "Leadership skills specific to project management contexts.",
      skills: ["Leadership", "Project Management", "Team Management"],
      isVisible: true,
      isFeatured: false,
      sortOrder: 7
    },
    {
      name: "Advanced Lean Six Sigma Yellow Belt Certification",
      provider: "Sparen and Gewinn Consulting",
      issueDate: "2023-02-01",
      description: "Process improvement methodology and quality management.",
      skills: ["Lean Six Sigma", "Process Improvement", "Quality Management"],
      isVisible: true,
      isFeatured: false,
      sortOrder: 8
    }
  ],

  // Skills from documents
  skills: [
    // Project Management & PMO
    { name: "Agile", category: "Project Management", proficiencyLevel: 5, yearsOfExperience: 6, isVisible: true, isFeatured: true, sortOrder: 1 },
    { name: "Scrum", category: "Project Management", proficiencyLevel: 5, yearsOfExperience: 6, isVisible: true, isFeatured: true, sortOrder: 2 },
    { name: "Kanban", category: "Project Management", proficiencyLevel: 4, yearsOfExperience: 5, isVisible: true, isFeatured: true, sortOrder: 3 },
    { name: "PMO", category: "Project Management", proficiencyLevel: 5, yearsOfExperience: 6, isVisible: true, isFeatured: true, sortOrder: 4 },
    { name: "Lean Six Sigma", category: "Project Management", proficiencyLevel: 3, yearsOfExperience: 2, isVisible: true, isFeatured: false, sortOrder: 5 },

    // PM/PMO Tools
    { name: "Jira", category: "Tools", proficiencyLevel: 5, yearsOfExperience: 6, isVisible: true, isFeatured: true, sortOrder: 1 },
    { name: "Confluence", category: "Tools", proficiencyLevel: 5, yearsOfExperience: 6, isVisible: true, isFeatured: true, sortOrder: 2 },
    { name: "Zoho Projects", category: "Tools", proficiencyLevel: 5, yearsOfExperience: 4, isVisible: true, isFeatured: true, sortOrder: 3 },
    { name: "Asana", category: "Tools", proficiencyLevel: 4, yearsOfExperience: 3, isVisible: true, isFeatured: false, sortOrder: 4 },
    { name: "Trello", category: "Tools", proficiencyLevel: 4, yearsOfExperience: 4, isVisible: true, isFeatured: false, sortOrder: 5 },
    { name: "Microsoft Project", category: "Tools", proficiencyLevel: 4, yearsOfExperience: 3, isVisible: true, isFeatured: false, sortOrder: 6 },

    // Communication & Collaboration
    { name: "Microsoft Teams", category: "Communication", proficiencyLevel: 5, yearsOfExperience: 5, isVisible: true, isFeatured: true, sortOrder: 1 },
    { name: "Zoom", category: "Communication", proficiencyLevel: 5, yearsOfExperience: 4, isVisible: true, isFeatured: true, sortOrder: 2 },
    { name: "Google Workspace", category: "Communication", proficiencyLevel: 5, yearsOfExperience: 6, isVisible: true, isFeatured: true, sortOrder: 3 },

    // Microsoft Office
    { name: "Microsoft Excel", category: "Productivity", proficiencyLevel: 5, yearsOfExperience: 15, isVisible: true, isFeatured: true, sortOrder: 1 },
    { name: "Microsoft Word", category: "Productivity", proficiencyLevel: 5, yearsOfExperience: 15, isVisible: true, isFeatured: false, sortOrder: 2 },
    { name: "Microsoft PowerPoint", category: "Productivity", proficiencyLevel: 5, yearsOfExperience: 15, isVisible: true, isFeatured: false, sortOrder: 3 },

    // Design & Prototyping
    { name: "Figma", category: "Design", proficiencyLevel: 4, yearsOfExperience: 3, isVisible: true, isFeatured: true, sortOrder: 1 },
    { name: "Balsamiq", category: "Design", proficiencyLevel: 4, yearsOfExperience: 3, isVisible: true, isFeatured: false, sortOrder: 2 },
    { name: "Microsoft Visio", category: "Design", proficiencyLevel: 4, yearsOfExperience: 4, isVisible: true, isFeatured: false, sortOrder: 3 },
    { name: "Lucidchart", category: "Design", proficiencyLevel: 4, yearsOfExperience: 3, isVisible: true, isFeatured: false, sortOrder: 4 },

    // Technical Skills
    { name: "DevOps Basics", category: "Technical", proficiencyLevel: 3, yearsOfExperience: 1, isVisible: true, isFeatured: false, sortOrder: 1 },
    { name: "CI/CD", category: "Technical", proficiencyLevel: 3, yearsOfExperience: 1, isVisible: true, isFeatured: false, sortOrder: 2 },
    { name: "SQL Basics", category: "Technical", proficiencyLevel: 3, yearsOfExperience: 2, isVisible: true, isFeatured: false, sortOrder: 3 },

    // Soft Skills
    { name: "Leadership", category: "Soft Skills", proficiencyLevel: 5, yearsOfExperience: 8, isVisible: true, isFeatured: true, sortOrder: 1 },
    { name: "Team Management", category: "Soft Skills", proficiencyLevel: 5, yearsOfExperience: 8, isVisible: true, isFeatured: true, sortOrder: 2 },
    { name: "Stakeholder Management", category: "Soft Skills", proficiencyLevel: 5, yearsOfExperience: 6, isVisible: true, isFeatured: true, sortOrder: 3 },
    { name: "Problem Solving", category: "Soft Skills", proficiencyLevel: 5, yearsOfExperience: 10, isVisible: true, isFeatured: true, sortOrder: 4 },
    { name: "Communication", category: "Soft Skills", proficiencyLevel: 5, yearsOfExperience: 15, isVisible: true, isFeatured: true, sortOrder: 5 }
  ],

  // Major Projects from documents
  projects: [
    {
      title: "Banking & Treasury Platform",
      description: "Comprehensive BFSI platform for bonds, securities, and auctions with compliance focus.",
      company: "Maximess",
      client: "Banking Client",
      domain: "BFSI",
      technologies: ["Agile", "Scrum", "Banking Systems", "Compliance"],
      methodology: "Agile Scrum",
      teamSize: "15-20 members",
      duration: "4 months",
      role: "Business Analyst / Scrum Master",
      achievements: [
        "Delivered compliance-focused platform on time",
        "Managed sprint execution effectively",
        "Created comprehensive BRDs and use cases",
        "Facilitated successful UAT sessions"
      ],
      challenges: [
        "Complex regulatory requirements",
        "Multi-stakeholder coordination",
        "Tight compliance deadlines"
      ],
      outcomes: [
        "Successfully delivered within timeline",
        "Received client appreciation",
        "Zero compliance issues post-deployment"
      ],
      startDate: "2020-03-01",
      endDate: "2020-07-31",
      isVisible: true,
      isFeatured: true,
      sortOrder: 1
    },
    {
      title: "PlanMyWork - Cloud Task Management",
      description: "Cloud-based task management tool for project planning and team collaboration.",
      company: "Walbro Software",
      domain: "Productivity",
      technologies: ["Cloud Computing", "Task Management", "Web Development"],
      methodology: "Waterfall",
      teamSize: "5-8 members",
      duration: "6 months",
      role: "Business Analyst",
      achievements: [
        "Designed user-friendly interface",
        "Implemented cloud-based architecture",
        "Created comprehensive user documentation",
        "Delivered feature-rich task management solution"
      ],
      challenges: [
        "Cloud integration complexity",
        "User experience optimization",
        "Performance requirements"
      ],
      outcomes: [
        "Successful product launch",
        "Positive user feedback",
        "Scalable cloud solution"
      ],
      startDate: "2017-10-01",
      endDate: "2018-03-31",
      isVisible: true,
      isFeatured: true,
      sortOrder: 2
    },
    {
      title: "DoodlyDeals - E-commerce Platform",
      description: "E-commerce platform for daily deals with integrated payment systems.",
      company: "Walbro Software",
      domain: "E-commerce",
      technologies: ["E-commerce", "Payment Integration", "Web Development"],
      methodology: "Iterative",
      teamSize: "6-10 members",
      duration: "4 months",
      role: "Business Analyst",
      achievements: [
        "Integrated multiple payment gateways",
        "Designed deal management system",
        "Implemented user engagement features",
        "Created admin dashboard for deal management"
      ],
      challenges: [
        "Payment gateway integration",
        "Real-time deal management",
        "User engagement optimization"
      ],
      outcomes: [
        "Successful platform deployment",
        "Integrated payment processing",
        "User-friendly deal interface"
      ],
      startDate: "2017-11-01",
      endDate: "2018-02-28",
      isVisible: true,
      isFeatured: false,
      sortOrder: 3
    }
  ],

  // Achievements from documents
  achievements: [
    {
      title: "Open House Spotlight Q3-2022",
      description: "Recognition for outstanding contributions to driving organizational excellence and process improvements, resulting in 15% increase in delivery efficiency.",
      organization: "Pragmatyc",
      year: 2022,
      category: "Award",
      impact: "Improved delivery efficiency by 15% through process enhancements",
      isVisible: true,
      isFeatured: true,
      sortOrder: 1
    },
    {
      title: "Super Squad 2021",
      description: "Recognized for exceptional project delivery and teamwork, demonstrating strong change management and stakeholder engagement.",
      organization: "Pragmatyc",
      year: 2021,
      category: "Award",
      impact: "Led high-impact projects with exceptional team collaboration",
      isVisible: true,
      isFeatured: true,
      sortOrder: 2
    },
    {
      title: "Emerging Face of the Year 2020",
      description: "Outstanding performance in SaaS project delivery, recognized for delivering projects within scope, budget, and timeline.",
      organization: "Maximess",
      year: 2020,
      category: "Award",
      impact: "Delivered high-quality SaaS projects consistently",
      isVisible: true,
      isFeatured: true,
      sortOrder: 3
    },
    {
      title: "25% Improvement in Project Delivery Time",
      description: "Achieved significant improvement in project delivery time through process improvements and automation.",
      organization: "Pragmatyc",
      year: 2022,
      category: "Achievement",
      impact: "Enhanced organizational efficiency and client satisfaction",
      isVisible: true,
      isFeatured: true,
      sortOrder: 4
    },
    {
      title: "Team Leadership (70-90 members)",
      description: "Successfully collaborated with and led large cross-functional teams, ensuring project delivery to industry standards.",
      organization: "Multiple Organizations",
      year: 2023,
      category: "Leadership",
      impact: "Demonstrated scalable leadership capabilities",
      isVisible: true,
      isFeatured: false,
      sortOrder: 5
    }
  ],

  // Education from documents
  education: [
    {
      institution: "Yeshwantrao Chavan College of Engineering",
      degree: "Bachelor of Engineering",
      field: "Electrical Engineering",
      location: "Nagpur, Maharashtra",
      startDate: "2000-08-01",
      endDate: "2005-05-31",
      description: "Comprehensive engineering education with focus on electrical systems and technology.",
      achievements: [
        "Completed 4-year engineering program",
        "Gained technical foundation for IT career transition",
        "Developed analytical and problem-solving skills"
      ],
      isVisible: true,
      sortOrder: 1
    }
  ]
};

async function seedProfessionalData() {
  try {
    console.log("Starting professional data seeding...");

    // Seed Employment Experience
    console.log("Seeding employment experience...");
    for (const experience of professionalData.employmentExperience) {
      await storage.createEmploymentExperience(experience);
    }

    // Seed Certifications
    console.log("Seeding certifications...");
    for (const certification of professionalData.certifications) {
      await storage.createCertification(certification);
    }

    // Seed Skills
    console.log("Seeding skills...");
    for (const skill of professionalData.skills) {
      await storage.createSkill(skill);
    }

    // Seed Projects
    console.log("Seeding projects...");
    for (const project of professionalData.projects) {
      await storage.createProject(project);
    }

    // Seed Achievements
    console.log("Seeding achievements...");
    for (const achievement of professionalData.achievements) {
      await storage.createAchievement(achievement);
    }

    // Seed Education
    console.log("Seeding education...");
    for (const edu of professionalData.education) {
      await storage.createEducation(edu);
    }

    console.log("Professional data seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding professional data:", error);
  }
}

// Run the seeding function
seedProfessionalData();