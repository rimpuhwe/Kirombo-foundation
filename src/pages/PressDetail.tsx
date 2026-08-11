import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  ArrowLeft,
  Eye,
  Heart,
  Loader2,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  Copy,
  Check,
} from "lucide-react";
import { Helmet } from "react-helmet";
import { toast } from "sonner";
import ArticleRenderer from "@/components/editor/ArticleRenderer";
import { getPublishedArticleBySlug, incrementArticleLikes, incrementArticleViews, type Article } from "@/lib/articles";

const PressDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setNotFound(false);

    getPublishedArticleBySlug(slug)
      .then((data) => {
        if (!data) {
          setNotFound(true);
          return;
        }
        setPost(data);
        incrementArticleViews(data.id);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleLike = async () => {
    if (!post || liked) return;
    setLiked(true);
    try {
      await incrementArticleLikes(post.id);
      setPost((prev) => (prev ? { ...prev, like_count: prev.like_count + 1 } : prev));
    } catch (err) {
      setLiked(false);
      toast.error(err instanceof Error ? err.message : "Could not like this article");
    }
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = post?.title ?? "";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy link");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-2xl font-bold text-foreground mb-2">Article not found</h1>
          <p className="text-muted-foreground mb-6">
            This story may have been unpublished or the link is incorrect.
          </p>
          <Link to="/press" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Press Room
          </Link>
        </div>
      </div>
    );
  }

  const shareLinks = [
    {
      label: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      label: "Twitter",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      label: "WhatsApp",
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
    },
  ];

  return (
    <>
      <Helmet>
        <title>{post.title} | Abdallah Kiromba Foundation</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        {post.cover_image_url && <meta property="og:image" content={post.cover_image_url} />}
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="min-h-screen bg-background pt-20">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-br from-primary to-deep-green text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Link
                to="/press"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Press Room
              </Link>

              {post.category && (
                <span className="inline-block px-3 py-1 rounded text-xs font-semibold bg-white/20 text-white mb-4">
                  {post.category}
                </span>
              )}

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
              >
                {post.title}
              </motion.h1>

              <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
                {post.published_at && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(post.published_at).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                )}
                {post.author?.name && <span>By {post.author.name}</span>}
                <div className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4" />
                  <span>{post.view_count} views</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cover image */}
        {post.cover_image_url && (
          <div className="container mx-auto px-4 -mt-8">
            <div className="max-w-4xl mx-auto">
              <img
                src={post.cover_image_url}
                alt={post.title}
                className="w-full max-h-[480px] object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        )}

        {/* Article body */}
        <main className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto grid md:grid-cols-[1fr_auto] gap-8">
              <div>
                <p className="text-xl text-muted-foreground mb-8 font-medium leading-relaxed">{post.excerpt}</p>

                <ArticleRenderer content={post.content} />

                <div className="mt-12 pt-8 border-t border-border flex items-center gap-4">
                  <button
                    onClick={handleLike}
                    disabled={liked}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${
                      liked
                        ? "bg-red-100 text-red-500 dark:bg-red-900/30 cursor-default"
                        : "bg-muted hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/30 text-muted-foreground"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${liked ? "fill-red-500 text-red-500" : ""}`} />
                    {post.like_count} {post.like_count === 1 ? "Like" : "Likes"}
                  </button>
                  <Link to="/press" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    ← More stories
                  </Link>
                </div>
              </div>

              {/* Social share aside */}
              <aside className="flex md:flex-col gap-3 md:items-center md:pt-1">
                <span className="hidden md:block text-xs font-semibold text-muted-foreground mb-1">Share</span>
                {shareLinks.map(({ label, icon: Icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Share on ${label}`}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-muted hover:bg-primary hover:text-white text-muted-foreground transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
                <button
                  onClick={handleCopyLink}
                  title="Copy link"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-muted hover:bg-primary hover:text-white text-muted-foreground transition-colors"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default PressDetail;
