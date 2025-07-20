"use client";

import React, { useState, useEffect } from 'react';
import { FaFilter, FaTimes } from 'react-icons/fa';

const BookFilter = ({ 
  categories = [], 
  onCategoryChange, 
  onSearch, 
  onYearChange, 
  onRatingChange, 
  onPriceChange,
  onClearFilters 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [year, setYear] = useState('All');
  const [minRating, setMinRating] = useState('All');
  const [maxPrice, setMaxPrice] = useState('All');
  const [years, setYears] = useState([]);

  // Lấy danh sách năm từ categories hoặc tạo mảng năm
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearList = [];
    for (let i = currentYear; i >= currentYear - 20; i--) {
      yearList.push(i);
    }
    setYears(yearList);
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    // Lọc real-time ngay khi thay đổi
    onCategoryChange?.(category);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Lọc real-time ngay khi nhập
    onSearch?.(value);
  };

  const handleYearChange = (selectedYear) => {
    setYear(selectedYear);
    // Lọc real-time ngay khi thay đổi
    onYearChange?.(selectedYear === 'All' ? undefined : selectedYear);
  };

  const handleRatingChange = (rating) => {
    setMinRating(rating);
    // Lọc real-time ngay khi thay đổi
    onRatingChange?.(rating === 'All' ? undefined : rating);
  };

  const handlePriceChange = (price) => {
    setMaxPrice(price);
    console.log('Price filter changed:', price, 'type:', typeof price);
    // Lọc real-time ngay khi thay đổi
    onPriceChange?.(price === 'All' ? undefined : price);
  };

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSearchTerm('');
    setYear('All');
    setMinRating('All');
    setMaxPrice('All');
    // Xóa tất cả filter ngay lập tức
    onClearFilters?.();
  };

  return (
    <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-6 rounded-3xl shadow-lg backdrop-blur-sm border border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <FaFilter className="text-pink-500 text-xl" />
        <h2 className="text-2xl font-bold text-gray-800">Bộ lọc tìm kiếm</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Thể loại */}
        <div className="w-full">
          <label className="block text-pink-500 text-base font-semibold mb-2">Thể loại</label>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full px-4 py-3 bg-white/40 backdrop-blur-md text-gray-900 rounded-2xl border border-white/40 shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-base font-semibold transition-all"
            style={{ fontFamily: 'Inter, Arial, sans-serif' }}
          >
            <option value="All">Tất cả thể loại</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Tìm kiếm */}
        <div className="w-full">
          <label className="block text-pink-500 text-base font-semibold mb-2">Tìm kiếm</label>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Tên sách, tác giả..."
            className="w-full px-4 py-3 bg-white/40 backdrop-blur-md text-gray-900 rounded-2xl border border-white/40 shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-base font-semibold transition-all"
            style={{ fontFamily: 'Inter, Arial, sans-serif' }}
          />
        </div>

        {/* Năm xuất bản */}
        <div className="w-full">
          <label className="block text-pink-500 text-base font-semibold mb-2">Năm xuất bản</label>
          <select
            value={year}
            onChange={(e) => handleYearChange(e.target.value)}
            className="w-full px-4 py-3 bg-white/40 backdrop-blur-md text-gray-900 rounded-2xl border border-white/40 shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-base font-semibold transition-all"
            style={{ fontFamily: 'Inter, Arial, sans-serif' }}
          >
            <option value="All">Tất cả năm</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Đánh giá tối thiểu */}
        <div className="w-full">
          <label className="block text-pink-500 text-base font-semibold mb-2">Đánh giá tối thiểu</label>
          <select
            value={minRating}
            onChange={(e) => handleRatingChange(e.target.value)}
            className="w-full px-4 py-3 bg-white/40 backdrop-blur-md text-gray-900 rounded-2xl border border-white/40 shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-base font-semibold transition-all"
            style={{ fontFamily: 'Inter, Arial, sans-serif' }}
          >
            <option value="All">Tất cả đánh giá</option>
            <option value="4.5">4.5+ sao</option>
            <option value="4.0">4.0+ sao</option>
            <option value="3.5">3.5+ sao</option>
            <option value="3.0">3.0+ sao</option>
          </select>
        </div>

        {/* Giá tối đa */}
        <div className="w-full">
          <label className="block text-pink-500 text-base font-semibold mb-2">Giá tối đa</label>
          <select
            value={maxPrice}
            onChange={(e) => handlePriceChange(e.target.value)}
            className="w-full px-4 py-3 bg-white/40 backdrop-blur-md text-gray-900 rounded-2xl border border-white/40 shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-base font-semibold transition-all"
            style={{ fontFamily: 'Inter, Arial, sans-serif' }}
          >
            <option value="All">Tất cả giá</option>
            <option value="50000">Dưới 50.000đ</option>
            <option value="100000">Dưới 100.000đ</option>
            <option value="150000">Dưới 150.000đ</option>
            <option value="200000">Dưới 200.000đ</option>
            <option value="300000">Dưới 300.000đ</option>
          </select>
        </div>
      </div>

      {/* Nút xóa bộ lọc */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleClearFilters}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <FaTimes className="text-sm" />
          Xóa bộ lọc
        </button>
      </div>
    </div>
  );
};

export default BookFilter;