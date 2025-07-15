"use client";

import React, { useState, useEffect } from 'react';
import { bookService } from '../../services/bookService';

const BookFilter = ({ onCategoryChange, onYearChange, onRatingChange, onPriceChange }) => {
  const [category, setCategory] = useState('All');
  const [minYear, setMinYear] = useState('All');
  const [maxYear, setMaxYear] = useState('All');
  const [rating, setRating] = useState('All');
  const [maxPrice, setMaxPrice] = useState('');
  const [categories, setCategories] = useState(['All']);
  const [years, setYears] = useState(['All']);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [categoriesData, yearsData] = await Promise.all([
          bookService.getCategories(),
          bookService.getYears()
        ]);
        setCategories(['All', ...categoriesData]);
        setYears(['All', ...yearsData.map(y => y.toString())]);
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    };

    fetchFilters();
  }, []);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    if (onCategoryChange) {
      onCategoryChange(selectedCategory === 'All' ? undefined : selectedCategory);
    }
  };

  const handleMinYearChange = (e) => {
    const selected = e.target.value;
    setMinYear(selected);
    if (onYearChange) {
      onYearChange({ min: selected === 'All' ? undefined : parseInt(selected), max: maxYear === 'All' ? undefined : parseInt(maxYear) });
    }
  };

  const handleMaxYearChange = (e) => {
    const selected = e.target.value;
    setMaxYear(selected);
    if (onYearChange) {
      onYearChange({ min: minYear === 'All' ? undefined : parseInt(minYear), max: selected === 'All' ? undefined : parseInt(selected) });
    }
  };

  const handleRatingChange = (e) => {
    const selectedRating = e.target.value;
    setRating(selectedRating);
    if (onRatingChange) {
      onRatingChange(selectedRating === 'All' ? undefined : parseFloat(selectedRating));
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setMaxPrice(value);
    if (onPriceChange) {
      onPriceChange(value ? parseFloat(value) : undefined);
    }
  };

  return (
    <div className="mb-8 animate-gradient-move">
      <div className="flex flex-col gap-4 w-full">
        {/* Category Filter */}
        <div className="w-full">
          <label className="block text-pink-500 text-base font-semibold mb-2">Thể loại</label>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="w-full px-4 py-3 bg-white/40 backdrop-blur-md text-gray-900 rounded-2xl border border-white/40 shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-base font-semibold transition-all"
            style={{ fontFamily: 'Inter, Arial, sans-serif' }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="text-base">{cat}</option>
            ))}
          </select>
        </div>
        {/* Year Range Filter */}
        <div className="w-full">
          <label className="block text-pink-500 text-base font-semibold mb-2">Năm xuất bản</label>
          <div className="flex gap-2 w-full">
            <select
              value={minYear}
              onChange={handleMinYearChange}
              className="w-1/2 px-4 py-3 bg-white/40 backdrop-blur-md text-gray-900 rounded-2xl border border-white/40 shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-base font-semibold transition-all"
              style={{ fontFamily: 'Inter, Arial, sans-serif' }}
            >
              {years.map((y) => (
                <option key={y} value={y} className="text-base">Từ {y}</option>
              ))}
            </select>
            <select
              value={maxYear}
              onChange={handleMaxYearChange}
              className="w-1/2 px-4 py-3 bg-white/40 backdrop-blur-md text-gray-900 rounded-2xl border border-white/40 shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-base font-semibold transition-all"
              style={{ fontFamily: 'Inter, Arial, sans-serif' }}
            >
              {years.map((y) => (
                <option key={y} value={y} className="text-base">Đến {y}</option>
              ))}
            </select>
          </div>
        </div>
        {/* Rating Filter */}
        <div className="w-full">
          <label className="block text-pink-500 text-base font-semibold mb-2">Đánh giá tối thiểu</label>
          <select
            value={rating}
            onChange={handleRatingChange}
            className="w-full px-4 py-3 bg-white/40 backdrop-blur-md text-gray-900 rounded-2xl border border-white/40 shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400 text-base font-semibold transition-all"
            style={{ fontFamily: 'Inter, Arial, sans-serif' }}
          >
            <option value="All" className="text-base">Tất cả</option>
            <option value="4.5" className="text-base">4.5+ sao</option>
            <option value="4.0" className="text-base">4.0+ sao</option>
            <option value="3.5" className="text-base">3.5+ sao</option>
            <option value="3.0" className="text-base">3.0+ sao</option>
          </select>
        </div>
        {/* Price Filter */}
        <div className="w-full">
          <label className="block text-pink-500 text-base font-semibold mb-2">Giá tối đa</label>
          <div className="relative flex items-center w-full">
            <input
              type="number"
              value={maxPrice}
              onChange={handlePriceChange}
              placeholder="Nhập giá tối đa"
              className="w-full px-4 py-3 bg-white/40 backdrop-blur-md text-gray-900 rounded-2xl border border-white/40 shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400 pr-14 text-base font-semibold transition-all"
              style={{ fontFamily: 'Inter, Arial, sans-serif' }}
            />
            <span className="absolute right-4 text-gray-400 font-semibold pointer-events-none text-base">VND</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookFilter;