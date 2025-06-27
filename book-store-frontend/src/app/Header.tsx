'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import { JSX } from 'react';

export default function Header(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [greet, setGreet] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [currentLocation] = useState("An Nhơn, Bình Định");

  useEffect(() => {
    const getGreeting = (hour) => {
      if (hour >= 6 && hour < 7) return "Chào ngày mới! ☀️ Hãy bắt đầu bằng một trang sách hay.";
      if (hour >= 7 && hour < 8) return "Chúc bạn buổi sáng tràn đầy năng lượng và cảm hứng học tập!";
      if (hour >= 8 && hour < 9) return "Sáng tạo mỗi ngày cùng Coder-Bookstore!";
      if (hour >= 9 && hour < 10) return "Đã đến giờ tăng tốc tri thức!";
      if (hour >= 10 && hour < 11) return "Giờ vàng để khám phá những cuốn sách mới.";
      if (hour >= 11 && hour < 12) return "Chuẩn bị cho bữa trưa cùng một chương sách thú vị.";
      if (hour >= 12 && hour < 13) return "Chào buổi trưa! Đọc sách để nạp lại năng lượng.";
      if (hour >= 13 && hour < 14) return "Đầu giờ chiều, hãy để tri thức dẫn lối thành công.";
      if (hour >= 14 && hour < 15) return "Giờ học hỏi, giờ phát triển bản thân!";
      if (hour >= 15 && hour < 16) return "Một cuốn sách hay cho buổi chiều tuyệt vời.";
      if (hour >= 16 && hour < 17) return "Sắp hết ngày, đừng quên khám phá điều mới!";
      if (hour >= 17 && hour < 18) return "Chiều về, cùng Coder-Bookstore thư giãn với sách.";
      if (hour >= 18 && hour < 19) return "Chào buổi tối! Đã đến lúc làm giàu tri thức.";
      if (hour >= 19 && hour < 20) return "Tối đến, hãy để sách đồng hành cùng bạn.";
      if (hour >= 20 && hour < 21) return "Thời gian lý tưởng để đọc và suy ngẫm.";
      if (hour >= 21 && hour < 22) return "Đọc sách trước khi ngủ giúp bạn mơ đẹp hơn!";
      if (hour >= 22 && hour < 23) return "Đêm khuya, tri thức vẫn luôn chờ bạn khám phá.";
      if (hour >= 23 && hour < 24) return "Chúc bạn một đêm an lành cùng những trang sách.";
      if (hour >= 0 && hour < 6) return "Giấc ngủ ngon sẽ đến sau một chương sách hay.";
      return "Chào bạn!";
    };
    const updateGreeting = () => {
      const now = new Date();
      const hour = now.getHours();
      setGreet(getGreeting(hour));
      setCurrentTime(now.toLocaleTimeString('vi-VN', {
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
      }));
    };
    updateGreeting();
    const intervalId = setInterval(updateGreeting, 1000);
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
            <span className="text-yellow-100 bg-black bg-opacity-20 px-2 py-0.5 rounded-full shadow-inner text-[11px] flex flex-col items-center min-w-[180px]">
              <span className="font-bold text-center w-full">{greet}</span>
              <span className="block text-center w-full text-yellow-200 tracking-widest text-xs mt-1">{currentTime}</span>
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
            <span className="text-[11px] font-bold text-yellow-100 bg-black bg-opacity-20 px-2 py-0.5 rounded-full shadow-inner flex flex-col items-center min-w-[180px]">
              <span className="text-center w-full">{greet}</span>
              <span className="block text-center w-full text-yellow-200 tracking-widest text-xs mt-1">{currentTime}</span>
              <span className="text-gray-300 text-opacity-80 mt-0.5">{currentLocation}</span>
            </span>
          </div>
        </nav>
      )}
    </header>
  );
}