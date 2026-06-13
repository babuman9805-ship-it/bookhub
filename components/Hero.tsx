"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Play, Info, Star, BookOpen } from "lucide-react";
import { useLibrary } from "@/hooks/useLibrary";
import { mockBooks } from "@/lib/mockBooks";

export default function Hero() {
  const router = useRouter();
  const { openModal } = useLibrary();
  const [activeIndex, setActiveIndex] = useState(0);

  const featuredBooks = useMemo(
    () => mockBooks.filter((book) => book.genres.some((genre) => genre.toLowerCase().includes("trending"))).slice(0, 6),
    []
  );

  useEffect(() => {
    if (featuredBooks.length === 0) return;

    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featuredBooks.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [featuredBooks.length]);

  const book = featuredBooks[activeIndex] || mockBooks[0];

  const handleStartReading = () => {
    router.push(`/read/${book.id}`);
  };

  const handleOpenDetail = () => {
    openModal(book.id);
  };

  return (
    <div
      className="relative w-full h-[50vh] sm:h-[65vh] md:h-[85vh] min-h-[400px] max-h-[850px] flex items-center select-none overflow-hidden bg-black"
      onMouseDown={(e) => e.preventDefault()}
      style={{ userSelect: "none" }}
    >
      {/* Background Graphic Banner */}
      <AnimatePresence mode="wait">
        <motion.div
          key={book.id}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -80 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`absolute inset-0 bg-gradient-to-br ${book.coverColor} transition-all duration-700`}
        >
          {/* Visual textures / Grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)]"></div>
        </motion.div>
      </AnimatePresence>

      {/* Netflix left-to-right mask */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-10"></div>
      
      {/* Netflix bottom mask */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent z-10"></div>

      {/* Hero Content */}
      <div className="relative z-20 px-4 md:px-16 w-full max-w-[800px] mt-16 md:mt-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={book.id}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-4"
          >
            {/* Featured Badge */}
            <div className="flex items-center space-x-2">
              <span className="text-[10px] md:text-xs font-black tracking-widest text-[#E50914] bg-netflix-red/10 border border-netflix-red/30 px-2 py-0.5 rounded">
                FEATURED BOOK
              </span>
              <div className="flex items-center text-xs text-zinc-300 font-semibold space-x-2">
                <span className="flex items-center text-emerald-400">
                  {book.matchScore}% Match
                </span>
                <span>•</span>
                <span>{book.year}</span>
                <span>•</span>
                <span className="flex items-center">
                  <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500 mr-1" />
                  {book.rating}
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.95)]">
              {book.title}
            </h1>

            {/* Author */}
            <p className="text-zinc-300 text-lg md:text-2xl font-bold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              by {book.author}
            </p>

            {/* Short description */}
            <p className="text-zinc-200 text-xs sm:text-sm md:text-base max-w-[550px] leading-relaxed drop-shadow-[0_2px_3px_rgba(0,0,0,0.95)] font-semibold">
              {book.description}
            </p>

            {/* Metadata badges */}
            <div className="flex items-center space-x-2.5 text-xs text-zinc-400 pt-2">
              <span className="border border-zinc-600 px-1.5 py-0.2 rounded text-[10px] text-zinc-300 font-extrabold">
                {book.ageRating}
              </span>
              <span className="flex items-center">
                <BookOpen className="w-4 h-4 mr-1 text-zinc-500" />
                {book.pages} pages
              </span>
              <span>•</span>
              <span>Est. {book.readTime}</span>
            </div>

            {/* Action buttons */}
            <div className="flex items-center space-x-3.5 pt-4">
              <button
                onClick={handleStartReading}
                className="flex items-center space-x-2.5 px-6 py-3 bg-white text-black hover:bg-zinc-200 transition duration-200 rounded font-extrabold text-sm md:text-base focus:outline-none cursor-pointer shadow-lg active:scale-95"
              >
                <Play className="w-4 h-4 md:w-5 md:h-5 fill-black text-black" />
                <span>Start Reading</span>
              </button>

              <button
                onClick={handleOpenDetail}
                className="flex items-center space-x-2.5 px-6 py-3 bg-zinc-600/40 text-white hover:bg-zinc-700/60 transition duration-200 rounded font-extrabold text-sm md:text-base focus:outline-none border border-zinc-500/20 backdrop-blur-sm cursor-pointer active:scale-95"
              >
                <Info className="w-4 h-4 md:w-5 md:h-5" />
                <span>More Info</span>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
