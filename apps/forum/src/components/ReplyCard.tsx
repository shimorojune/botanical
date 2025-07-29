"use client";

import { Card, Text, Group, Badge, Avatar, ActionIcon } from "@mantine/core";
import { IconHeart, IconClock, IconCornerDownRight } from "@tabler/icons-react";
import { Reply } from "../lib/types";

interface ReplyCardProps {
  reply: Reply;
  onLike: (replyId: string) => void;
  onReply: (replyId: string) => void;
  level?: number;
}

export function ReplyCard({
  reply,
  onLike,
  onReply,
  level = 0,
}: ReplyCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const marginLeft = level > 0 ? `ml-${Math.min(level * 8, 32)}` : "";

  return (
    <div
      className={`${marginLeft} border-b border-gray-100 p-4 hover:bg-gray-50 transition-colors`}
    >
      <div className="flex items-start gap-4">
        <div className="relative flex-shrink-0">
          <Avatar size="md" radius="xl">
            {reply.author.avatar}
          </Avatar>
          {reply.author.isBot && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">AI</span>
            </div>
          )}
        </div>

        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center gap-3 mb-2">
            <span className="text-gray-900 font-semibold">
              {reply.author.username}
            </span>
            {reply.author.isBot && (
              <Badge size="xs" color="violet" variant="filled">
                BOT
              </Badge>
            )}
            {reply.author.botPersonality && (
              <Badge
                size="xs"
                variant="outline"
                color="violet"
                className="text-purple-600 border-purple-200"
              >
                {reply.author.botPersonality}
              </Badge>
            )}
            <span className="text-gray-500 text-sm">
              • {formatDate(reply.createdAt)}
            </span>
          </div>

          {/* Content */}
          <div className="text-gray-700 text-sm leading-relaxed mb-3 whitespace-pre-wrap">
            {reply.content}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => onLike(reply.id)}
              className="flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors"
            >
              <IconHeart size={14} />
              <span className="text-gray-600 text-xs">{reply.likes}</span>
            </button>

            <button
              onClick={() => onReply(reply.id)}
              className="flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors"
            >
              <IconCornerDownRight size={14} />
              <span className="text-gray-600 text-xs">Reply</span>
            </button>
          </div>
        </div>
      </div>

      {/* Nested replies */}
      {reply.replies && reply.replies.length > 0 && (
        <div className="mt-4">
          {reply.replies.map((nestedReply) => (
            <ReplyCard
              key={nestedReply.id}
              reply={nestedReply}
              onLike={onLike}
              onReply={onReply}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
