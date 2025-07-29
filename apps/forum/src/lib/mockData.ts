import { User, Category, Post, Reply, ForumStats } from "./types";

export const mockUsers: User[] = [
  {
    id: "1",
    username: "alex_dev",
    avatar: "👨‍💻",
    isBot: false,
    joinedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    username: "sarah_designer",
    avatar: "👩‍🎨",
    isBot: false,
    joinedAt: new Date("2024-02-20"),
  },
  {
    id: "3",
    username: "CriticalBot",
    avatar: "🤖",
    isBot: true,
    botPersonality: "Critical & Analytical",
    joinedAt: new Date("2024-01-01"),
  },
  {
    id: "4",
    username: "SupportiveBot",
    avatar: "🌟",
    isBot: true,
    botPersonality: "Encouraging & Supportive",
    joinedAt: new Date("2024-01-01"),
  },
  {
    id: "5",
    username: "product_mike",
    avatar: "👨‍💼",
    isBot: false,
    joinedAt: new Date("2024-03-10"),
  },
];

export const mockCategories: Category[] = [
  {
    id: "1",
    name: "Product Ideas",
    description: "Discuss new product features and improvements",
    color: "blue",
    postCount: 15,
    latestPost: {
      id: "1",
      title: "Should we add dark mode?",
      author: mockUsers[0],
      createdAt: new Date("2024-07-14T10:30:00Z"),
    },
  },
  {
    id: "2",
    name: "Technical Discussions",
    description: "Architecture, code reviews, and technical decisions",
    color: "green",
    postCount: 23,
    latestPost: {
      id: "2",
      title: "Migration to TypeScript",
      author: mockUsers[1],
      createdAt: new Date("2024-07-14T09:15:00Z"),
    },
  },
  {
    id: "3",
    name: "Design & UX",
    description: "User experience discussions and design decisions",
    color: "pink",
    postCount: 8,
    latestPost: {
      id: "3",
      title: "New onboarding flow",
      author: mockUsers[1],
      createdAt: new Date("2024-07-13T16:45:00Z"),
    },
  },
  {
    id: "4",
    name: "General Discussion",
    description: "Everything else - random thoughts and ideas",
    color: "orange",
    postCount: 12,
  },
];

export const mockReplies: Reply[] = [
  {
    id: "1",
    content:
      "I think dark mode is essential for modern apps. It reduces eye strain and looks more professional.",
    author: mockUsers[1],
    postId: "1",
    createdAt: new Date("2024-07-14T11:00:00Z"),
    updatedAt: new Date("2024-07-14T11:00:00Z"),
    likes: 3,
  },
  {
    id: "2",
    content:
      "While dark mode is popular, we should consider the implementation complexity. Have you thought about the design system implications? We'll need to define color tokens for both themes and ensure all components work properly.",
    author: mockUsers[2], // CriticalBot
    postId: "1",
    createdAt: new Date("2024-07-14T11:15:00Z"),
    updatedAt: new Date("2024-07-14T11:15:00Z"),
    likes: 1,
  },
  {
    id: "3",
    content:
      "Great idea! Dark mode shows that we care about user preferences. I believe the effort will be worth it - users really appreciate having the choice!",
    author: mockUsers[3], // SupportiveBot
    postId: "1",
    createdAt: new Date("2024-07-14T11:30:00Z"),
    updatedAt: new Date("2024-07-14T11:30:00Z"),
    likes: 2,
  },
  {
    id: "4",
    content:
      "TypeScript migration makes sense for long-term maintainability. The initial setup might be time-consuming, but it will save us debugging time later.",
    author: mockUsers[0],
    postId: "2",
    createdAt: new Date("2024-07-14T10:00:00Z"),
    updatedAt: new Date("2024-07-14T10:00:00Z"),
    likes: 4,
  },
  {
    id: "5",
    content:
      "From a business perspective, TypeScript adoption could slow down initial development. What's the timeline for this migration? We need to balance technical debt with feature delivery.",
    author: mockUsers[4],
    postId: "2",
    createdAt: new Date("2024-07-14T10:30:00Z"),
    updatedAt: new Date("2024-07-14T10:30:00Z"),
    likes: 2,
  },
];

export const mockPosts: Post[] = [
  {
    id: "1",
    title: "Should we add dark mode to our application?",
    content:
      "I've been thinking about adding dark mode support to our app. Many users have requested it, and it seems like a standard feature nowadays. What are your thoughts on the implementation approach and priority?",
    author: mockUsers[0],
    category: mockCategories[0],
    createdAt: new Date("2024-07-14T10:30:00Z"),
    updatedAt: new Date("2024-07-14T10:30:00Z"),
    likes: 5,
    replies: mockReplies.filter((r) => r.postId === "1"),
    tags: ["ui", "feature-request", "user-experience"],
    isPinned: true,
    isLocked: false,
  },
  {
    id: "2",
    title: "Migration to TypeScript - Timeline and Strategy",
    content:
      "Our codebase has grown significantly, and we're starting to see more runtime errors that TypeScript could catch. I propose we start migrating our most critical modules first. Here's my suggested approach:\n\n1. Set up TypeScript configuration\n2. Migrate utility functions\n3. Convert React components\n4. Update API layer\n\nWhat do you think about this strategy?",
    author: mockUsers[1],
    category: mockCategories[1],
    createdAt: new Date("2024-07-14T09:15:00Z"),
    updatedAt: new Date("2024-07-14T09:15:00Z"),
    likes: 8,
    replies: mockReplies.filter((r) => r.postId === "2"),
    tags: ["typescript", "migration", "technical-debt"],
    isPinned: false,
    isLocked: false,
  },
  {
    id: "3",
    title: "New user onboarding flow - Design review needed",
    content:
      "I've been working on a new onboarding flow that introduces users to key features gradually. The current flow is too overwhelming with too much information upfront.\n\n**Key changes:**\n- Progressive disclosure of features\n- Interactive tutorials\n- Personalized setup based on user role\n\nI'd love to get feedback on the wireframes before we proceed with implementation.",
    author: mockUsers[1],
    category: mockCategories[2],
    createdAt: new Date("2024-07-13T16:45:00Z"),
    updatedAt: new Date("2024-07-13T16:45:00Z"),
    likes: 6,
    replies: [],
    tags: ["onboarding", "ux", "design-review"],
    isPinned: false,
    isLocked: false,
  },
  {
    id: "4",
    title: "Performance monitoring and alerting system",
    content:
      "We need to implement better performance monitoring. I've noticed some slow queries in production, and we should be proactive about catching these issues.\n\nProposed tools:\n- Application performance monitoring (APM)\n- Database query analysis\n- Real user monitoring (RUM)\n- Automated alerting\n\nAny recommendations for specific tools or approaches?",
    author: mockUsers[0],
    category: mockCategories[1],
    createdAt: new Date("2024-07-13T14:20:00Z"),
    updatedAt: new Date("2024-07-13T14:20:00Z"),
    likes: 3,
    replies: [],
    tags: ["performance", "monitoring", "devops"],
    isPinned: false,
    isLocked: false,
  },
  {
    id: "5",
    title: "Team collaboration tools - What's working?",
    content:
      "How is everyone feeling about our current collaboration setup? Are there any tools or processes that could improve our workflow?\n\nI'm particularly interested in:\n- Code review process\n- Documentation\n- Communication channels\n- Project management\n\nShare your thoughts!",
    author: mockUsers[4],
    category: mockCategories[3],
    createdAt: new Date("2024-07-12T11:30:00Z"),
    updatedAt: new Date("2024-07-12T11:30:00Z"),
    likes: 4,
    replies: [],
    tags: ["collaboration", "workflow", "team"],
    isPinned: false,
    isLocked: false,
  },
];

export const mockStats: ForumStats = {
  totalUsers: mockUsers.length,
  totalPosts: mockPosts.length,
  totalReplies: mockReplies.length,
  activeUsers: 3,
};
