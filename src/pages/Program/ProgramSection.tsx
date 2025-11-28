"use client";

import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { works } from "../../../types/Work";

export default function ProgramSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [WorkPerPage, setWorkPerPage] = useState(6);

  useEffect(() => {
    const updatePerPage = () => {
      if (window.innerWidth < 768) setWorkPerPage(3);
      else setWorkPerPage(6);
    };
    updatePerPage();
    window.addEventListener("resize", updatePerPage);
    return () => window.removeEventListener("resize", updatePerPage);
  }, []);

  const totalPages = Math.ceil(works.length / WorkPerPage);
  const indexOfLastBlog = currentPage * WorkPerPage;
  const indexOfFirstBlog = indexOfLastBlog - WorkPerPage;
  const currentBlogs = works.slice(indexOfFirstBlog, indexOfLastBlog);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) pages.push(1, 2, 3, 4, 5, "...", totalPages);
      else if (currentPage > totalPages - 4)
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      else
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
    }
    return pages;
  };

  // Animations
  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const heading = "Acts of Charity That Live Beyond Us".split(
    " "
  );
  const paragraph =
    "Explore our initiatives rooted in compassion, Sadaqah Jariyah, and community care. See how your support helps educate, empower, and transform lives.".split(
      " "
    );

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.3 }}
      >
        <section className="bg-gray-50">
          {/* Hero Section */}
          <div className="relative bg-gray-900 min-h-[30vh] py-24 mb-20">
            <div className="absolute inset-0">
              <img
                src="https://live.staticflickr.com/65535/54362469544_bfc6d29807_z.jpg"
                alt="Blog Background"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black opacity-60"></div>
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4 py-16">
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg leading-tight"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.3 }}
              >
                {heading.map((word, index) => (
                  <motion.span
                    key={index}
                    variants={wordVariants}
                    className="inline-block mr-2"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              <motion.p
                className="mt-4 text-lg md:text-xl text-gray-200 max-w-xl"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.3 }}
              >
                {paragraph.map((word, index) => (
                  <motion.span
                    key={index}
                    variants={wordVariants}
                    className="inline-block mr-1"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.p>
            </div>
          </div>

          {/* Section Intro */}
          <motion.div
            className="w-full max-w-7xl mx-auto px-4 text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
          >
            <motion.div variants={itemVariants}>
              <Badge variant="default" className="mb-4">
                Legacy
              </Badge>
            </motion.div>

            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
              variants={itemVariants}
            >
              Acts of Charity That Live Beyond Us
            </motion.h2>

            <motion.p
              className="text-gray-600 max-w-2xl mx-auto mb-12 text-lg"
              variants={itemVariants}
            >
              Your support helps us bring opportunity, protection, and lasting hope to the 
              most vulnerable among us.
            </motion.p>
          </motion.div>

          {/* Blog Cards */}
          <div className="w-full max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentBlogs.map((blog) => (
                <motion.div
                  key={blog.slug}
                  variants={itemVariants}
                  className="relative bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="relative w-full h-56">
                    <img
                      src={blog.img ?? "/images/default.jpg"}
                      alt={blog.title}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  {/* Category removed as requested */}

                  <div className="p-5">
                    <h3 className="text-2xl font-extrabold text-orange mb-2 line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-base text-muted-foreground mb-6 line-clamp-3">
                      {blog.content}
                    </p>

                    <div className="flex justify-end">
                      <Link to={`/program/${blog.slug}`}>
                        <Button
                          size="sm"
                          variant="link"
                          className="flex items-center gap-1 text-primary hover:text-orange-500 transition-colors duration-200 cursor-pointer"
                        >
                          Read More <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-2 rounded-full px-6 py-3">
                <Button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  variant="link"
                  size="icon"
                  className="rounded-full hover:bg-gray-100"
                >
                  <ChevronLeft className="w-10 h-10" />
                </Button>

                {getPageNumbers().map((page, index) =>
                  page === "..." ? (
                    <span key={index} className="text-gray-500 px-2">
                      ...
                    </span>
                  ) : (
                    <button
                      key={index}
                      onClick={() => handlePageChange(Number(page))}
                      className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-medium transition-all ${
                        page === currentPage
                          ? "bg-orange text-white shadow-md"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <Button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  variant="link"
                  size="icon"
                  className="rounded-full hover:bg-gray-100"
                >
                  <ChevronRight className="w-10 h-10" />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
      <Footer />
    </>
  );
}
