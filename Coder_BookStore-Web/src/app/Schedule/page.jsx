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

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden">
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 -right-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
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

      {/* Logo phụ CoderTour */}
      <div className="fixed top-6 right-6 z-50">
        <Image 
          src={coderTour} 
          alt="CoderTour Logo" 
          width={60} 
          height={60} 
          className="rounded-full shadow-2xl animate-pulse bg-white/10 backdrop-blur-sm p-2" 
        />
      </div>

      {/* Header với thời gian thực */}
      <div className="relative z-10 flex flex-col items-center justify-center py-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 p-1 animate-spin-slow">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center">
                <FaBroadcastTower className="text-white text-2xl animate-pulse" />
              </div>
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-ping"></div>
          </div>
          <div>
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-2xl font-heading tracking-tight animate-gradient-move">
              LỊCH PHÁT SÓNG
            </h1>
            <div className="flex items-center gap-4 mt-2 text-white/80">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <FaClock className="text-yellow-400" />
                <span className="font-mono text-lg font-bold">
                  {currentTime.toLocaleTimeString('vi-VN', { 
                    hour: '2-digit', 
                    minute: '2-digit', 
                    second: '2-digit' 
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <FaCalendarAlt className="text-pink-400" />
                <span className="font-semibold">
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
        <p className="text-xl md:text-2xl text-white/90 font-light mb-6 text-center max-w-4xl leading-relaxed">
          Khám phá lịch phát sóng đa dạng với giao lưu tác giả, chủ đề hấp dẫn và nhiều chương trình đặc biệt mỗi ngày!
        </p>
      </div>

      {/* Thanh điều khiển */}
      <div className="relative z-10 flex justify-center mb-8">
        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
          <button 
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
              isAutoPlay 
                ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            {isAutoPlay ? <FaPause /> : <FaPlay />}
            {isAutoPlay ? 'Tạm dừng' : 'Tự động'}
          </button>
          <div className="h-6 w-px bg-white/30"></div>
          <div className="text-white/80 text-sm">
            Chương trình hiện tại: {currentProgramIndex + 1}/{programs.length}
          </div>
        </div>
      </div>

      {/* Thanh chọn ngày dạng tuần */}
      <div className="relative z-10 flex flex-col items-center mb-8">
        <div className="flex gap-3 justify-center mb-4">
          <button 
            onClick={() => setCurrentWeekStart(Math.max(0, currentWeekStart - 7))} 
            className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 group"
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
                className={`px-4 py-3 rounded-2xl font-bold text-sm transition-all duration-300 border-2 backdrop-blur-sm ${
                  isActive 
                    ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white border-purple-300 scale-110 shadow-2xl' 
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20 hover:scale-105'
                }`}
              >
                <div className="font-extrabold text-xs mb-1 uppercase tracking-wide opacity-80">{getWeekdayVN(d)}</div>
                <div className="text-base">{d.getDate().toString().padStart(2, '0')}/{(d.getMonth()+1).toString().padStart(2, '0')}</div>
              </button>
            );
          })}
          <button 
            onClick={() => setCurrentWeekStart(Math.min(DAYS_COUNT - 7, currentWeekStart + 7))} 
            className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 group"
          >
            <FaChevronRight className="text-white group-hover:text-purple-300 transition-colors" />
          </button>
        </div>
      </div>

      {/* Chương trình hiện tại nổi bật */}
      {currentProgram && (
        <div className="relative z-10 max-w-4xl mx-auto mb-8 px-4">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl animate-fade-in">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Đang phát sóng</h2>
              <div className="flex items-center justify-center gap-4 text-white/80">
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                  <FaClock className="text-yellow-400" />
                  <span className="font-mono">
                    {formatTimeFromMins(currentProgram.start * 15)} - {formatTimeFromMins((currentProgram.start + currentProgram.duration) * 15)}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                  <span className="text-sm">
                    {currentProgram.duration * 15} phút
                  </span>
                </div>
              </div>
            </div>
            <Link href={currentProgram.link} className="block group">
              <div className={`relative overflow-hidden rounded-2xl p-8 bg-gradient-to-r ${currentProgram.color} shadow-2xl transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-3xl`}>
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 flex items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                      {currentProgram.type === 'book' && (
                        <svg width="40" height="40" fill="none" viewBox="0 0 48 48" className="text-white">
                          <rect x="8" y="12" width="32" height="24" rx="6" fill="currentColor" />
                          <rect x="14" y="18" width="20" height="12" rx="3" fill="#1f2937" />
                          <path d="M24 18v12" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      )}
                      {currentProgram.type === 'author' && (
                        <svg width="40" height="40" fill="none" viewBox="0 0 48 48" className="text-white">
                          <circle cx="24" cy="24" r="20" fill="currentColor" />
                          <path d="M24 18a6 6 0 1 1 0 12 6 6 0 0 1 0-12z" fill="#1f2937" />
                          <path d="M24 30c-5 0-9 2-9 4v2h18v-2c0-2-4-4-9-4z" fill="#f472b6" />
                        </svg>
                      )}
                      {currentProgram.type === 'category' && (
                        <svg width="40" height="40" fill="none" viewBox="0 0 48 48" className="text-white">
                          <rect x="10" y="10" width="28" height="28" rx="8" fill="currentColor" />
                          <path d="M24 18v12M18 24h12" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      )}
                      {currentProgram.type === 'ad' && (
                        <svg width="40" height="40" fill="none" viewBox="0 0 48 48" className="text-white">
                          <rect x="8" y="16" width="32" height="16" rx="6" fill="currentColor" />
                          <path d="M16 24h16" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      )}
                      {currentProgram.type === 'news' && (
                        <svg width="40" height="40" fill="none" viewBox="0 0 48 48" className="text-white">
                          <rect x="8" y="12" width="32" height="24" rx="6" fill="currentColor" />
                          <path d="M16 20h16M16 28h10" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      )}
                      {currentProgram.type === 'music' && (
                        <svg width="40" height="40" fill="none" viewBox="0 0 48 48" className="text-white">
                          <circle cx="24" cy="24" r="20" fill="currentColor" />
                          <path d="M18 30a4 4 0 1 1 8 0 4 4 0 0 1-8 0zm8-12v8" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      )}
                      {currentProgram.type === 'ranking' && (
                        <svg width="40" height="40" fill="none" viewBox="0 0 48 48" className="text-white">
                          <circle cx="24" cy="24" r="20" fill="currentColor" />
                          <path d="M24 18a6 6 0 1 1 0 12 6 6 0 0 1 0-12z" fill="#1f2937" />
                          <path d="M24 30c-5 0-9 2-9 4v2h18v-2c0-2-4-4-9-4z" fill="#f472b6" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-bold text-white shadow-sm">
                        {currentProgram.type === 'book' ? '📚 Đọc sách' : 
                         currentProgram.type === 'author' ? '👨‍💼 Giao lưu tác giả' : 
                         currentProgram.type === 'category' ? '🏷️ Chủ đề' : 
                         currentProgram.type === 'ad' ? '📢 Quảng cáo' : 
                         currentProgram.type === 'news' ? '📰 Bản tin' : 
                         currentProgram.type === 'music' ? '🎵 Âm nhạc' : 
                         currentProgram.type === 'ranking' ? '🏆 Bảng xếp hạng' : '📺 Chương trình khác'}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-white drop-shadow mb-2 group-hover:text-yellow-200 transition-colors duration-300">
                      {currentProgram.title}
                    </h3>
                    <p className="text-white/80 text-lg">
                      Chương trình đang phát sóng trực tiếp
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm animate-pulse">
                      <FaPlay className="text-white text-xl" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Danh sách tất cả chương trình */}
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Lịch phát sóng chi tiết</h2>
            <p className="text-white/70">Tất cả chương trình trong ngày {getDateString(days[selectedDay])}</p>
          </div>
          
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center gap-3 text-white/80">
                <div className="w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-xl font-semibold">Đang tải dữ liệu lịch phát sóng...</span>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {programs.map((program, idx) => (
                <Link 
                  href={program.link} 
                  key={idx} 
                  className={`group block relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                    idx === currentProgramIndex ? 'ring-4 ring-purple-400 ring-opacity-50 scale-105' : ''
                  }`}
                  onClick={() => setCurrentProgramIndex(idx)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-90`}></div>
                  <div className="relative z-10 p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
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
                      {idx === currentProgramIndex && (
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                      )}
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-yellow-200 transition-colors duration-300 line-clamp-2">
                      {program.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm opacity-80">
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
              ))}
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