"use client";

import React, { use } from "react";
import { useSearchParams } from "next/navigation";
import ReaderInterface from "@/components/ReaderInterface";

interface PageProps {
  params: Promise<{ bookId: string }>;
}

export default function ReadBookPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const searchParams = useSearchParams();
  const cParam = searchParams.get("c");
  const initialChapterIndex = cParam ? parseInt(cParam, 10) : 0;

  return (
    <div className="bg-[#121212] min-h-screen w-full">
      <ReaderInterface 
        bookId={resolvedParams.bookId} 
        initialChapterIndex={initialChapterIndex} 
      />
    </div>
  );
}
