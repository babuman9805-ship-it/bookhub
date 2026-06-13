"use client";

import React, { useState } from "react";
import { useLibrary } from "@/hooks/useLibrary";
import { mockBooks } from "@/lib/mockBooks";
import { Edit2, Save, Star, Award, Calendar, BookOpen, Clock, Heart } from "lucide-react";
import BookCard from "@/components/BookCard";

const DEFAULT_AVATARS = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
  "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&h=150&q=80",
  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&h=150&q=80",
];

export default function ProfilePage() {
  const { 
    user, 
    updateProfile, 
    favoriteBookIds, 
    historyBookIds, 
    completedBookIds,
    readingProgress 
  } = useLibrary();

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || "Reader");
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatarUrl || DEFAULT_AVATARS[0]);

  // Map book lists
  const favoriteBooks = mockBooks.filter((b) => favoriteBookIds.includes(b.id));
  const recentlyViewed = mockBooks.filter((b) => historyBookIds.includes(b.id)).slice(0, 5);

  const activeBooksCount = Object.keys(readingProgress).filter(
    (id) => !completedBookIds.includes(id) && readingProgress[id].progressPercent > 0
  ).length;

  const handleSave = () => {
    if (editedName.trim() !== "") {
      updateProfile(editedName, selectedAvatar);
      setIsEditing(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#141414] pt-28 pb-16 px-4 md:px-16 select-none text-white">
      {/* Profile Title */}
      <h1 className="text-white text-2xl md:text-4xl font-extrabold tracking-tight mb-8">
        My Profile
      </h1>

      {/* Main card grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Avatar & Edit Panel */}
        <div className="bg-[#181818] border border-zinc-800 rounded-md p-6 md:p-8 flex flex-col items-center justify-start space-y-6">
          <div className="relative group">
            <img
              src={selectedAvatar}
              alt="Profile Avatar"
              className="w-32 h-32 md:w-36 md:h-36 rounded-lg border-2 border-zinc-700 shadow-xl"
            />
          </div>

          {/* Edit form */}
          {isEditing ? (
            <div className="w-full space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                  Profile Name
                </label>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="w-full bg-[#2f2f2f] text-white border border-zinc-700 rounded px-4 py-2 text-sm focus:outline-none focus:border-netflix-red font-semibold"
                  placeholder="Reader Name"
                />
              </div>

              {/* Avatar options selection list */}
              <div className="space-y-2">
                <label className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">
                  Select Avatar
                </label>
                <div className="flex space-x-2">
                  {DEFAULT_AVATARS.map((avUrl) => (
                    <button
                      key={avUrl}
                      onClick={() => setSelectedAvatar(avUrl)}
                      className={`w-11 h-11 rounded border-2 transition focus:outline-none cursor-pointer overflow-hidden ${
                        selectedAvatar === avUrl ? "border-netflix-red scale-105" : "border-transparent opacity-70"
                      }`}
                    >
                      <img src={avUrl} alt="Avatar Selection" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSave}
                className="w-full py-2.5 bg-netflix-red hover:bg-red-700 text-white font-extrabold rounded text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center space-x-1.5 focus:outline-none"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile</span>
              </button>
            </div>
          ) : (
            // Display form
            <div className="w-full text-center space-y-4">
              <div className="space-y-0.5">
                <h2 className="text-xl md:text-2xl font-black">{user?.name}</h2>
                <p className="text-zinc-500 text-xs font-semibold">Registered BookFlix Member</p>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="w-full py-2.5 bg-[#333] hover:bg-[#444] text-white font-extrabold rounded text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center space-x-1.5 focus:outline-none border border-zinc-700/35"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Columns: Statistics & Achievements */}
        <div className="lg:col-span-2 flex flex-col space-y-8">
          
          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* Streak */}
            <div className="bg-[#181818] border border-zinc-800 rounded p-5 flex flex-col justify-between space-y-3">
              <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-wider">Reading Streak</span>
              <div className="flex items-end space-x-1.5 text-2xl font-extrabold text-orange-500">
                <span>🔥 {user?.streak}</span>
                <span className="text-xs text-zinc-500 font-bold pb-0.5">days</span>
              </div>
            </div>

            {/* Completed */}
            <div className="bg-[#181818] border border-zinc-800 rounded p-5 flex flex-col justify-between space-y-3">
              <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-wider">Completed Books</span>
              <div className="flex items-end space-x-1.5 text-2xl font-extrabold text-white">
                <Award className="w-6 h-6 text-yellow-500 fill-yellow-500 mr-1" />
                <span>{user?.completedCount}</span>
                <span className="text-xs text-zinc-500 font-bold pb-0.5">books</span>
              </div>
            </div>

            {/* Reading */}
            <div className="bg-[#181818] border border-zinc-800 rounded p-5 flex flex-col justify-between space-y-3">
              <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-wider">Currently Reading</span>
              <div className="flex items-end space-x-1.5 text-2xl font-extrabold text-emerald-500">
                <BookOpen className="w-6 h-6 text-emerald-500 mr-1" />
                <span>{activeBooksCount}</span>
                <span className="text-xs text-zinc-500 font-bold pb-0.5">active</span>
              </div>
            </div>

            {/* Member since */}
            <div className="bg-[#181818] border border-zinc-800 rounded p-5 flex flex-col justify-between space-y-3">
              <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-wider">Member Since</span>
              <div className="flex items-center space-x-1 text-zinc-300 font-bold pt-1.5">
                <Calendar className="w-5 h-5 text-zinc-500 mr-1" />
                <span>{user?.joinDate}</span>
              </div>
            </div>

          </div>

          {/* Recently Viewed shelf */}
          {recentlyViewed.length > 0 && (
            <div className="flex flex-col select-none">
              <h3 className="text-white text-base md:text-lg font-bold">Recently Viewed</h3>
              <div className="flex space-x-4 overflow-x-auto no-scrollbar pb-12 pt-8 sm:pt-10 overflow-visible -mt-4 sm:-mt-6">
                {recentlyViewed.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            </div>
          )}

          {/* Favorite Books Grid */}
          {favoriteBooks.length > 0 && (
            <div className="space-y-4 pt-4">
              <h3 className="text-white text-base md:text-lg font-bold flex items-center">
                <Heart className="w-4 h-4 mr-2 text-netflix-red fill-netflix-red animate-pulse" />
                <span>My Favorite Books</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {favoriteBooks.slice(0, 3).map((book) => (
                  <div
                    key={book.id}
                    className="bg-black/30 border border-zinc-800/40 p-4 rounded hover:border-zinc-700 transition flex flex-col justify-between aspect-[16/9]"
                  >
                    <span className="text-zinc-500 text-[10px] font-bold uppercase">{book.author}</span>
                    <span className="font-extrabold text-white text-sm line-clamp-1 mt-1">{book.title}</span>
                    <div className="flex justify-between items-center text-[10px] text-zinc-400 mt-4 border-t border-zinc-850 pt-2">
                      <span className="flex items-center text-yellow-500">
                        <Star className="w-3.5 h-3.5 fill-current mr-0.5" />
                        {book.rating}
                      </span>
                      <span>{book.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
