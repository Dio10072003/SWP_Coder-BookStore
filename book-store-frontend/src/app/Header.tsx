'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import { JSX } from 'react';

export default function Header(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [greet, setGreet] = useState("Chào bạn");
  const [currentTime, setCurrentTime] = useState("");
  const [currentLocation] = useState("An Nhơn, Bình Định");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreet("Chào buổi sáng");
    else if (hour < 18) setGreet("Chào buổi chiều");
    else setGreet("Chào buổi tối");
    const intervalId = setInterval(() => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString('vi-VN', {
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
      });
      setCurrentTime(formattedTime);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 shadow-lg text-white font-sans">
      <div className="max-w-5xl mx-auto px-3 py-2 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link
          href="/"
          className="flex items-center gap-1 text-lg font-bold tracking-wide hover:scale-105 transition-transform duration-200 drop-shadow-sm"
        >
          <Image
            src="/images/Coder-BookStore-Logo.svg"
            alt="Coder-Bookstore Logo"
            width={32}
            height={32}
            className="object-contain mr-1 rounded bg-white p-0.5 shadow"
            priority
          />
          <span>Coder-Bookstore</span>
        </Link>
        {/* Desktop menu and User/Time Info */}
        <div className="hidden md:flex items-center gap-4">
          <nav className="font-semibold text-sm uppercase tracking-wide flex items-center gap-2">
            <Link href="/" className="hover:text-teal-200 transition-colors duration-150 px-2 py-1 rounded hover:bg-white hover:bg-opacity-10">Trang Chủ</Link>
            <Link href="/Books" className="hover:text-teal-200 transition-colors duration-150 px-2 py-1 rounded hover:bg-white hover:bg-opacity-10">Sách</Link>
            <Link href="/AboutPage" className="hover:text-teal-200 transition-colors duration-150 px-2 py-1 rounded hover:bg-white hover:bg-opacity-10">Về Chúng Tôi</Link>
            <Link href="/Contact" className="hover:text-teal-200 transition-colors duration-150 px-2 py-1 rounded hover:bg-white hover:bg-opacity-10">Liên Hệ</Link>
          </nav>
          <div className="flex items-center gap-2 text-xs font-medium">
            <Link href="/Login" className="flex items-center gap-1 hover:text-white transition-colors duration-150 px-2 py-1 rounded-full bg-teal-600 hover:bg-teal-700 shadow-inner">
              <FaUserCircle className="text-lg" /> Đăng nhập
            </Link>
            <Link href="/Register" className="hover:text-white transition-colors duration-150 px-2 py-1 rounded-full bg-teal-600 hover:bg-teal-700 shadow-inner">Đăng ký</Link>
            <span className="text-yellow-100 bg-black bg-opacity-20 px-2 py-0.5 rounded-full shadow-inner text-[11px] flex flex-col items-center">
              <span className="font-bold">{greet}, {currentTime}</span>
              <span className="text-gray-300 text-opacity-80 mt-0.5">{currentLocation}</span>
            </span>
          </div>
        </div>
        {/* Mobile menu toggle button */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="md:hidden p-1.5 rounded hover:bg-white hover:bg-opacity-15 transition-colors duration-150"
        >
          {open ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>
      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden bg-gradient-to-r from-blue-800 via-indigo-800 to-purple-800 px-4 pb-4 space-y-2 text-white font-semibold uppercase tracking-wide text-sm rounded-b-lg">
          <Link href="/" onClick={() => setOpen(false)} className="block hover:text-teal-200 transition-colors duration-150 py-1.5 rounded hover:bg-white hover:bg-opacity-10">Trang Chủ</Link>
          <Link href="/Books" onClick={() => setOpen(false)} className="block hover:text-teal-200 transition-colors duration-150 py-1.5 rounded hover:bg-white hover:bg-opacity-10">Sách</Link>
          <Link href="/AboutPage" onClick={() => setOpen(false)} className="block hover:text-teal-200 transition-colors duration-150 py-1.5 rounded hover:bg-white hover:bg-opacity-10">Về Chúng Tôi</Link>
          <Link href="/Contact" onClick={() => setOpen(false)} className="block hover:text-teal-200 transition-colors duration-150 py-1.5 rounded hover:bg-white hover:bg-opacity-10">Liên Hệ</Link>
          <hr className="border-t border-white border-opacity-15 my-1" />
          <Link href="/Login" onClick={() => setOpen(false)} className="block hover:text-teal-200 transition-colors duration-150 py-1.5 rounded hover:bg-white hover:bg-opacity-10">Đăng nhập</Link>
          <Link href="/Register" onClick={() => setOpen(false)} className="block hover:text-teal-200 transition-colors duration-150 py-1.5 rounded hover:bg-white hover:bg-opacity-10">Đăng ký</Link>
          <div className="flex justify-center pt-2">
            <span className="text-[11px] font-bold text-yellow-100 bg-black bg-opacity-20 px-2 py-0.5 rounded-full shadow-inner flex flex-col items-center">
              <span>{greet}, {currentTime}</span>
              <span className="text-gray-300 text-opacity-80 mt-0.5">{currentLocation}</span>
            </span>
          </div>
        </nav>
      )}
    </header>
  );
}