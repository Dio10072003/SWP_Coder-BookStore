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
  const [currentLocation] = useState("An Nhơn Nam, Gia Lai");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");

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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoggedIn(!!localStorage.getItem('user'));
      const user = localStorage.getItem('user');
      setUserName(user ? JSON.parse(user).name : "");
      setUserRole(user ? JSON.parse(user).role : "");
      window.addEventListener('storage', () => {
        setIsLoggedIn(!!localStorage.getItem('user'));
        const user = localStorage.getItem('user');
        setUserName(user ? JSON.parse(user).name : "");
        setUserRole(user ? JSON.parse(user).role : "");
      });
    }
  }, []);

  const CartInfo = (
    <Link href="/CartPage" className="relative ml-4">
      🛒 Cart
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 shadow-lg text-white font-sans">
      <div className="max-w-7xl mx-auto px-2 py-1 flex items-center justify-between gap-2 min-h-[56px]">
        {/* Logo + Brand */}
        <Link href="/" className="flex items-center gap-2 min-w-[140px]">
          <Image
            src="/images/Coder-BookStore-Logo.svg"
            alt="Coder-Bookstore Logo"
            width={32}
            height={32}
            className="object-contain rounded bg-white p-0.5 shadow"
            priority
          />
          <div className="flex flex-col justify-center">
            <span className="text-base font-extrabold tracking-wide text-white drop-shadow-sm leading-tight">
              CODER-BOOKSTORE
            </span>
            <span className="text-[10px] text-blue-100 font-medium tracking-wider hidden md:inline leading-tight">
              Knowledge • Code • Growth
            </span>
          </div>
        </Link>

        {/* Menu */}
        <nav className="flex-1 flex justify-center gap-4">
          <Link href="/" className="font-semibold text-white/90 hover:text-blue-200 transition text-sm">Trang Chủ</Link>
          <Link href="/Books" className="font-semibold text-white/90 hover:text-blue-200 transition text-sm">Sách</Link>
          <Link href="/AboutPage" className="font-semibold text-white/90 hover:text-blue-200 transition text-sm">Về Chúng Tôi</Link>
          <Link href="/Contact" className="font-semibold text-white/90 hover:text-blue-200 transition text-sm">Liên Hệ</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {/* Admin/Staff Buttons */}
          {userRole === 'Admin' && (
            <>
              <Link href="/admin" className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-700 to-purple-700 text-white font-bold shadow hover:from-blue-800 hover:to-purple-800 transition text-xs">Admin</Link>
              <Link href="/staff" className="px-3 py-1 rounded-full bg-gradient-to-r from-green-700 to-cyan-700 text-white font-bold shadow hover:from-green-800 hover:to-cyan-800 transition text-xs">Staff</Link>
            </>
          )}
          {userRole === 'Staff' && (
            <Link href="/staff" className="px-3 py-1 rounded-full bg-gradient-to-r from-green-700 to-cyan-700 text-white font-bold shadow hover:from-green-800 hover:to-cyan-800 transition text-xs">Staff</Link>
          )}
          {isLoggedIn ? (
            <Link href="/Profile" className="px-3 py-1 rounded-full border border-green-400 text-green-900 bg-green-100 hover:bg-green-200 shadow transition font-bold text-xs">Profile</Link>
          ) : (
            <>
              <Link href="/Login" className="px-3 py-1 rounded-full border border-blue-400 text-blue-100 bg-white/10 hover:bg-white/20 shadow transition text-xs">Đăng nhập</Link>
              <Link href="/Register" className="px-3 py-1 rounded-full border border-purple-400 text-purple-100 bg-white/10 hover:bg-white/20 shadow transition text-xs">Đăng ký</Link>
            </>
          )}
          {isLoggedIn && userName && (
            <span className="font-bold text-green-300 mr-1 text-xs">Xin chào, {userName}!</span>
          )}
          <div className="ml-1 px-2 py-1 rounded-lg bg-white/70 backdrop-blur-md shadow text-blue-900 text-[10px] font-semibold flex flex-col items-center min-w-[90px] border border-white/30">
            <span className="font-bold text-center whitespace-nowrap text-xs">{greet}</span>
            <span
              className="block text-center tracking-widest text-[11px] mt-0.5 font-mono"
              style={{
                fontFamily: 'DS-Digital, DSEG7Classic, Seven Segment, monospace',
                fontSize: '1.1rem',
                color: '#19ff19',
                textShadow: '0 0 6px #19ff19, 0 0 1px #fff',
                letterSpacing: '0.12em',
                lineHeight: 1.1,
              }}
            >
              {currentTime}
            </span>
            <span className="text-gray-500 mt-0.5 text-[10px]">{currentLocation}</span>
          </div>
          {isLoggedIn && CartInfo}
        </div>
      </div>
      {/* Mobile menu toggle button */}
      <div className="md:hidden flex justify-end px-2 pb-1">
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="p-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-150 shadow"
        >
          {open ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>
      {/* Mobile menu */}
      {open && (
        <nav className="md:hidden bg-gradient-to-r from-blue-800 via-indigo-800 to-purple-800 px-4 pb-4 space-y-2 text-white font-semibold uppercase tracking-wide text-xs rounded-b-xl shadow-xl">
          <Link href="/" onClick={() => setOpen(false)} className="block hover:text-teal-200 transition-colors duration-150 py-1.5 rounded-lg hover:bg-white hover:bg-opacity-10">Trang Chủ</Link>
          <Link href="/Books" onClick={() => setOpen(false)} className="block hover:text-teal-200 transition-colors duration-150 py-1.5 rounded-lg hover:bg-white hover:bg-opacity-10">Sách</Link>
          <Link href="/AboutPage" onClick={() => setOpen(false)} className="block hover:text-teal-200 transition-colors duration-150 py-1.5 rounded-lg hover:bg-white hover:bg-opacity-10">Về Chúng Tôi</Link>
          <Link href="/Contact" onClick={() => setOpen(false)} className="block hover:text-teal-200 transition-colors duration-150 py-1.5 rounded-lg hover:bg-white hover:bg-opacity-10">Liên Hệ</Link>
          <hr className="border-t border-white border-opacity-20 my-2" />
          <Link href="/admin" onClick={() => setOpen(false)} className="block hover:text-orange-200 transition-colors duration-150 py-1.5 rounded-lg hover:bg-white hover:bg-opacity-10 flex items-center gap-2">
            <FaCog /> Admin Panel
          </Link>
          {isLoggedIn ? (
            <Link href="/Profile" onClick={() => setOpen(false)} className="block hover:text-green-200 transition-colors duration-150 py-1.5 rounded-lg hover:bg-white hover:bg-opacity-10">Profile</Link>
          ) : (
            <>
              <Link href="/Login" onClick={() => setOpen(false)} className="block hover:text-teal-200 transition-colors duration-150 py-1.5 rounded-lg hover:bg-white hover:bg-opacity-10">Đăng nhập</Link>
              <Link href="/Register" onClick={() => setOpen(false)} className="block hover:text-teal-200 transition-colors duration-150 py-1.5 rounded-lg hover:bg-white hover:bg-opacity-10">Đăng ký</Link>
            </>
          )}
          <div className="flex justify-center pt-2">
            <div className="text-[10px] font-bold text-blue-900 bg-white/70 backdrop-blur-md px-2 py-1 rounded-xl shadow border border-white/30 flex flex-col items-center min-w-[90px]">
              <div className="text-center w-full text-xs leading-tight">{greet}</div>
              <div className="block text-center w-full text-blue-700 tracking-widest text-[11px] mt-0.5 font-mono">{currentTime}</div>
              <div className="text-gray-500 mt-0.5 text-center text-[10px]">{currentLocation}</div>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}