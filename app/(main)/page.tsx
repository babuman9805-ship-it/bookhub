"use client";

import React from "react";
import Hero from "@/components/Hero";
import BookRow from "@/components/BookRow";
import { mockBooks, getBooksByGenre } from "@/lib/mockBooks";

export default function HomePage() {
  // Categorize books based on their genres
  const trendingBooks = getBooksByGenre("Trending Books");
  const newReleases = getBooksByGenre("New Releases");
  const bestSellers = getBooksByGenre("Best Sellers");
  const fantasy = getBooksByGenre("Fantasy");
  const sciFi = getBooksByGenre("Science Fiction");
  const mystery = getBooksByGenre("Mystery");
  const romance = getBooksByGenre("Romance");
  const horror = getBooksByGenre("Horror");
  const biography = getBooksByGenre("Biography");
  const history = getBooksByGenre("History");
  const selfDev = getBooksByGenre("Self Development");
  const academic = getBooksByGenre("Academic Books");
  const medical = getBooksByGenre("Medical Books");
  const tech = getBooksByGenre("Technology Books");

  return (
    <div className="relative min-h-screen bg-[#141414] overflow-x-hidden">
      {/* Hero Banner */}
      <Hero />

      {/* Book Category Rows Container */}
      {/* Heavy negative margin offsets the hero bottom fade, overlaying the card grids */}
      <div className="relative z-20 -mt-8 sm:-mt-16 md:-mt-28 bg-[#141414] pb-12 flex flex-col space-y-2 md:space-y-4">
        <BookRow title="Trending Books" books={trendingBooks} />
        <BookRow title="New Releases" books={newReleases} />
        <BookRow title="Best Sellers" books={bestSellers} />
        <BookRow title="Fantasy" books={fantasy} />
        <BookRow title="Science Fiction" books={sciFi} />
        <BookRow title="Mystery" books={mystery} />
        <BookRow title="Romance" books={romance} />
        <BookRow title="Horror" books={horror} />
        <BookRow title="Biography" books={biography} />
        <BookRow title="History" books={history} />
        <BookRow title="Self Development" books={selfDev} />
        <BookRow title="Academic Books" books={academic} />
        <BookRow title="Medical Books" books={medical} />
        <BookRow title="Technology Books" books={tech} />
      </div>
    </div>
  );
}
