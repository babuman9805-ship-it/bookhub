"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BookCard from "@/components/BookCard";
import BookRow from "@/components/BookRow";
import { mockBooks, getBooksByGenre } from "@/lib/mockBooks";

const GENRES = [
  "All",
  "Trending Books",
  "New Releases",
  "Best Sellers",
  "Fantasy",
  "Science Fiction",
  "Mystery",
  "Romance",
  "Horror",
  "Biography",
  "History",
  "Self Development",
  "Academic Books",
  "Medical Books",
  "Technology Books"
];

export default function CategoriesPage() {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre);
    setDropdownOpen(false);
  };

  const isFiltered = selectedGenre !== "All";
  const filteredBooks = isFiltered ? getBooksByGenre(selectedGenre) : [];

  return (
    <div className="relative min-h-screen bg-[#141414] pt-28 pb-16 px-4 md:px-16 select-none">
      {/* Category Header Controls */}
      <div className="flex items-center space-x-6 mb-8 relative z-30">
        <h1 className="text-white text-2xl md:text-4xl font-extrabold tracking-tight">
          Categories
        </h1>

        {/* Dropdown Selector */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-3 px-4 py-1.5 bg-black border border-zinc-700 hover:border-white transition rounded-sm text-xs font-bold uppercase tracking-wider text-zinc-100 cursor-pointer focus:outline-none"
          >
            <span>{selectedGenre}</span>
            <ChevronDown className={`w-4 h-4 transition duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Dropdown Menu Items */}
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute left-0 mt-2 w-48 bg-netflix-dark border border-zinc-800 rounded shadow-2xl py-1 z-40 max-h-80 overflow-y-auto no-scrollbar"
              >
                {GENRES.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => handleGenreSelect(genre)}
                    className={`w-full text-left px-4 py-2.5 text-xs transition focus:outline-none cursor-pointer ${
                      selectedGenre === genre
                        ? "bg-zinc-800 text-white font-bold"
                        : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main categories listing content */}
      <AnimatePresence mode="wait">
        {!isFiltered ? (
          // Default: Category rows
          <motion.div
            key="all-rows"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col space-y-4 -mx-4 md:-mx-16"
          >
            <BookRow title="Fantasy" books={getBooksByGenre("Fantasy")} />
            <BookRow title="Science Fiction" books={getBooksByGenre("Science Fiction")} />
            <BookRow title="Mystery" books={getBooksByGenre("Mystery")} />
            <BookRow title="Romance" books={getBooksByGenre("Romance")} />
            <BookRow title="Self Development" books={getBooksByGenre("Self Development")} />
            <BookRow title="Technology Books" books={getBooksByGenre("Technology Books")} />
          </motion.div>
        ) : (
          // Filtered grid display
          <motion.div
            key="genre-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-10 gap-x-4">
                {filteredBooks.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <p className="text-zinc-500 py-16 text-center text-sm">
                No books found matching the selected genre.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
