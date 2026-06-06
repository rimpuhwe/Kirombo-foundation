import React, { useState } from "react";
import { Calendar, ArrowRight, Trash2, Edit2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import PostContentPage from "./PostContentPage";
import { usePosts, useDeletePost } from "@/hooks/useData";
import { Post } from "@/services/api";
import { toast } from "sonner";

interface PostsManagerProps {
  onEdit: (id: string) => void;
}

function extractFirstImage(html: string): string | undefined {
  const match = html.match(/<img[^>]+src=["']([^"'>]+)["']/i);
  return match ? match[1] : undefined;
}

const PostCard: React.FC<{
  post: Post;
  onRead: () => void;
  onEdit: () => void;
  onDelete: (id: string) => void;
}> = ({ post, onRead, onEdit, onDelete }) => {
  const thumbnail = post.coverImage || extractFirstImage(post.content);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700">
      <div className="grid md:grid-cols-3 gap-6 p-6">
        {/* Thumbnail */}
        <div className="md:col-span-1">
          <div className="relative aspect-video bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden flex items-center justify-center">
            {thumbnail ? (
              <img src={thumbnail} alt={post.title} className="object-cover w-full h-full" />
            ) : (
              <span className="text-gray-400 text-sm">No image</span>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="md:col-span-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              {post.category && (
                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200">
                  {post.category}
                </span>
              )}
              <span
                className={`px-2 py-0.5 rounded text-xs font-semibold ${
                  post.status === "published"
                    ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200"
                    : "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200"
                }`}
              >
                {post.status === "published" ? "Published" : "Draft"}
              </span>
            </div>

            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white line-clamp-1">
              {post.title}
            </h3>

            <div className="flex flex-wrap gap-4 mb-3 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-blue-500" />
                <span>
                  {new Date(post.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <span>{post.views} views</span>
              <span>{post.likes} likes</span>
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
              {post.description}
            </p>
          </div>

          <div className="flex gap-4 mt-4 flex-wrap">
            <button
              onClick={onRead}
              className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold text-sm hover:underline"
            >
              Read <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onEdit}
              className="inline-flex items-center gap-1 text-gray-600 dark:text-gray-400 font-semibold text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Edit2 className="w-4 h-4" /> Edit
            </button>
            <button
              onClick={() => onDelete(post.id)}
              className="inline-flex items-center gap-1 text-red-600 dark:text-red-400 font-semibold text-sm hover:underline"
            >
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PostsManager: React.FC<PostsManagerProps> = ({ onEdit }) => {
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [viewPost, setViewPost] = useState<Post | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [deleteTargetTitle, setDeleteTargetTitle] = useState<string>("");

  const { data: posts, loading, refetch } = usePosts();
  const { deletePost, loading: deleting } = useDeletePost();

  const requestDelete = (post: Post) => {
    setDeleteTargetId(post.id);
    setDeleteTargetTitle(post.title);
  };

  const confirmDelete = async () => {
    if (!deleteTargetId) return;
    const id = deleteTargetId;
    setDeleteTargetId(null);
    setDeleteTargetTitle("");
    try {
      await deletePost(id);
      toast.success("Post deleted");
    } catch {
      toast.error("Something went wrong — refreshing list");
    } finally {
      refetch();
    }
  };

  const filtered = (posts || []).filter((post) => {
    if (filter !== "all" && post.status !== filter) return false;
    if (dateRange.from && new Date(post.createdAt) < new Date(dateRange.from)) return false;
    if (dateRange.to && new Date(post.createdAt) > new Date(dateRange.to)) return false;
    if (
      searchTerm &&
      !post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !post.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    return true;
  });

  if (viewPost) {
    return <PostContentPage post={viewPost} onBack={() => setViewPost(null)} />;
  }

  return (
    <>
      {/* Delete confirmation dialog */}
      <AlertDialog open={!!deleteTargetId} onOpenChange={(open) => !open && setDeleteTargetId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this post?</AlertDialogTitle>
            <AlertDialogDescription>
              <span className="font-medium text-foreground">"{deleteTargetTitle}"</span> will be
              permanently deleted and removed from the public press page. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
            >
              {deleting ? "Deleting…" : "Delete post"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">All Posts</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            {posts?.length ?? 0} posts total
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-end">
          <label className="flex-1 min-w-[200px]">
            <span className="block text-xs font-semibold mb-2 text-gray-700 dark:text-gray-300">Search</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search posts..."
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
            />
          </label>
          <label>
            <span className="block text-xs font-semibold mb-2 text-gray-700 dark:text-gray-300">Status</span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
            >
              <option value="all">All</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </label>
          <label>
            <span className="block text-xs font-semibold mb-2 text-gray-700 dark:text-gray-300">From</span>
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) => setDateRange((r) => ({ ...r, from: e.target.value }))}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
            />
          </label>
          <label>
            <span className="block text-xs font-semibold mb-2 text-gray-700 dark:text-gray-300">To</span>
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) => setDateRange((r) => ({ ...r, to: e.target.value }))}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
            />
          </label>
        </div>

        {/* List */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => <Skeleton key={i} className="h-44 w-full" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400">
            <p className="text-lg font-medium">No posts found</p>
            <p className="text-sm mt-1">Try adjusting your filters or create a new post</p>
          </div>
        ) : (
          <div className="space-y-5">
            {filtered.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onRead={() => setViewPost(post)}
                onEdit={() => onEdit(post.id)}
                onDelete={() => requestDelete(post)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PostsManager;
