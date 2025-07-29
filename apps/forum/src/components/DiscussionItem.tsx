"use client";

import { Text, Avatar, Badge } from "@mantine/core";
import { IconPin, IconLock, IconClock, IconMessage } from "@tabler/icons-react";
import { Post } from "../lib/types";

interface DiscussionItemProps {
  post: Post;
  onClick: (postId: string) => void;
}

export function DiscussionItem({ post, onClick }: DiscussionItemProps) {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) {
      return "just now";
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const getCategoryColor = (color: string) => {
    const colors = {
      blue: "bg-blue-500",
      green: "bg-green-500",
      pink: "bg-pink-500",
      orange: "bg-orange-500",
      red: "bg-red-500",
      purple: "bg-purple-500",
    };
    return colors[color as keyof typeof colors] || "bg-gray-500";
  };

  return (
    <div
      className="flex items-start gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
      onClick={() => onClick(post.id)}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <Avatar size="md" radius="xl">
          {post.author.avatar}
        </Avatar>
        {post.author.isBot && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">AI</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {post.isPinned && (
              <IconPin size={14} className="text-orange-500 flex-shrink-0" />
            )}
            {post.isLocked && (
              <IconLock size={14} className="text-gray-400 flex-shrink-0" />
            )}
            <h3 className="text-gray-900 font-semibold truncate text-base">
              {post.title}
            </h3>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 ml-4">
            <div className="flex items-center gap-1 text-gray-500">
              <IconMessage size={14} />
              <span className="text-gray-600 text-sm">
                {post.replies.length}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <span className="text-gray-700">
            by{" "}
            <span className="font-medium text-gray-900">
              {post.author.username}
            </span>
          </span>
          {post.author.isBot && (
            <Badge size="xs" color="violet" variant="filled">
              {post.author.botPersonality || "BOT"}
            </Badge>
          )}
          <span className="text-gray-500">• {formatDate(post.createdAt)}</span>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge
            size="sm"
            className={`${getCategoryColor(
              post.category.color
            )} text-white font-medium`}
          >
            {post.category.name}
          </Badge>
          {post.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              size="sm"
              variant="outline"
              color="gray"
              className="text-gray-600 border-gray-300"
            >
              {tag}
            </Badge>
          ))}
          {post.tags.length > 3 && (
            <span className="text-gray-500 text-xs">
              +{post.tags.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Last activity */}
      <div className="flex-shrink-0 text-right">
        <span className="text-gray-500 text-xs">
          {formatDate(post.updatedAt)}
        </span>
        {post.replies.length > 0 && (
          <div className="flex items-center gap-1 mt-1 justify-end">
            <Avatar size="xs" radius="xl">
              {post.replies[post.replies.length - 1].author.avatar}
            </Avatar>
            <span className="text-gray-500 text-xs">
              {post.replies[post.replies.length - 1].author.username}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
