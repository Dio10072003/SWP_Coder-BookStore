import React from 'react';
import BookFilter from './Components/BookFilter.jsx';
import BookGrid from './Components/BookGrid.jsx';
import Pagination from './Components/Pagination.jsx';
import SearchBar from './Components/SearchBar.jsx';

// Danh sách ảnh minh họa cho các sách phổ biến
export const bookImages = {
  'Clean Code': 'https://images-na.ssl-images-amazon.com/images/I/41xShlnTZTL._SX374_BO1,204,203,200_.jpg',
  'Python Crash Course': 'https://images-na.ssl-images-amazon.com/images/I/41uPjEenkFL._SX379_BO1,204,203,200_.jpg',
  'Dune': 'https://images-na.ssl-images-amazon.com/images/I/41N5hdRcw6L._SX258_BO1,204,203,200_.jpg',
  // Có thể bổ sung thêm các sách khác nếu cần
};

export default function BooksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-700 p-6">
      <h1 className="text-4xl font-bold text-center text-yellow-400 mb-6">
        Kho Sách Coder-BookStore
      </h1>
      <SearchBar />
      <BookFilter />
      <BookGrid />
      <Pagination />
    </div>
  );
}