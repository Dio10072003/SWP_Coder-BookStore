'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaCog } from 'react-icons/fa';
import { JSX } from 'react';

export default function Header(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [greet, setGreet] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [currentLocation] = useState("An Nhơn, Bình Định");

  useEffect(() => {
    const getGreeting = (hour: number) => {
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
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
        {/* Logo + Brand */}
        <Link href="/" className="flex items-center gap-3 min-w-[220px]">
          <Image
            src="/images/Coder-BookStore-Logo.svg"
            alt="Coder-Bookstore Logo"
            width={44}
            height={44}
            className="object-contain rounded-lg bg-white p-1 shadow"
            priority
          />
          <div className="flex flex-col justify-center">
            <span className="text-xl font-extrabold tracking-wide text-white drop-shadow-sm leading-tight">
              CODER-BOOKSTORE
            </span>
            <span className="text-xs text-blue-100 font-medium tracking-wider hidden md:inline leading-tight">
              Knowledge • Code • Growth
            </span>
          </div>
        </Link>

        {/* Menu */}
        <nav className="flex-1 flex justify-center gap-7">
          <Link href="/" className="font-semibold text-white/90 hover:text-blue-200 transition">Trang Chủ</Link>
          <Link href="/Books" className="font-semibold text-white/90 hover:text-blue-200 transition">Sách</Link>
          <Link href="/AboutPage" className="font-semibold text-white/90 hover:text-blue-200 transition">Về Chúng Tôi</Link>
          <Link href="/Contact" className="font-semibold text-white/90 hover:text-blue-200 transition">Liên Hệ</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link href="/admin" className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-700 to-purple-700 text-white font-bold shadow hover:from-blue-800 hover:to-purple-800 transition">Admin</Link>
          <Link href="/Login" className="px-4 py-2 rounded-full border border-blue-400 text-blue-100 bg-white/10 hover:bg-white/20 shadow transition">Đăng nhập</Link>
          <Link href="/Register" className="px-4 py-2 rounded-full border border-purple-400 text-purple-100 bg-white/10 hover:bg-white/20 shadow transition">Đăng ký</Link>
          <div className="ml-2 px-4 py-2 rounded-xl bg-white/70 backdrop-blur-md shadow text-blue-900 text-xs font-semibold flex flex-col items-center min-w-[170px] border border-white/30">
            <span className="font-bold text-center whitespace-nowrap">{greet}</span>
            <span
              className="block text-center tracking-widest text-xs mt-1 font-mono"
              style={{
                fontFamily: 'DS-Digital, DSEG7Classic, Seven Segment, monospace',
                fontSize: '1.5rem',
                color: '#19ff19',
                textShadow: '0 0 8px #19ff19, 0 0 2px #fff',
                letterSpacing: '0.15em',
                lineHeight: 1.1,
              }}
            >
              {currentTime}
            </span>
            <span className="text-gray-500 mt-1">{currentLocation}</span>
          </div>
        </div>
      </div>
      {/* Mobile menu toggle button */}
      <div className="md:hidden flex justify-end px-4 pb-2">
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-150 shadow"
        >
          {open ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden bg-gradient-to-r from-blue-800 via-indigo-800 to-purple-800 px-6 pb-6 space-y-3 text-white font-semibold uppercase tracking-wide text-sm rounded-b-xl shadow-xl">
          <Link href="/" onClick={() => setOpen(false)} className="block hover:text-teal-200 transition-colors duration-150 py-2 rounded-lg hover:bg-white hover:bg-opacity-10">Trang Chủ</Link>
          <Link href="/Books" onClick={() => setOpen(false)} className="block hover:text-teal-200 transition-colors duration-150 py-2 rounded-lg hover:bg-white hover:bg-opacity-10">Sách</Link>
          <Link href="/AboutPage" onClick={() => setOpen(false)} className="block hover:text-teal-200 transition-colors duration-150 py-2 rounded-lg hover:bg-white hover:bg-opacity-10">Về Chúng Tôi</Link>
          <Link href="/Contact" onClick={() => setOpen(false)} className="block hover:text-teal-200 transition-colors duration-150 py-2 rounded-lg hover:bg-white hover:bg-opacity-10">Liên Hệ</Link>
          <hr className="border-t border-white border-opacity-20 my-3" />
          <Link href="/admin" onClick={() => setOpen(false)} className="block hover:text-orange-200 transition-colors duration-150 py-2 rounded-lg hover:bg-white hover:bg-opacity-10 flex items-center gap-3">
            <FaCog /> Admin Panel
          </Link>
          <Link href="/Login" onClick={() => setOpen(false)} className="block hover:text-teal-200 transition-colors duration-150 py-2 rounded-lg hover:bg-white hover:bg-opacity-10">Đăng nhập</Link>
          <Link href="/Register" onClick={() => setOpen(false)} className="block hover:text-teal-200 transition-colors duration-150 py-2 rounded-lg hover:bg-white hover:bg-opacity-10">Đăng ký</Link>
          <div className="flex justify-center pt-4">
            <div className="text-xs font-bold text-blue-900 bg-white/70 backdrop-blur-md px-4 py-2 rounded-xl shadow border border-white/30 flex flex-col items-center min-w-[170px]">
              <div className="text-center w-full text-sm leading-tight">{greet}</div>
              <div className="block text-center w-full text-blue-700 tracking-widest text-xs mt-1 font-mono">{currentTime}</div>
              <div className="text-gray-500 mt-1 text-center">{currentLocation}</div>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}