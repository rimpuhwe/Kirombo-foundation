"use client";

import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProgramReader from "./[slug]/ProgramReader";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { works } from "../../../types/Work";

export default function ProgramSection() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [WorkPerPage, setWorkPerPage] = useState(6);
  const [selectedWork, setSelectedWork] = useState(null);

  useEffect(() => {
    const updatePerPage = () => {
      if (window.innerWidth < 768) setWorkPerPage(6);
      else setWorkPerPage(6);
    };
    updatePerPage();
    window.addEventListener("resize", updatePerPage);
    return () => window.removeEventListener("resize", updatePerPage);
  }, []);

  // Sync selectedWork with slug param
  useEffect(() => {
    if (slug) {
      const found = works.find((w) => w.slug === slug);
      setSelectedWork(found || null);
    } else {
      setSelectedWork(null);
    }
  }, [slug]);

  const totalPages = Math.ceil(works.length / WorkPerPage);
  const indexOfLastWork = currentPage * WorkPerPage;
  const indexOfFirstWork = indexOfLastWork - WorkPerPage;
  const currentWork = works.slice(indexOfFirstWork, indexOfLastWork);
  // Animation variants for framer-motion
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

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

  const handleReadMore = (works: any) => {
    setSelectedWork(works);
    navigate(`/programs/${works.slug}`, { replace: false });
  };

  const handleBack = () => {
    setSelectedWork(null);
    navigate(`/programs`, { replace: false });
  };

  return (
    <>
      
      {selectedWork ? (
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
          <Button onClick={handleBack} className="mb-6" variant="outline">
            Back to Programs
          </Button>
          {/* @ts-ignore */}
          <ProgramReader work={selectedWork} />
        </div>
      ) : (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3 }}
          >
            <section className="bg-gray-50">
              {/* Hero Section */}
              <section id="hero" className="relative h-[500px] mt-20">
                <div className="absolute inset-0">
                  <img
                    src="https://live.staticflickr.com/65535/54362469544_bfc6d29807_z.jpg"
                    alt="Kirombo foundation community gathering"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </div>
                <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <p className="text-white/90 text-lg mb-4 font-medium">
                      Our Work
                    </p>
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                      WHAT WE DO
                    </h1>
                  </motion.div>
                </div>
              </section>
              {/* Add margin after hero section */}
              <div className="mb-12" />
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
                  Your support helps us bring opportunity, protection, and
                  lasting hope to the most vulnerable among us.
                </motion.p>
              </motion.div>
              {/* Blog Cards and Pagination */}
              <div className="w-full max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentWork.map((work) => (
                    <motion.div
                      key={work.slug}
                      variants={itemVariants}
                      className="relative bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                    >
                      <div className="relative w-full h-56">
                        <img
                          src={work.img ?? "/images/default.jpg"}
                          alt={work.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      {/* Category removed as requested */}
                      <div className="p-5">
                        <h3 className="text-2xl font-extrabold text-orange mb-2 line-clamp-2">
                          {work.title}
                        </h3>
                        <p className="text-base text-muted-foreground mb-6 line-clamp-3">
                          {work.content}
                        </p>
                        <div className="flex justify-end">
                          <Button
                            size="sm"
                            variant="link"
                            className="flex items-center gap-1 text-primary hover:text-orange-500 transition-colors duration-200 cursor-pointer"
                            onClick={() => handleReadMore(work)}
                          >
                            Read More <ArrowRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        </>
      )}
      
    </>
  );
}
