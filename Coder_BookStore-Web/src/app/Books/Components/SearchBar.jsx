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
    <div className="mb-6">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleSearch}
        placeholder="Tìm kiếm sách..."
        className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
      />
    </div>
  );
};

export default SearchBar;