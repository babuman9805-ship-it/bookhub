"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLibrary } from "@/hooks/useLibrary";
import Navbar from "@/components/Navbar";
import BookDetailModal from "@/components/BookDetailModal";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated } = useLibrary();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isAuthStored = localStorage.getItem("bf_auth");
    if (isAuthStored !== "true") {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!mounted) {
    return <div className="min-h-screen bg-[#141414]" />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#141414] text-white">
      <Navbar />
      <div className="flex-1 flex flex-col overflow-x-hidden">
        {children}
      </div>
      <BookDetailModal />
    </div>
  );
}
