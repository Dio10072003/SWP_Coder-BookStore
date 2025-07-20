'use client'
import React, { useEffect, useState, useRef } from 'react';
import { bookService } from '../services/bookService';
import { authorService } from '../services/authorService';
import { categoryService } from '../services/categoryService';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight, FaPlay, FaPause, FaClock, FaCalendarAlt, FaBroadcastTower } from 'react-icons/fa';
import Image from 'next/image';
import coderTour from '@/assets/Coder-Tour.jpg';

// Số ngày hiển thị trên lịch và ngày bắt đầu
const DAYS_COUNT = 30;
const START_DATE = new Date(2025, 6, 15); // Tháng 6 là July (0-based)

// --- Cập nhật các mốc thời gian chương trình đặc biệt ---
// Bản tin: 8h, 10h, 12h, 15h, 18h, 20h, 22h
const NEWS_TIMES = [8 * 60, 10 * 60, 12 * 60, 15 * 60, 18 * 60, 20 * 60, 22 * 60];
const NEWS_DURATIONS = [15, 15, 30, 15, 30, 15, 30]; // phút tương ứng với NEWS_TIMES
// Quảng cáo: 9h, 11h, 13h, 14h, 16h, 19h, 20h, 21h, 23h
const AD_TIMES = [9 * 60, 11 * 60, 13 * 60, 14 * 60, 16 * 60, 19 * 60, 20 * 60, 21 * 60, 23 * 60];
const AD_DURATION = 15; // phút
// Ca nhạc: 6h, 17h, 23h
const MUSIC_TIMES = [6 * 60, 17 * 60, 23 * 60];
const MUSIC_DURATION = 30; // phút

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getProgramsForDay(dayIdx, books, authors, categories) {
  // Tạo lịch từng ngày: mỗi slot là 15 phút, 24*4 = 96 slot
  const slots = Array(96).fill(null);
  // Đặt bản tin cập nhật
  NEWS_TIMES.forEach((mins, idx) => {
    const start = Math.floor(mins / 15);
    const duration = Math.ceil(NEWS_DURATIONS[idx] / 15);
    for (let j = 0; j < duration; j++) {
      slots[start + j] = {
        start: start,
        duration: duration,
        type: 'news',
        title: 'Bản tin cập nhật',
        color: 'from-blue-400 to-cyan-400',
        link: '/Blog',
      };
    }
  });
  // Đặt quảng cáo
  AD_TIMES.forEach((mins) => {
    const start = Math.floor(mins / 15);
    for (let j = 0; j < AD_DURATION / 15; j++) {
      slots[start + j] = {
        start: start,
        duration: AD_DURATION / 15,
        type: 'ad',
        title: 'Quảng cáo khuyến mãi',
        color: 'from-yellow-400 to-pink-500',
        link: '/Promotions',
      };
    }
  });
  // Đặt ca nhạc
  MUSIC_TIMES.forEach((mins) => {
    const start = Math.floor(mins / 15);
    for (let j = 0; j < MUSIC_DURATION / 15; j++) {
      slots[start + j] = {
        start: start,
        duration: MUSIC_DURATION / 15,
        type: 'music',
        title: 'Chương trình nghe nhạc',
        color: 'from-orange-400 to-pink-500',
        link: '/Blog',
      };
    }
  });
  // Đặt các chương trình còn lại (ưu tiên đa dạng)
  let idxBook = 0, idxAuthor = 0, idxCat = 0, idxRank = 0;
  for (let i = 0; i < 96; ) {
    if (!slots[i]) {
      // Xoay vòng: đọc sách, tác giả, bảng xếp hạng, chủ đề
      const typeOrder = ['book', 'author', 'ranking', 'category'];
      const type = typeOrder[(i + dayIdx) % typeOrder.length];
      if (type === 'book' && books.length) {
        const len = 2 + (hashString(`${dayIdx}-booklen-${i}`) % 4); // 2-5 slot (30-75 phút)
        const validLen = Math.min(len, 96 - i);
        const book = books[(idxBook++) % books.length];
        for (let j = 0; j < validLen; j++) slots[i + j] = {
          type: 'book',
          title: `Đọc sách: ${book.title}`,
          color: 'from-pink-400 to-yellow-400',
          link: `/Books/${book.id}`,
          duration: validLen,
          start: i,
        };
        i += validLen;
      } else if (type === 'author' && authors.length) {
        const len = 3; // 45 phút
        const validLen = Math.min(len, 96 - i);
        const author = authors[(idxAuthor++) % authors.length];
        for (let j = 0; j < validLen; j++) slots[i + j] = {
          type: 'author',
          title: `Giao lưu với tác giả: ${author.name}`,
          color: 'from-purple-400 to-blue-400',
          link: `/Authors/${author.id}`,
          duration: validLen,
          start: i,
        };
        i += validLen;
      } else if (type === 'ranking') {
        const len = 2; // 30 phút
        for (let j = 0; j < len && (i + j) < 96; j++) slots[i + j] = {
          type: 'ranking',
          title: 'Bảng xếp hạng sách hot',
          color: 'from-fuchsia-400 to-pink-400',
          link: '/BestSeller',
          duration: len,
          start: i,
        };
        i += len;
      } else if (type === 'category' && categories.length) {
        const len = 2; // 30 phút
        const validLen = Math.min(len, 96 - i);
        const cat = categories[(idxCat++) % categories.length];
        for (let j = 0; j < validLen; j++) slots[i + j] = {
          type: 'category',
          title: `Chủ đề: ${cat.name}`,
          color: 'from-green-400 to-teal-400',
          link: `/Categories/${cat.name}`,
          duration: validLen,
          start: i,
        };
        i += validLen;
      } else {
        i++;
      }
    } else {
      i++;
    }
  }
  // Gom các slot liên tiếp cùng chương trình thành 1 dòng
  const result = [];
  for (let i = 0; i < 96; ) {
    const p = slots[i];
    if (!p) { i++; continue; }
    let len = 1;
    while (i + len < 96 && slots[i + len] && slots[i + len].title === p.title) len++;
    result.push({ ...p, duration: len, start: i });
    i += len;
  }
  return result.sort((a, b) => a.start - b.start);
}

// Làm tròn phút về mốc gần nhất 0, 5, 10, ..., 55
function roundToNearest5(mins) {
  return Math.round(mins / 5) * 5;
}
function formatTimeFromMins(mins) {
  const h = Math.floor(mins / 60);
  const m = roundToNearest5(mins % 60);
  // Nếu phút là 60, tăng giờ lên 1, phút về 0
  const finalH = h + (m === 60 ? 1 : 0);
  const finalM = m === 60 ? 0 : m;
  return `${finalH.toString().padStart(2, '0')}:${finalM.toString().padStart(2, '0')}`;
}

function getDateString(date) {
  return date.toLocaleDateString('vi-VN', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' });
}

function toDateInputValue(date) {
  // yyyy-MM-dd
  return date.toISOString().slice(0, 10);
}

function getWeekdayVN(date) {
  const weekdays = ['CHỦ NHẬT', 'THỨ HAI', 'THỨ BA', 'THỨ TƯ', 'THỨ NĂM', 'THỨ SÁU', 'THỨ BẢY'];
  return weekdays[date.getDay()];
}
function getDayMonthVN(date) {
  return `Ngày ${date.getDate().toString().padStart(2, '0')}/${(date.getMonth()+1).toString().padStart(2, '0')}`;
}

// --- Add helper to find current airing program index ---
function getCurrentAiringProgramIndex(programs, currentTime) {
  if (!programs || programs.length === 0) return -1;
  const mins = currentTime.getHours() * 60 + currentTime.getMinutes();
  for (let i = 0; i < programs.length; i++) {
    const progStart = programs[i].start * 15;
    const progEnd = progStart + programs[i].duration * 15;
    if (mins >= progStart && mins < progEnd) {
      return i;
    }
  }
  return -1;
}

export default function SchedulePage() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedDay, setSelectedDay] = useState(0); // index 0 = 15/7/2025
  const [loading, setLoading] = useState(true);
  const [currentWeekStart, setCurrentWeekStart] = useState(0); // index của ngày đầu tuần đang hiển thị
  const [currentProgramIndex, setCurrentProgramIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const autoPlayRef = useRef(null);
  const timeRef = useRef(null);

  // Tạo mảng 30 ngày bắt đầu từ 15/7/2025
  const days = Array.from({ length: DAYS_COUNT }, (_, i) => {
    return new Date(START_DATE.getFullYear(), START_DATE.getMonth(), START_DATE.getDate() + i);
  });

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [booksData, authorsData, categoriesData] = await Promise.all([
        bookService.getAllBooks(),
        authorService.getAllAuthors(),
        categoryService.getAllCategories(),
      ]);
      setBooks(Array.isArray(booksData) ? booksData : booksData?.data || []);
      setAuthors(Array.isArray(authorsData) ? authorsData : authorsData?.data || []);
      setCategories(Array.isArray(categoriesData) ? categoriesData : categoriesData?.data || []);
      setLoading(false);
    }
    fetchData();
  }, []);

  let programs = getProgramsForDay(selectedDay, books, authors, categories);
  // Sắp xếp theo thời gian bắt đầu
  programs = programs.slice().sort((a, b) => a.start - b.start);

  // Auto-play chương trình
  useEffect(() => {
    if (isAutoPlay && programs.length > 0) {
      autoPlayRef.current = setInterval(() => {
        setCurrentProgramIndex(prev => (prev + 1) % programs.length);
      }, 3000); // Chuyển chương trình mỗi 3 giây
    } else {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlay, programs.length]);

  // Cập nhật thời gian thực
  useEffect(() => {
    timeRef.current = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => {
      if (timeRef.current) {
        clearInterval(timeRef.current);
      }
    };
  }, []);

  // Khi chọn ngày, nếu ngày đó không nằm trong tuần hiện tại, tự động chuyển tuần
  const handleSelectDay = (idx) => {
    setSelectedDay(idx);
    const weekStart = Math.floor(idx / 7) * 7;
    setCurrentWeekStart(weekStart);
    setCurrentProgramIndex(0); // Reset về chương trình đầu tiên
  };

  // Khi chọn ngày bằng date picker, cũng cập nhật tuần
  const handleDateChange = (e) => {
    const val = e.target.value;
    const idx = days.findIndex(d => toDateInputValue(d) === val);
    if (idx !== -1) {
      setSelectedDay(idx);
      setCurrentWeekStart(Math.floor(idx / 7) * 7);
      setCurrentProgramIndex(0);
    } else {
      setSelectedDay(0);
      setCurrentWeekStart(0);
      setCurrentProgramIndex(0);
    }
  };

  // Màu gradient 7 sắc cầu vồng cho từng thứ trong tuần
  const rainbowGradients = [
    'from-red-400 to-red-600',      // Chủ nhật
    'from-orange-400 to-orange-500',// Thứ hai
    'from-yellow-300 to-yellow-500',// Thứ ba
    'from-green-400 to-green-600',  // Thứ tư
    'from-blue-400 to-blue-600',    // Thứ năm
    'from-indigo-400 to-indigo-600',// Thứ sáu
    'from-purple-400 to-purple-600' // Thứ bảy
  ];

  const getCurrentProgram = () => {
    if (programs.length === 0) return null;
    return programs[currentProgramIndex];
  };

  const currentProgram = getCurrentProgram();
  const currentAiringIndex = getCurrentAiringProgramIndex(programs, currentTime);

  // --- Check if selected day is today (ignore time, only date) ---
  const today = new Date();
  const isSelectedDayToday = days[selectedDay].getDate() === today.getDate() &&
    days[selectedDay].getMonth() === today.getMonth() &&
    days[selectedDay].getFullYear() === today.getFullYear();

  // --- Section: Đang phát sóng ---
  let currentAiring = null;
  if (currentAiringIndex !== -1) {
    currentAiring = programs[currentAiringIndex];
  }

  // --- Section: Sắp phát sóng ---
  let upcomingPrograms = [];
  if (currentAiringIndex !== -1) {
    upcomingPrograms = programs.slice(currentAiringIndex + 1, currentAiringIndex + 4);
  } else {
    // Nếu chưa có chương trình nào đang phát, lấy 3 chương trình đầu tiên còn lại trong ngày
    const nowMins = currentTime.getHours() * 60 + currentTime.getMinutes();
    const nextIdx = programs.findIndex(p => (p.start * 15) > nowMins);
    if (nextIdx !== -1) {
      upcomingPrograms = programs.slice(nextIdx, nextIdx + 3);
    } else {
      upcomingPrograms = programs.slice(0, 3);
    }
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden">
      {/* Background animated elements - only show on desktop */}
      <div className="absolute inset-0 overflow-hidden hidden lg:block">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 -right-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      {/* Floating particles - only show on desktop */}
      <div className="absolute inset-0 hidden lg:block">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      {/* Logo phụ CoderTour - animate fade in/out, responsive position/size */}
      <div className="fixed z-50 top-2 right-2 w-10 h-10 md:top-2 md:right-2 md:w-10 md:h-10 lg:top-2 lg:right-8 lg:w-20 lg:h-20 animate-fade-in-out pointer-events-none select-none">
        <Image 
          src={coderTour} 
          alt="CoderTour Logo" 
          fill
          className="object-contain rounded-full shadow-2xl bg-white/10 backdrop-blur-sm"
        />
      </div>
      {/* Header responsive: full width, responsive padding */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full py-2 md:py-4 lg:py-10 px-2 md:px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-4 mb-2 lg:mb-4 w-full px-0">
          <div className="relative mb-2 lg:mb-0">
            <div className="w-8 h-8 md:w-12 md:h-12 lg:w-20 lg:h-20 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 p-0.5 md:p-1 lg:p-1.5 animate-spin-slow">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center">
                <FaBroadcastTower className="text-white text-base md:text-xl lg:text-2xl animate-pulse" />
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 lg:w-6 lg:h-6 bg-red-500 rounded-full animate-ping"></div>
          </div>
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-base md:text-2xl lg:text-5xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-2xl font-heading tracking-tight animate-gradient-move">
              LỊCH PHÁT SÓNG
            </h1>
            <div className="flex flex-col md:flex-row items-center gap-1 md:gap-2 lg:gap-4 mt-1 md:mt-2 text-white/80 justify-center lg:justify-start">
              <div className="flex items-center gap-1 md:gap-2 bg-white/10 backdrop-blur-sm rounded-full px-2 py-0.5 md:px-3 md:py-1 lg:px-4 lg:py-2">
                <FaClock className="text-yellow-400" />
                <span className="font-mono text-xs md:text-base lg:text-lg font-bold">
                  {currentTime.toLocaleTimeString('vi-VN', { 
                    hour: '2-digit', 
                    minute: '2-digit', 
                    second: '2-digit' 
                  })}
                </span>
              </div>
              <div className="flex items-center gap-1 md:gap-2 bg-white/10 backdrop-blur-sm rounded-full px-2 py-0.5 md:px-3 md:py-1 lg:px-4 lg:py-2">
                <FaCalendarAlt className="text-pink-400" />
                <span className="font-semibold text-xs md:text-base lg:text-lg">
                  {currentTime.toLocaleDateString('vi-VN', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
        <p className="text-xs md:text-base lg:text-xl text-white/90 font-light mb-2 md:mb-4 lg:mb-6 text-center w-full max-w-xs md:max-w-2xl lg:max-w-4xl leading-relaxed">
          Khám phá lịch phát sóng đa dạng với giao lưu tác giả, chủ đề hấp dẫn và nhiều chương trình đặc biệt mỗi ngày!
        </p>
      </div>

      {/* Artistic Rainbow Intro Bar - full width */}
      <div className="relative z-10 flex justify-center w-full px-1 md:px-2 lg:px-8 mb-4 md:mb-6 lg:mb-8">
        <div className="w-full max-w-2xl rounded-2xl md:rounded-3xl p-3 md:p-4 lg:p-12 bg-gradient-to-r from-pink-400 via-yellow-400 to-blue-400 animate-gradient-x shadow-2xl border-2 border-white/20 flex flex-col items-center justify-center text-center select-none">
          <div className="max-w-3xl mx-auto">
            <div className="text-3xl md:text-4xl lg:text-5xl mb-2 animate-bounce-slow">🌈</div>
            <div className="text-base md:text-lg lg:text-2xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 via-yellow-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg animate-gradient-move mb-2">
              Đắm chìm trong sắc màu Radio – nơi cảm hứng, tri thức và nghệ thuật giao thoa từng phút giây!
            </div>
            <div className="text-sm md:text-base lg:text-lg font-bold bg-gradient-to-r from-blue-400 via-green-400 to-pink-400 bg-clip-text text-transparent drop-shadow animate-gradient-move italic tracking-wide">
              CoderTour - Nơi lập trình và nghệ thuật gia hội tụ đa màu !
            </div>
          </div>
        </div>
      </div>

      {/* Thanh chọn ngày dạng tuần - full width, responsive padding */}
      <div className="relative z-10 flex flex-col items-center mb-6 md:mb-8 w-full px-1 md:px-2 lg:px-8">
        <div className="flex gap-1 md:gap-1 lg:gap-3 justify-center mb-4 overflow-x-auto flex-nowrap w-full px-0 lg:overflow-x-visible scrollbar-hide">
          <button 
            onClick={() => setCurrentWeekStart(Math.max(0, currentWeekStart - 7))} 
            className="hidden lg:block p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 group"
          >
            <FaChevronLeft className="text-white group-hover:text-purple-300 transition-colors" />
          </button>
          {days.slice(currentWeekStart, currentWeekStart + 7).map((d, idx) => {
            const i = currentWeekStart + idx;
            const isActive = i === selectedDay;
            return (
              <button
                key={i}
                onClick={() => handleSelectDay(i)}
                className={`flex flex-col items-center justify-center transition-all duration-300 border-2 backdrop-blur-sm whitespace-nowrap select-none
                  ${isActive 
                    ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white border-purple-300 scale-105 shadow-2xl' 
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20 hover:scale-105'}
                  px-2 py-1 md:px-1.5 md:py-1 lg:px-4 lg:py-3
                  rounded-md md:rounded-lg lg:rounded-2xl
                  text-xs md:text-xs lg:text-base
                  font-bold
                  min-w-[44px] md:min-w-[48px] lg:min-w-[100px]`
                }
                style={{marginRight: 2, marginLeft: 2}}
              >
                {/* Mobile: chỉ hiện ngày/tháng, Tablet/Desktop: hiện cả thứ + ngày/tháng */}
                <div className="hidden md:block font-extrabold text-[10px] md:text-xs lg:text-sm mb-0.5 uppercase tracking-wide opacity-80">{getWeekdayVN(d)}</div>
                <div className="text-xs md:text-xs lg:text-lg font-bold">{d.getDate().toString().padStart(2, '0')}/{(d.getMonth()+1).toString().padStart(2, '0')}</div>
              </button>
            );
          })}
          <button 
            onClick={() => setCurrentWeekStart(Math.min(DAYS_COUNT - 7, currentWeekStart + 7))} 
            className="hidden lg:block p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 group"
          >
            <FaChevronRight className="text-white group-hover:text-purple-300 transition-colors" />
          </button>
        </div>
      </div>

      {/* Đang phát sóng */}
      {isSelectedDayToday && (
        <div className="relative z-10 max-w-md md:max-w-2xl lg:max-w-4xl mx-auto mb-6 md:mb-8 px-2 md:px-4 lg:px-4">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 lg:from-purple-500/20 lg:to-pink-500/20 backdrop-blur-md rounded-2xl md:rounded-3xl p-3 md:p-6 lg:p-8 border border-yellow-400/30 lg:border-yellow-400/60 shadow-lg lg:shadow-2xl animate-fade-in">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-yellow-300 mb-2 flex items-center justify-center gap-2">
                <FaBroadcastTower className="inline-block text-yellow-300 animate-pulse" /> Đang phát sóng
              </h2>
            </div>
            {currentAiring ? (
              <Link href={currentAiring.link} className="block group">
                <div className={`relative overflow-hidden rounded-2xl p-6 bg-gradient-to-r ${currentAiring.color} shadow-2xl group-hover:scale-105 group-hover:shadow-3xl transition-all duration-500 ring-4 ring-yellow-400 ring-opacity-80 animate-pulse-slow`}>
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 flex items-center gap-6">
                  <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                        {/* icon logic như cũ */}
                        {currentAiring.type === 'book' && <span className="text-3xl">📚</span>}
                        {currentAiring.type === 'author' && <span className="text-3xl">👨‍💼</span>}
                        {currentAiring.type === 'category' && <span className="text-3xl">🏷️</span>}
                        {currentAiring.type === 'ad' && <span className="text-3xl">📢</span>}
                        {currentAiring.type === 'news' && <span className="text-3xl">📰</span>}
                        {currentAiring.type === 'music' && <span className="text-3xl">🎵</span>}
                        {currentAiring.type === 'ranking' && <span className="text-3xl">🏆</span>}
                    </div>
                  </div>
                  <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                      <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-bold text-white shadow-sm">
                          {currentAiring.type === 'book' ? '📚 Đọc sách' : 
                           currentAiring.type === 'author' ? '👨‍💼 Giao lưu tác giả' : 
                           currentAiring.type === 'category' ? '🏷️ Chủ đề' : 
                           currentAiring.type === 'ad' ? '📢 Quảng cáo' : 
                           currentAiring.type === 'news' ? '📰 Bản tin' : 
                           currentAiring.type === 'music' ? '🎵 Âm nhạc' : 
                           currentAiring.type === 'ranking' ? '🏆 Bảng xếp hạng' : '📺 Chương trình khác'}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-white drop-shadow mb-1 group-hover:text-yellow-200 transition-colors duration-300">
                        {currentAiring.title}
                      </h3>
                      <div className="flex items-center gap-2 text-white/80 text-sm mb-1">
                        <FaClock className="text-yellow-400" />
                        <span className="font-mono">
                          {formatTimeFromMins(currentAiring.start * 15)} - {formatTimeFromMins((currentAiring.start + currentAiring.duration) * 15)}
                      </span>
                        <span className="ml-2">({currentAiring.duration * 15} phút)</span>
                      </div>
                      <p className="text-white/80 text-base">Chương trình đang phát sóng trực tiếp</p>
                  </div>
                  <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm animate-pulse">
                      <FaPlay className="text-white text-xl" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="text-center text-white/80 py-6">Hiện chưa có chương trình nào đang phát sóng.</div>
            )}
          </div>
        </div>
      )}

      {/* Sắp phát sóng */}
      {isSelectedDayToday && (
        <div className="relative z-10 max-w-md md:max-w-2xl lg:max-w-4xl mx-auto mb-6 md:mb-8 px-2 md:px-4 lg:px-4">
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 lg:from-blue-500/20 lg:to-cyan-500/20 backdrop-blur-md rounded-2xl md:rounded-3xl p-3 md:p-6 lg:p-8 border border-cyan-300/30 lg:border-cyan-300/40 shadow-lg lg:shadow-2xl">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-cyan-200 mb-2 flex items-center justify-center gap-2">
                <FaClock className="inline-block text-cyan-200 animate-pulse" /> Sắp phát sóng
              </h2>
            </div>
            {upcomingPrograms.length > 0 ? (
              <div className="flex flex-col gap-4">
                {upcomingPrograms.map((program, idx) => (
                  <Link href={program.link} key={idx} className={`group block relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl bg-gradient-to-r ${program.color} shadow-xl`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative z-10 flex items-center gap-4 p-4">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                        {program.type === 'book' && <span className="text-2xl">📚</span>}
                        {program.type === 'author' && <span className="text-2xl">👨‍💼</span>}
                        {program.type === 'category' && <span className="text-2xl">🏷️</span>}
                        {program.type === 'ad' && <span className="text-2xl">📢</span>}
                        {program.type === 'news' && <span className="text-2xl">📰</span>}
                        {program.type === 'music' && <span className="text-2xl">🎵</span>}
                        {program.type === 'ranking' && <span className="text-2xl">🏆</span>}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-yellow-200 transition-colors duration-300 line-clamp-2">{program.title}</h3>
                        <div className="flex items-center gap-2 text-white/80 text-sm">
                          <span className="font-mono">
                            {formatTimeFromMins(program.start * 15)} - {formatTimeFromMins((program.start + program.duration) * 15)}
                          </span>
                          <span className="ml-2">({program.duration * 15} phút)</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center text-white/80 py-6">Không có chương trình sắp phát sóng.</div>
            )}
          </div>
        </div>
      )}

      {/* Danh sách tất cả chương trình */}
      <div className="relative z-10 max-w-6xl mx-auto px-2 sm:px-4">
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-4 sm:p-8 border border-white/10 shadow-2xl">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Lịch phát sóng chi tiết</h2>
            <p className="text-white/70 text-sm sm:text-base">Tất cả chương trình trong ngày {getDateString(days[selectedDay])}</p>
          </div>
          
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center gap-3 text-white/80">
                <div className="w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xl font-semibold">Đang tải dữ liệu lịch phát sóng...</span>
              </div>
            </div>
          ) : (
            <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {programs.map((program, idx) => {
                // Nếu không phải ngày hôm nay thì không highlight gì cả
                const isCurrent = isSelectedDayToday && idx === currentAiringIndex;
                return (
                <Link 
                  href={program.link} 
                  key={idx} 
                  className={`group block relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                      isCurrent ? 'ring-4 ring-yellow-400 ring-opacity-80 scale-105 animate-pulse-slow shadow-yellow-400/40' :
                      isSelectedDayToday && idx === currentProgramIndex ? 'ring-2 ring-purple-400 ring-opacity-50 scale-105' : ''
                  }`}
                  onClick={() => setCurrentProgramIndex(idx)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-90`}></div>
                    <div className="relative z-10 p-4 sm:p-6 text-white">
                      <div className="flex items-center justify-between mb-2 sm:mb-4">
                      <div className="flex items-center gap-2">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center">
                          {program.type === 'book' && <span className="text-lg">📚</span>}
                          {program.type === 'author' && <span className="text-lg">👨‍💼</span>}
                          {program.type === 'category' && <span className="text-lg">🏷️</span>}
                          {program.type === 'ad' && <span className="text-lg">📢</span>}
                          {program.type === 'news' && <span className="text-lg">📰</span>}
                          {program.type === 'music' && <span className="text-lg">🎵</span>}
                          {program.type === 'ranking' && <span className="text-lg">🏆</span>}
                        </div>
                        <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-full">
                          {formatTimeFromMins(program.start * 15)} - {formatTimeFromMins((program.start + program.duration) * 15)}
                        </span>
                      </div>
                        {isCurrent && (
                          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
                        )}
                        {!isCurrent && isSelectedDayToday && idx === currentProgramIndex && (
                          <div className="w-3 h-3 bg-purple-400 rounded-full animate-ping"></div>
                      )}
                    </div>
                      <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2 group-hover:text-yellow-200 transition-colors duration-300 line-clamp-2">
                      {program.title}
                    </h3>
                      <div className="flex items-center justify-between text-xs sm:text-sm opacity-80">
                      <span>{program.duration * 15} phút</span>
                      <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                        {program.type === 'book' ? 'Đọc sách' : 
                         program.type === 'author' ? 'Giao lưu' : 
                         program.type === 'category' ? 'Chủ đề' : 
                         program.type === 'ad' ? 'Quảng cáo' : 
                         program.type === 'news' ? 'Bản tin' : 
                         program.type === 'music' ? 'Âm nhạc' : 
                         program.type === 'ranking' ? 'Xếp hạng' : 'Khác'}
                      </span>
                    </div>
                  </div>
                </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center py-8 mt-12">
        <p className="text-white/60 text-sm">
          © 2025 CoderTour - Lịch phát sóng trực tuyến
        </p>
      </div>
    </div>
  );
} 