// NewArrivals/Components/page.jsx (đúng theo cấu trúc của bạn)
'use client'
import React, { useEffect, useState } from 'react';
import NewArrivalsHeader from './Components/NewArrivalsHeader.jsx';
import BookHighlight from './Components/BookHighlight.jsx';
import NewBookGrid from './Components/NewBookGrid.jsx';
import ComingSoonSection from './Components/ComingSoonSection.jsx';
import SubscriptionPrompt from './Components/SubscriptionPrompt..jsx';
import { bookService } from '../services/bookService';
import { categoryService } from '../services/categoryService';

// Modal xem nhanh chi tiết sách (tạo mới)
function BookQuickViewModal({ book, onClose }) {
  if (!book) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative animate-fade-in-up">
        <button onClick={onClose} className="absolute top-3 right-3 text-2xl text-gray-400 hover:text-pink-500">×</button>
        <div className="flex flex-col md:flex-row gap-6">
          <img src={book.img || book.imageUrl} alt={book.title} className="w-32 h-44 object-cover rounded-xl shadow" />
          <div className="flex-1 flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-blue-700 mb-1">{book.title}</h2>
            <div className="text-gray-600 text-sm mb-1">Tác giả: <span className="font-semibold">{book.author}</span></div>
            <div className="text-yellow-500 font-semibold mb-1">★ {book.rating} / 5</div>
            <div className="text-blue-600 font-bold mb-2">{Number(book.price).toLocaleString()}₫</div>
            <div className="text-xs text-gray-400 mb-2">{book.publishYear} • {book.language}</div>
            <div className="text-xs text-gray-500 mb-2">{book.description}</div>
            <button onClick={() => { window.location.href = `/Books/${book.id}`; }} className="mt-2 px-5 py-2 bg-gradient-to-r from-pink-500 to-yellow-400 text-white rounded-xl font-semibold shadow hover:from-yellow-400 hover:to-pink-500 transition-all">Xem chi tiết</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NewArrivalPage() {
    const [newBooks, setNewBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [quickViewBook, setQuickViewBook] = useState(null);

    // Lấy danh sách thể loại cho filter
    useEffect(() => {
        categoryService.getAllCategories()
            .then(data => setCategories(data))
            .catch(() => setCategories([]));
    }, []);

    // Lấy sách mới nhất, filter, phân trang
    useEffect(() => {
        setLoading(true);
        setError(null);
        const yearNow = new Date().getFullYear();
        bookService.getAllBooksWithTotal({
            limit: 12 * page,
            ...(selectedCategory ? { category: selectedCategory } : {})
        })
            .then(({ data }) => {
                // Chỉ lấy sách xuất bản trong 2 năm gần nhất
                const filtered = data.filter(b => b.publishYear >= yearNow - 1);
                // Sắp xếp theo publishYear, created_at, id
                const sorted = [...filtered].sort((a, b) => (b.publishYear - a.publishYear) || (new Date(b.created_at || 0) - new Date(a.created_at || 0)) || (b.id - a.id));
                setNewBooks(sorted);
                setHasMore(sorted.length >= 12 * page);
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [selectedCategory, page]);

    // Chọn sách nổi bật nhất (mới nhất)
    const featuredBook = newBooks[0] ? {
        title: newBooks[0].title,
        author: newBooks[0].author,
        description: newBooks[0].description,
        imageUrl: newBooks[0].img,
        link: `/Books/${newBooks[0].id}`
    } : null;

    // Xác định sách "Mới" (xuất bản trong 6 tháng gần nhất)
    const isNewBook = (book) => {
        const now = new Date();
        const pub = new Date(book.publishYear, 0, 1);
        return (now - pub) < 183 * 24 * 60 * 60 * 1000; // ~6 tháng
    };

    // Loading skeleton
    const Skeleton = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-3xl shadow-xl p-5 animate-pulse h-80" />
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-pink-50 to-yellow-50 py-10 px-2">
            <div className="max-w-5xl mx-auto">
                <div className="mb-10 animate-fade-in flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <NewArrivalsHeader />
                    <div className="flex items-center gap-2">
                        <label htmlFor="category-filter" className="font-semibold text-blue-700">Thể loại:</label>
                        <select
                            id="category-filter"
                            className="rounded-lg border px-3 py-2 text-blue-700 bg-white shadow"
                            value={selectedCategory}
                            onChange={e => { setSelectedCategory(e.target.value); setPage(1); }}
                        >
                            <option value="">Tất cả</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.name}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {featuredBook && (
                    <div className="mb-12 animate-fade-in-up">
                        <BookHighlight
                            title={featuredBook.title}
                            author={featuredBook.author}
                            description={featuredBook.description}
                            imageUrl={featuredBook.imageUrl}
                            link={featuredBook.link}
                        />
                    </div>
                )}
                <h2 className="text-3xl font-extrabold text-center text-pink-600 mb-8 drop-shadow animate-fade-in">✨ Tất cả sách mới về ✨</h2>
                <div className="mb-12 animate-fade-in-up">
                    {loading ? (
                        <Skeleton />
                    ) : error ? (
                        <div className="text-center py-8 text-red-500">Lỗi: {error}</div>
                    ) : (
                        <NewBookGrid books={newBooks} onQuickView={setQuickViewBook} isNewBook={isNewBook} />
                    )}
                </div>
                {hasMore && !loading && (
                    <div className="flex justify-center mb-12">
                        <button onClick={() => setPage(p => p + 1)} className="px-8 py-3 bg-gradient-to-r from-pink-500 to-yellow-400 text-white rounded-xl font-bold shadow hover:from-yellow-400 hover:to-pink-500 transition-all text-lg">Xem thêm</button>
                    </div>
                )}
                <div className="mb-12 animate-fade-in-up">
                    <ComingSoonSection />
                </div>
                <div className="animate-fade-in-up">
                    <SubscriptionPrompt />
                </div>
            </div>
            <BookQuickViewModal book={quickViewBook} onClose={() => setQuickViewBook(null)} />
        </div>
    );
}