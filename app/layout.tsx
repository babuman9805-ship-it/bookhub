import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LibraryProvider } from "@/store/LibraryContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BookFlix - Netflix for Books",
  description: "Browse, discover, and read books like movies. An immersive dark-themed streaming-inspired ebook platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#141414] text-white selection:bg-netflix-red selection:text-white">
        <LibraryProvider>{children}</LibraryProvider>
      </body>
    </html>
  );
}
