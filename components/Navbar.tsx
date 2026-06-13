"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, LogOut, User, Library, Heart, Award } from "lucide-react";
import { useLibrary } from "@/hooks/useLibrary";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const { user, logout } = useLibrary();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Sync scroll state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync search query from URL if user navs back
  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setSearchQuery(q);
      setIsSearchOpen(true);
    }
  }, [searchParams]);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchClick = () => {
    if (!isSearchOpen) {
      setIsSearchOpen(true);
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 200);
    } else if (searchQuery === "") {
      setIsSearchOpen(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim() !== "") {
      router.push(`/search?q=${encodeURIComponent(val)}`);
    } else {
      router.push("/search");
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/categories" },
    { name: "My Library", href: "/library" },
    { name: "Favorites", href: "/favorites" },
  ];

  const mockNotifications = [
    { id: 1, text: "🔥 Keep up your streak! 1 chapter needed to reach 6 days.", time: "2 hours ago" },
    { id: 2, text: "📚 Added to Fantasy: 'The Dragon's Legacy' is trending.", time: "1 day ago" },
    { id: 3, text: "⭐️ New Release: 'Mastering React & Next.js' is now available.", time: "2 days ago" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-16 md:h-20 transition-colors duration-300 flex items-center px-4 md:px-16 justify-between select-none ${
        isScrolled ? "bg-[#141414]" : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      {/* Left side: Logo & Navigation */}
      <div className="flex items-center space-x-4 md:space-x-12">
        <Link href="/" className="text-netflix-red font-black text-2xl md:text-3xl tracking-tighter hover:scale-105 transition duration-200">
          BOOKFLIX
        </Link>
        
        <ul className="hidden md:flex space-x-6 text-sm">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`transition-colors duration-200 hover:text-zinc-300 ${
                    isActive ? "text-white font-bold" : "text-zinc-400"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Right side: Search, Notifications, Profile */}
      <div className="flex items-center space-x-4 md:space-x-6 text-white text-sm">
        {/* Animated Search Bar */}
        <div className="flex items-center bg-black/40 border border-transparent rounded-sm">
          <motion.div
            initial={false}
            animate={{ width: isSearchOpen ? 200 : 0, paddingLeft: isSearchOpen ? 8 : 0 }}
            className="overflow-hidden flex items-center"
          >
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Titles, authors, genres..."
              className="bg-transparent text-white placeholder-zinc-500 text-xs w-full focus:outline-none py-1"
            />
          </motion.div>
          <button
            onClick={handleSearchClick}
            className="p-1.5 rounded-full hover:bg-zinc-800/60 transition duration-150 focus:outline-none"
            aria-label="Search"
          >
            <Search className="w-5 h-5 text-zinc-300" />
          </button>
        </div>

        {/* Mobile Nav Trigger Indicator */}
        <div className="md:hidden flex items-center relative group">
          <span className="text-zinc-400 hover:text-white cursor-pointer py-2">Browse</span>
          <div className="hidden group-hover:block absolute top-full left-0 bg-black/95 border border-zinc-800 p-4 rounded mt-1 flex-col space-y-3 w-40">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="block text-zinc-300 hover:text-white">
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Notification Dropdown */}
        <div ref={notificationRef} className="relative">
          <button
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className="p-1.5 rounded-full hover:bg-zinc-800/60 transition duration-150 relative focus:outline-none"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-zinc-300" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-netflix-red rounded-full border border-[#141414]"></span>
          </button>
          
          <AnimatePresence>
            {isNotificationOpen && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-3 w-80 bg-netflix-dark border border-zinc-800 rounded shadow-2xl p-4 flex flex-col z-50"
              >
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                  <span className="font-bold text-white">Notifications</span>
                </div>
                <div className="flex flex-col space-y-3.5 mt-3">
                  {mockNotifications.map((notif) => (
                    <div key={notif.id} className="text-xs text-zinc-300 border-b border-zinc-900 pb-2.5 last:border-0 last:pb-0">
                      <p>{notif.text}</p>
                      <span className="text-zinc-500 text-[10px] mt-1 block">{notif.time}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Profile Dropdown */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center space-x-2 focus:outline-none group"
            aria-label="Profile Menu"
          >
            {/* Avatar image */}
            <img
              src={user?.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80"}
              alt="Profile Avatar"
              className="w-8 h-8 rounded border border-zinc-700 hover:border-white transition group-hover:scale-105"
            />
            <span className="hidden lg:inline text-zinc-300 group-hover:text-white text-xs">{user?.name}</span>
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-3 w-56 bg-netflix-dark border border-zinc-800 rounded shadow-2xl overflow-hidden flex flex-col z-50"
              >
                {/* Stats summary */}
                <div className="px-4 py-3 bg-black/40 border-b border-zinc-800 text-xs">
                  <p className="font-bold text-white truncate">{user?.name}</p>
                  <div className="flex items-center space-x-1.5 text-[#e87c03] mt-1 font-semibold">
                    <Award className="w-3.5 h-3.5" />
                    <span>🔥 {user?.streak} Day Streak!</span>
                  </div>
                </div>

                <div className="flex flex-col text-xs">
                  <Link
                    href="/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center space-x-2 px-4 py-3 hover:bg-zinc-800/50 text-zinc-300 hover:text-white transition"
                  >
                    <User className="w-4 h-4 text-zinc-400" />
                    <span>My Profile</span>
                  </Link>

                  <Link
                    href="/library"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center space-x-2 px-4 py-3 hover:bg-zinc-800/50 text-zinc-300 hover:text-white transition"
                  >
                    <Library className="w-4 h-4 text-zinc-400" />
                    <span>My Library</span>
                  </Link>

                  <Link
                    href="/favorites"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center space-x-2 px-4 py-3 hover:bg-zinc-800/50 text-zinc-300 hover:text-white transition"
                  >
                    <Heart className="w-4 h-4 text-zinc-400" />
                    <span>Favorites</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-3 hover:bg-zinc-800/50 border-t border-zinc-800 text-netflix-red font-semibold transition text-left focus:outline-none"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign out of BookFlix</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
