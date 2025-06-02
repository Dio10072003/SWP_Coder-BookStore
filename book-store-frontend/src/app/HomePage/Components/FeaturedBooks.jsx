import React from 'react';

const FeaturedBooks = () => {
  const books = [
    { title: 'Code Dạo Ký Sự', author: 'Phạm Huy Hoàng' },
    { title: 'Clean Code', author: 'Robert C. Martin' },
    { title: 'Dune', author: 'Frank Herbert' },
  ];

  return (
    <section className="py-12 px-6 bg-indigo-950">
      <h2 className="text-4xl font-bold text-center text-yellow-400 mb-8 animate-pulse">Sách Nổi Bật</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {books.map((book, index) => (
          <div
            key={index}
            className="group relative h-64 bg-gray-800 rounded-lg overflow-hidden transform transition-all duration-500 hover:rotate-y-180"
          >
            <div className="absolute inset-0 flex items-center justify-center text-center p-4">
              <div className="group-hover:hidden">
                <h3 className="text-2xl font-bold text-white">{book.title}</h3>
                <p className="text-gray-400">{book.author}</p>
              </div>
              <div className="hidden group-hover:flex items-center justify-center bg-yellow-400 h-full w-full">
                <p className="text-indigo-900 font-bold">Đọc Ngay!</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedBooks;