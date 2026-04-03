import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { useCreatePostMutation, useUpdatePostMutation } from "@/hooks/usePostsQuery";
import { sonner } from "@/components/ui/sonner";

interface BlogFormState {
  title: string;
  description: string;
  content: string;
  status: "draft" | "published";
}

const joditConfig: any = {
  height: 500,
  toolbarButtonSize: "large",
  buttons: [
    "source",
    "|",
    "bold",
    "italic",
    "underline",
    "strikethrough",
    "|",
    "font",
    "fontsize",
    "brush",
    "paragraph",
    "|",
    "ul",
    "ol",
    "outdent",
    "indent",
    "|",
    "align",
    "lineHeight",
    "|",
    "link",
    "image",
    "video",
    "file",
    "table",
    "|",
    "hr",
    "eraser",
    "copyformat",
    "|",
    "symbol",
    "emoji",
    "|",
    "undo",
    "redo",
    "|",
    "find",
    "selectall",
    "|",
    "preview",
    "print",
    "|",
    "fullsize",
  ],
  image: {
    openOnDblClick: true,
    editSrc: true,
    width: "auto",
    height: "auto",
  },
  askBeforePasteHTML: false,
  askBeforePasteFromWord: false,
  defaultActionOnPaste: "insert_as_html",
  showCharsCounter: true,
  showWordsCounter: true,
  showXPathInStatusbar: false,
  spellcheck: true,
  language: "en",
  toolbarAdaptive: false,
  toolbarSticky: false,
  allowResizeX: true,
  allowResizeY: true,
};

const BlogManager: React.FC = () => {
  const [form, setForm] = useState<BlogFormState>({
    title: "",
    description: "",
    content: "",
    status: "draft",
  });
  const editor = useRef<any>(null);
  const createMutation = useCreatePostMutation();
  const updateMutation = useUpdatePostMutation();
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name === "description" && value.length > 200) return;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (value: string) => {
    setForm((prev) => ({ ...prev, content: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.content) {
      sonner.error("Please fill all fields");
      return;
    }

    try {
      await createMutation.mutateAsync({
        title: form.title,
        description: form.description,
        content: form.content,
        status: form.status,
      });
      sonner.success(`Blog post ${form.status === "published" ? "published" : "created"}!`);
      setForm({ title: "", description: "", content: "", status: "draft" });
    } catch (err) {
      sonner.error("Error: " + (err as Error).message);
    }
  };

  // Save as draft
  const handleSaveDraft = async () => {
    if (!form.title || !form.description || !form.content) {
      sonner.error("Please fill all fields");
      return;
    }

    try {
      await createMutation.mutateAsync({
        title: form.title,
        description: form.description,
        content: form.content,
        status: "draft",
      });
      sonner.success("Draft saved!");
      setForm({ title: "", description: "", content: "", status: "draft" });
    } catch (err) {
      sonner.error("Error saving draft: " + (err as Error).message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white dark:bg-gray-900 rounded-xl shadow p-8"
      >
        <div>
          <label className="block font-semibold mb-1" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 dark:bg-gray-800"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1" htmlFor="description">
            Short Description
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            maxLength={200}
            rows={3}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 dark:bg-gray-800 resize-none"
            required
          />
          <div className="text-xs text-gray-500 text-right">
            {form.description.length}/200
          </div>
        </div>
        <div>
          <label className="block font-semibold mb-1">Content</label>
          <JoditEditor
            ref={editor}
            value={form.content}
            config={joditConfig}
            tabIndex={1}
            onBlur={handleContentChange}
            onChange={handleContentChange}
          />
        </div>
        <div className="flex gap-4 pt-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow disabled:opacity-60"
            disabled={submitting}
          >
            {submitting ? "Posting..." : "Post"}
          </button>
          <button
            type="button"
            className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-6 py-2 rounded shadow"
            onClick={handleSaveDraft}
          >
            Save to Draft
          </button>
        </div>
      </form>
      <style>{`
        .jodit-wysiwyg p, .jodit-wysiwyg div {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
        }
        .jodit-wysiwyg img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin-right: 8px;
          margin-bottom: 8px;
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

export default BlogManager;
