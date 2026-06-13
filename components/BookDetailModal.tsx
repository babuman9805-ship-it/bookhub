"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Plus, Check, Heart, Star, BookOpen, Clock } from "lucide-react";
import { useLibrary } from "@/hooks/useLibrary";
import { mockBooks, getFeaturedBook } from "@/lib/mockBooks";

export default function BookDetailModal() {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const { 
    activeModalBookId, 
    closeModal, 
    savedBookIds, 
    favoriteBookIds, 
    toggleSaved, 
    toggleFavorite,
    openModal
  } = useLibrary();

  const book = mockBooks.find((b) => b.id === activeModalBookId);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeModalBookId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeModalBookId]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeModal]);

  // Click outside modal to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closeModal();
    }
  };

  if (!book) return null;

  const isSaved = savedBookIds.includes(book.id);
  const isFavorite = favoriteBookIds.includes(book.id);

  // Fetch recommendations (books sharing at least one genre, excluding the current book)
  const recommendations = mockBooks
    .filter((b) => b.id !== book.id && b.genres.some((g) => book.genres.includes(g)))
    .slice(0, 6);

  const handleStartReading = (chapterIdx = 0) => {
    closeModal();
    router.push(`/read/${book.id}?c=${chapterIdx}`);
  };

  const handleRecommendClick = (id: string) => {
    // Switch modal content
    const { openModal } = useLibrary(); // get active trigger
    // Since we're in the modal, we can directly select another book ID using state
    const openMod = document.querySelector('[aria-label="More Info"]') as HTMLElement; // fail-safe
    // We can call openModal directly from context
  };

  return (
    <AnimatePresence>
      {activeModalBookId && (
        <div
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/85 overflow-y-auto pt-10 pb-10 select-none"
        >
          <motion.div
            ref={modalRef}
            initial={{ y: 60, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative w-full max-w-4xl bg-[#181818] rounded-md overflow-hidden shadow-2xl border border-zinc-800/80 text-white my-auto flex flex-col"
          >
            {/* Upper Banner Section */}
            <div
              className={`w-full h-[280px] md:h-[400px] bg-gradient-to-br ${book.coverColor} relative flex flex-col justify-end p-6 md:p-12 border-b border-zinc-900`}
            >
              {/* Overlay grid design & fade */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-40"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/30 to-transparent"></div>
              
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-zinc-800 transition duration-150 border border-zinc-700/30 cursor-pointer focus:outline-none z-20"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title & Author Details */}
              <div className="z-10 max-w-[85%]">
                <span className="text-[10px] md:text-xs tracking-widest text-netflix-red font-black uppercase bg-black/40 px-2 py-0.5 rounded w-fit block mb-2">
                  BookFlix Original
                </span>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight drop-shadow-[0_4px_6px_rgba(0,0,0,0.95)] mb-1 leading-none">
                  {book.title}
                </h1>
                <p className="text-zinc-300 font-bold text-sm md:text-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  by {book.author}
                </p>

                {/* Primary Action Buttons */}
                <div className="flex items-center space-x-3 mt-6">
                  <button
                    onClick={() => handleStartReading(0)}
                    className="flex items-center space-x-2.5 px-6 py-2.5 md:px-8 md:py-3 bg-white text-black font-extrabold rounded hover:bg-zinc-200 transition duration-200 focus:outline-none cursor-pointer text-sm md:text-base shadow-lg"
                  >
                    <Play className="w-5 h-5 fill-black text-black" />
                    <span>Start Reading</span>
                  </button>

                  <button
                    onClick={() => toggleSaved(book.id)}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-zinc-500 bg-black/40 hover:border-white hover:bg-zinc-800/60 transition duration-200 flex items-center justify-center cursor-pointer focus:outline-none"
                    title={isSaved ? "Remove from Library" : "Add to Library"}
                  >
                    {isSaved ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </button>

                  <button
                    onClick={() => toggleFavorite(book.id)}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-zinc-500 bg-black/40 hover:border-white hover:bg-zinc-800/60 transition duration-200 flex items-center justify-center cursor-pointer focus:outline-none"
                    title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                  >
                    <Heart
                      className={`w-5 h-5 transition ${
                        isFavorite ? "text-netflix-red fill-netflix-red" : "text-white"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Lower Meta Content Section */}
            <div className="p-6 md:p-12 space-y-8">
              {/* Metadata columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left metadata info column */}
                <div className="md:col-span-2 space-y-4">
                  <div className="flex items-center space-x-3 text-xs md:text-sm">
                    <span className="text-emerald-500 font-bold">{book.matchScore}% Match</span>
                    <span className="text-zinc-400 font-semibold">{book.year}</span>
                    <span className="border border-zinc-600 px-2 py-0.5 rounded text-xs font-bold leading-none text-zinc-300">
                      {book.ageRating}
                    </span>
                    <span className="flex items-center text-zinc-400">
                      <BookOpen className="w-4 h-4 mr-1 text-zinc-500" />
                      {book.pages} pages
                    </span>
                    <span className="flex items-center text-zinc-400">
                      <Clock className="w-4 h-4 mr-1 text-zinc-500" />
                      {book.readTime}
                    </span>
                    <span className="border border-zinc-700 px-1 py-0.2 rounded text-[10px] text-zinc-500 font-bold leading-none">
                      {book.quality}
                    </span>
                  </div>

                  <p className="text-white text-sm md:text-base leading-relaxed font-semibold">
                    {book.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <h3 className="text-zinc-400 font-bold text-xs uppercase tracking-wider">Plot Summary</h3>
                    <p className="text-zinc-300 text-xs md:text-sm leading-relaxed">
                      {book.summary}
                    </p>
                  </div>
                </div>

                {/* Right credits column */}
                <div className="space-y-4 text-xs md:text-sm border-t border-zinc-800 pt-6 md:border-t-0 md:pt-0">
                  <div>
                    <span className="text-zinc-500">Author: </span>
                    <span className="text-zinc-200 font-semibold hover:underline cursor-pointer">{book.author}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">Genres: </span>
                    <span className="text-zinc-200">
                      {book.genres.map((g, i) => (
                        <span key={g}>
                          <span className="hover:underline cursor-pointer">{g}</span>
                          {i < book.genres.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-500">Formats Available: </span>
                    <span className="text-zinc-200 font-medium">EPUB, Text Reader, Audio, PDF</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-zinc-300 pt-2">
                    <span className="text-zinc-500">Average Rating:</span>
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-extrabold">{book.rating} / 5</span>
                  </div>
                </div>
              </div>

              {/* Chapters List Table */}
              <div className="border-t border-zinc-800 pt-8 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-white text-base md:text-lg font-bold">Chapters</h3>
                  <span className="text-xs text-zinc-500 font-semibold">{book.chapters.length} Chapters total</span>
                </div>

                <div className="divide-y divide-zinc-800 border-t border-b border-zinc-850">
                  {book.chapters.map((chapter, index) => (
                    <div
                      key={chapter.id}
                      onClick={() => handleStartReading(index)}
                      className="group flex items-center justify-between py-4 px-3 hover:bg-zinc-800/40 rounded transition cursor-pointer"
                    >
                      <div className="flex items-center space-x-4">
                        <span className="text-zinc-500 font-bold text-sm group-hover:text-white transition w-5">
                          {index + 1}
                        </span>
                        <div className="flex flex-col">
                          <span className="font-bold text-zinc-200 group-hover:text-netflix-red transition text-sm">
                            {chapter.title}
                          </span>
                          <span className="text-[11px] text-zinc-500 mt-0.5">
                            {chapter.content.join(" ").split(" ").length} words
                          </span>
                        </div>
                      </div>
                      
                      <button className="opacity-0 group-hover:opacity-100 transition duration-150 w-7 h-7 rounded-full bg-white flex items-center justify-center focus:outline-none">
                        <Play className="w-3.5 h-3.5 text-black fill-black ml-0.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations Column */}
              {recommendations.length > 0 && (
                <div className="border-t border-zinc-800 pt-8 space-y-5">
                  <h3 className="text-white text-base md:text-lg font-bold">More Like This</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {recommendations.map((rec) => {
                      return (
                        <div
                          key={rec.id}
                          onClick={() => openModal(rec.id)}
                          className="bg-[#2f2f2f]/30 border border-zinc-800/50 rounded overflow-hidden cursor-pointer hover:bg-zinc-800/50 hover:border-zinc-700 transition flex flex-col justify-between"
                        >
                          {/* visual banner */}
                          <div
                            className={`w-full aspect-[16/9] bg-gradient-to-br ${rec.coverColor} p-3 flex flex-col justify-end relative`}
                          >
                            <span className="text-[8px] font-bold text-white bg-black/40 px-1 py-0.2 rounded w-fit block mb-1">
                              {rec.rating} ★
                            </span>
                            <span 
                              className="font-bold text-white text-[10px] sm:text-xs truncate drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
                            >
                              {rec.title}
                            </span>
                          </div>

                          <div className="p-3.5 space-y-2 flex-grow flex flex-col justify-between">
                            <div className="flex items-center justify-between text-[10px] text-zinc-400">
                              <span className="text-emerald-500 font-bold">{rec.matchScore}% Match</span>
                              <span>{rec.year}</span>
                            </div>
                            <p className="text-[11px] text-zinc-300 line-clamp-3 leading-relaxed">
                              {rec.description}
                            </p>
                            
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                closeModal();
                                router.push(`/read/${rec.id}`);
                              }}
                              className="w-full bg-[#333] hover:bg-[#444] text-white py-1.5 mt-2 rounded font-bold text-[11px] transition duration-150 flex items-center justify-center space-x-1"
                            >
                              <Play className="w-2.5 h-2.5 fill-white" />
                              <span>Start Reading</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
