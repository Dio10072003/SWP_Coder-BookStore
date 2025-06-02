import React from 'react';

const BookGrid = () => {
  const books = [
    { title: 'Clean Code', author: 'Robert C. Martin' },
    { title: 'Python Crash Course', author: 'Eric Matthes' },
    { title: 'Dune', author: 'Frank Herbert' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book, index) => (
        <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-white">{book.title}</h3>
          <p className="text-gray-400">{book.author}</p>
        </div>
      ))}
    </div>
  );
};

export default BookGrid;