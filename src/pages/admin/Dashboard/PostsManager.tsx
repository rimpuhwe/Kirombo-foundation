import React, { useEffect, useState } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import PostContentPage from './PostContentPage';


interface PostCardProps {
  post: {
    title: string;
    description: string;
    content: string;
    image?: string;
    status: 'posted' | 'draft';
    createdAt: string;
  };
}

function extractFirstImage(html: string): string | undefined {
  const match = html.match(/<img[^>]+src=["']([^"'>]+)["']/i);
  return match ? match[1] : undefined;
}

const PostCard: React.FC<PostCardProps & { onRead: () => void }> = ({ post, onRead }) => {
  const firstImage = post.image || extractFirstImage(post.content);
  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all border border-border">
      <div className="grid md:grid-cols-3 gap-6 p-6">
        {/* Image */}
        <div className="md:col-span-1">
          <div className="relative aspect-video bg-muted rounded-xl overflow-hidden group cursor-pointer flex items-center justify-center">
            {firstImage && <img src={firstImage} alt={post.title} className="object-cover w-full h-full" />}
          </div>
        </div>
        {/* Details */}
        <div className="md:col-span-2 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-3 text-foreground transition-colors line-clamp-1">{post.title}</h3>
            <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-primary" />
                <span>{new Date(post.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-semibold ${post.status === 'posted' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{post.status === 'posted' ? 'Posted' : 'Draft'}</span>
            </div>
            <p className="text-muted-foreground mb-6 line-clamp-2">{post.description}</p>
          </div>
          <button
            onClick={onRead}
            className="inline-flex items-center gap-1 text-secondary transition-colors duration-200 cursor-pointer font-semibold hover:underline mt-2"
          >
            Read the Story <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const getDrafts = () => {
  try {
    return JSON.parse(localStorage.getItem('blogDrafts') || '[]');
  } catch {
    return [];
  }
};

const getPosted = async () => {
  try {
    const res = await fetch('http://localhost:8080/api/posts');
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
};

const PostsManager: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'posted' | 'draft'>('all');
  const [dateRange, setDateRange] = useState<{ from: string; to: string }>({ from: '', to: '' });
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewPost, setViewPost] = useState<any | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const drafts = getDrafts().map((d: any) => ({ ...d, status: 'draft' }));
      const posted = (await getPosted()).map((p: any) => ({ ...p, status: 'posted' }));
      setPosts([...drafts, ...posted]);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const filtered = posts.filter((post) => {
    if (filter !== 'all' && post.status !== filter) return false;
    if (dateRange.from && new Date(post.createdAt) < new Date(dateRange.from)) return false;
    if (dateRange.to && new Date(post.createdAt) > new Date(dateRange.to)) return false;
    return true;
  });

  if (viewPost) {
    return <PostContentPage post={viewPost} onBack={() => setViewPost(null)} />;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-wrap gap-4 mb-6 items-end">
        <label>
          <span className="block text-xs font-semibold mb-1">Filter</span>
          <select value={filter} onChange={e => setFilter(e.target.value as any)} className="border rounded px-2 py-1">
            <option value="all">All</option>
            <option value="posted">Posted</option>
            <option value="draft">Draft</option>
          </select>
        </label>
        <label>
          <span className="block text-xs font-semibold mb-1">From</span>
          <input type="date" value={dateRange.from} onChange={e => setDateRange(r => ({ ...r, from: e.target.value }))} className="border rounded px-2 py-1" />
        </label>
        <label>
          <span className="block text-xs font-semibold mb-1">To</span>
          <input type="date" value={dateRange.to} onChange={e => setDateRange(r => ({ ...r, to: e.target.value }))} className="border rounded px-2 py-1" />
        </label>
      </div>
      {loading ? (
        <div className="text-center py-10 text-gray-400">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-10 text-gray-400">No posts found.</div>
      ) : (
        <div className="grid gap-8">
          {filtered.map((post, i) => (
            <PostCard key={i} post={post} onRead={() => setViewPost(post)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostsManager;
