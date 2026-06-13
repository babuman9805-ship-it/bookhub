export interface Chapter {
  id: string;
  title: string;
  content: string[]; // Array of paragraphs to show in the reader
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  summary: string;
  coverColor: string; // Gradient color CSS (e.g. "from-purple-900 to-indigo-950") for beautiful procedural covers
  coverUrl?: string; // Fallback image URL
  rating: number;
  matchScore: number; // e.g. 98 (% match)
  year: number;
  genres: string[];
  pages: number;
  readTime: string; // e.g. "2h 15m"
  chapters: Chapter[];
  isFeatured?: boolean;
  ageRating: string; // e.g. "16+", "G", "PG-13", "18+"
  quality: string; // "UHD", "HD", "SD"
}

export interface UserProfile {
  name: string;
  avatarUrl: string; // or emoji/color ID
  streak: number;
  completedCount: number;
  activeCount: number;
  joinDate: string;
}

export interface Bookmark {
  id: string;
  bookId: string;
  chapterIndex: number;
  paragraphIndex: number;
  textSnippet: string;
  createdAt: string;
}

export interface ReadingNote {
  id: string;
  bookId: string;
  chapterIndex: number;
  paragraphIndex: number;
  textSnippet: string;
  noteText: string;
  color: string; // yellow, green, blue, pink highlights
  createdAt: string;
}

export interface ReadingProgress {
  bookId: string;
  chapterIndex: number;
  paragraphIndex: number;
  progressPercent: number;
  bookmarks: Bookmark[];
  notes: ReadingNote[];
  lastRead: string; // ISO date string
}
