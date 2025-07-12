"use client";

import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      onSearch(query);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    // Debounce search - search after user stops typing for 500ms
    if (onSearch) {
      clearTimeout(window.searchTimeout);
      window.searchTimeout = setTimeout(() => {
        onSearch(value);
      }, 500);
    }
  };

  return (
    <div className="mb-8 flex justify-center">
      <div className="relative w-full max-w-2xl">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleSearch}
          placeholder="Tìm kiếm sách..."
          className="w-full px-6 py-4 pl-14 bg-white/30 backdrop-blur-md text-gray-900 text-lg rounded-2xl border border-white/40 shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all placeholder-gray-500 font-semibold"
          style={{ fontFamily: 'Inter, Arial, sans-serif', fontWeight: 500, letterSpacing: '0.01em' }}
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-500">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default SearchBar;