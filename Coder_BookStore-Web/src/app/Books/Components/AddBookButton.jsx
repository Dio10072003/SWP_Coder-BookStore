import React from 'react';

export default function AddBookButton({ onClick }) {
  return (
    <div className="flex justify-end max-w-7xl mx-auto px-4 mb-4">
      <button
        onClick={(e) => {
          console.log('Add Book button clicked');
          onClick(e);
        }}
        className="btn btn-primary bg-gradient-to-r from-purple-400 via-pink-400 to-pink-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 hover:from-purple-500 hover:via-pink-500 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Thêm sách
      </button>
    </div>
  );
} 