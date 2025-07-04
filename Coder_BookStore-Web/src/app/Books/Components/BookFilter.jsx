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

        {/* Year Range Filter */}
        <div>
          <label className="block text-yellow-400 text-sm font-medium mb-2">Năm xuất bản</label>
          <div className="flex gap-2">
            <select
              value={minYear}
              onChange={handleMinYearChange}
              className="w-1/2 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  Từ {y}
                </option>
              ))}
            </select>
            <select
              value={maxYear}
              onChange={handleMaxYearChange}
              className="w-1/2 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  Đến {y}
                </option>
              ))}
            </select>
          </div>
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
          <label className="block text-yellow-400 text-sm font-medium mb-2">Giá tối đa</label>
          <div className="relative flex items-center">
            <input
              type="number"
              value={maxPrice}
              onChange={handlePriceChange}
              placeholder="Nhập giá tối đa"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 pr-16"
            />
            <span className="absolute right-4 text-gray-400 font-semibold pointer-events-none">VND</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookFilter;