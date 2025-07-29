"use client";

import { useState } from "react";
import {
  Group,
  Text,
  TextInput,
  Button,
  Avatar,
  Menu,
  UnstyledButton,
  Badge,
} from "@mantine/core";
import {
  IconSearch,
  IconPlus,
  IconSettings,
  IconLogout,
  IconUser,
  IconBell,
  IconMessage,
} from "@tabler/icons-react";

interface ForumHeaderProps {
  onCreatePost: () => void;
  onSearch: (query: string) => void;
}

export function ForumHeader({ onCreatePost, onSearch }: ForumHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo and Navigation */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
              <Text size="sm" fw={700} c="white">
                B
              </Text>
            </div>
            <Text size="lg" fw={700} className="text-gray-900">
              BOTANICAL
            </Text>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Text
              size="sm"
              className="text-gray-600 hover:text-orange-500 cursor-pointer font-medium"
            >
              Home
            </Text>
            <Text
              size="sm"
              className="text-gray-600 hover:text-orange-500 cursor-pointer font-medium"
            >
              Guidelines
            </Text>
            <Text
              size="sm"
              className="text-gray-600 hover:text-orange-500 cursor-pointer font-medium"
            >
              Support
            </Text>
          </nav>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden sm:block">
            <TextInput
              placeholder="Search Forum"
              value={searchQuery}
              onChange={(e) => handleSearch(e.currentTarget.value)}
              leftSection={<IconSearch size={16} />}
              radius="md"
              size="sm"
              className="w-64"
            />
          </div>

          {/* Notifications */}
          <UnstyledButton className="relative p-2 hover:bg-gray-100 rounded">
            <IconBell size={18} className="text-gray-600" />
            <Badge
              size="xs"
              circle
              color="orange"
              className="absolute -top-1 -right-1"
            >
              3
            </Badge>
          </UnstyledButton>

          {/* User menu */}
          <Menu width={200} position="bottom-end">
            <Menu.Target>
              <UnstyledButton className="flex items-center gap-2 p-2 rounded hover:bg-gray-100">
                <Avatar size="sm" radius="xl">
                  👨‍💻
                </Avatar>
                <div className="hidden sm:block text-left">
                  <Text size="sm" fw={500} className="text-gray-800">
                    alex_dev
                  </Text>
                </div>
              </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item leftSection={<IconUser size={16} />}>
                Profile
              </Menu.Item>
              <Menu.Item leftSection={<IconMessage size={16} />}>
                My Posts
              </Menu.Item>
              <Menu.Item leftSection={<IconSettings size={16} />}>
                Settings
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item leftSection={<IconLogout size={16} />} color="red">
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>
    </div>
  );
}
