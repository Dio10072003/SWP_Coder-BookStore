'use client';

import React, { useState, useMemo, useEffect } from 'react';
import BookFilter from './Components/BookFilter.jsx';
import BookGrid from './Components/BookGrid.jsx';
import Pagination from './Components/Pagination.jsx';
import SearchBar from './Components/SearchBar.jsx';
import { useBooks } from '../hooks/useBooks';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { FaFilter, FaTimes } from 'react-icons/fa';
import AddBookModal from './Components/AddBookModal.jsx';
import AddBookButton from './Components/AddBookButton.jsx';
import { bookService } from '../services/bookService';

const FloatingIcon = ({ style, children, className }) => (
  <div
    className={`absolute pointer-events-none select-none ${className}`}
    style={style}
    aria-hidden="true"
  >
    {children}
  </div>
);

const emptyBook = {
  title: '',
  author: '',
  price: '',
  img: '',
  rating: 0,
  description: '',
  category: '',
  publishYear: new Date().getFullYear(),
  pages: 0,
  language: '',
  isbn: '',
};

function BooksHeader() {
  return (
    <header className="relative min-h-[340px] md:min-h-[420px] flex items-center justify-center overflow-hidden pb-24">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-pink-500 to-indigo-700">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30px_30px,rgba(255,255,255,0.12)_2px,transparent_2px)] bg-[length:60px_60px]"></div>
        </div>
      </div>
      {/* Floating icons */}
      <div className="absolute pointer-events-none select-none" style={{top:40,left:60,animation:'float1 6s ease-in-out infinite'}}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="drop-shadow-lg">
          <rect x="3" y="6" width="18" height="12" rx="2" fill="#fff" fillOpacity="0.7" />
          <rect x="5" y="8" width="14" height="8" rx="1" fill="#a78bfa" />
        </svg>
      </div>
      <div className="absolute pointer-events-none select-none" style={{top:90,right:80,animation:'float2 7s ease-in-out infinite'}}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="drop-shadow-lg">
          <polygon points="12,2 15,8 22,9 17,14 18,21 12,18 6,21 7,14 2,9 9,8" fill="#fff" fillOpacity="0.7" />
          <polygon points="12,4 14,8 19,9 15,13 16,19 12,16 8,19 9,13 5,9 10,8" fill="#fbbf24" />
        </svg>
      </div>
      <div className="absolute pointer-events-none select-none" style={{bottom:60,left:120,animation:'float3 8s ease-in-out infinite'}}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="drop-shadow-lg">
          <circle cx="12" cy="12" r="10" fill="#facc15" fillOpacity="0.7" />
          <polygon points="12,7 13,13 11,13" fill="#fff" />
        </svg>
      </div>
      {/* Main animated icon */}
      <div className="relative z-20 flex flex-col items-center mb-2" style={{ animation: 'floatMain 4s ease-in-out infinite' }}>
        <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-md border-4 border-white/40 shadow-xl mb-6 animate-[pulse_2.5s_ease-in-out_infinite]">
          <svg className="w-14 h-14 md:w-20 md:h-20 text-purple-600" fill="none" viewBox="0 0 48 48">
            <rect x="8" y="12" width="32" height="24" rx="6" fill="#a78bfa" />
            <rect x="14" y="18" width="20" height="12" rx="3" fill="#fff" />
            <path d="M24 18v12" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <h1 className="text-6xl md:text-7xl font-extrabold mb-4 drop-shadow-2xl tracking-tight animate-fade-in font-heading" style={{ letterSpacing: '-0.04em', lineHeight: 1.1 }}>
          <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-600 bg-clip-text text-transparent">Kho Sách Nổi Bật</span>
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-lg animate-fade-in delay-200 font-normal md:font-semibold z-20 relative font-body" style={{ fontWeight: 400, letterSpacing: '0.01em' }}>
          Khám phá, tìm kiếm và quản lý những cuốn sách hay nhất tại <span className="font-bold text-white/95">Coder-BookStore</span>
        </p>
      </div>
      {/* Decorative line */}
      <div className="mt-8 flex justify-center relative z-20">
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent rounded-full"></div>
      </div>
      {/* Bottom wave effect */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg className="w-full h-16 md:h-24 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
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
        .animate-fade-in { animation: fadeIn 1.2s both; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: none; } }
      `}</style>
    </header>
  );
}

export default function BooksPage() {
  const [filters, setFilters] = useState({ 
    category: undefined, 
    search: '', 
    year: undefined,
    minRating: undefined,
    maxPrice: undefined
  });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12); // default for desktop
  const [showFilter, setShowFilter] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [localBooks, setLocalBooks] = useState([]);
  const [modalType, setModalType] = useState('create');
  const [form, setForm] = useState(emptyBook);
  const [formError, setFormError] = useState(null);

  // Responsive limit for pagination
  useEffect(() => {
    function updateLimit() {
      if (typeof window !== 'undefined') {
        const w = window.innerWidth;
        if (w < 640) setLimit(4); // mobile
        else if (w < 1024) setLimit(8); // tablet
        else setLimit(12); // desktop
      }
    }
    updateLimit();
    window.addEventListener('resize', updateLimit);
    return () => window.removeEventListener('resize', updateLimit);
  }, []);

  // Tag/chip filter state helpers
  const activeChips = [];
  if (filters.category) activeChips.push({ key: 'category', label: filters.category });
  if (filters.year) activeChips.push({ key: 'year', label: `Năm: ${filters.year.min || ''}${filters.year.min && filters.year.max ? ' - ' : ''}${filters.year.max || ''}` });
  if (filters.minRating) activeChips.push({ key: 'minRating', label: `Đánh giá: ${filters.minRating}+` });
  if (filters.maxPrice) activeChips.push({ key: 'maxPrice', label: `≤ ${filters.maxPrice}₫` });

  const handleRemoveChip = (key) => {
    if (key === 'category') setFilters(f => ({ ...f, category: undefined }));
    if (key === 'year') setFilters(f => ({ ...f, year: undefined }));
    if (key === 'minRating') setFilters(f => ({ ...f, minRating: undefined }));
    if (key === 'maxPrice') setFilters(f => ({ ...f, maxPrice: undefined }));
    setPage(1);
  };

  const memoizedFilters = useMemo(() => ({ ...filters, page, limit }), [filters, page, limit]);
  const { books, loading, error, total } = useBooks(memoizedFilters);

  // Khi books thay đổi từ useBooks, đồng bộ vào localBooks
  useEffect(() => {
    if (books) setLocalBooks(books);
  }, [books]);

  const handleBookAdded = (newBook) => {
    setLocalBooks([newBook, ...localBooks]);
  };

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

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: name === 'rating' || name === 'pages' || name === 'publishYear' ? Number(value) : value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    try {
      if (modalType === 'create') {
        const newBook = await bookService.createBook(form);
        setLocalBooks([newBook, ...localBooks]);
        setShowAddModal(false);
        setForm(emptyBook);
      }
      // Nếu có modalType === 'edit', xử lý tương tự ở đây nếu cần
    } catch (err) {
      setFormError(err.message || 'Lỗi không xác định');
    }
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
      <BooksHeader />
      {showAddModal && (
        <AddBookModal
          visible={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleFormSubmit}
          form={form}
          onFormChange={handleFormChange}
          modalType={modalType}
          formError={formError}
        />
      )}
      {/* Search and Filter UI */}
      <div className="max-w-5xl mx-auto px-2 sm:px-4 md:px-8 bg-white rounded-3xl shadow-xl mt-2 mb-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 animate-gradient-move">
        <div className="flex-1">
          <SearchBar onSearch={handleSearch} />
        </div>
        {/* Filter UI Responsive - Nút Bộ lọc cho mọi thiết bị */}
        <div className="flex items-center gap-2 mb-2 sm:mb-4">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-400 via-yellow-400 to-purple-400 text-white font-bold shadow-lg animate-gradient-move text-base md:text-lg"
            onClick={() => setShowFilter(true)}
          >
            <FaFilter /> Bộ lọc
          </button>
        </div>
        {/* Tag/Chip filter */}
        {activeChips.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {activeChips.map(chip => (
              <span key={chip.key} className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-pink-100 via-yellow-100 to-purple-100 text-pink-700 font-semibold shadow animate-gradient-move text-xs sm:text-sm">
                {chip.label}
                <button onClick={() => handleRemoveChip(chip.key)} className="ml-1 text-pink-400 hover:text-red-500"><FaTimes size={12} /></button>
              </span>
            ))}
          </div>
        )}
        {/* Modal filter cho mọi thiết bị */}
        {showFilter && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-full sm:w-[480px] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl p-6 animate-fade-in flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-lg text-pink-500">Bộ lọc</span>
                <button onClick={() => setShowFilter(false)} className="p-2 rounded-full bg-gray-100 hover:bg-pink-100 text-pink-500"><FaTimes /></button>
              </div>
              <BookFilter
                onCategoryChange={handleCategoryChange}
                onYearChange={handleYearChange}
                onRatingChange={handleRatingChange}
                onPriceChange={handlePriceChange}
              />
              <button onClick={() => setShowFilter(false)} className="mt-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-400 via-yellow-400 to-purple-400 text-white font-bold shadow-lg animate-gradient-move">Áp dụng</button>
            </div>
          </div>
        )}
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
            Tìm thấy {total ?? localBooks.length} sách
            {hasActiveFilters && ' với bộ lọc hiện tại'}
          </p>
        </div>
      )}
      {loading && <Loading message="Đang tải sách..." color="yellow" />}
      {error && <Error message={`Lỗi: ${error}`} />}
      {!loading && !error && (
        <>
          {/* BookGrid: truyền localBooks thay vì books để cập nhật realtime */}
          <BookGrid books={localBooks} loading={loading} error={error} />
          <Pagination
            page={page}
            setPage={setPage}
            total={total ?? (Array.isArray(localBooks) ? localBooks.length : (localBooks?.data?.length || 0))}
            limit={limit}
          />
        </>
      )}
    </div>
  );
}