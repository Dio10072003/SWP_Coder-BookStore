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
    const getGreeting = (hour: number, minute: number) => {
      const time = hour * 60 + minute;
      if (time >= 330 && time < 420) return "Chào ngày mới! ☀️ Hãy bắt đầu bằng một trang sách hay."; // 5:30 - 7:00
      if (time >= 420 && time < 480) return "Chúc bạn buổi sáng tràn đầy năng lượng và cảm hứng học tập!"; // 7:00 - 8:00
      if (time >= 480 && time < 540) return "Sáng tạo mỗi ngày cùng Coder-Bookstore!"; // 8:00 - 9:00
      if (time >= 540 && time < 600) return "Đã đến giờ tăng tốc tri thức!"; // 9:00 - 10:00
      if (time >= 600 && time < 660) return "Giờ vàng để khám phá những cuốn sách mới."; // 10:00 - 11:00
      if (time >= 660 && time < 720) return "Chuẩn bị cho bữa trưa cùng một chương sách thú vị."; // 11:00 - 12:00
      if (time >= 720 && time < 840) return "Chào buổi trưa! Đọc sách để nạp lại năng lượng."; // 12:00 - 14:00
      if (time >= 840 && time < 900) return "Đầu giờ chiều, hãy để tri thức dẫn lối thành công."; // 14:00 - 15:00
      if (time >= 900 && time < 960) return "Giờ học hỏi, giờ phát triển bản thân!"; // 15:00 - 16:00
      if (time >= 960 && time < 1020) return "Một cuốn sách hay cho buổi chiều tuyệt vời."; // 16:00 - 17:00
      if (time >= 1020 && time < 1110) return "Sắp hết ngày, đừng quên khám phá điều mới!"; // 17:00 - 18:30
      if (time >= 1110 && time < 1200) return "Chào buổi tối! Đã đến lúc làm giàu tri thức."; // 18:30 - 20:00
      if (time >= 1200 && time < 1260) return "Tối đến, hãy để sách đồng hành cùng bạn."; // 20:00 - 21:00
      if (time >= 1260 && time < 1320) return "Thời gian lý tưởng để đọc và suy ngẫm."; // 21:00 - 22:00
      if (time >= 1320 && time < 1380) return "Đọc sách trước khi ngủ giúp bạn mơ đẹp hơn!"; // 22:00 - 23:00
      if (time >= 1380 && time < 1440) return "Đêm khuya, tri thức vẫn luôn chờ bạn khám phá."; // 23:00 - 24:00
      if (time >= 0 && time < 330) return "Giấc ngủ ngon sẽ đến sau một chương sách hay."; // 0:00 - 5:30
      return "Chào bạn!";
    };
    const updateGreeting = () => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      setGreet(getGreeting(hour, minute));
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
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 shadow-lg text-white font-heading">
      <div className="max-w-7xl mx-auto px-2 py-1 flex items-center justify-between gap-2 min-h-[56px]">
        {/* Logo + Brand (trái) */}
        <Link href="/" className="flex items-center gap-2 min-w-[140px]">
          <Image
            src="/images/Coder-BookStore-Logo.svg"
            alt="Coder-Bookstore Logo"
            width={32}
            height={32}
            className="object-contain rounded bg-white p-0.5 shadow animate-gradient-move rainbow-logo"
            priority
          />
          <div className="flex flex-col justify-center">
            <span className="text-base font-extrabold tracking-wide bg-gradient-to-r from-pink-400 via-yellow-400 to-blue-400 bg-clip-text text-transparent drop-shadow-sm leading-tight font-heading animate-gradient-move rainbow-text">
              CODER-BOOKSTORE
            </span>
            <span className="text-[10px] text-blue-100 font-medium tracking-wider hidden md:inline leading-tight font-body">
              Knowledge • Code • Growth
            </span>
          </div>
        </Link>

        {/* Menu (giữa) */}
        <nav className="hidden lg:flex flex-1 justify-center gap-6">
          <Link href="/" className="font-semibold bg-gradient-to-r from-pink-400 via-yellow-400 to-blue-400 bg-clip-text text-transparent hover:scale-105 transition text-sm font-heading animate-gradient-move rainbow-text">Trang Chủ</Link>
          <Link href="/Books" className="font-semibold bg-gradient-to-r from-pink-400 via-yellow-400 to-blue-400 bg-clip-text text-transparent hover:scale-105 transition text-sm font-heading animate-gradient-move rainbow-text">Sách</Link>
          <Link href="/Schedule" className="font-semibold bg-gradient-to-r from-pink-400 via-yellow-400 to-blue-400 bg-clip-text text-transparent hover:scale-105 transition text-sm font-heading animate-gradient-move rainbow-text">Lịch phát sóng</Link>
          <Link href="/AboutPage" className="font-semibold bg-gradient-to-r from-pink-400 via-yellow-400 to-blue-400 bg-clip-text text-transparent hover:scale-105 transition text-sm font-heading animate-gradient-move rainbow-text">Về Chúng Tôi</Link>
          <Link href="/Contact" className="font-semibold bg-gradient-to-r from-pink-400 via-yellow-400 to-blue-400 bg-clip-text text-transparent hover:scale-105 transition text-sm font-heading animate-gradient-move rainbow-text">Liên Hệ</Link>
        </nav>

        {/* Actions + Greeting + Clock (phải) */}
        <div className="hidden lg:flex flex-col items-end gap-1 min-w-[260px]">
          <div className="flex items-center gap-2 mb-1">
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
            {isLoggedIn && CartInfo}
          </div>
          {/* Greeting + Clock */}
          <div className="flex items-center gap-3">
            <span className="font-bold text-xs bg-gradient-to-r from-pink-400 via-yellow-400 to-blue-400 bg-clip-text text-transparent animate-gradient-move rainbow-text" style={{textShadow: '0 0 8px #fff, 0 0 2px #19ff19'}}>{greet}</span>
            <div className="ml-1">
              {/* Khung đồng hồ LED 7 màu giữ nguyên */}
              <span
                className="block text-center tracking-widest text-[1.5rem] font-mono select-none animate-pulse rainbow-led-text"
                style={{
                  fontFamily: 'DS-Digital, DSEG7Classic, Seven Segment, monospace',
                  letterSpacing: '0.14em',
                  lineHeight: 1.1,
                  margin: '0.1em 0',
                  background: 'linear-gradient(90deg, #ff0000, #ff9900, #ffff00, #00ff00, #00ffff, #0000ff, #9900ff, #ff0000 100%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 0 16px #fff, 0 0 8px #19ff19',
                  animation: 'rainbow-move 3s linear infinite',
                }}
              >
                {currentTime}
              </span>
              {/* Location */}
              <span className="text-gray-700 dark:text-gray-300 mt-0.5 text-[11px] font-semibold drop-shadow-sm" style={{textShadow: '0 0 4px #fff'}}>{currentLocation}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile & Tablet menu toggle button (chỉ hiện trên mobile và tablet) */}
      <div className="flex lg:hidden justify-end px-2 pb-1">
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="p-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-150 shadow"
        >
          {open ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>
      {/* Mobile & Tablet menu */}
      {open && (
        <nav className="lg:hidden bg-gradient-to-r from-blue-800 via-indigo-800 to-purple-800 px-4 pb-4 space-y-2 text-white font-semibold uppercase tracking-wide text-xs rounded-b-xl shadow-xl">
          <Link href="/" onClick={() => setOpen(false)} className="block hover:text-teal-200 transition-colors duration-150 py-1.5 rounded-lg hover:bg-white hover:bg-opacity-10">Trang Chủ</Link>
          <Link href="/Books" onClick={() => setOpen(false)} className="block hover:text-teal-200 transition-colors duration-150 py-1.5 rounded-lg hover:bg-white hover:bg-opacity-10">Sách</Link>
          <Link href="/Schedule" onClick={() => setOpen(false)} className="block hover:text-teal-200 transition-colors duration-150 py-1.5 rounded-lg hover:bg-white hover:bg-opacity-10">Lịch phát sóng</Link>
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