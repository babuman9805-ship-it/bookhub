import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { LibraryProvider } from "@/store/LibraryContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
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
    <html lang="en" className={`${poppins.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-[#141414] text-white selection:bg-netflix-red selection:text-white">
        <LibraryProvider>{children}</LibraryProvider>
      </body>
    </html>
  );
}
