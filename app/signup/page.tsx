"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLibrary } from "@/hooks/useLibrary";

export default function SignupPage() {
  const router = useRouter();
  const { signup, isAuthenticated } = useLibrary();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const success = await signup(name, email, password);
      if (success) {
        router.push("/");
      } else {
        setError("Sign up failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred during registration.");
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

      {/* Registration Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[450px] bg-black/75 px-6 py-12 md:px-16 md:py-14 rounded-md border border-zinc-800/40 z-10 backdrop-blur-md"
      >
        <h1 className="text-white text-3xl font-bold mb-7">Create Account</h1>
        
        {error && (
          <div className="bg-[#e87c03] text-white text-sm rounded px-4 py-3 mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="First name"
              className="w-full bg-netflix-light-dark text-white rounded px-5 py-4 pt-5 pb-3 text-sm border-b-2 border-transparent focus:border-orange-500 focus:outline-none placeholder-zinc-500 transition duration-150"
              required
            />
          </div>

          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full bg-netflix-light-dark text-white rounded px-5 py-4 pt-5 pb-3 text-sm border-b-2 border-transparent focus:border-orange-500 focus:outline-none placeholder-zinc-500 transition duration-150"
              required
            />
          </div>
          
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Add a password"
              className="w-full bg-netflix-light-dark text-white rounded px-5 py-4 pt-5 pb-3 text-sm border-b-2 border-transparent focus:border-orange-500 focus:outline-none placeholder-zinc-500 transition duration-150"
              required
            />
          </div>

          <div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="w-full bg-netflix-light-dark text-white rounded px-5 py-4 pt-5 pb-3 text-sm border-b-2 border-transparent focus:border-orange-500 focus:outline-none placeholder-zinc-500 transition duration-150"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-netflix-red hover:bg-[#c10712] text-white font-bold py-3.5 rounded mt-6 transition duration-200 focus:outline-none focus:ring-2 focus:ring-netflix-red flex items-center justify-center"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="text-zinc-500 mt-12 text-sm">
          <span>Already have an account? </span>
          <Link href="/login" className="text-white hover:underline font-medium">
            Sign in
          </Link>
          .
        </div>
      </motion.div>
    </div>
  );
}
