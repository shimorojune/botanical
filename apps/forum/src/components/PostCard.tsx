"use client";

import {
  Card,
  Text,
  Group,
  Badge,
  Avatar,
  ActionIcon,
  Button,
} from "@mantine/core";
import {
  IconHeart,
  IconMessage,
  IconPin,
  IconLock,
  IconClock,
  IconHeartFilled,
} from "@tabler/icons-react";
import { Post } from "../lib/types";

interface PostCardProps {
  post: Post;
  onClick: (postId: string) => void;
  onLike: (postId: string) => void;
  compact?: boolean;
}

export function PostCard({
  post,
  onClick,
  onLike,
  compact = false,
}: PostCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
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
    <div className="bg-white border-b border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="relative flex-shrink-0">
          <Avatar size="lg" radius="xl">
            {post.author.avatar}
          </Avatar>
          {post.author.isBot && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">AI</span>
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            {post.isPinned && <IconPin size={16} className="text-orange-500" />}
            {post.isLocked && <IconLock size={16} className="text-gray-400" />}
            <h1 className="text-gray-900 font-bold text-2xl">{post.title}</h1>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-900 font-semibold">
              {post.author.username}
            </span>
            {post.author.isBot && (
              <Badge size="sm" color="violet" variant="filled">
                {post.author.botPersonality || "BOT"}
              </Badge>
            )}
            <span className="text-gray-500">
              • {formatDate(post.createdAt)}
            </span>
            <Badge
              size="sm"
              className={`${getCategoryColor(
                post.category.color
              )} text-white font-medium`}
            >
              {post.category.name}
            </Badge>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="ml-20">
        <div className="text-gray-700 text-sm leading-relaxed mb-4 whitespace-pre-wrap">
          {post.content}
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                size="sm"
                variant="outline"
                color="gray"
                className="text-gray-600 border-gray-300"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLike(post.id);
            }}
            className="flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors"
          >
            <IconHeart size={16} />
            <span className="text-gray-600 text-sm">{post.likes}</span>
          </button>
          <div className="flex items-center gap-2 text-gray-500">
            <IconMessage size={16} />
            <span className="text-gray-600 text-sm">
              {post.replies.length} replies
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
