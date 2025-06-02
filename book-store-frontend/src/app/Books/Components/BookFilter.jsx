"use client";

import React, { useState } from 'react';

const BookFilter = () => {
  const [category, setCategory] = useState('All');
  const categories = ['All', 'Lập Trình', 'Khoa Học', 'Văn Học', 'Công Nghệ'];

  return (
    <div className="mb-6">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BookFilter;