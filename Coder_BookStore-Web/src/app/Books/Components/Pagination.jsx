"use client";

import React, { useState } from 'react';

const Pagination = () => {
  const [page, setPage] = useState(1);
  const totalPages = 5;

  return (
    <div className="flex justify-center mt-6 space-x-2">
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
        disabled={page === 1}
      >
        Previous
      </button>
      <span className="px-4 py-2 text-white">{page} / {totalPages}</span>
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