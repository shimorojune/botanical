"use client";

import { Card, Text, Group, Badge, Avatar } from "@mantine/core";
import {
  IconMessage,
  IconUsers,
  IconClock,
  IconTrendingUp,
} from "@tabler/icons-react";
import { Category } from "../lib/types";

interface CategoryCardProps {
  category: Category;
  onClick: (categoryId: string) => void;
}

export function CategoryCard({ category, onClick }: CategoryCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Map color names to gradient classes
  const getGradientClass = (color: string) => {
    const gradients = {
      blue: "from-blue-500 to-blue-600",
      green: "from-green-500 to-green-600",
      pink: "from-pink-500 to-pink-600",
      orange: "from-orange-500 to-orange-600",
      red: "from-red-500 to-red-600",
      purple: "from-purple-500 to-purple-600",
      yellow: "from-yellow-500 to-yellow-600",
    };
    return (
      gradients[color as keyof typeof gradients] || "from-gray-500 to-gray-600"
    );
  };

  const getBgGradient = (color: string) => {
    const backgrounds = {
      blue: "from-blue-50 to-blue-100",
      green: "from-green-50 to-green-100",
      pink: "from-pink-50 to-pink-100",
      orange: "from-orange-50 to-orange-100",
      red: "from-red-50 to-red-100",
      purple: "from-purple-50 to-purple-100",
      yellow: "from-yellow-50 to-yellow-100",
    };
    return (
      backgrounds[color as keyof typeof backgrounds] ||
      "from-gray-50 to-gray-100"
    );
  };

  return (
    <Card
      shadow="sm"
      padding="0"
      radius="xl"
      withBorder={false}
      className={`cursor-pointer hover:shadow-2xl transition-all duration-300 bg-gradient-to-br ${getBgGradient(
        category.color
      )} shadow-lg hover:scale-105 overflow-hidden group`}
      onClick={() => onClick(category.id)}
    >
      {/* Header with gradient */}
      <div
        className={`bg-gradient-to-r ${getGradientClass(category.color)} p-5`}
      >
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full">
              <IconTrendingUp size={20} className="text-white" />
            </div>
            <Text fw={700} size="lg" className="text-white">
              {category.name}
            </Text>
          </div>
          <Badge
            variant="filled"
            color="white"
            className="text-gray-800 font-bold"
          >
            {category.postCount}
          </Badge>
        </div>
        <Text size="sm" className="text-white/90 leading-relaxed">
          {category.description}
        </Text>
      </div>

      {/* Content */}
      <div className="p-5">
        {category.latestPost ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-600">
              <IconMessage size={14} />
              <Text size="xs" fw={600} className="uppercase tracking-wide">
                Latest Discussion
              </Text>
            </div>

            <div className="bg-white rounded-lg p-3 shadow-sm group-hover:shadow-md transition-shadow">
              <Text
                size="sm"
                fw={600}
                className="text-gray-800 mb-2 line-clamp-2"
              >
                {category.latestPost.title}
              </Text>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar size="xs" radius="xl">
                    {category.latestPost.author.avatar}
                  </Avatar>
                  <Text size="xs" fw={500} className="text-gray-600">
                    {category.latestPost.author.username}
                  </Text>
                </div>
                <div className="flex items-center gap-1">
                  <IconClock size={12} className="text-gray-400" />
                  <Text size="xs" className="text-gray-500 font-medium">
                    {formatDate(category.latestPost.createdAt)}
                  </Text>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <IconMessage size={20} className="text-gray-400" />
            </div>
            <Text size="sm" className="text-gray-500 font-medium">
              No discussions yet
            </Text>
            <Text size="xs" className="text-gray-400 mt-1">
              Be the first to post!
            </Text>
          </div>
        )}
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
    </Card>
  );
}
