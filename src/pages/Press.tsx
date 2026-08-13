import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { listPublishedArticlesPage, type ArticleSummary } from "@/lib/articles";

const PAGE_SIZE = 5;

/** Windowed page-number list with ellipses, e.g. [1, "ellipsis", 4, 5, 6, "ellipsis", 42]. */
function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  const delta = 1;
  const left = Math.max(2, current - delta);
  const right = Math.min(total - 1, current + delta);

  const pages: (number | "ellipsis")[] = [1];
  if (left > 2) pages.push("ellipsis");
  for (let i = left; i <= right; i++) pages.push(i);
  if (right < total - 1) pages.push("ellipsis");
  if (total > 1) pages.push(total);
  return pages;
}

// Static external press items kept for media coverage section
const staticItems = [
  {
    title: "Before the School Term Began, Hope Arrived",
    date: "January 2, 2026",
    category: "National",
    image: "https://res.cloudinary.com/dcgmi6w24/image/upload/v1768198904/IMG-3_khjmbk.jpg",
    description:
      "With the new school term approaching, vulnerable families received the support needed to help their children return to school on time.",
    link: "https://rwandadispatch.com/charity-support-enables-vulnerable-children-to-stay-in-school/",
  },
  {
    title: "Over 100 Orphan Students Receive School Support from Abdallah Kiromba Foundation and Zakat Foundation",
    date: "September 09, 2025",
    category: "National",
    image: "https://live.staticflickr.com/65535/54592154662_6d9c4f5b2e_z.jpg",
    description:
      "More than 100 orphan students across Rwanda have received school fees and essential school supplies through an initiative led by the Abdallah Kiromba Foundation (AKF) in partnership with the Zakat Foundation of America.",
    link: "https://rwandadispatch.com/over-100-students-receive-school-support-from-abdallah-kiromba-and-zakat-foundations/",
  },
  {
    title: "Muslim families in Kigali, Gisenyi and Musanze receive food packages during Ramadan",
    date: "March 15, 2025",
    category: "Social",
    image: "https://live.staticflickr.com/65535/54595422912_766f4e5f3a_z.jpg",
    description:
      "As the holy month of Ramadan unfolds, bringing with it a spirit of generosity and unity, the Abdallah Kiromba Foundation in partnership with Zakat Foundation of America, have continued to support vulnerable",
    link: "https://rwandadispatch.com/muslim-families-in-kigali-gisenyi-and-musanze-receive-food-packages-during-ramadan/",
  },
  {
    title: "AKF, ZF foundations support Orphans across Rwanda with basic education supplies",
    date: "September 21, 2024",
    category: "Social",
    image: "https://live.staticflickr.com/65535/54593034206_1c95fe45e8_z.jpg",
    description:
      "When the new school term approaches, many students across Rwanda prepare to return to the classroom, but for orphans and vulnerable children, this season often brings more anxiety than excitement.",
    link: "https://rwandadispatch.com/zakat-foundation-of-america-zf-in-partnership-with-abdullah-kiromba-foundation-akf-extends-lifeline-to-orphans-across-rwanda/",
  },
  {
    title: "From Struggles to Sustainability: Goat Gifts Change Livelihoods in Gatoki Village",
    date: "May 13, 2025",
    category: "Social",
    image: "https://live.staticflickr.com/65535/54595667438_03c1eedc42_z.jpg",
    description:
      "As the rooster crows loudly in the early morning, Moses Mugisha wakes his wife to begin the day's work.",
    link: "https://rwandadispatch.com/from-struggles-to-sustainability-goat-gifts-change-livelihoods-in-gatoki-village/",
  },
];

function PostCardSkeleton() {
  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-soft border border-border">
      <div className="grid md:grid-cols-3 gap-6 p-6">
        <Skeleton className="aspect-video rounded-xl" />
        <div className="md:col-span-2 space-y-3">
          <Skeleton className="h-7 w-3/4" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
}

const Press = () => {
  const [posts, setPosts] = useState<ArticleSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPosts = useCallback(async (targetPage: number) => {
    try {
      setLoading(true);
      const result = await listPublishedArticlesPage(targetPage, PAGE_SIZE);
      // The page we asked for no longer exists (e.g. articles were removed
      // since the last fetch) — clamp back to the new last page instead of
      // showing an empty page.
      if (result.articles.length === 0 && targetPage > result.totalPages) {
        setPage(result.totalPages);
        return;
      }
      setPosts(result.articles);
      setTotalPages(result.totalPages);
    } catch {
      // silently keep whatever we had — pagination failure shouldn't break the page
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts(page);
    // Refresh every 60 seconds so newly published posts appear automatically
    const interval = setInterval(() => fetchPosts(page), 60_000);
    return () => clearInterval(interval);
  }, [fetchPosts, page]);

  const goToPage = useCallback(
    (newPage: number) => {
      if (loading || newPage < 1 || newPage > totalPages || newPage === page) return;
      setPage(newPage);
    },
    [loading, page, totalPages]
  );

  return (
    <>
      <Helmet>
        <title>Latest News | Abdallah Kiromba Foundation</title>
        <meta
          name="description"
          content="Stay updated with the latest news, activities, and press releases from the Abdallah Kiromba Foundation."
        />
        <meta property="og:title" content="Press & Media" />
        <meta property="og:url" content="https://www.abdallahkirombafoundation.com/press" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <main className="pt-20">
          {/* Hero */}
          <section className="py-20 bg-gradient-to-br from-primary to-deep-green text-white">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl mx-auto text-center"
              >
                <h1 className="text-5xl md:text-6xl font-bold mb-6">Press Room</h1>
                <p className="text-2xl text-white/90">
                  Latest news, activities, and updates from the Abdallah Kiromba Foundation
                </p>
              </motion.div>
            </div>
          </section>

          {/* Dynamic posts from database */}
          {(loading || posts.length > 0) && (
            <section className="py-16">
              <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-foreground">Latest Updates</h2>
                    <button
                      onClick={() => fetchPosts(page)}
                      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Refresh
                    </button>
                  </div>

                  <div className="grid gap-8">
                    {loading
                      ? [1, 2].map((i) => <PostCardSkeleton key={i} />)
                      : posts.map((post, index) => (
                          <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.08 }}
                            className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all border border-border"
                          >
                            <div className="grid md:grid-cols-3 gap-6 p-6">
                              {/* Image */}
                              <div className="md:col-span-1">
                                <div className="relative aspect-video bg-muted rounded-xl overflow-hidden">
                                  {post.cover_image_url ? (
                                    <img
                                      src={post.cover_image_url}
                                      alt={post.title}
                                      className="object-cover w-full h-full"
                                    />
                                  ) : (
                                    <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                                      <span className="text-primary/40 text-sm font-medium">
                                        {post.category || "AKF"}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Content */}
                              <div className="md:col-span-2">
                                <div className="flex items-center gap-2 mb-2">
                                  {post.category && (
                                    <span className="text-xs font-semibold px-2 py-0.5 bg-primary/10 text-primary rounded">
                                      {post.category}
                                    </span>
                                  )}
                                </div>
                                <h3 className="text-2xl font-bold mb-3 text-foreground">
                                  {post.title}
                                </h3>
                                {post.published_at && (
                                  <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                                    <Calendar size={14} className="text-primary" />
                                    <span>
                                      {new Date(post.published_at).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                      })}
                                    </span>
                                  </div>
                                )}
                                <p className="text-muted-foreground mb-6 line-clamp-3">
                                  {post.excerpt}
                                </p>
                                <Link
                                  to={`/press/${post.slug}`}
                                  className="inline-flex items-center gap-1 text-secondary font-semibold hover:underline transition-colors"
                                >
                                  Read Full Story <ArrowRight className="w-4 h-4" />
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                  </div>

                  {!loading && totalPages > 1 && (
                    <Pagination className="mt-10">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              goToPage(page - 1);
                            }}
                            aria-disabled={page === 1}
                            tabIndex={page === 1 ? -1 : undefined}
                            className={page === 1 ? "pointer-events-none opacity-50" : undefined}
                          />
                        </PaginationItem>

                        {getPageNumbers(page, totalPages).map((p, idx) =>
                          p === "ellipsis" ? (
                            <PaginationItem key={`ellipsis-${idx}`}>
                              <PaginationEllipsis />
                            </PaginationItem>
                          ) : (
                            <PaginationItem key={p}>
                              <PaginationLink
                                href="#"
                                isActive={p === page}
                                onClick={(e) => {
                                  e.preventDefault();
                                  goToPage(p);
                                }}
                              >
                                {p}
                              </PaginationLink>
                            </PaginationItem>
                          )
                        )}

                        <PaginationItem>
                          <PaginationNext
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              goToPage(page + 1);
                            }}
                            aria-disabled={page === totalPages}
                            tabIndex={page === totalPages ? -1 : undefined}
                            className={page === totalPages ? "pointer-events-none opacity-50" : undefined}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Static media coverage */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-foreground mb-8">Media Coverage</h2>
                <div className="grid gap-8">
                  {staticItems.map((news, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all border border-border"
                    >
                      <div className="grid md:grid-cols-3 gap-6 p-6">
                        <div className="md:col-span-1">
                          <div className="relative aspect-video bg-muted rounded-xl overflow-hidden group cursor-pointer">
                            <div className="absolute inset-0 bg-primary/80 flex items-center justify-center group-hover:bg-primary/70 transition-colors">
                              <img src={news.image} alt={news.title} />
                            </div>
                          </div>
                        </div>
                        <div className="md:col-span-2">
                          <h3 className="text-2xl font-bold mb-3 text-foreground">{news.title}</h3>
                          <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Calendar size={16} className="text-primary" />
                              <span>{news.date}</span>
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-6">{news.description}</p>
                          <a
                            href={news.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-secondary font-semibold hover:underline transition-colors"
                          >
                            Read Full Story <ArrowRight className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Press;
