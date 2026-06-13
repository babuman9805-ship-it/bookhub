"use client";

import React, { useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import BookCard from "@/components/BookCard";
import { mockBooks } from "@/lib/mockBooks";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [isPending, startTransition] = useTransition();

  // Search logic filtering
  const filteredBooks = mockBooks.filter((book) => {
    if (!query) return false;
    const lowerQuery = query.toLowerCase().trim();
    
    const titleMatch = book.title.toLowerCase().includes(lowerQuery);
    const authorMatch = book.author.toLowerCase().includes(lowerQuery);
    const yearMatch = book.year.toString().includes(lowerQuery);
    const genreMatch = book.genres.some((g) => g.toLowerCase().includes(lowerQuery));
    const descMatch = book.description.toLowerCase().includes(lowerQuery);
    const summaryMatch = book.summary.toLowerCase().includes(lowerQuery);

    return titleMatch || authorMatch || yearMatch || genreMatch || descMatch || summaryMatch;
  });

  const popularSearches = [
    "Quantum", "Dragons", "AI Revolution", "Gothic", "Steve Jobs", "Rome"
  ];

  return (
    <div className="relative min-h-screen bg-[#141414] pt-28 pb-16 px-4 md:px-16 select-none">
      {query ? (
        // Results View
        <div className="space-y-6">
          <h2 className="text-zinc-400 text-sm md:text-base font-semibold">
            Showing results for <span className="text-white font-black italic">"{query}"</span>
          </h2>

          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-10 gap-x-4">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            // No Results Found
            <div className="py-20 text-left max-w-2xl">
              <p className="text-zinc-400 text-sm md:text-base mb-4 leading-relaxed">
                Your search for <span className="text-white font-semibold">"{query}"</span> did not return any matches.
              </p>
              <ul className="text-zinc-500 text-xs md:text-sm list-disc pl-5 space-y-2 leading-relaxed">
                <li>Double check the spelling.</li>
                <li>Try searching for a different keyword (e.g. "cyber", "magic").</li>
                <li>Try searching by author (e.g. "Vance", "Thorne").</li>
                <li>Try exploring specific categories like "Fantasy" or "History".</li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        // Initial Search Prompt
        <div className="max-w-md mx-auto text-center py-20 px-4 flex flex-col items-center">
          <Search className="w-16 h-16 text-zinc-700 mb-6" />
          <h3 className="text-white font-extrabold text-xl mb-2">Search BookFlix</h3>
          <p className="text-zinc-500 text-sm mb-8 leading-relaxed">
            Search by book titles, author names, genres, release years, or topics in descriptions.
          </p>

          <div className="flex flex-col items-center space-y-3">
            <span className="text-[11px] text-zinc-600 font-extrabold uppercase tracking-widest">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-2 justify-center">
              {popularSearches.map((keyword) => (
                <a
                  key={keyword}
                  href={`/search?q=${encodeURIComponent(keyword)}`}
                  className="px-3.5 py-1.5 bg-zinc-800/40 border border-zinc-850 hover:bg-zinc-800 hover:border-zinc-700 rounded text-xs font-semibold text-zinc-300 transition duration-150 cursor-pointer"
                >
                  {keyword}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
