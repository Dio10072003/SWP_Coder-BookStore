// app/best-seller/page.jsx
'use client'; // Dòng này là cần thiết nếu bạn sử dụng useState và các Hook khác của React trong App Router

import React, { useEffect, useState } from 'react';
// Import các component từ đúng đường dẫn components/best-seller
import BestSellerHeader from './Components/BestSellerHeader';
import FilterOptions from './Components/FilterOptions';
import BookGrid from './Components/BookGrid';
import { bookService } from '../services/bookService';
import { categoryService } from '../services/categoryService';

// Modal xem nhanh chi tiết sách (tương tự NewArrivals)
function BookQuickViewModal({ book, onClose }) {
  if (!book) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative animate-fade-in-up">
        <button onClick={onClose} className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-pink-500">×</button>
        <div className="flex flex-col md:flex-row gap-6">
          <img src={book.img || book.imageUrl} alt={book.title} className="w-32 h-44 object-cover rounded-xl shadow" />
          <div className="flex-1 flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-yellow-700 mb-1">{book.title}</h2>
            <div className="text-gray-600 text-sm mb-1">Tác giả: <span className="font-semibold">{book.author}</span></div>
            <div className="text-yellow-500 font-semibold mb-1">★ {book.rating} / 5</div>
            <div className="text-pink-600 font-bold mb-2">{Number(book.price).toLocaleString()}₫</div>
            <div className="text-xs text-gray-400 mb-2">{book.publishYear} • {book.language}</div>
            <div className="text-xs text-gray-500 mb-2">{book.description}</div>
            <button onClick={() => { window.location.href = `/Books/${book.id}`; }} className="mt-2 px-5 py-2 bg-gradient-to-r from-yellow-400 to-pink-400 text-white rounded-xl font-semibold shadow hover:from-pink-400 hover:to-yellow-400 transition-all">Xem chi tiết</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BestSellerPage() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [quickViewBook, setQuickViewBook] = useState(null);

    useEffect(() => {
        categoryService.getAllCategories()
            .then(data => setCategories(data))
            .catch(() => setCategories([]));
    }, []);

    useEffect(() => {
        setLoading(true);
        setError(null);
        bookService.getAllBooksWithTotal({ limit: 50, ...(selectedCategory ? { category: selectedCategory } : {}) })
            .then(({ data }) => {
                // Lấy top 12 sách rating cao nhất, nếu trùng thì theo id giảm dần
                const sorted = [...data].sort((a, b) => (b.rating - a.rating) || (b.id - a.id));
                setBooks(sorted.slice(0, 12));
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [selectedCategory]);

    // Loading skeleton
    const Skeleton = () => (
        <div className="flex flex-col items-center gap-8 my-8">
            {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl h-40 animate-pulse" />
            ))}
        </div>
    );

    return (
        <div className="best-seller-page-container min-h-screen bg-gray-50">
            <BestSellerHeader />
            <main className="best-seller-main-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div className="flex-1">
                        <FilterOptions
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onCategoryChange={setSelectedCategory}
                        />
                    </div>
                </div>
                {loading ? (
                    <Skeleton />
                ) : error ? (
                    <div className="text-center py-8 text-red-500">Lỗi: {error}</div>
                ) : (
                    <BookGrid books={books} onQuickView={setQuickViewBook} />
                )}
            </main>
            <BookQuickViewModal book={quickViewBook} onClose={() => setQuickViewBook(null)} />
        </div>
    );
}