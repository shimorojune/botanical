"use client";

import { useState } from "react";
import {
  Modal,
  TextInput,
  Button,
  Group,
  Select,
  MultiSelect,
  Stack,
} from "@mantine/core";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Category } from "../lib/types";

interface NewPostModalProps {
  opened: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    content: string;
    categoryId: string;
    tags: string[];
  }) => void;
  categories: Category[];
}

export function NewPostModal({
  opened,
  onClose,
  onSubmit,
  categories,
}: NewPostModalProps) {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none min-h-[200px] p-4",
      },
    },
  });

  const handleSubmit = () => {
    if (!title.trim() || !categoryId || !editor?.getHTML()) {
      return;
    }

    onSubmit({
      title: title.trim(),
      content: editor.getHTML(),
      categoryId,
      tags,
    });

    // Reset form
    setTitle("");
    setCategoryId("");
    setTags([]);
    editor?.commands.clearContent();
    onClose();
  };

  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));

  const commonTags = [
    "feature-request",
    "bug-report",
    "discussion",
    "help-wanted",
    "announcement",
    "feedback",
    "ui-ux",
    "technical",
    "product",
    "design",
  ];

  return (
    <Modal opened={opened} onClose={onClose} title="Create New Post" size="lg">
      <Stack gap="md">
        <TextInput
          label="Title"
          placeholder="What's on your mind?"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          required
        />

        <Select
          label="Category"
          placeholder="Select a category"
          data={categoryOptions}
          value={categoryId}
          onChange={(value) => setCategoryId(value || "")}
          required
        />

        <MultiSelect
          label="Tags"
          placeholder="Add relevant tags"
          data={commonTags}
          value={tags}
          onChange={setTags}
          searchable
        />

        <div>
          <label className="block text-sm font-medium mb-2">Content</label>
          <RichTextEditor editor={editor}>
            <RichTextEditor.Toolbar sticky stickyOffset={60}>
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Underline />
                <RichTextEditor.Strikethrough />
                <RichTextEditor.ClearFormatting />
                <RichTextEditor.Code />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.H1 />
                <RichTextEditor.H2 />
                <RichTextEditor.H3 />
                <RichTextEditor.H4 />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Blockquote />
                <RichTextEditor.Hr />
                <RichTextEditor.BulletList />
                <RichTextEditor.OrderedList />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Link />
                <RichTextEditor.Unlink />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Undo />
                <RichTextEditor.Redo />
              </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>

            <RichTextEditor.Content />
          </RichTextEditor>
        </div>

        <Group justify="flex-end">
          <Button variant="subtle" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!title.trim() || !categoryId || !editor?.getHTML()}
          >
            Create Post
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
