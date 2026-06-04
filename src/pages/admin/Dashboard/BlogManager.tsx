import React, { useState, useRef, useEffect, useCallback } from "react";
import JoditEditor from "jodit-react";
import { useCreatePost, useUpdatePost } from "@/hooks/useData";
import { apiClient, API_BASE_URL, Post } from "@/services/api";
import { ImagePlus, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface BlogManagerProps {
  editingPostId?: string | null;
  onDone?: () => void;
}

interface FormState {
  title: string;
  description: string;
  content: string;
  coverImage: string;
  category: string;
  status: "draft" | "published";
}

const EMPTY_FORM: FormState = {
  title: "",
  description: "",
  content: "",
  coverImage: "",
  category: "",
  status: "published",
};

const BlogManager: React.FC<BlogManagerProps> = ({ editingPostId, onDone }) => {
  const isEditing = Boolean(editingPostId);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [coverPreview, setCoverPreview] = useState<string>("");
  const [coverUploading, setCoverUploading] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);
  const editor = useRef<any>(null);

  const { create, loading: creating } = useCreatePost();
  const { update, loading: updating } = useUpdatePost(editingPostId ?? "");
  const submitting = creating || updating;

  const joditConfig = {
    height: 520,
    toolbarButtonSize: "large" as const,
    buttons: [
      "source", "|",
      "bold", "italic", "underline", "strikethrough", "|",
      "font", "fontsize", "brush", "paragraph", "|",
      "ul", "ol", "outdent", "indent", "|",
      "align", "lineHeight", "|",
      "link", "image", "video", "table", "|",
      "hr", "eraser", "copyformat", "|",
      "undo", "redo", "|",
      "find", "|",
      "preview", "fullsize",
    ],
    uploader: {
      url: `${API_BASE_URL}/upload`,
      format: "json",
      filesVariableName: () => "files",
      process: (resp: any) => ({
        files: resp?.data?.files ?? resp?.files ?? [],
        path: resp?.data?.path ?? "",
        baseurl: resp?.data?.baseurl ?? "",
        error: resp?.success === false ? 1 : 0,
        msg: resp?.error ?? "",
      }),
    },
    image: { openOnDblClick: true, editSrc: true },
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    defaultActionOnPaste: "insert_as_html",
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: false,
    spellcheck: true,
    language: "en",
    toolbarAdaptive: false,
    toolbarSticky: true,
  };

  // Load existing post when editing
  useEffect(() => {
    if (!editingPostId) {
      setForm(EMPTY_FORM);
      setCoverPreview("");
      return;
    }

    setLoadingPost(true);
    apiClient.getPost(editingPostId)
      .then((post: Post) => {
        setForm({
          title: post.title,
          description: post.description,
          content: post.content,
          coverImage: post.coverImage ?? "",
          category: post.category ?? "",
          status: post.status,
        });
        if (post.coverImage) setCoverPreview(post.coverImage);
      })
      .catch(() => toast.error("Failed to load post for editing"))
      .finally(() => setLoadingPost(false));
  }, [editingPostId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "description" && value.length > 200) return;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = useCallback((value: string) => {
    setForm((prev) => ({ ...prev, content: value }));
  }, []);

  // Read live content from the editor DOM — bypasses the stale-state problem
  // when the submit button is clicked while focus is still inside Jodit.
  const getLiveContent = (): string => {
    const editorValue = (editor.current as any)?.value;
    return typeof editorValue === "string" && editorValue ? editorValue : form.content;
  };

  const isContentEmpty = (html: string) =>
    !html || !html.replace(/<[^>]*>/g, "").trim();

  const handleCoverImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCoverPreview(URL.createObjectURL(file));
    setCoverUploading(true);
    try {
      const url = await apiClient.uploadImage(file);
      setForm((prev) => ({ ...prev, coverImage: url }));
      setCoverPreview(url);
      toast.success("Cover image uploaded");
    } catch {
      toast.error("Cover image upload failed");
      setCoverPreview("");
      setForm((prev) => ({ ...prev, coverImage: "" }));
    } finally {
      setCoverUploading(false);
    }
  };

  const removeCoverImage = () => {
    setForm((prev) => ({ ...prev, coverImage: "" }));
    setCoverPreview("");
  };

  const validate = (content: string) => {
    if (!form.title.trim()) { toast.error("Title is required"); return false; }
    if (!form.description.trim()) { toast.error("Description is required"); return false; }
    if (isContentEmpty(content)) { toast.error("Content is required"); return false; }
    return true;
  };

  const buildPayload = (status: "draft" | "published", content: string) => ({
    title: form.title,
    description: form.description,
    content,
    coverImage: form.coverImage || null,
    category: form.category || null,
    status,
  });

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = getLiveContent();
    if (!validate(content)) return;
    try {
      if (isEditing) {
        await update(buildPayload("published", content));
        toast.success("Post updated and published!");
      } else {
        await create(buildPayload("published", content));
        toast.success("Post published successfully!");
        setForm(EMPTY_FORM);
        setCoverPreview("");
      }
      onDone?.();
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  const handleSaveDraft = async () => {
    const content = getLiveContent();
    if (!form.title.trim()) { toast.error("Title is required to save draft"); return; }
    try {
      if (isEditing) {
        await update(buildPayload("draft", content));
        toast.success("Post saved as draft!");
      } else {
        await create(buildPayload("draft", content));
        toast.success("Draft saved!");
        setForm(EMPTY_FORM);
        setCoverPreview("");
      }
      onDone?.();
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  if (loadingPost) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {isEditing ? "Edit Post" : "Write New Post"}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {isEditing ? "Update your existing post" : "Craft and publish your next story"}
          </p>
        </div>
        {isEditing && onDone && (
          <button
            type="button"
            onClick={onDone}
            className="text-sm text-gray-500 hover:text-gray-800 dark:hover:text-white underline"
          >
            ← Back to posts
          </button>
        )}
      </div>

      <form onSubmit={handlePublish} className="space-y-6">
        {/* Two-column layout: main editor + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main editor column */}
          <div className="lg:col-span-2 space-y-5">
            {/* Title */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Title *
              </label>
              <input
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter post title..."
                className="w-full text-xl font-medium border-0 bg-transparent focus:outline-none focus:ring-0 text-gray-900 dark:text-white placeholder-gray-400"
                required
              />
            </div>

            {/* Description */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Short Description *
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                maxLength={200}
                rows={3}
                placeholder="Brief summary shown on the press page..."
                className="w-full border-0 bg-transparent focus:outline-none focus:ring-0 resize-none text-gray-700 dark:text-gray-300 placeholder-gray-400"
                required
              />
              <div className="text-xs text-gray-400 text-right mt-1">
                {form.description.length}/200
              </div>
            </div>

            {/* Jodit Editor */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-5 pt-5 pb-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Content *
                </label>
                <p className="text-xs text-gray-400 mt-0.5">
                  Use the toolbar to add formatting, images, links, and more
                </p>
              </div>
              {/* key forces a full remount when switching posts so Jodit
                  picks up the new value prop rather than sticking to its
                  internally cached content from the previous post. */}
              <JoditEditor
                key={editingPostId ?? "new"}
                ref={editor}
                value={form.content}
                config={joditConfig}
                tabIndex={1}
                onBlur={handleContentChange}
                onChange={handleContentChange}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Publish box */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Publish</h3>
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={submitting || coverUploading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {isEditing ? "Update & Publish" : "Publish Post"}
                </button>
                <button
                  type="button"
                  disabled={submitting || coverUploading}
                  onClick={handleSaveDraft}
                  className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 disabled:opacity-60 text-gray-700 dark:text-gray-300 font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  {isEditing ? "Save Changes as Draft" : "Save as Draft"}
                </button>
              </div>
            </div>

            {/* Category */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Category
              </label>
              <input
                name="category"
                type="text"
                value={form.category}
                onChange={handleChange}
                placeholder="e.g. National, Social, Health..."
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Cover Image */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Cover Image
              </label>

              {coverPreview ? (
                <div className="relative">
                  <img
                    src={coverPreview}
                    alt="Cover preview"
                    className="w-full aspect-video object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeCoverImage}
                    className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  {coverUploading && (
                    <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
                    </div>
                  )}
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 transition-colors bg-gray-50 dark:bg-gray-800">
                  <ImagePlus className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {coverUploading ? "Uploading..." : "Click to upload cover image"}
                  </span>
                  <span className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 10MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverImageChange}
                    className="hidden"
                    disabled={coverUploading}
                  />
                </label>
              )}
            </div>
          </div>
        </div>
      </form>

      <style>{`
        .jodit-wysiwyg img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 8px 0;
          display: block;
        }
      `}</style>
    </div>
  );
};

export default BlogManager;
