"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, SidebarClose, SidebarOpen, Maximize2, Minimize2, 
  Settings, Type, Bookmark, MessageSquare, ChevronLeft, ChevronRight, 
  Check, Trash2, Award
} from "lucide-react";
import confetti from "canvas-confetti";
import { useLibrary } from "@/hooks/useLibrary";
import { mockBooks } from "@/lib/mockBooks";

interface ReaderInterfaceProps {
  bookId: string;
  initialChapterIndex?: number;
}

type ReaderTheme = "dark" | "sepia" | "light";

export default function ReaderInterface({ bookId, initialChapterIndex = 0 }: ReaderInterfaceProps) {
  const router = useRouter();
  const readerRef = useRef<HTMLDivElement>(null);
  
  const { 
    readingProgress, 
    updateProgress, 
    addBookmark, 
    removeBookmark, 
    addNote, 
    removeNote,
    completeBook,
    completedBookIds
  } = useLibrary();

  const book = mockBooks.find((b) => b.id === bookId);
  
  // Find saved progress if any
  const savedProgress = readingProgress[bookId];
  
  const [chapterIndex, setChapterIndex] = useState(initialChapterIndex);
  const [paragraphIndex, setParagraphIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarTab, setSidebarTab] = useState<"chapters" | "bookmarks" | "notes">("chapters");
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Custom reading style states
  const [theme, setTheme] = useState<ReaderTheme>("dark");
  const [fontSize, setFontSize] = useState<number>(18); // px
  const [activeNotePara, setActiveNotePara] = useState<number | null>(null);
  const [noteText, setNoteText] = useState("");
  const [noteColor, setNoteColor] = useState("bg-yellow-500/35 border-yellow-400 text-yellow-100");
  const [selectedColorName, setSelectedColorName] = useState("yellow");

  // Load progress on mount
  useEffect(() => {
    if (savedProgress) {
      setChapterIndex(savedProgress.chapterIndex);
      setParagraphIndex(savedProgress.paragraphIndex);
    }
  }, [savedProgress]);

  // Sync window resize for fullscreen detect
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  if (!book) {
    return (
      <div className="min-h-screen bg-[#141414] text-white flex flex-col items-center justify-center p-6">
        <p className="text-zinc-400 font-bold mb-4">Book not found.</p>
        <button onClick={() => router.push("/")} className="px-6 py-2 bg-netflix-red rounded font-bold">
          Go Back Home
        </button>
      </div>
    );
  }

  const activeChapter = book.chapters[chapterIndex] || book.chapters[0];
  const isLastChapter = chapterIndex === book.chapters.length - 1;
  const isBookCompleted = completedBookIds.includes(bookId);

  // Trigger progress updates
  const handleParagraphView = (pIdx: number) => {
    setParagraphIndex(pIdx);
    updateProgress(bookId, chapterIndex, pIdx);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  const handleNextChapter = () => {
    if (chapterIndex < book.chapters.length - 1) {
      const nextIdx = chapterIndex + 1;
      setChapterIndex(nextIdx);
      setParagraphIndex(0);
      updateProgress(bookId, nextIdx, 0);
    } else {
      // Completed last chapter!
      completeBook(bookId);
      triggerConfetti();
    }
  };

  const handlePrevChapter = () => {
    if (chapterIndex > 0) {
      const prevIdx = chapterIndex - 1;
      setChapterIndex(prevIdx);
      setParagraphIndex(0);
      updateProgress(bookId, prevIdx, 0);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      readerRef.current?.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
    }
  };

  const handleAddBookmark = (pIdx: number, text: string) => {
    const isBookmarked = savedProgress?.bookmarks.some(
      (b) => b.chapterIndex === chapterIndex && b.paragraphIndex === pIdx
    );

    if (isBookmarked) {
      const bmark = savedProgress?.bookmarks.find(
        (b) => b.chapterIndex === chapterIndex && b.paragraphIndex === pIdx
      );
      if (bmark) removeBookmark(bookId, bmark.id);
    } else {
      addBookmark(bookId, chapterIndex, pIdx, text);
    }
  };

  const handleOpenNote = (pIdx: number) => {
    const existingNote = savedProgress?.notes.find(
      (n) => n.chapterIndex === chapterIndex && n.paragraphIndex === pIdx
    );
    setActiveNotePara(pIdx);
    setNoteText(existingNote ? existingNote.noteText : "");
  };

  const handleSaveNote = (pIdx: number, snippet: string) => {
    if (noteText.trim() === "") return;
    
    // Remove existing note first if any to overwrite
    const existing = savedProgress?.notes.find(
      (n) => n.chapterIndex === chapterIndex && n.paragraphIndex === pIdx
    );
    if (existing) {
      removeNote(bookId, existing.id);
    }

    addNote(bookId, chapterIndex, pIdx, snippet, noteText, selectedColorName);
    setActiveNotePara(null);
    setNoteText("");
  };

  const handleRemoveNote = (pIdx: number) => {
    const existing = savedProgress?.notes.find(
      (n) => n.chapterIndex === chapterIndex && n.paragraphIndex === pIdx
    );
    if (existing) {
      removeNote(bookId, existing.id);
    }
    setActiveNotePara(null);
    setNoteText("");
  };

  // Color styles map
  const colorStyles: Record<string, string> = {
    yellow: "bg-yellow-500/20 border-yellow-400 text-yellow-100 dark:text-yellow-100",
    green: "bg-emerald-500/20 border-emerald-400 text-emerald-100 dark:text-emerald-100",
    blue: "bg-sky-500/20 border-sky-400 text-sky-100 dark:text-sky-100",
    pink: "bg-pink-500/20 border-pink-400 text-pink-100 dark:text-pink-100",
  };

  // Set reader panel theme colors
  const themeClasses = {
    dark: "bg-[#121212] text-zinc-300 border-zinc-800",
    sepia: "bg-[#f4ecd8] text-[#5b4636] border-[#e4dcc8]",
    light: "bg-white text-zinc-900 border-zinc-200",
  };

  return (
    <div ref={readerRef} className="h-screen w-full flex flex-col select-none overflow-hidden bg-black text-white">
      {/* Top Header Controls */}
      <header className={`h-16 border-b flex items-center justify-between px-4 z-20 ${
        theme === "dark" ? "bg-[#181818] border-zinc-800" : 
        theme === "sepia" ? "bg-[#eadecc] text-[#5b4636] border-[#d4c8b6]" : 
        "bg-zinc-50 text-zinc-900 border-zinc-200"
      }`}>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => router.push("/")}
            className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer focus:outline-none"
            title="Exit Reader"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex flex-col">
            <h1 className="font-extrabold text-sm uppercase tracking-tight truncate max-w-[150px] sm:max-w-[300px]">
              {book.title}
            </h1>
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-semibold leading-none mt-0.5">
              {activeChapter?.title}
            </span>
          </div>
        </div>

        {/* Configurations Bar */}
        <div className="flex items-center space-x-1.5 sm:space-x-3">
          {/* FontSize controls */}
          <div className="flex items-center bg-black/10 dark:bg-white/5 rounded border border-zinc-800/10 p-0.5">
            <button
              onClick={() => setFontSize(Math.max(fontSize - 2, 12))}
              className="p-1.5 rounded text-xs hover:bg-black/15 dark:hover:bg-white/10 font-extrabold cursor-pointer focus:outline-none"
              title="Decrease Font Size"
            >
              A-
            </button>
            <span className="text-xs font-semibold px-2">{fontSize}px</span>
            <button
              onClick={() => setFontSize(Math.min(fontSize + 2, 32))}
              className="p-1.5 rounded text-xs hover:bg-black/15 dark:hover:bg-white/10 font-extrabold cursor-pointer focus:outline-none"
              title="Increase Font Size"
            >
              A+
            </button>
          </div>

          {/* Theme switcher */}
          <div className="flex items-center space-x-1 bg-black/10 dark:bg-white/5 p-1 rounded">
            {(["light", "sepia", "dark"] as ReaderTheme[]).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`w-5 h-5 rounded-full border transition cursor-pointer focus:outline-none ${
                  t === "light" ? "bg-white border-zinc-300" :
                  t === "sepia" ? "bg-[#f4ecd8] border-[#5b4636]" :
                  "bg-[#121212] border-zinc-800"
                } ${theme === t ? "ring-2 ring-netflix-red scale-110" : "opacity-75"}`}
                title={`${t.toUpperCase()} Theme`}
              />
            ))}
          </div>

          {/* Sidebar Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer focus:outline-none"
            title="Toggle Sidebar"
          >
            {sidebarOpen ? <SidebarClose className="w-5 h-5" /> : <SidebarOpen className="w-5 h-5" />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer focus:outline-none"
            title="Fullscreen Mode"
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main layout container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar Menu */}
        <AnimatePresence initial={false}>
          {sidebarOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className={`h-full border-r flex flex-col z-10 flex-shrink-0 bg-netflix-dark text-white border-zinc-800`}
            >
              {/* Tab Navigation */}
              <div className="flex border-b border-zinc-800">
                {(["chapters", "bookmarks", "notes"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSidebarTab(tab)}
                    className={`flex-1 py-3.5 text-xs font-black tracking-wider uppercase border-b-2 transition focus:outline-none cursor-pointer ${
                      sidebarTab === tab
                        ? "border-netflix-red text-white"
                        : "border-transparent text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content Drawer */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
                {/* Chapters list tab */}
                {sidebarTab === "chapters" && (
                  <ul className="space-y-1 text-sm font-semibold">
                    {book.chapters.map((ch, idx) => (
                      <li key={ch.id}>
                        <button
                          onClick={() => {
                            setChapterIndex(idx);
                            setParagraphIndex(0);
                            updateProgress(bookId, idx, 0);
                          }}
                          className={`w-full text-left py-2.5 px-3 rounded transition focus:outline-none cursor-pointer flex items-center justify-between ${
                            chapterIndex === idx
                              ? "bg-netflix-red text-white"
                              : "text-zinc-400 hover:bg-zinc-800/40 hover:text-white"
                          }`}
                        >
                          <span>{ch.title}</span>
                          {chapterIndex === idx && <Check className="w-4 h-4" />}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Bookmarks tab */}
                {sidebarTab === "bookmarks" && (
                  <div className="space-y-3">
                    {savedProgress?.bookmarks && savedProgress.bookmarks.length > 0 ? (
                      savedProgress.bookmarks.map((b) => (
                        <div
                          key={b.id}
                          onClick={() => {
                            setChapterIndex(b.chapterIndex);
                            handleParagraphView(b.paragraphIndex);
                          }}
                          className="bg-black/30 border border-zinc-800/60 p-3 rounded hover:border-zinc-700 transition cursor-pointer text-xs group"
                        >
                          <div className="flex items-center justify-between pb-1 border-b border-zinc-900 mb-2">
                            <span className="text-netflix-red font-bold">
                              Ch {b.chapterIndex + 1}, Para {b.paragraphIndex + 1}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeBookmark(bookId, b.id);
                              }}
                              className="text-zinc-600 hover:text-netflix-red p-0.5 focus:outline-none cursor-pointer opacity-0 group-hover:opacity-100 transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-zinc-400 italic line-clamp-2">"{b.textSnippet}"</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-zinc-600 text-center text-xs py-8">No bookmarks saved yet.</p>
                    )}
                  </div>
                )}

                {/* Notes tab */}
                {sidebarTab === "notes" && (
                  <div className="space-y-3">
                    {savedProgress?.notes && savedProgress.notes.length > 0 ? (
                      savedProgress.notes.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => {
                            setChapterIndex(n.chapterIndex);
                            handleParagraphView(n.paragraphIndex);
                          }}
                          className="bg-black/30 border border-zinc-800/60 p-3 rounded hover:border-zinc-700 transition cursor-pointer text-xs group"
                        >
                          <div className="flex items-center justify-between pb-1 border-b border-zinc-900 mb-2">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                              n.color === "yellow" ? "bg-yellow-500/20 text-yellow-300" :
                              n.color === "green" ? "bg-emerald-500/20 text-emerald-300" :
                              n.color === "blue" ? "bg-sky-500/20 text-sky-300" :
                              "bg-pink-500/20 text-pink-300"
                            }`}>
                              Highlight ({n.color})
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeNote(bookId, n.id);
                              }}
                              className="text-zinc-600 hover:text-netflix-red p-0.5 focus:outline-none cursor-pointer opacity-0 group-hover:opacity-100 transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-zinc-400 italic mb-2">"{n.textSnippet}"</p>
                          <div className="bg-netflix-dark p-2 rounded text-zinc-300 font-semibold text-[11px] border border-zinc-850">
                            {n.noteText}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-zinc-600 text-center text-xs py-8">No highlighted notes saved yet.</p>
                    )}
                  </div>
                )}
              </div>

              {/* Sidebar footer statistics */}
              <div className="p-4 bg-black/40 border-t border-zinc-800 text-[11px] text-zinc-500 flex justify-between items-center">
                <span>Reading Progress:</span>
                <span className="font-bold text-white">{savedProgress?.progressPercent || 0}%</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Center Reading Pane Area */}
        <div className={`flex-grow overflow-y-auto flex flex-col transition-all duration-300 ${
          themeClasses[theme]
        }`}>
          <div className="max-w-[720px] mx-auto px-6 py-12 md:py-16 flex-grow flex flex-col justify-start">
            {/* Completion Tag */}
            {isBookCompleted && (
              <div className="bg-netflix-red/10 border border-netflix-red/30 text-netflix-red rounded p-3 mb-8 flex items-center space-x-2 text-xs md:text-sm font-extrabold justify-center">
                <Award className="w-4 h-4 fill-netflix-red" />
                <span>Congratulations! You completed this book.</span>
              </div>
            )}

            {/* Chapter Headline */}
            <h2 className="text-lg md:text-xl font-black uppercase tracking-wider mb-8 text-center opacity-85">
              {activeChapter?.title}
            </h2>

            {/* Paragraph block layout */}
            <div className="space-y-8 leading-relaxed font-sans text-justify select-text">
              {activeChapter?.content.map((para, pIdx) => {
                const isBookmarked = savedProgress?.bookmarks.some(
                  (b) => b.chapterIndex === chapterIndex && b.paragraphIndex === pIdx
                );
                
                const note = savedProgress?.notes.find(
                  (n) => n.chapterIndex === chapterIndex && n.paragraphIndex === pIdx
                );

                const isCurrentlyReading = paragraphIndex === pIdx;

                return (
                  <div
                    key={pIdx}
                    onMouseEnter={() => handleParagraphView(pIdx)}
                    className={`relative p-2.5 rounded transition duration-200 group flex flex-col ${
                      isCurrentlyReading 
                        ? "shadow-[inset_4px_0_0_#E50914] bg-black/5 dark:bg-white/5" 
                        : "hover:bg-black/5 dark:hover:bg-white/5"
                    }`}
                  >
                    {/* Paragraph text with possible highlight styling */}
                    <p
                      style={{ fontSize: `${fontSize}px` }}
                      className={`transition-colors duration-150 leading-relaxed font-normal ${
                        note ? colorStyles[note.color] : ""
                      }`}
                    >
                      {para}
                    </p>

                    {/* Paragraph Action Tools Trigger (reveals on hover) */}
                    <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition flex items-center space-x-1 z-10 bg-black/45 backdrop-blur-sm p-1 rounded border border-zinc-800/10">
                      <button
                        onClick={() => handleAddBookmark(pIdx, para)}
                        className={`p-1.5 rounded hover:bg-zinc-800 transition focus:outline-none cursor-pointer ${
                          isBookmarked ? "text-netflix-red" : "text-zinc-400 hover:text-white"
                        }`}
                        title={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
                      >
                        <Bookmark className="w-3.5 h-3.5 fill-current" />
                      </button>
                      <button
                        onClick={() => handleOpenNote(pIdx)}
                        className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition focus:outline-none cursor-pointer"
                        title="Add Note/Highlight"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Highlight Note Overlay Dialog editor */}
                    <AnimatePresence>
                      {activeNotePara === pIdx && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="mt-3 bg-netflix-dark text-white border border-zinc-850 p-3 rounded shadow-2xl flex flex-col space-y-3 max-w-sm self-end z-20"
                        >
                          <div className="flex justify-between items-center pb-2 border-b border-zinc-850">
                            <span className="text-[10px] font-black uppercase text-zinc-400">Add Annotation</span>
                            {note && (
                              <button
                                onClick={() => handleRemoveNote(pIdx)}
                                className="text-zinc-500 hover:text-netflix-red p-1 cursor-pointer focus:outline-none"
                                title="Delete Highlight"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                          
                          {/* Color select palette */}
                          <div className="flex items-center space-x-2">
                            <span className="text-[9px] text-zinc-500 font-bold">Color:</span>
                            {(["yellow", "green", "blue", "pink"] as const).map((color) => (
                              <button
                                key={color}
                                onClick={() => setSelectedColorName(color)}
                                className={`w-4 h-4 rounded-full border transition cursor-pointer focus:outline-none ${
                                  color === "yellow" ? "bg-yellow-500/80 border-yellow-400" :
                                  color === "green" ? "bg-emerald-500/80 border-emerald-400" :
                                  color === "blue" ? "bg-sky-500/80 border-sky-400" :
                                  "bg-pink-500/80 border-pink-400"
                                } ${selectedColorName === color ? "ring-2 ring-netflix-red scale-110" : ""}`}
                                title={color}
                              />
                            ))}
                          </div>

                          <textarea
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            placeholder="Enter annotation comments..."
                            className="bg-[#2f2f2f] text-white border border-zinc-800 text-xs rounded p-2 focus:outline-none focus:border-netflix-red h-16 w-full"
                          />

                          <div className="flex justify-end space-x-2">
                            <button
                              onClick={() => setActiveNotePara(null)}
                              className="px-3 py-1.5 rounded text-[10px] font-bold text-zinc-400 hover:text-white cursor-pointer bg-zinc-800/40"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleSaveNote(pIdx, para)}
                              className="px-3 py-1.5 rounded text-[10px] font-bold bg-netflix-red hover:bg-red-700 text-white cursor-pointer"
                            >
                              Save Note
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Pagination Chapter Footer Controls */}
            <div className="mt-16 pt-8 border-t flex justify-between items-center border-zinc-800/10">
              <button
                onClick={handlePrevChapter}
                disabled={chapterIndex === 0}
                className="flex items-center space-x-1.5 text-xs md:text-sm font-bold text-zinc-500 hover:text-white cursor-pointer disabled:opacity-40 disabled:hover:text-zinc-500 select-none focus:outline-none"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev Chapter</span>
              </button>

              <span className="text-[10px] text-zinc-500 font-bold uppercase">
                Chapter {chapterIndex + 1} of {book.chapters.length}
              </span>

              <button
                onClick={handleNextChapter}
                className="flex items-center space-x-1.5 text-xs md:text-sm font-bold text-netflix-red hover:text-white cursor-pointer select-none focus:outline-none"
              >
                <span>{isLastChapter ? (isBookCompleted ? "Finished" : "Complete Book") : "Next Chapter"}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
