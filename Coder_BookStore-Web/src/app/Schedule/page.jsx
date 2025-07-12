'use client'
import React, { useEffect, useState } from 'react';
import { bookService } from '../services/bookService';
import { authorService } from '../services/authorService';
import { categoryService } from '../services/categoryService';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const NEWS_TIMES = [9 * 60, 12 * 60, 15 * 60, 18 * 60 + 30, 20 * 60 + 45]; // phút: 09:00, 12:00, 15:00, 18:30, 20:45
const START_DATE = new Date(2025, 6, 15); // 15/7/2025 (tháng 6 vì JS Date tháng bắt đầu từ 0)
const DAYS_COUNT = 30;

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
  // Đặt bản tin cập nhật trước, luôn luôn ghi đè slot
  const newsPrograms = NEWS_TIMES.map(mins => ({
    start: mins / 15,
    duration: 1,
    type: 'news',
    title: 'Bản tin cập nhật',
    color: 'from-blue-400 to-cyan-400',
    link: '/Blog',
  }));
  newsPrograms.forEach(p => {
    slots[Math.floor(p.start)] = p; // luôn luôn ghi đè
  });

  // Các mốc quảng cáo (đơn vị phút)
  const adTimes = [8 * 60, 11 * 60, 14 * 60, 16 * 60, 18 * 60, 20 * 60 + 30];
  // Đánh dấu các slot bị chiếm bởi quảng cáo (10 phút mỗi mốc)
  const adSlots = adTimes.flatMap(mins => {
    const start = Math.floor(mins / 15);
    const end = Math.ceil((mins + 10) / 15);
    return Array.from({length: end - start}, (_, i) => start + i);
  });
  // Đặt các slot quảng cáo là 'ad', luôn luôn ghi đè
  adTimes.forEach(mins => {
    const slot = mins / 15;
    slots[Math.floor(slot)] = {
      type: 'ad',
      title: 'Quảng cáo khuyến mãi',
      color: 'from-yellow-400 to-pink-500',
      link: '/Promotions',
      duration: 10 / 15, // 10 phút
      start: slot,
    };
  });

  // Đặt các chương trình giao lưu tác giả (45 phút)
  let authorIdx = 0;
  for (let i = 2; i < 96; i += 12) { // mỗi 3h
    if (authors.length) {
      // Nếu slot này hoặc slot bị quảng cáo chiếm, bỏ qua
      if (adSlots.includes(i) || adSlots.includes(i+1) || adSlots.includes(i+2)) continue;
      const idx = (hashString(`${dayIdx}-author-${i}`) + authorIdx) % authors.length;
      const author = authors[idx];
      for (let j = 0; j < 3; j++) slots[i + j] = {
        type: 'author',
        title: `Giao lưu với tác giả: ${author.name}`,
        color: 'from-purple-400 to-blue-400',
        link: `/Authors/${author.id}`,
        duration: 3,
        start: i,
      };
      authorIdx++;
    }
  }
  // Đặt các chương trình chủ đề (45 phút)
  let catIdx = 0;
  for (let i = 5; i < 96; i += 16) {
    if (categories.length) {
      if (adSlots.includes(i) || adSlots.includes(i+1) || adSlots.includes(i+2)) continue;
      const idx = (hashString(`${dayIdx}-cat-${i}`) + catIdx) % categories.length;
      const cat = categories[idx];
      for (let j = 0; j < 3; j++) if (!slots[i + j]) slots[i + j] = {
        type: 'category',
        title: `Chủ đề: ${cat.name}`,
        color: 'from-green-400 to-teal-400',
        link: `/Categories/${cat.name}`,
        duration: 3,
        start: i,
      };
      catIdx++;
    }
  }
  // Đặt các chương trình đọc sách (thời lượng tuỳ ý, random 2-6 slot)
  let bookIdx = 0;
  for (let i = 0; i < 96; ) {
    if (!slots[i] && books.length) {
      // Nếu slot này bị quảng cáo chiếm, bỏ qua
      let len = 2 + (hashString(`${dayIdx}-booklen-${i}`) % 5); // 2-6 slot (30-90 phút)
      // Nếu bất kỳ slot nào trong len bị quảng cáo chiếm, chỉ lấy phần trước quảng cáo
      let validLen = 0;
      for (let j = 0; j < len && (i + j) < 96; j++) {
        if (adSlots.includes(i + j)) break;
        validLen++;
      }
      if (validLen > 0) {
        const idx = (hashString(`${dayIdx}-book-${i}`) + bookIdx) % books.length;
        const book = books[idx];
        for (let j = 0; j < validLen; j++) {
          slots[i + j] = {
            type: 'book',
            title: `Đọc sách: ${book.title}`,
            color: 'from-pink-400 to-yellow-400',
            link: `/Books/${book.id}`,
            duration: validLen,
            start: i,
          };
        }
        i += validLen;
        bookIdx++;
      } else {
        i++;
      }
    } else {
      i++;
    }
  }
  // Lấp đầy slot còn lại bằng chương trình nghe nhạc, chỉ từ 00:00 đến 06:00
  for (let i = 0; i < 96; i++) {
    const mins = i * 15;
    if (!slots[i] && !adSlots.includes(i) && mins >= 0 && mins < 360) { // 0 <= mins < 360 (00:00 - 06:00)
      slots[i] = {
        type: 'music',
        title: 'Chương trình nghe nhạc',
        color: 'from-orange-400 to-pink-500',
        link: '/Blog',
        duration: 1,
        start: i,
      };
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
  // Sắp xếp lại theo thời gian bắt đầu
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

  // Khi chọn ngày, nếu ngày đó không nằm trong tuần hiện tại, tự động chuyển tuần
  const handleSelectDay = (idx) => {
    setSelectedDay(idx);
    const weekStart = Math.floor(idx / 7) * 7;
    setCurrentWeekStart(weekStart);
  };

  // Khi chọn ngày bằng date picker, cũng cập nhật tuần
  const handleDateChange = (e) => {
    const val = e.target.value;
    const idx = days.findIndex(d => toDateInputValue(d) === val);
    if (idx !== -1) {
      setSelectedDay(idx);
      setCurrentWeekStart(Math.floor(idx / 7) * 7);
    } else {
      setSelectedDay(0);
      setCurrentWeekStart(0);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 pb-16">
      <div className="relative w-full flex flex-col items-center justify-center min-h-[260px] md:min-h-[320px] overflow-hidden mb-8 pb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-yellow-300 to-blue-400 z-0 opacity-90"></div>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-2xl tracking-tight text-white z-10 relative" style={{ fontFamily: 'Montserrat, Arial, sans-serif', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
          <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-600 bg-clip-text text-transparent">Lịch Phát Sóng</span>
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-lg font-normal md:font-semibold z-10 relative">
          Xem các chương trình hấp dẫn của Coder-BookStore theo từng khung giờ mỗi ngày!
        </p>
        {/* Carousel chọn ngày dạng tuần */}
        <div className="w-full flex justify-center items-center mt-6 mb-6 overflow-visible">
          <button
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-xl text-white mx-2 disabled:opacity-30"
            onClick={() => setCurrentWeekStart(Math.max(0, currentWeekStart - 7))}
            disabled={currentWeekStart === 0}
          >
            <FaChevronLeft />
          </button>
          <div className="flex flex-1 justify-center items-center gap-2 overflow-x-auto flex-nowrap">
            {days.slice(currentWeekStart, currentWeekStart + 7).map((date, idx) => {
              const globalIdx = currentWeekStart + idx;
              const isSelected = globalIdx === selectedDay;
              const gradient = rainbowGradients[date.getDay()];
              return (
                <button
                  key={globalIdx}
                  onClick={() => handleSelectDay(globalIdx)}
                  className={`flex flex-col items-center px-6 py-6 rounded-2xl font-bold transition-all duration-200 border-2 min-w-[140px] max-w-[160px] mx-1
                    bg-gradient-to-br ${gradient} 
                    ${isSelected ? 'text-red-600 border-yellow-400 scale-105 shadow-lg z-10' : 'text-white border-white/20 opacity-60 grayscale'}
                  `}
                  style={isSelected ? { borderBottom: '3px solid #e11d48', textDecoration: 'none' } : {}}
                >
                  <span className={`text-xl md:text-2xl font-extrabold tracking-wide ${isSelected ? 'text-red-600' : 'text-white'}`}>{getWeekdayVN(date)}</span>
                  <span className={`text-lg md:text-xl font-semibold mt-1 ${isSelected ? 'text-red-500' : 'text-white/80'}`}>{getDayMonthVN(date)}</span>
                </button>
              );
            })}
          </div>
          <button
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-xl text-white mx-2 disabled:opacity-30"
            onClick={() => setCurrentWeekStart(Math.min(days.length - 7, currentWeekStart + 7))}
            disabled={currentWeekStart + 7 >= days.length}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-2 md:px-6">
        <div className="overflow-x-auto rounded-3xl shadow-2xl bg-white px-2 md:px-8" style={{maxWidth: '1400px'}}>
          <table className="w-full border-separate border-spacing-y-3">
            <thead>
              <tr>
                <th className="py-3 px-4 text-xl font-bold text-gray-700 text-center sticky left-0 bg-white z-20 min-w-[120px]">Thời gian</th>
                <th className="py-3 px-12 text-xl font-bold text-gray-700 text-center min-w-[600px] max-w-[1000px]">Chương trình</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((p, idx) => {
                // Tính phút bắt đầu và kết thúc
                const startMins = p.start * 15;
                const endMins = p.type === 'ad'
                  ? startMins + 10 // 10 phút
                  : startMins + p.duration * 15;
                return (
                  <tr key={idx}>
                    <td className="py-3 px-4 font-semibold text-gray-600 text-center sticky left-0 bg-white z-10 border-r border-gray-100 whitespace-nowrap text-lg">
                      {formatTimeFromMins(startMins)} - {formatTimeFromMins(endMins)}
                    </td>
                    <td className="py-3 px-8 text-center">
                      {p.type === 'ad' ? (
                        <Link href={p.link} className="inline-block w-[95%] px-10 py-3 rounded-full text-base font-bold text-yellow-900 bg-gradient-to-r from-yellow-300 to-pink-300 shadow-lg border-2 border-yellow-400 animate-pulse">
                          {p.title} <span className="ml-2 text-xs font-semibold">(10 phút)</span>
                        </Link>
                      ) : (
                        <Link href={p.link} className={`inline-block w-[95%] px-10 py-4 rounded-full text-xl font-bold text-white bg-gradient-to-r ${p.color} shadow-lg hover:scale-105 transition-transform duration-200 whitespace-nowrap`}>{p.title}</Link>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {loading && <div className="text-center py-8 text-lg text-gray-500">Đang tải dữ liệu...</div>}
      </div>
    </div>
  );
} 