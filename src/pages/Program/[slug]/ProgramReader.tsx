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
import { Link, useNavigate } from "react-router-dom";
import { works } from "../../../../types/Work";
import { useState, useEffect } from "react";

export default function ProgramReader({ work }: { work: any }) {
  const navigate = useNavigate();
  // Find initial index by slug
  const initialIndex = works.findIndex((w) => w.slug === work.slug);
  const [selectedIndex, setSelectedIndex] = useState(
    initialIndex >= 0 ? initialIndex : 0
  );

  // Keep selectedIndex in sync with prop changes (e.g., navigation)
  useEffect(() => {
    const idx = works.findIndex((w) => w.slug === work.slug);
    if (idx !== selectedIndex && idx !== -1) setSelectedIndex(idx);
    // eslint-disable-next-line
  }, [work]);

  const mainWork = works[selectedIndex];
  let relatedWorks: typeof works = [];
  if (selectedIndex === works.length - 2) {
    // Second-last: show last and index 1
    relatedWorks = [works[works.length - 1], works[1]];
  } else if (selectedIndex === works.length - 1) {
    // Last: show index 1 and 2
    relatedWorks = [works[0], works[1]];
  } else {
    relatedWorks = works.slice(selectedIndex + 1, selectedIndex + 3);
  }

  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gray-900 h-[80vh] flex items-center justify-center overflow-hidden">
        <img
          src={mainWork.img}
          alt={mainWork.title}
          className="object-cover opacity-50 scale-105 transition-transform duration-700 w-full h-full p-0 m-0"
          style={{ padding: 0, margin: 0 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-8 sm:py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar (Left) - Only for large screens */}
          <aside className="hidden lg:flex lg:flex-col lg:items-center lg:space-y-4 lg:sticky lg:top-36 lg:self-start"></aside>

          {/* Article Content (Right) */}
          <article className="lg:col-span-10">
            <div className="overflow-hidden">
              <div className="p-6 sm:p-4 lg:p-6">
                <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-orange">
                  {mainWork.title}
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
                  dangerouslySetInnerHTML={{ __html: mainWork.fullContent }}
                />

                {/* Related Works */}
                <div className="mt-12">
                  <h3 className="text-2xl font-bold mb-6 text-orange">
                    You might also read about
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {relatedWorks.map((relatedWork, idx) => {
                      // Calculate next index for navigation
                      let nextIndex = selectedIndex + 1 + idx;
                      if (selectedIndex === works.length - 2) {
                        nextIndex = idx === 0 ? works.length - 1 : 1;
                      } else if (selectedIndex === works.length - 1) {
                        nextIndex = idx === 0 ? 1 : 2;
                      }
                      return (
                        <button
                          key={relatedWork.slug}
                          onClick={() => {
                            setSelectedIndex(nextIndex);
                            navigate(`/programs/${relatedWork.slug}`);
                          }}
                          className="group block overflow-hidden text-left w-full"
                          style={{
                            background: "none",
                            border: "none",
                            padding: 0,
                            margin: 0,
                          }}
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
                              <h4 className="text-sm sm:text-base font-bold text-orange-500 line-clamp-2 group-hover:text-orange-500 transition-colors">
                                {relatedWork.title}
                              </h4>
                              <p className="mt-1 text-sm sm:text-base text-gray-600 line-clamp-2">
                                {relatedWork.content}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex justify-start mt-10">
                    <button
                      onClick={() => {
                        navigate("/programs");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="inline-flex items-center text-lg font-semibold text-orange transition-all"
                    >
                      View All Works
                      <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" />
                    </button>
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
