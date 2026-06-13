"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, ReadingProgress, Bookmark, ReadingNote } from "@/types";
import { mockBooks } from "@/lib/mockBooks";

interface LibraryContextType {
  user: UserProfile | null;
  savedBookIds: string[];
  favoriteBookIds: string[];
  completedBookIds: string[];
  readingProgress: Record<string, ReadingProgress>;
  historyBookIds: string[];
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (name: string, avatarUrl: string) => void;
  toggleSaved: (bookId: string) => void;
  toggleFavorite: (bookId: string) => void;
  updateProgress: (bookId: string, chapterIndex: number, paragraphIndex: number) => void;
  addBookmark: (bookId: string, chapterIndex: number, paragraphIndex: number, snippet: string) => void;
  removeBookmark: (bookId: string, bookmarkId: string) => void;
  addNote: (bookId: string, chapterIndex: number, paragraphIndex: number, snippet: string, text: string, color: string) => void;
  removeNote: (bookId: string, noteId: string) => void;
  completeBook: (bookId: string) => void;
  activeModalBookId: string | null;
  openModal: (bookId: string) => void;
  closeModal: () => void;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

const DEFAULT_AVATARS = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80", // blue gradient face
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80", // purple girl
  "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&h=150&q=80", // orange boy
  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&h=150&q=80", // teal boy
];

export const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [savedBookIds, setSavedBookIds] = useState<string[]>([]);
  const [favoriteBookIds, setFavoriteBookIds] = useState<string[]>([]);
  const [completedBookIds, setCompletedBookIds] = useState<string[]>([]);
  const [readingProgress, setReadingProgress] = useState<Record<string, ReadingProgress>>({});
  const [historyBookIds, setHistoryBookIds] = useState<string[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [activeModalBookId, setActiveModalBookId] = useState<string | null>(null);

  const openModal = (bookId: string) => setActiveModalBookId(bookId);
  const closeModal = () => setActiveModalBookId(null);

  // Initialize state from LocalStorage on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem("bf_auth");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
      const storedUser = localStorage.getItem("bf_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser({
          name: "Guest Reader",
          avatarUrl: DEFAULT_AVATARS[0],
          streak: 3,
          completedCount: 1,
          activeCount: 1,
          joinDate: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        });
      }
    }

    const storedSaved = localStorage.getItem("bf_saved");
    if (storedSaved) setSavedBookIds(JSON.parse(storedSaved));

    const storedFavorites = localStorage.getItem("bf_favorites");
    if (storedFavorites) setFavoriteBookIds(JSON.parse(storedFavorites));

    const storedCompleted = localStorage.getItem("bf_completed");
    if (storedCompleted) setCompletedBookIds(JSON.parse(storedCompleted));

    const storedProgress = localStorage.getItem("bf_progress");
    if (storedProgress) setReadingProgress(JSON.parse(storedProgress));

    const storedHistory = localStorage.getItem("bf_history");
    if (storedHistory) setHistoryBookIds(JSON.parse(storedHistory));
  }, []);

  // Synchronizers
  const syncUser = (updatedUser: UserProfile | null) => {
    setUser(updatedUser);
    if (updatedUser) {
      localStorage.setItem("bf_user", JSON.stringify(updatedUser));
    } else {
      localStorage.removeItem("bf_user");
    }
  };

  const syncSaved = (ids: string[]) => {
    setSavedBookIds(ids);
    localStorage.setItem("bf_saved", JSON.stringify(ids));
  };

  const syncFavorites = (ids: string[]) => {
    setFavoriteBookIds(ids);
    localStorage.setItem("bf_favorites", JSON.stringify(ids));
  };

  const syncCompleted = (ids: string[]) => {
    setCompletedBookIds(ids);
    localStorage.setItem("bf_completed", JSON.stringify(ids));
    if (user) {
      syncUser({ ...user, completedCount: ids.length });
    }
  };

  const syncProgress = (prog: Record<string, ReadingProgress>) => {
    setReadingProgress(prog);
    localStorage.setItem("bf_progress", JSON.stringify(prog));
  };

  const syncHistory = (ids: string[]) => {
    setHistoryBookIds(ids);
    localStorage.setItem("bf_history", JSON.stringify(ids));
  };

  // Auth Operations
  const login = async (email: string, password: string): Promise<boolean> => {
    // Basic mock authentication: any email/pass combination works
    setIsAuthenticated(true);
    localStorage.setItem("bf_auth", "true");
    
    // Check if user is already in local storage
    const storedUser = localStorage.getItem("bf_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      const newUser: UserProfile = {
        name: email.split("@")[0].substring(0, 10),
        avatarUrl: DEFAULT_AVATARS[Math.floor(Math.random() * DEFAULT_AVATARS.length)],
        streak: 5,
        completedCount: completedBookIds.length,
        activeCount: Object.keys(readingProgress).length,
        joinDate: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      };
      syncUser(newUser);
    }
    return true;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsAuthenticated(true);
    localStorage.setItem("bf_auth", "true");
    const newUser: UserProfile = {
      name: name || email.split("@")[0],
      avatarUrl: DEFAULT_AVATARS[0],
      streak: 1,
      completedCount: 0,
      activeCount: 0,
      joinDate: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
    };
    syncUser(newUser);
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.setItem("bf_auth", "false");
    localStorage.removeItem("bf_user");
  };

  const updateProfile = (name: string, avatarUrl: string) => {
    if (user) {
      syncUser({
        ...user,
        name,
        avatarUrl,
      });
    }
  };

  // Library & Favorites operations
  const toggleSaved = (bookId: string) => {
    const updated = savedBookIds.includes(bookId)
      ? savedBookIds.filter(id => id !== bookId)
      : [...savedBookIds, bookId];
    syncSaved(updated);
  };

  const toggleFavorite = (bookId: string) => {
    const updated = favoriteBookIds.includes(bookId)
      ? favoriteBookIds.filter(id => id !== bookId)
      : [...favoriteBookIds, bookId];
    syncFavorites(updated);
  };

  // Reading Operations
  const updateProgress = (bookId: string, chapterIndex: number, paragraphIndex: number) => {
    const book = mockBooks.find(b => b.id === bookId);
    if (!book) return;

    // Calculate percentage
    const totalChapters = book.chapters.length;
    const currentChapter = book.chapters[chapterIndex];
    if (!currentChapter) return;
    
    // Percentage estimate based on chapter completion
    const chapterWeight = 100 / totalChapters;
    const currentParagraphs = currentChapter.content.length;
    const paragraphWeight = chapterWeight / currentParagraphs;
    
    const progressPercent = Math.min(
      Math.round((chapterIndex * chapterWeight) + (paragraphIndex * paragraphWeight)),
      99 // Mark 100% only via completeBook
    );

    const prevProgress = readingProgress[bookId] || {
      bookId,
      chapterIndex: 0,
      paragraphIndex: 0,
      progressPercent: 0,
      bookmarks: [],
      notes: [],
      lastRead: new Date().toISOString()
    };

    const newProg: ReadingProgress = {
      ...prevProgress,
      chapterIndex,
      paragraphIndex,
      progressPercent,
      lastRead: new Date().toISOString()
    };

    const nextProgressObj = {
      ...readingProgress,
      [bookId]: newProg
    };
    syncProgress(nextProgressObj);

    // Update History: move to top
    const filteredHistory = historyBookIds.filter(id => id !== bookId);
    syncHistory([bookId, ...filteredHistory]);

    // Update User Stats (active count)
    if (user) {
      const activeCount = Object.keys(nextProgressObj).filter(id => !completedBookIds.includes(id)).length;
      syncUser({ ...user, activeCount });
    }
  };

  const addBookmark = (bookId: string, chapterIndex: number, paragraphIndex: number, snippet: string) => {
    const prev = readingProgress[bookId] || {
      bookId,
      chapterIndex,
      paragraphIndex,
      progressPercent: 0,
      bookmarks: [],
      notes: [],
      lastRead: new Date().toISOString()
    };

    const newBookmark: Bookmark = {
      id: Math.random().toString(36).substring(7),
      bookId,
      chapterIndex,
      paragraphIndex,
      textSnippet: snippet.slice(0, 60) + (snippet.length > 60 ? "..." : ""),
      createdAt: new Date().toISOString(),
    };

    const newProg: ReadingProgress = {
      ...prev,
      bookmarks: [...prev.bookmarks, newBookmark]
    };

    syncProgress({
      ...readingProgress,
      [bookId]: newProg
    });
  };

  const removeBookmark = (bookId: string, bookmarkId: string) => {
    const prev = readingProgress[bookId];
    if (!prev) return;

    const newProg: ReadingProgress = {
      ...prev,
      bookmarks: prev.bookmarks.filter(b => b.id !== bookmarkId)
    };

    syncProgress({
      ...readingProgress,
      [bookId]: newProg
    });
  };

  const addNote = (bookId: string, chapterIndex: number, paragraphIndex: number, snippet: string, text: string, color: string) => {
    const prev = readingProgress[bookId] || {
      bookId,
      chapterIndex,
      paragraphIndex,
      progressPercent: 0,
      bookmarks: [],
      notes: [],
      lastRead: new Date().toISOString()
    };

    const newNote: ReadingNote = {
      id: Math.random().toString(36).substring(7),
      bookId,
      chapterIndex,
      paragraphIndex,
      textSnippet: snippet.slice(0, 80) + (snippet.length > 80 ? "..." : ""),
      noteText: text,
      color,
      createdAt: new Date().toISOString(),
    };

    const newProg: ReadingProgress = {
      ...prev,
      notes: [...prev.notes, newNote]
    };

    syncProgress({
      ...readingProgress,
      [bookId]: newProg
    });
  };

  const removeNote = (bookId: string, noteId: string) => {
    const prev = readingProgress[bookId];
    if (!prev) return;

    const newProg: ReadingProgress = {
      ...prev,
      notes: prev.notes.filter(n => n.id !== noteId)
    };

    syncProgress({
      ...readingProgress,
      [bookId]: newProg
    });
  };

  const completeBook = (bookId: string) => {
    if (!completedBookIds.includes(bookId)) {
      const updatedCompleted = [...completedBookIds, bookId];
      syncCompleted(updatedCompleted);
    }

    // Force progress to 100%
    const prev = readingProgress[bookId] || {
      bookId,
      chapterIndex: 0,
      paragraphIndex: 0,
      bookmarks: [],
      notes: [],
      lastRead: new Date().toISOString()
    };

    const newProg: ReadingProgress = {
      ...prev,
      progressPercent: 100,
      lastRead: new Date().toISOString()
    };

    const nextProgressObj = {
      ...readingProgress,
      [bookId]: newProg
    };
    syncProgress(nextProgressObj);

    if (user) {
      const activeCount = Object.keys(nextProgressObj).filter(id => !completedBookIds.includes(id)).length;
      syncUser({
        ...user,
        completedCount: completedBookIds.length + 1,
        activeCount,
        streak: user.streak + 1 // increment streak on completion
      });
    }
  };

  return (
    <LibraryContext.Provider
      value={{
        user,
        savedBookIds,
        favoriteBookIds,
        completedBookIds,
        readingProgress,
        historyBookIds,
        isAuthenticated,
        login,
        signup,
        logout,
        updateProfile,
        toggleSaved,
        toggleFavorite,
        updateProgress,
        addBookmark,
        removeBookmark,
        addNote,
        removeNote,
        completeBook,
        activeModalBookId,
        openModal,
        closeModal,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibraryContext = () => {
  const context = useContext(LibraryContext);
  if (context === undefined) {
    throw new Error("useLibraryContext must be used within a LibraryProvider");
  }
  return context;
};
