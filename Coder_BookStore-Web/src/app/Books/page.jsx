'use client';

import React, { useState, useMemo } from 'react';
import BookFilter from './Components/BookFilter.jsx';
import BookGrid from './Components/BookGrid.jsx';
import Pagination from './Components/Pagination.jsx';
import SearchBar from './Components/SearchBar.jsx';
import { useBooks } from '../hooks/useBooks';
import Loading from '../components/Loading';
import Error from '../components/Error';

const FloatingIcon = ({ style, children, className }) => (
  <div
    className={`absolute pointer-events-none select-none ${className}`}
    style={style}
    aria-hidden="true"
  >
    {children}
  </div>
);

export default function BooksPage() {
  const [filters, setFilters] = useState({ 
    category: undefined, 
    search: '', 
    year: undefined,
    minRating: undefined,
    maxPrice: undefined
  });
  const [page, setPage] = useState(1);
  const limit = 10;
  const memoizedFilters = useMemo(() => ({ ...filters, page, limit }), [filters, page, limit]);
  const { books, loading, error, total } = useBooks(memoizedFilters);

  const handleCategoryChange = (category) => {
    setFilters(prev => ({ ...prev, category }));
    setPage(1);
  };

  const handleSearch = (search) => {
    setFilters(prev => ({ ...prev, search }));
    setPage(1);
  };

  const handleYearChange = (year) => {
    setFilters(prev => ({ ...prev, year }));
    setPage(1);
  };

  const handleRatingChange = (minRating) => {
    setFilters(prev => ({ ...prev, minRating }));
    setPage(1);
  };

  const handlePriceChange = (maxPrice) => {
    setFilters(prev => ({ ...prev, maxPrice }));
    setPage(1);
  };

  const clearFilters = () => {
    setFilters({
      category: undefined,
      search: '',
      year: undefined,
      minRating: undefined,
      maxPrice: undefined
    });
    setPage(1);
  };

  const hasActiveFilters = filters.category || filters.search || filters.year || filters.minRating || filters.maxPrice;

  return (
    <div className="min-h-screen bg-transparent">
      {/* Modern Gradient Header */}
      <div className="relative w-full flex flex-col items-center justify-center min-h-[320px] md:min-h-[400px] overflow-hidden mb-8 pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-pink-500 to-indigo-700 z-0">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30px_30px,rgba(255,255,255,0.10)_2px,transparent_2px)] bg-[length:60px_60px]"></div>
          </div>
        </div>
        {/* Bỏ nền gradient header */}
        {/* Floating icons */}
        <FloatingIcon style={{ top: 40, left: 60, animation: 'float1 6s ease-in-out infinite' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="drop-shadow-lg">
            <rect x="3" y="6" width="18" height="12" rx="2" fill="#fff" fillOpacity="0.7" />
            <rect x="5" y="8" width="14" height="8" rx="1" fill="#a78bfa" />
          </svg>
        </FloatingIcon>
        <FloatingIcon style={{ top: 90, right: 80, animation: 'float2 7s ease-in-out infinite' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="drop-shadow-lg">
            <polygon points="12,2 15,8 22,9 17,14 18,21 12,18 6,21 7,14 2,9 9,8" fill="#fff" fillOpacity="0.7" />
            <polygon points="12,4 14,8 19,9 15,13 16,19 12,16 8,19 9,13 5,9 10,8" fill="#fbbf24" />
          </svg>
        </FloatingIcon>
        <FloatingIcon style={{ bottom: 60, left: 120, animation: 'float3 8s ease-in-out infinite' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="drop-shadow-lg">
            <circle cx="12" cy="12" r="10" fill="#facc15" fillOpacity="0.7" />
            <polygon points="12,7 13,13 11,13" fill="#fff" />
          </svg>
        </FloatingIcon>
        {/* Main animated book icon */}
        <div className="relative z-20 flex flex-col items-center mb-2" style={{ animation: 'floatMain 4s ease-in-out infinite' }}>
          <div className="w-20 h-20 md:w-28 md:h-28 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-md border-4 border-white/40 shadow-xl mb-4 animate-[pulse_2.5s_ease-in-out_infinite]">
            <svg className="w-12 h-12 md:w-16 md:h-16 text-purple-600" fill="none" viewBox="0 0 48 48">
              <rect x="8" y="12" width="32" height="24" rx="6" fill="#a78bfa" />
              <rect x="14" y="18" width="20" height="12" rx="3" fill="#fff" />
              <path d="M24 18v12" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-2 drop-shadow-2xl tracking-tight text-white" style={{ fontFamily: 'Montserrat, Arial, sans-serif', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
            <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-600 bg-clip-text text-transparent">Kho Sách</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-lg font-normal md:font-semibold z-20 relative">
            Khám phá, tìm kiếm và mua những cuốn sách hay nhất dành cho lập trình viên tại <span className="font-bold text-white/95">Coder-BookStore</span>
          </p>
        </div>
        {/* Decorative line */}
        <div className="mt-6 flex justify-center relative z-20">
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent rounded-full"></div>
        </div>
        {/* Bottom wave effect */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg className="w-full h-12 md:h-16 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
          </svg>
        </div>
        <style jsx>{`
          @keyframes float1 { 0% { transform: translateY(0); } 50% { transform: translateY(-18px); } 100% { transform: translateY(0); } }
          @keyframes float2 { 0% { transform: translateY(0); } 50% { transform: translateY(-12px); } 100% { transform: translateY(0); } }
          @keyframes float3 { 0% { transform: translateY(0); } 50% { transform: translateY(-22px); } 100% { transform: translateY(0); } }
          @keyframes floatMain { 0% { transform: translateY(0); } 50% { transform: translateY(-24px); } 100% { transform: translateY(0); } }
          .animate-spin-slow { animation: spin 7s linear infinite; }
          @keyframes spin { 100% { transform: rotate(360deg); } }
        `}</style>
      </div>

      {/* Search and Filter UI */}
      <div className="max-w-5xl mx-auto px-4 bg-white rounded-3xl shadow-xl">
        <SearchBar onSearch={handleSearch} />
        <BookFilter 
          onCategoryChange={handleCategoryChange}
          onYearChange={handleYearChange}
          onRatingChange={handleRatingChange}
          onPriceChange={handlePriceChange}
        />
      </div>
      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <div className="mb-4 text-center">
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
          >
            Xóa bộ lọc
          </button>
        </div>
      )}
      {/* Results Count */}
      {!loading && !error && (
        <div className="mb-4 text-center">
          <p className="text-yellow-400">
            Tìm thấy {total ?? books.length} sách
            {hasActiveFilters && ' với bộ lọc hiện tại'}
          </p>
        </div>
      )}
      {loading && <Loading message="Đang tải sách..." color="yellow" />}
      {error && <Error message={`Lỗi: ${error}`} />}
      {!loading && !error && (
        <>
          <BookGrid books={Array.isArray(books) ? books : (books?.data || [])} />
          <Pagination
            page={page}
            setPage={setPage}
            total={total ?? (Array.isArray(books) ? books.length : (books?.data?.length || 0))}
            limit={limit}
          />
        </>
      )}
    </div>
  );
}