'use client';

import React, { useState } from 'react';
import BookFilter from './Components/BookFilter.jsx';
import BookGrid from './Components/BookGrid.jsx';
import Pagination from './Components/Pagination.jsx';
import SearchBar from './Components/SearchBar.jsx';
import { useBooks } from '../hooks/useBooks';
import Loading from '../components/Loading';
import Error from '../components/Error';

// Danh sách ảnh minh họa cho các sách phổ biến
export const bookImages = {
  'Clean Code': 'https://images-na.ssl-images-amazon.com/images/I/41xShlnTZTL._SX374_BO1,204,203,200_.jpg',
  'Python Crash Course': 'https://images-na.ssl-images-amazon.com/images/I/41uPjEenkFL._SX379_BO1,204,203,200_.jpg',
  'Dune': 'https://images-na.ssl-images-amazon.com/images/I/41N5hdRcw6L._SX258_BO1,204,203,200_.jpg',
  // Có thể bổ sung thêm các sách khác nếu cần
};

export default function BooksPage() {
  const [filters, setFilters] = useState({ 
    category: undefined, 
    search: '', 
    year: undefined,
    minRating: undefined,
    maxPrice: undefined
  });
  const { books, loading, error } = useBooks(filters);

  const handleCategoryChange = (category) => {
    setFilters(prev => ({ ...prev, category }));
  };

  const handleSearch = (search) => {
    setFilters(prev => ({ ...prev, search }));
  };

  const handleYearChange = (year) => {
    setFilters(prev => ({ ...prev, year }));
  };

  const handleRatingChange = (minRating) => {
    setFilters(prev => ({ ...prev, minRating }));
  };

  const handlePriceChange = (maxPrice) => {
    setFilters(prev => ({ ...prev, maxPrice }));
  };

  const clearFilters = () => {
    setFilters({
      category: undefined,
      search: '',
      year: undefined,
      minRating: undefined,
      maxPrice: undefined
    });
  };

  const hasActiveFilters = filters.category || filters.search || filters.year || filters.minRating || filters.maxPrice;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-700 p-6">
      <h1 className="text-4xl font-bold text-center text-yellow-400 mb-6">
        Kho Sách Coder-BookStore
      </h1>
      
      <SearchBar onSearch={handleSearch} />
      <BookFilter 
        onCategoryChange={handleCategoryChange}
        onYearChange={handleYearChange}
        onRatingChange={handleRatingChange}
        onPriceChange={handlePriceChange}
      />
      
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
            Tìm thấy {books.length} sách
            {hasActiveFilters && ' với bộ lọc hiện tại'}
          </p>
        </div>
      )}
      
      {loading && <Loading message="Đang tải sách..." color="yellow" />}
      {error && <Error message={`Lỗi: ${error}`} />}
      
      {!loading && !error && (
        <>
          <BookGrid books={books} />
          <Pagination />
        </>
      )}
    </div>
  );
}