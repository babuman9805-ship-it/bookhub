"use client";

import React from "react";
import Link from "next/link";
import { Play, BookOpen } from "lucide-react";
import { useLibrary } from "@/hooks/useLibrary";
import { mockBooks } from "@/lib/mockBooks";
import BookRow from "@/components/BookRow";
import BookCard from "@/components/BookCard";

export default function LibraryPage() {
  const { 
    savedBookIds, 
    favoriteBookIds, 
    completedBookIds, 
    readingProgress, 
    historyBookIds 
  } = useLibrary();

  // Map IDs to full book objects
  const savedBooks = mockBooks.filter((b) => savedBookIds.includes(b.id));
  const favoriteBooks = mockBooks.filter((b) => favoriteBookIds.includes(b.id));
  const completedBooks = mockBooks.filter((b) => completedBookIds.includes(b.id));
  const historyBooks = mockBooks.filter((b) => historyBookIds.includes(b.id));

  // Determine active "Continue Reading" books: progress > 0 and not fully completed
  const continueReadingBooks = mockBooks.filter((b) => {
    const progress = readingProgress[b.id];
    return progress && progress.progressPercent > 0 && !completedBookIds.includes(b.id);
  });

  const hasAnyContent = 
    continueReadingBooks.length > 0 || 
    savedBooks.length > 0 || 
    favoriteBooks.length > 0 || 
    completedBooks.length > 0 || 
    historyBooks.length > 0;

  return (
    <div className="relative min-h-screen bg-[#141414] pt-28 pb-16 select-none">
      {/* Page Title */}
      <h1 className="text-white text-2xl md:text-4xl font-extrabold tracking-tight px-4 md:px-16 mb-8">
        My Library
      </h1>

      {hasAnyContent ? (
        <div className="flex flex-col space-y-4">
          {/* Continue Reading Row */}
          {continueReadingBooks.length > 0 && (
            <div className="flex flex-col select-none">
              <h2 className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-bold px-4 md:px-16">
                Continue Reading
              </h2>
              <div className="flex space-x-4 overflow-x-auto no-scrollbar px-4 md:px-16 pb-12 pt-8 sm:pt-10 overflow-visible -mt-4 sm:-mt-6">
                {continueReadingBooks.map((book) => {
                  const prog = readingProgress[book.id];
                  return (
                    <div key={book.id} className="flex flex-col space-y-2 group relative">
                      <BookCard book={book} />
                      {prog && (
                        <div className="px-1 text-[11px] text-zinc-400 font-semibold flex items-center justify-between">
                          <span className="flex items-center">
                            <BookOpen className="w-3.5 h-3.5 mr-1 text-zinc-500" />
                            Ch {prog.chapterIndex + 1}
                          </span>
                          <span className="text-emerald-500">{prog.progressPercent}% read</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Saved Books Row */}
          <BookRow title="Saved Books" books={savedBooks} />

          {/* Favorites Row */}
          <BookRow title="Favorites" books={favoriteBooks} />

          {/* Completed Books Row */}
          <BookRow title="Completed Books" books={completedBooks} />

          {/* Reading History Row */}
          <BookRow title="Reading History" books={historyBooks} />
        </div>
      ) : (
        // Empty State Placeholder
        <div className="max-w-md mx-auto text-center py-20 px-4 flex flex-col items-center">
          <BookOpen className="w-16 h-16 text-zinc-700 mb-6" />
          <h3 className="text-white font-extrabold text-xl mb-2">Your Library is Empty</h3>
          <p className="text-zinc-500 text-sm mb-8 leading-relaxed">
            You haven't saved, favorited, or read any books yet. Explore categories and find your next story now.
          </p>
          <Link
            href="/"
            className="flex items-center space-x-2 px-6 py-3 bg-netflix-red hover:bg-red-700 text-white font-bold rounded text-sm transition cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Start Browsing</span>
          </Link>
        </div>
      )}
    </div>
  );
}
