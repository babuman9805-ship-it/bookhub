"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Plus, Check, Heart, ChevronDown, Star } from "lucide-react";
import { Book } from "@/types";
import { useLibrary } from "@/hooks/useLibrary";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const router = useRouter();
  const { 
    savedBookIds, 
    favoriteBookIds, 
    toggleSaved, 
    toggleFavorite, 
    readingProgress, 
    openModal 
  } = useLibrary();
  
  const [isHovered, setIsHovered] = useState(false);

  const isSaved = savedBookIds.includes(book.id);
  const isFavorite = favoriteBookIds.includes(book.id);
  const progress = readingProgress[book.id];

  const handleStartReading = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/read/${book.id}`);
  };

  const handleToggleSaved = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSaved(book.id);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(book.id);
  };

  const handleOpenDetail = (e: React.MouseEvent) => {
    e.stopPropagation();
    openModal(book.id);
  };

  return (
    <div
      className="relative flex-shrink-0 w-[200px] sm:w-[250px] md:w-[280px] aspect-[16/9] cursor-pointer select-none rounded-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleOpenDetail}
    >
      {/* Static Base Card (renders when not hovered) */}
      <div 
        className={`w-full h-full rounded-md bg-gradient-to-br ${book.coverColor} p-4 flex flex-col justify-between border border-zinc-800/30 shadow-md relative overflow-hidden transition-all duration-300`}
      >
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-40"></div>
        
        {/* Card Header */}
        <div className="flex justify-between items-start z-10">
          <span className="text-[9px] md:text-[10px] tracking-wider text-netflix-red font-black uppercase bg-black/30 px-1.5 py-0.5 rounded">
            BookFlix
          </span>
          <span className="text-[10px] font-bold text-zinc-300 flex items-center bg-black/40 px-1.5 py-0.5 rounded">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
            {book.rating}
          </span>
        </div>

        {/* Card Body */}
        <div className="z-10 mt-auto">
          <h3 className="font-extrabold text-white text-sm sm:text-base md:text-lg leading-tight tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] line-clamp-2">
            {book.title}
          </h3>
          <p className="text-zinc-300 text-[10px] sm:text-xs font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] mt-0.5">
            {book.author}
          </p>
        </div>

        {/* Dynamic Reading Progress Bar */}
        {progress && progress.progressPercent > 0 && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-zinc-800 z-10">
            <div 
              className="h-full bg-netflix-red" 
              style={{ width: `${progress.progressPercent}%` }}
            ></div>
          </div>
        )}
      </div>

      {/* Hover Zoom Card Card Overlay */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 0 }}
            animate={{ opacity: 1, scale: 1.28, y: -25 }}
            exit={{ opacity: 0, scale: 0.9, y: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className={`absolute -inset-1 sm:-inset-2 z-30 rounded-lg bg-netflix-dark shadow-[0_10px_30px_rgba(0,0,0,0.9)] flex flex-col border border-zinc-700/50 overflow-hidden`}
          >
            {/* Upper Graphic Part */}
            <div className={`w-full h-2/3 bg-gradient-to-br ${book.coverColor} p-4 flex flex-col justify-between relative overflow-hidden border-b border-zinc-800`}>
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:15px_15px] opacity-30"></div>
              
              <div className="flex justify-between items-start z-10">
                <span className="text-[8px] tracking-wider text-netflix-red font-black uppercase bg-black/40 px-1.5 py-0.5 rounded">
                  BookFlix Original
                </span>
                <span className="text-[10px] font-bold text-zinc-300 flex items-center bg-black/40 px-1.5 py-0.5 rounded">
                  <Star className="w-2.5 h-2.5 text-yellow-500 fill-yellow-500 mr-0.5" />
                  {book.rating}
                </span>
              </div>

              <div className="z-10 mt-auto">
                <h3 className="font-black text-white text-xs sm:text-sm md:text-base leading-tight drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)]">
                  {book.title}
                </h3>
                <p className="text-zinc-300 text-[9px] sm:text-xs font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                  {book.author}
                </p>
              </div>

              {progress && progress.progressPercent > 0 && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-zinc-800 z-10">
                  <div 
                    className="h-full bg-netflix-red" 
                    style={{ width: `${progress.progressPercent}%` }}
                  ></div>
                </div>
              )}
            </div>

            {/* Hover Content Drawer */}
            <div className="px-3.5 py-2 flex flex-col space-y-1.5 bg-netflix-dark">
              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleStartReading}
                    className="w-7 h-7 rounded-full bg-white flex items-center justify-center hover:bg-zinc-200 transition focus:outline-none"
                    title="Start Reading"
                  >
                    <Play className="w-3.5 h-3.5 text-black fill-black ml-0.5" />
                  </button>
                  
                  <button
                    onClick={handleToggleSaved}
                    className="w-7 h-7 rounded-full border border-zinc-500 flex items-center justify-center hover:border-white hover:bg-zinc-800/40 transition focus:outline-none"
                    title={isSaved ? "Remove from Library" : "Add to Library"}
                  >
                    {isSaved ? (
                      <Check className="w-3 h-3 text-white" />
                    ) : (
                      <Plus className="w-3 h-3 text-white" />
                    )}
                  </button>

                  <button
                    onClick={handleToggleFavorite}
                    className="w-7 h-7 rounded-full border border-zinc-500 flex items-center justify-center hover:border-white hover:bg-zinc-800/40 transition focus:outline-none"
                    title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                  >
                    <Heart 
                      className={`w-3 h-3 transition ${isFavorite ? "text-netflix-red fill-netflix-red" : "text-white"}`} 
                    />
                  </button>
                </div>

                <button
                  onClick={handleOpenDetail}
                  className="w-7 h-7 rounded-full border border-zinc-500 flex items-center justify-center hover:border-white hover:bg-zinc-800/40 transition focus:outline-none"
                  title="More Info"
                >
                  <ChevronDown className="w-3 h-3 text-white" />
                </button>
              </div>

              {/* Text Metadata */}
              <div className="flex items-center space-x-1.5 text-[10px] md:text-xs">
                <span className="text-emerald-500 font-bold">{book.matchScore}% Match</span>
                <span className="text-zinc-400">{book.year}</span>
                <span className="border border-zinc-600 px-1 py-0.2 rounded text-[9px] font-bold leading-none text-zinc-300">
                  {book.ageRating}
                </span>
                <span className="text-zinc-400">{book.readTime}</span>
                <span className="border border-zinc-700 px-1 py-0.2 rounded text-[8px] text-zinc-500 leading-none">
                  {book.quality}
                </span>
              </div>

              {/* Genre List */}
              <div className="flex flex-wrap gap-1">
                {book.genres.slice(0, 3).map((genre, idx) => (
                  <span key={genre} className="text-[9px] font-semibold text-zinc-300">
                    {genre}
                    {idx < Math.min(book.genres.slice(0, 3).length - 1, 2) && (
                      <span className="text-zinc-600 mx-1">•</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
