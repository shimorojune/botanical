"use client";

import { useState, useMemo } from "react";
import {
  Container,
  Grid,
  Stack,
  Tabs,
  Text,
  Group,
  Select,
  Button,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { ForumHeader } from "../components/ForumHeader";
import { ForumSidebar } from "../components/ForumSidebar";
import { DiscussionItem } from "../components/DiscussionItem";
import { PostCard } from "../components/PostCard";
import { ReplyCard } from "../components/ReplyCard";
import { NewPostModal } from "../components/NewPostModal";
import {
  mockCategories,
  mockPosts,
  mockUsers,
  mockReplies,
  mockStats,
} from "../lib/mockData";
import { Post, Reply, Category, User } from "../lib/types";

type ViewMode = "discussions" | "post-detail";

export default function ForumApp() {
  const [viewMode, setViewMode] = useState<ViewMode>("discussions");
  const [selectedView, setSelectedView] = useState("all");
  const [selectedPostId, setSelectedPostId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [newPostModalOpen, setNewPostModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState("latest");
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [categories, setCategories] = useState<Category[]>(mockCategories);

  // Filter posts based on search and selected view
  const filteredPosts = useMemo(() => {
    let filtered = posts;

    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Sort posts
    return filtered.sort((a, b) => {
      // Pinned posts first
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;

      // Then by sort preference
      if (sortBy === "latest") {
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      } else if (sortBy === "oldest") {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      } else if (sortBy === "replies") {
        return b.replies.length - a.replies.length;
      }
      return 0;
    });
  }, [posts, searchQuery, sortBy]);

  const selectedPost = posts.find((post) => post.id === selectedPostId);

  const handleDiscussionClick = (postId: string) => {
    setSelectedPostId(postId);
    setViewMode("post-detail");
  };

  const handleCreatePost = (data: {
    title: string;
    content: string;
    categoryId: string;
    tags: string[];
  }) => {
    const category = categories.find((c) => c.id === data.categoryId);
    if (!category) return;

    const newPost: Post = {
      id: `post-${Date.now()}`,
      title: data.title,
      content: data.content,
      author: mockUsers[0], // Current user
      category,
      createdAt: new Date(),
      updatedAt: new Date(),
      likes: 0,
      replies: [],
      tags: data.tags,
      isPinned: false,
      isLocked: false,
    };

    setPosts((prev) => [newPost, ...prev]);

    // Update category post count
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === data.categoryId
          ? { ...cat, postCount: cat.postCount + 1 }
          : cat
      )
    );
  };

  const handleLikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleLikeReply = (replyId: string) => {
    console.log("Like reply:", replyId);
  };

  const handleReply = (replyId: string) => {
    console.log("Reply to:", replyId);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleBackToDiscussions = () => {
    setViewMode("discussions");
    setSelectedPostId("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ForumHeader
        onCreatePost={() => setNewPostModalOpen(true)}
        onSearch={handleSearch}
      />

      <div className="flex">
        <ForumSidebar
          onCreatePost={() => setNewPostModalOpen(true)}
          selectedView={selectedView}
          onViewChange={setSelectedView}
        />

        <div className="flex-1">
          {viewMode === "discussions" ? (
            <div className="bg-white">
              {/* Header */}
              <div className="border-b border-gray-200 px-6 py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-gray-900 text-xl font-bold mb-1">
                      {selectedView === "all"
                        ? "All Discussions"
                        : selectedView.charAt(0).toUpperCase() +
                          selectedView.slice(1)}
                    </h1>
                    <p className="text-gray-600 text-sm">
                      {filteredPosts.length} discussions
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Select
                      value={sortBy}
                      onChange={(value) => setSortBy(value || "latest")}
                      data={[
                        { value: "latest", label: "Latest" },
                        { value: "oldest", label: "Oldest" },
                        { value: "replies", label: "Most Replies" },
                      ]}
                      size="sm"
                      rightSection={<IconChevronDown size={14} />}
                      className="w-32"
                    />
                  </div>
                </div>
              </div>

              {/* Discussions List */}
              <div>
                {filteredPosts.map((post) => (
                  <DiscussionItem
                    key={post.id}
                    post={post}
                    onClick={handleDiscussionClick}
                  />
                ))}

                {filteredPosts.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-gray-500 text-lg mb-2">
                      No discussions found
                    </p>
                    <p className="text-gray-400 text-sm mb-6">
                      Be the first to start a discussion!
                    </p>
                    <Button
                      onClick={() => setNewPostModalOpen(true)}
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      Start a Discussion
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Post detail view
            <div className="bg-white p-6">
              <div className="mb-6">
                <button
                  onClick={handleBackToDiscussions}
                  className="text-orange-500 hover:text-orange-600 text-sm font-medium mb-4"
                >
                  ← Back to discussions
                </button>
              </div>

              {selectedPost && (
                <div className="space-y-6">
                  <PostCard
                    post={selectedPost}
                    onClick={() => {}}
                    onLike={handleLikePost}
                  />

                  {selectedPost.replies.length > 0 && (
                    <div>
                      <h2 className="text-gray-900 text-lg font-semibold mb-4">
                        {selectedPost.replies.length} replies
                      </h2>
                      <div className="space-y-4">
                        {selectedPost.replies.map((reply) => (
                          <ReplyCard
                            key={reply.id}
                            reply={reply}
                            onLike={handleLikeReply}
                            onReply={handleReply}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <NewPostModal
        opened={newPostModalOpen}
        onClose={() => setNewPostModalOpen(false)}
        onSubmit={handleCreatePost}
        categories={categories}
      />
    </div>
  );
}
