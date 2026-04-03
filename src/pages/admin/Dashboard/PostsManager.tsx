import React, { useState } from "react";
import { Calendar, ArrowRight, Edit2, Trash2 } from "lucide-react";
import PostContentPage from "./PostContentPage";
import { usePostsQuery, useDeletePostMutation } from "@/hooks/usePostsQuery";
import { sonner } from "@/components/ui/sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface PostCardProps {
  post: {
    id: number;
    title: string;
    description: string;
    content: string;
    image?: string;
    status: "draft" | "published";
    createdAt: string;
  };
  onRead: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

function extractFirstImage(html: string): string | undefined {
  const match = html.match(/<img[^>]+src=["']([^"'>]+)["']/i);
  return match ? match[1] : undefined;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  onRead,
  onEdit,
  onDelete,
}) => {
  const firstImage = post.image || extractFirstImage(post.content);
  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all border border-border">
      <div className="grid md:grid-cols-3 gap-6 p-6">
        {/* Image */}
        <div className="md:col-span-1">
          <div className="relative aspect-video bg-muted rounded-xl overflow-hidden group cursor-pointer flex items-center justify-center">
            {firstImage && (
              <img
                src={firstImage}
                alt={post.title}
                className="object-cover w-full h-full"
              />
            )}
          </div>
        </div>
        {/* Details */}
        <div className="md:col-span-2 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-3 text-foreground transition-colors line-clamp-1">
              {post.title}
            </h3>
            <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-primary" />
                <span>
                  {new Date(post.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${post.status === "published" ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200"}`}
              >
                {post.status === "published" ? "Published" : "Draft"}
              </span>
            </div>
            <p className="text-muted-foreground mb-6 line-clamp-2">
              {post.description}
            </p>
          </div>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={onRead}
              className="inline-flex items-center gap-1 text-secondary transition-colors duration-200 cursor-pointer font-semibold hover:underline"
            >
              Read the Story <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onEdit}
              className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 transition-colors duration-200 cursor-pointer font-semibold hover:underline"
            >
              <Edit2 className="w-4 h-4" /> Edit
            </button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="inline-flex items-center gap-1 text-red-600 dark:text-red-400 transition-colors duration-200 cursor-pointer font-semibold hover:underline">
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogTitle>Delete Post?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete "{post.title}"? This action cannot be undone.
                </AlertDialogDescription>
                <div className="flex gap-4 justify-end">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={onDelete} className="bg-red-600 hover:bg-red-700">
                    Delete
                  </AlertDialogAction>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
};

const PostsManager: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "draft" | "published">("all");
  const [dateRange, setDateRange] = useState<{ from: string; to: string }>({
    from: "",
    to: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [viewPost, setViewPost] = useState<any | null>(null);
  const [editingPost, setEditingPost] = useState<any | null>(null);

  const { data: posts = [], isLoading } = usePostsQuery();
  const deleteMutation = useDeletePostMutation();

  const filtered = posts.filter((post) => {
    if (filter !== "all" && post.status !== filter) return false;
    if (dateRange.from && new Date(post.createdAt) < new Date(dateRange.from))
      return false;
    if (dateRange.to && new Date(post.createdAt) > new Date(dateRange.to))
      return false;
    if (
      searchTerm &&
      !post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !post.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    return true;
  });

  const handleDelete = async (postId: number) => {
    try {
      await deleteMutation.mutateAsync(postId);
      sonner.success("Post deleted successfully");
    } catch (err) {
      sonner.error("Failed to delete post");
    }
  };

  if (viewPost) {
    return <PostContentPage post={viewPost} onBack={() => setViewPost(null)} />;
  }

  if (editingPost) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <button
          onClick={() => setEditingPost(null)}
          className="mb-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          Back to Posts
        </button>
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-8">
          <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
          <p className="text-gray-500">Editing post: {editingPost.title}</p>
          <p className="text-sm text-gray-400 mt-2">Edit functionality will be added in the next phase.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-wrap gap-4 items-end">
          <label className="flex-1 min-w-[200px]">
            <span className="block text-xs font-semibold mb-1">Search</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search posts..."
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700"
            />
          </label>
          <label>
            <span className="block text-xs font-semibold mb-1">Filter</span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="border rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
            >
              <option value="all">All</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </label>
          <label>
            <span className="block text-xs font-semibold mb-1">From</span>
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) =>
                setDateRange((r) => ({ ...r, from: e.target.value }))
              }
              className="border rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
            />
          </label>
          <label>
            <span className="block text-xs font-semibold mb-1">To</span>
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) =>
                setDateRange((r) => ({ ...r, to: e.target.value }))
              }
              className="border rounded px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
            />
          </label>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-10 text-gray-400">Loading posts...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-10 text-gray-400">No posts found.</div>
      ) : (
        <div className="grid gap-8">
          {filtered.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onRead={() => setViewPost(post)}
              onEdit={() => setEditingPost(post)}
              onDelete={() => handleDelete(post.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostsManager;
