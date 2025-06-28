"use client";

import React, { useState, useEffect } from 'react';
import { bookService } from '../../services/bookService';

const BookFilter = ({ onCategoryChange, onYearChange, onRatingChange, onPriceChange }) => {
  const [category, setCategory] = useState('All');
  const [year, setYear] = useState('All');
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

  const handleYearChange = (e) => {
    const selectedYear = e.target.value;
    setYear(selectedYear);
    if (onYearChange) {
      onYearChange(selectedYear === 'All' ? undefined : parseInt(selectedYear));
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
    <div className="mb-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Category Filter */}
        <div>
          <label className="block text-yellow-400 text-sm font-medium mb-2">Thể loại</label>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Year Filter */}
        <div>
          <label className="block text-yellow-400 text-sm font-medium mb-2">Năm xuất bản</label>
          <select
            value={year}
            onChange={handleYearChange}
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="block text-yellow-400 text-sm font-medium mb-2">Đánh giá tối thiểu</label>
          <select
            value={rating}
            onChange={handleRatingChange}
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            <option value="All">Tất cả</option>
            <option value="4.5">4.5+ sao</option>
            <option value="4.0">4.0+ sao</option>
            <option value="3.5">3.5+ sao</option>
            <option value="3.0">3.0+ sao</option>
          </select>
        </div>

        {/* Price Filter */}
        <div>
          <label className="block text-yellow-400 text-sm font-medium mb-2">Giá tối đa (VND)</label>
          <input
            type="number"
            value={maxPrice}
            onChange={handlePriceChange}
            placeholder="Nhập giá tối đa"
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>
      </div>
    </div>
  );
};

export default BookFilter;