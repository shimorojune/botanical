"use client";

import { Text, Button } from "@mantine/core";
import {
  IconMessage,
  IconStar,
  IconTag,
  IconHelp,
  IconPuzzle,
  IconCode,
  IconUsers,
  IconCheck,
  IconFile,
} from "@tabler/icons-react";

interface ForumSidebarProps {
  onCreatePost: () => void;
  selectedView: string;
  onViewChange: (view: string) => void;
}

export function ForumSidebar({
  onCreatePost,
  selectedView,
  onViewChange,
}: ForumSidebarProps) {
  const navItems = [
    { id: "all", label: "All Discussions", icon: IconMessage, count: null },
    { id: "following", label: "Following", icon: IconStar, count: null },
    { id: "tags", label: "Tags", icon: IconTag, count: null },
    { id: "support", label: "Support", icon: IconHelp, count: null },
    { id: "extensions", label: "Extensions", icon: IconPuzzle, count: null },
    { id: "dev", label: "Dev", icon: IconCode, count: null },
    { id: "meta", label: "Meta", icon: IconUsers, count: null },
    { id: "resources", label: "Resources", icon: IconFile, count: null },
    { id: "off-topic", label: "Off-topic", icon: IconMessage, count: null },
    { id: "solved", label: "Solved", icon: IconCheck, count: null },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-4">
        <Button
          onClick={onCreatePost}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded"
        >
          Start a Discussion
        </Button>
      </div>

      <nav className="px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = selectedView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left rounded hover:bg-gray-100 transition-colors ${
                isActive
                  ? "bg-orange-50 text-orange-600 border-r-2 border-orange-500"
                  : "text-gray-700"
              }`}
            >
              <Icon size={16} />
              <Text
                size="sm"
                className={`flex-1 ${
                  isActive ? "text-orange-600" : "text-gray-700"
                }`}
              >
                {item.label}
              </Text>
              {item.count && (
                <Text size="xs" className="text-gray-500">
                  {item.count}
                </Text>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
