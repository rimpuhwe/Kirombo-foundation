import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Eye, Heart, Loader2 } from "lucide-react";
import { Helmet } from "react-helmet";
import { apiClient, Post } from "@/services/api";
import DOMPurify from "dompurify";

const PressDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    apiClient.getPost(id)
      .then((data) => {
        if (data.status !== "published") {
          navigate("/press", { replace: true });
          return;
        }
        setPost(data);
        // Record the view
        apiClient.recordView(id).catch(() => {});
      })
      .catch(() => navigate("/press", { replace: true }))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleLike = async () => {
    if (!post || liked) return;
    try {
      const updated = await apiClient.likePost(post.id);
      setPost(updated);
      setLiked(true);
    } catch {
      // ignore
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (!post) return null;

  const safeContent = DOMPurify.sanitize(post.content);

  return (
    <>
      <Helmet>
        <title>{post.title} | Abdallah Kiromba Foundation</title>
        <meta name="description" content={post.description} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        {post.coverImage && <meta property="og:image" content={post.coverImage} />}
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
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(post.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4" />
                  <span>{post.views} views</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cover image */}
        {post.coverImage && (
          <div className="container mx-auto px-4 -mt-8">
            <div className="max-w-4xl mx-auto">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full max-h-[480px] object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        )}

        {/* Article body */}
        <main className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {/* Description / lead */}
              <p className="text-xl text-muted-foreground mb-8 font-medium leading-relaxed">
                {post.description}
              </p>

              {/* Body content from editor */}
              <article
                className="prose prose-lg max-w-none dark:prose-invert
                  prose-headings:font-bold prose-headings:text-foreground
                  prose-p:text-foreground/80 prose-p:leading-relaxed
                  prose-img:rounded-xl prose-img:shadow-md prose-img:mx-auto
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: safeContent }}
              />

              {/* Like button */}
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
                  {post.likes} {post.likes === 1 ? "Like" : "Likes"}
                </button>
                <Link
                  to="/press"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← More stories
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default PressDetail;
