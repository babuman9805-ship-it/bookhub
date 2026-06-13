"use client";

import React from "react";
import Link from "next/link";
import { Heart, Play } from "lucide-react";
import { useLibrary } from "@/hooks/useLibrary";
import { mockBooks } from "@/lib/mockBooks";
import BookCard from "@/components/BookCard";

export default function FavoritesPage() {
  const { favoriteBookIds } = useLibrary();

  // Map IDs to full book objects
  const favoriteBooks = mockBooks.filter((b) => favoriteBookIds.includes(b.id));

  return (
    <div className="relative min-h-screen bg-[#141414] pt-28 pb-16 px-4 md:px-16 select-none">
      {/* Page Title */}
      <h1 className="text-white text-2xl md:text-4xl font-extrabold tracking-tight mb-8">
        My Favorites
      </h1>

      {favoriteBooks.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-10 gap-x-4">
          {favoriteBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        // Empty State Placeholder
        <div className="max-w-md mx-auto text-center py-20 px-4 flex flex-col items-center">
          <Heart className="w-16 h-16 text-zinc-700 mb-6" />
          <h3 className="text-white font-extrabold text-xl mb-2">No Favorites Yet</h3>
          <p className="text-zinc-500 text-sm mb-8 leading-relaxed">
            Mark books as favorites by clicking the heart icon on any book cover or detail panel to collect them here.
          </p>
          <Link
            href="/"
            className="flex items-center space-x-2 px-6 py-3 bg-netflix-red hover:bg-red-700 text-white font-bold rounded text-sm transition cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Discover Books</span>
          </Link>
        </div>
      )}
    </div>
  );
}
