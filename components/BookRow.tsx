"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Book } from "@/types";
import BookCard from "./BookCard";

interface BookRowProps {
  title: string;
  books: Book[];
}

export default function BookRow({ title, books }: BookRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  if (books.length === 0) return null;

  const updateArrows = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 5);
      // Allow a tiny safety margin (1px) for fractional widths
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  const handleScroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { clientWidth } = rowRef.current;
      const scrollAmount = direction === "left" ? -clientWidth * 0.75 : clientWidth * 0.75;
      
      rowRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
      
      // Update arrows after smooth scroll finishes
      setTimeout(updateArrows, 500);
    }
  };

  useEffect(() => {
    const row = rowRef.current;
    if (row) {
      row.addEventListener("scroll", updateArrows);
      // Initial trigger check
      updateArrows();
      // Handle window resize check
      window.addEventListener("resize", updateArrows);
    }
    return () => {
      if (row) {
        row.removeEventListener("scroll", updateArrows);
      }
      window.removeEventListener("resize", updateArrows);
    };
  }, [books]);

  return (
    <div className="flex flex-col select-none py-2 overflow-visible">
      {/* Row Header */}
      <h2 className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-bold px-4 md:px-16 hover:text-zinc-300 transition duration-200 cursor-pointer inline-block w-fit z-10">
        {title}
      </h2>

      {/* Slide Container */}
      <div className="relative group overflow-visible -mt-4 sm:-mt-6">
        {/* Left Arrow Button */}
        {showLeftArrow && (
          <button
            onClick={() => handleScroll("left")}
            className="absolute left-0 top-8 sm:top-10 bottom-12 w-10 md:w-16 bg-black/50 hover:bg-black/80 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition duration-200 z-20 focus:outline-none border-y border-r border-zinc-800/10 rounded-r-md cursor-pointer"
            aria-label="Scroll Left"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 hover:scale-125 transition duration-150" />
          </button>
        )}

        {/* Horizontal Card Scroller */}
        <div
          ref={rowRef}
          onScroll={updateArrows}
          className="flex space-x-3.5 md:space-x-4 overflow-x-auto no-scrollbar scroll-smooth px-4 md:px-16 pb-12 pt-8 sm:pt-10 overflow-visible"
        >
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        {/* Right Arrow Button */}
        {showRightArrow && (
          <button
            onClick={() => handleScroll("right")}
            className="absolute right-0 top-8 sm:top-10 bottom-12 w-10 md:w-16 bg-black/50 hover:bg-black/80 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition duration-200 z-20 focus:outline-none border-y border-l border-zinc-800/10 rounded-l-md cursor-pointer"
            aria-label="Scroll Right"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8 hover:scale-125 transition duration-150" />
          </button>
        )}
      </div>
    </div>
  );
}
