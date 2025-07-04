import React from 'react';

const books = [
  { title: 'Code Dạo Ký Sự', author: 'Phạm Huy Hoàng' },
  { title: 'Clean Code', author: 'Robert C. Martin' },
  { title: 'Dune', author: 'Frank Herbert' },
];

const FeaturedBooks = () => {
  return (
    <section className="relative py-8 px-2 bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 rounded-lg shadow my-6 overflow-hidden">
      {/* Blob nền động */}
      <span className="absolute -top-6 -left-6 w-24 h-24 bg-pink-300 opacity-10 rounded-full blur-2xl animate-blob z-0" />
      <span className="absolute -bottom-6 -right-6 w-24 h-24 bg-yellow-200 opacity-5 rounded-full blur-2xl animate-blob2 z-0" />
      <h2 className="text-2xl font-bold text-center text-yellow-400 mb-6 flex items-center justify-center gap-2">
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-yellow-400"><rect x="4" y="7" width="16" height="10" rx="2" strokeWidth={2} /><path d="M8 11h8" strokeWidth={2} /></svg>
        Sách Nổi Bật
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {books.map((book, index) => (
          <div
            key={index}
            className="group relative bg-white/10 rounded-lg shadow p-4 flex flex-col items-center text-center transition-all duration-200 hover:scale-105 hover:shadow-xl"
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mb-2 text-indigo-300">
              <rect x="4" y="7" width="16" height="10" rx="2" strokeWidth={2} />
              <path d="M8 11h8" strokeWidth={2} />
            </svg>
            <h3 className="text-lg font-bold text-white mb-1 line-clamp-2 min-h-[32px]">{book.title}</h3>
            <p className="text-gray-300 mb-2 text-sm">{book.author}</p>
            <a href="#" className="inline-block mt-auto px-4 py-1.5 bg-gradient-to-r from-yellow-400 to-pink-400 text-indigo-900 font-bold rounded-full shadow hover:scale-105 hover:shadow-lg text-sm">Đọc Ngay!</a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedBooks;