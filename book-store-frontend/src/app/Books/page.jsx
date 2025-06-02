import React from 'react';
import BookFilter from './Components/BookFilter.jsx';
import BookGrid from './Components/BookGrid.jsx';
import Pagination from './Components/Pagination.jsx';
import SearchBar from './Components/SearchBar.jsx';

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