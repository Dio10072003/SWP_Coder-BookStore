'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaBookOpen, FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [greet, setGreet] = useState('Hello');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreet('Good Morning');
    else if (hour < 18) setGreet('Good Afternoon');
    else setGreet('Good Evening');
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 shadow-lg dark:from-pink-900 dark:via-red-900 dark:to-yellow-700 text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-3xl font-extrabold tracking-wide hover:scale-105 transition-transform">
          <FaBookOpen className="text-yellow-200" />
          <span className="drop-shadow-lg">{greet}, Coder-Bookstore!</span>
        </Link>

        {/* Desktop menu */}
        <nav className="hidden md:flex gap-8 font-semibold text-lg uppercase tracking-wide">
          <Link href="/" className="hover:text-yellow-200 transition">Home</Link>
          <Link href="/Books" className="hover:text-yellow-200 transition">Books</Link>
          <Link href="/AboutPage" className="hover:text-yellow-200 transition">About</Link>
          <Link href="/Contact" className="hover:text-yellow-200 transition">Contact</Link>
          <Link href="/Login" className="hover:text-yellow-200 transition">Login</Link>
          <Link href="/Register" className="hover:text-yellow-200 transition">Register</Link>
        </nav>

        {/* Mobile menu toggle button */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="md:hidden p-2 rounded hover:bg-yellow-300 hover:text-pink-900 transition"
        >
          {open ? <FaTimes size={26} /> : <FaBars size={26} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden bg-gradient-to-r from-pink-400 via-red-400 to-yellow-300 dark:from-pink-800 dark:via-red-800 dark:to-yellow-600 px-6 pb-6 space-y-4 text-white font-bold uppercase tracking-wide text-lg">
          <Link href="/" onClick={() => setOpen(false)} className="block hover:text-yellow-200 transition">Home</Link>
          <Link href="/Books" onClick={() => setOpen(false)} className="block hover:text-yellow-200 transition">Books</Link>
          <Link href="/AboutPage" onClick={() => setOpen(false)} className="block hover:text-yellow-200 transition">About</Link>
          <Link href="/Contact" onClick={() => setOpen(false)} className="block hover:text-yellow-200 transition">Contact</Link>
          <Link href="/Login" onClick={() => setOpen(false)} className="block hover:text-yellow-200 transition">Login</Link>
          <Link href="/Register" onClick={() => setOpen(false)} className="block hover:text-yellow-200 transition">Register</Link>
        </nav>
      )}
    </header>
  );
}
s