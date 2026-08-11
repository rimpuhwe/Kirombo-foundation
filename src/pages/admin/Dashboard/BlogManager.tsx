import React, { useEffect, useState } from "react";
import { ImagePlus, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Editor from "@/components/editor/Editor";
import { useArticle, useCreateArticle, useUpdateArticle } from "@/hooks/useArticles";
import { generateSlug, type ArticleStatus } from "@/lib/articles";
import { uploadImage } from "@/lib/cloudinary";

interface BlogManagerProps {
  editingPostId?: string | null;
  onDone?: () => void;
}

interface FormState {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
}

const EMPTY_FORM: FormState = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImage: "",
  category: "",
};

const BlogManager: React.FC<BlogManagerProps> = ({ editingPostId, onDone }) => {
  const isEditing = Boolean(editingPostId);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [slugEdited, setSlugEdited] = useState(false);
  const [coverPreview, setCoverPreview] = useState<string>("");
  const [coverUploading, setCoverUploading] = useState(false);

  const { data: existingArticle, loading: loadingPost } = useArticle(editingPostId);
  const { create, loading: creating } = useCreateArticle();
  const { update, loading: updating } = useUpdateArticle(editingPostId ?? "");
  const submitting = creating || updating;

  useEffect(() => {
    if (!editingPostId) {
      setForm(EMPTY_FORM);
      setCoverPreview("");
      setSlugEdited(false);
      return;
    }
    if (existingArticle) {
      setForm({
        title: existingArticle.title,
        slug: existingArticle.slug,
        excerpt: existingArticle.excerpt,
        content:
          typeof existingArticle.content === "string"
            ? existingArticle.content
            : JSON.stringify(existingArticle.content),
        coverImage: existingArticle.cover_image_url ?? "",
        category: existingArticle.category ?? "",
      });
      setCoverPreview(existingArticle.cover_image_url ?? "");
      setSlugEdited(true);
    }
  }, [editingPostId, existingArticle]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setForm((prev) => ({
      ...prev,
      title,
      slug: slugEdited ? prev.slug : generateSlug(title),
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "excerpt" && value.length > 200) return;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlugEdited(true);
    setForm((prev) => ({ ...prev, slug: generateSlug(e.target.value) }));
  };

  const handleEditorChange = (json: string) => {
    setForm((prev) => ({ ...prev, content: json }));
  };

  const isContentEmpty = (json: string) => {
    if (!json) return true;
    try {
      const parsed = JSON.parse(json);
      const children = parsed?.root?.children ?? [];
      return children.length === 0 || (children.length === 1 && !children[0].children?.length);
    } catch {
      return true;
    }
  };

  const handleCoverImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setCoverPreview(URL.createObjectURL(file));
    setCoverUploading(true);
    try {
      const url = await uploadImage(file);
      setForm((prev) => ({ ...prev, coverImage: url }));
      setCoverPreview(url);
      toast.success("Cover image uploaded");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Cover image upload failed");
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

  const validate = () => {
    if (!form.title.trim()) { toast.error("Title is required"); return false; }
    if (!form.slug.trim()) { toast.error("Slug is required"); return false; }
    if (!form.excerpt.trim()) { toast.error("Excerpt is required"); return false; }
    if (isContentEmpty(form.content)) { toast.error("Content is required"); return false; }
    return true;
  };

  const buildInput = () => ({
    title: form.title.trim(),
    slug: form.slug.trim(),
    excerpt: form.excerpt.trim(),
    content: JSON.parse(form.content),
    cover_image_url: form.coverImage || null,
    inline_images: extractInlineImages(form.content),
    category: form.category.trim() || null,
  });

  const submit = async (status: ArticleStatus, e?: React.FormEvent) => {
    e?.preventDefault();
    if (status === "published" && !validate()) return;
    if (status === "draft" && !form.title.trim()) {
      toast.error("Title is required to save a draft");
      return;
    }
    if (isContentEmpty(form.content)) {
      toast.error("Content is required");
      return;
    }
    if (!form.slug.trim()) {
      toast.error("Slug is required");
      return;
    }

    try {
      const input = buildInput();
      if (isEditing) {
        await update(input, status);
        toast.success(status === "published" ? "Article updated and published!" : "Article saved as draft!");
      } else {
        await create(input, status);
        toast.success(status === "published" ? "Article published successfully!" : "Draft saved!");
        setForm(EMPTY_FORM);
        setCoverPreview("");
      }
      onDone?.();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      if (message.toLowerCase().includes("duplicate") || message.toLowerCase().includes("unique")) {
        toast.error("That slug is already in use. Please choose a different one.");
      } else {
        toast.error(message);
      }
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
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {isEditing ? "Edit Article" : "Write New Article"}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {isEditing ? "Update your existing article" : "Craft and publish your next story"}
          </p>
        </div>
        {isEditing && onDone && (
          <button
            type="button"
            onClick={onDone}
            className="text-sm text-gray-500 hover:text-gray-800 dark:hover:text-white underline"
          >
            ← Back to articles
          </button>
        )}
      </div>

      <form onSubmit={(e) => submit("published", e)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Title *</label>
              <input
                name="title"
                type="text"
                value={form.title}
                onChange={handleTitleChange}
                placeholder="Enter article title..."
                className="w-full text-xl font-medium border-0 bg-transparent focus:outline-none focus:ring-0 text-gray-900 dark:text-white placeholder-gray-400"
                required
              />
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Slug *</label>
              <div className="flex items-center gap-1 text-sm text-gray-400 mb-1">/press/</div>
              <input
                name="slug"
                type="text"
                value={form.slug}
                onChange={handleSlugChange}
                placeholder="article-url-slug"
                className="w-full font-mono text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Excerpt *
              </label>
              <textarea
                name="excerpt"
                value={form.excerpt}
                onChange={handleChange}
                maxLength={200}
                rows={3}
                placeholder="Brief summary shown on the press page..."
                className="w-full border-0 bg-transparent focus:outline-none focus:ring-0 resize-none text-gray-700 dark:text-gray-300 placeholder-gray-400"
                required
              />
              <div className="text-xs text-gray-400 text-right mt-1">{form.excerpt.length}/200</div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-5 pt-5 pb-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Content *</label>
                <p className="text-xs text-gray-400 mt-0.5">
                  Use the toolbar to add formatting, images, links, and more
                </p>
              </div>
              <div className="p-5 pt-2">
                <Editor
                  key={editingPostId ?? "new"}
                  initialContent={isEditing ? form.content || undefined : undefined}
                  onChange={handleEditorChange}
                />
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Publish</h3>
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={submitting || coverUploading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {isEditing ? "Update & Publish" : "Publish Article"}
                </button>
                <button
                  type="button"
                  disabled={submitting || coverUploading}
                  onClick={() => submit("draft")}
                  className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 disabled:opacity-60 text-gray-700 dark:text-gray-300 font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  {isEditing ? "Save Changes as Draft" : "Save as Draft"}
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Category</label>
              <input
                name="category"
                type="text"
                value={form.category}
                onChange={handleChange}
                placeholder="e.g. National, Social, Health..."
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Cover Image
              </label>

              {coverPreview ? (
                <div className="relative">
                  <img src={coverPreview} alt="Cover preview" className="w-full aspect-video object-cover rounded-lg" />
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
    </div>
  );
};

interface LexicalNodeJson {
  type?: string;
  src?: string;
  children?: LexicalNodeJson[];
}

function extractInlineImages(editorStateJson: string): string[] {
  try {
    const parsed = JSON.parse(editorStateJson) as { root: LexicalNodeJson };
    const urls: string[] = [];
    const walk = (node: LexicalNodeJson | undefined) => {
      if (!node) return;
      if (node.type === "image" && typeof node.src === "string") urls.push(node.src);
      (node.children ?? []).forEach(walk);
    };
    walk(parsed.root);
    return urls;
  } catch {
    return [];
  }
}

export default BlogManager;
