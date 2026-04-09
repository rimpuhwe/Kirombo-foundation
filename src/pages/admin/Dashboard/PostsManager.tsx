import React, { useState } from "react";
import { Calendar, ArrowRight, Trash2, Edit2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import PostContentPage from "./PostContentPage";
import { usePosts, useDeletePost } from "@/hooks/useData";

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
  onDelete?: (id: number) => void;
}

function extractFirstImage(html: string): string | undefined {
  const match = html.match(/<img[^>]+src=["']([^"'>]+)["']/i);
  return match ? match[1] : undefined;
}

const PostCard: React.FC<PostCardProps & { onRead: () => void }> = ({
  post,
  onRead,
  onDelete,
}) => {
  const firstImage = post.image || extractFirstImage(post.content);
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700">
      <div className="grid md:grid-cols-3 gap-6 p-6">
        {/* Image */}
        <div className="md:col-span-1">
          <div className="relative aspect-video bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden group cursor-pointer flex items-center justify-center">
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
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white transition-colors line-clamp-1">
              {post.title}
            </h3>
            <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-blue-600 dark:text-blue-400" />
                <span>
                  {new Date(post.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${post.status === "published" ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200" : "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200"}`}
              >
                {post.status === "published" ? "Published" : "Draft"}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-2">
              {post.description}
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={onRead}
              className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 transition-colors duration-200 cursor-pointer font-semibold hover:underline"
            >
              Read <ArrowRight className="w-4 h-4" />
            </button>
            <button
              className="inline-flex items-center gap-1 text-gray-600 dark:text-gray-400 transition-colors duration-200 cursor-pointer font-semibold hover:text-blue-600 dark:hover:text-blue-400"
            >
              <Edit2 className="w-4 h-4" /> Edit
            </button>
            {onDelete && (
              <button
                onClick={() => onDelete(post.id)}
                className="inline-flex items-center gap-1 text-red-600 dark:text-red-400 transition-colors duration-200 cursor-pointer font-semibold hover:underline"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const PostsManager: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
  const [dateRange, setDateRange] = useState<{ from: string; to: string }>({
    from: "",
    to: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [viewPost, setViewPost] = useState<any | null>(null);
  const { data: posts, loading, refetch } = usePosts();
  const { deletePost, loading: deleting } = useDeletePost();

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      await deletePost(id);
      refetch();
      alert("Post deleted successfully");
    } catch (error) {
      alert("Failed to delete post");
    }
  };

  const filtered = (posts || []).filter((post) => {
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

  if (viewPost) {
    return <PostContentPage post={viewPost} onBack={() => setViewPost(null)} />;
  }

  if (viewPost) {
    return <PostContentPage post={viewPost} onBack={() => setViewPost(null)} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">All Blogs</h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Manage and view all your blog posts</p>
      </div>

      <div className="flex flex-wrap gap-4 items-end">
        <label className="flex-1 min-w-[200px]">
          <span className="block text-xs font-semibold mb-2 text-gray-700 dark:text-gray-300">Search</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search posts..."
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
          />
        </label>
        <label>
          <span className="block text-xs font-semibold mb-2 text-gray-700 dark:text-gray-300">Status</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
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
            onChange={(e) =>
              setDateRange((r) => ({ ...r, from: e.target.value }))
            }
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
          />
        </label>
        <label>
          <span className="block text-xs font-semibold mb-2 text-gray-700 dark:text-gray-300">To</span>
          <input
            type="date"
            value={dateRange.to}
            onChange={(e) =>
              setDateRange((r) => ({ ...r, to: e.target.value }))
            }
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
          />
        </label>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-40 w-full" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-500 dark:text-gray-400">
          <p className="text-lg">No posts found</p>
          <p className="text-sm">Try adjusting your filters or search terms</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filtered.map((post) => (
            <PostCard 
              key={post.id} 
              post={post} 
              onRead={() => setViewPost(post)}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostsManager;
