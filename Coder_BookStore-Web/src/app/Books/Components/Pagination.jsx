"use client";

import React from 'react';

const Pagination = ({ page, setPage, total, limit }) => {
  const totalPages = Math.ceil((total || 0) / (limit || 1));
  if (totalPages <= 1) return null;
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  return (
    <div className="flex justify-center mt-6 space-x-2 flex-wrap">
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
        disabled={page === 1}
      >
        Previous
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={`px-4 py-2 rounded-lg font-bold border-2 transition-all ${p === page ? 'bg-yellow-400 text-white border-yellow-500' : 'bg-gray-200 text-gray-700 border-gray-300 hover:bg-yellow-100'}`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;