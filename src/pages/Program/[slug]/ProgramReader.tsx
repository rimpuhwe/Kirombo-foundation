"use client";

import {
  User,
  Calendar,
  Facebook,
  Twitter,
  Linkedin,
  Tag,
  ArrowRight,
  Instagram,
} from "lucide-react";
import { Link } from "react-router-dom";
import { works } from "../../../../types/Work";

export default function ProgramReader({ work }: { work: any }) {
  const relatedWorks = works.filter((w) => w.slug !== work.slug).slice(0, 3);

  const workUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/program/${work.slug}`;
  const socialButtons = [
    {
      name: "Facebook",
      icon: <Facebook className="w-5 h-5" />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        workUrl
      )}`,
      bg: "bg-orange text-white hover:bg-white hover:text-orange",
    },
    {
      name: "Twitter",
      icon: <Twitter className="w-5 h-5" />,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        workUrl
      )}&text=${encodeURIComponent(work.title)}`,
      bg: "bg-white text-orange hover:bg-orange hover:text-white",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        workUrl
      )}&title=${encodeURIComponent(work.title)}`,
      bg: "bg-orange text-white hover:bg-white hover:text-orange",
    },
    {
      name: "Copy Link",
      icon: <Instagram className="w-5 h-5" />, // use Link icon if you want
      onClick: async () => {
        try {
          await navigator.clipboard.writeText(workUrl);
          alert("Link copied to clipboard!");
        } catch (err) {
          alert("Failed to copy link.");
          console.error(err);
        }
      },
      bg: "bg-white text-orange hover:bg-orange hover:text-white",
    },
  ];

  const handleUniversalShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: work.title,
          text: "Check out this article!",
          url: workUrl,
        });
      } catch (err) {
        console.error("Web Share failed:", err);
      }
    } else {
      alert("Sharing not supported on this device.");
    }
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gray-900 h-[80vh] sm:h-[80vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
        <img
          src={work.img}
          alt={work.title}
          className="object-cover opacity-50 scale-105 transition-transform duration-700 w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
        <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-8xl">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
            {work.title}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar (Left) - Only for large screens */}
          <aside className="hidden lg:flex lg:flex-col lg:items-center lg:space-y-4 lg:sticky lg:top-36 lg:self-start">
            {socialButtons.map((btn, idx) => {
              const isLink = !!btn.href;
              return isLink ? (
                <Link
                  key={idx}
                  to={btn.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors cursor-pointer ${btn.bg}`}
                  aria-label={`Share to ${btn.name}`}
                >
                  {btn.icon}
                </Link>
              ) : (
                <button
                  key={idx}
                  onClick={btn.onClick || handleUniversalShare}
                  className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors cursor-pointer ${btn.bg}`}
                  aria-label={`Share to ${btn.name}`}
                >
                  {btn.icon}
                </button>
              );
            })}
          </aside>

          {/* Article Content (Right) */}
          <article className="lg:col-span-10">
            <div className="overflow-hidden">
              <div className="p-6 sm:p-4 lg:p-6">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight tracking-tight text-orange">
                  {work.title}
                </h1>
                <div
                  className="prose prose-lg prose-gray max-w-none 
                  prose-headings:text-gray-900 prose-headings:font-bold 
                  prose-p:text-gray-700 prose-p:leading-relaxed 
                  prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline 
                  prose-strong:text-gray-900 
                  prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded 
                  prose-blockquote:border-orange-500 prose-blockquote:bg-orange-50 prose-blockquote:rounded-r-lg 
                  space-y-6 prose-mark:bg-orange-200 prose-mark:text-orange-800 prose-mark:px-1 prose-mark:rounded"
                  dangerouslySetInnerHTML={{ __html: work.fullContent }}
                />

                {/* Mobile Share Buttons */}
                <div className="flex lg:hidden flex-wrap gap-4 mt-8 justify-center">
                  {socialButtons.map((btn, idx) => {
                    const isLink = !!btn.href;
                    return isLink ? (
                      <Link
                        key={idx}
                        to={btn.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors ${btn.bg}`}
                        aria-label={`Share to ${btn.name}`}
                      >
                        {btn.icon}
                      </Link>
                    ) : (
                      <button
                        key={idx}
                        onClick={btn.onClick || handleUniversalShare}
                        className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors cursor-pointer ${btn.bg}`}
                        aria-label={`Share to ${btn.name}`}
                      >
                        {btn.icon}
                      </button>
                    );
                  })}
                </div>

                {/* Related Works */}
                <div className="mt-12">
                  <h3 className="text-2xl font-bold mb-6 text-orange">
                    You might also like
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {relatedWorks
                      .sort(() => Math.random() - 0.5)
                      .slice(0, 2)
                      .map((relatedWork) => (
                        <Link
                          key={relatedWork.slug}
                          to={`/program/${relatedWork.slug}`}
                          className="group block overflow-hidden"
                        >
                          <div className="flex items-center gap-4 sm:p-3">
                            <div className="relative w-20 h-20 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={relatedWork.img}
                                alt={relatedWork.title}
                                className="object-cover group-hover:scale-110 transition-transform duration-300 w-full h-full"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm sm:text-base font-medium text-gray-900 line-clamp-2 group-hover:text-orange-500 transition-colors">
                                {relatedWork.title}
                              </h4>
                              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                {relatedWork.date}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                  <div className="flex justify-start mt-10">
                    <Link
                      to="/program"
                      className="inline-flex items-center text-lg font-semibold text-orange transition-all"
                    >
                      View All Programs
                      <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
