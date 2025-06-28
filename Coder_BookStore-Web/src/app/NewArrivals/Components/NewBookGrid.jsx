import React from 'react';
import { FaTag } from 'react-icons/fa';

const tagColors = [
  'bg-pink-200 text-pink-700',
  'bg-yellow-200 text-yellow-700',
  'bg-cyan-200 text-cyan-700',
  'bg-purple-200 text-purple-700',
  'bg-green-200 text-green-700',
  'bg-blue-200 text-blue-700',
];

export default function NewBookGrid({ books }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {books.map((book, idx) => (
        <div
          key={book.id}
          className="relative bg-white rounded-3xl shadow-xl border-4 border-transparent hover:border-pink-400 hover:shadow-2xl transition-all duration-300 p-5 flex flex-col items-center group overflow-hidden"
        >
          <div className="w-32 h-40 mb-4 rounded-2xl overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300 border-2 border-cyan-200">
            <img src={book.imageUrl} alt={book.title} className="w-full h-full object-cover" />
          </div>
          <h3 className="text-xl font-bold text-blue-700 mb-1 text-center group-hover:text-pink-600 transition-colors">{book.title}</h3>
          <div className="text-gray-600 text-sm mb-2">{book.author}</div>
          <div className="flex flex-wrap gap-2 mb-2 justify-center">
            {book.tags && book.tags.map((tag, i) => (
              <span key={i} className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${tagColors[i % tagColors.length]}`}><FaTag className="text-xs" />{tag}</span>
            ))}
          </div>
          <div className="text-lg font-bold text-pink-600 mb-2">{book.price}đ</div>
          <div className="text-xs text-gray-400 mb-2">Phát hành: {book.releaseDate}</div>
          <button className="mt-auto px-5 py-2 bg-gradient-to-r from-pink-500 to-yellow-400 text-white rounded-xl font-semibold shadow hover:from-yellow-400 hover:to-pink-500 transition-all">Xem chi tiết</button>
          <div className="absolute -top-4 -right-4 bg-gradient-to-br from-yellow-400 to-pink-400 text-white px-4 py-1 rounded-full shadow-lg text-xs font-bold rotate-12 group-hover:scale-110 transition-transform">NEW</div>
        </div>
      ))}
    </div>
  );
}