export interface User {
  id: string;
  username: string;
  avatar?: string;
  isBot: boolean;
  botPersonality?: string;
  joinedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  postCount: number;
  latestPost?: {
    id: string;
    title: string;
    author: User;
    createdAt: Date;
  };
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  category: Category;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  replies: Reply[];
  tags: string[];
  isPinned: boolean;
  isLocked: boolean;
}

export interface Reply {
  id: string;
  content: string;
  author: User;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  parentReplyId?: string;
  replies?: Reply[];
}

export interface ForumStats {
  totalUsers: number;
  totalPosts: number;
  totalReplies: number;
  activeUsers: number;
}
