"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLibrary } from "@/hooks/useLibrary";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useLibrary();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter a valid email and password.");
      return;
    }

    if (password.length < 4) {
      setError("Password must contain at least 4 characters.");
      return;
    }

    setLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        router.push("/");
      } else {
        setError("Invalid email or password.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="relative min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0.9) 100%), url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1200')`
      }}
    >
      {/* Header with Logo */}
      <header className="absolute top-0 left-0 w-full px-8 py-6 md:px-16 flex items-center justify-between z-10">
        <Link href="/" className="text-netflix-red font-black text-3xl md:text-4xl tracking-tighter hover:scale-105 transition duration-200">
          BOOKFLIX
        </Link>
      </header>

      {/* Login Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[450px] bg-black/75 px-6 py-12 md:px-16 md:py-16 rounded-md border border-zinc-800/40 z-10 backdrop-blur-md"
      >
        <h1 className="text-white text-3xl font-bold mb-7">Sign In</h1>
        
        {error && (
          <div className="bg-[#e87c03] text-white text-sm rounded px-4 py-3 mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email or phone number"
              className="w-full bg-netflix-light-dark text-white rounded px-5 py-4 pt-5 pb-3 text-sm border-b-2 border-transparent focus:border-orange-500 focus:outline-none placeholder-zinc-500 transition duration-150"
              required
            />
          </div>
          
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-netflix-light-dark text-white rounded px-5 py-4 pt-5 pb-3 text-sm border-b-2 border-transparent focus:border-orange-500 focus:outline-none placeholder-zinc-500 transition duration-150"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-netflix-red hover:bg-[#c10712] text-white font-bold py-3.5 rounded mt-4 transition duration-200 focus:outline-none focus:ring-2 focus:ring-netflix-red flex items-center justify-center"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="flex items-center justify-between text-zinc-400 text-xs mt-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="accent-zinc-500 h-4 w-4 rounded cursor-pointer"
            />
            <span>Remember me</span>
          </label>
          <a href="#" className="hover:underline">Need help?</a>
        </div>

        <div className="text-zinc-500 mt-16 text-sm">
          <span>New to BookFlix? </span>
          <Link href="/signup" className="text-white hover:underline font-medium">
            Sign up now
          </Link>
          .
        </div>
      </motion.div>
    </div>
  );
}
