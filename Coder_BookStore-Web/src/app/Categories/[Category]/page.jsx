'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { bookService } from '../../services/bookService';
import { categoryService } from '../../services/categoryService';

const categoryIcons = {
  Programming: '💻',
  'Data Science': '📊',
  Design: '🎨',
  Architecture: '🏛️',
  Security: '🔒',
  Mobile: '📱',
  Database: '🗄️',
  'Game Development': '🎮',
  Blockchain: '⛓️',
  Cloud: '☁️',
  'Project Management': '📋',
  Biography: '👤',
  Fantasy: '🧙',
  Fiction: '📖',
  History: '🏺',
  Mystery: '🕵️',
  Nonfiction: '📚',
  Romance: '💖',
  ScienceFiction: '🚀',
  'Science Fiction': '🚀',
  SelfHelp: '🌱',
  'Self Help': '🌱',
  Thriller: '🔎',
  'True Crime': '🕵️‍♂️',
  Horror: '👻',
  Poetry: '📝',
  Adventure: '🏞️',
  Philosophy: '🤔',
  Business: '💼',
  Children: '🧒',
  Comics: '🦸',
  Cooking: '🍳',
  Health: '💪',
  Travel: '✈️',
  Art: '🖼️',
  Religion: '⛪',
  Sports: '🏅',
  History: '🏺',
  Memoir: '📔',
  Classic: '🏛️',
};

export default function CategoryDetailPage(props) {
  const router = useRouter();
  let Category = '';
  if (props?.params) {
    if (typeof props.params.then === 'function') {
      const unwrapped = React.use(props.params);
      Category = unwrapped.Category;
    } else {
      Category = props.params.Category;
    }
  } else {
    const urlParams = useParams();
    Category = urlParams?.Category || '';
  }
  // Luôn decode tên thể loại để hiển thị đúng
  const displayCategory = decodeURIComponent(Category || '');

  const [category, setCategory] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!displayCategory) return;
    setLoading(true);
    Promise.all([
      categoryService.getAllCategories(),
      bookService.getBooksByCategory(displayCategory)
    ])
      .then(([categories, books]) => {
        setCategory(categories.find(c => c.name === displayCategory));
        setBooks(books);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [displayCategory]);

  if (loading) return <div className="text-center py-12 text-lg">Đang tải dữ liệu...</div>;
  if (error) return <div className="text-center py-12 text-red-500">Lỗi: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center p-8">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 text-center mb-10 border border-blue-100">
        <div className="flex flex-col items-center gap-2 mb-4">
          <span className="text-6xl drop-shadow">{categoryIcons[displayCategory] || '📚'}</span>
          <h1 className="text-4xl font-extrabold text-blue-700 drop-shadow mb-2">{displayCategory}</h1>
        </div>
        <p className="text-lg text-gray-700 mb-6">{category?.description || 'Khám phá những cuốn sách hấp dẫn thuộc thể loại này!'}</p>
        <button
          onClick={() => router.back()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition-all"
        >
          ← Quay lại
        </button>
      </div>
      <div className="w-full max-w-5xl">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">Sách thuộc thể loại "{displayCategory}"</h2>
        {books.length === 0 ? (
          <div className="text-gray-500 text-center">Chưa có sách nào cho thể loại này.</div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {books.map(book => (
              <li key={book.id} className="bg-white rounded-xl shadow p-4 flex flex-col items-center border border-blue-100 hover:shadow-lg transition-all">
                <img src={book.img} alt={book.title} className="w-28 h-40 object-cover rounded mb-2 shadow" />
                <div className="font-bold text-blue-700 text-lg mb-1 text-center line-clamp-2">{book.title}</div>
                <div className="text-gray-600 text-sm mb-1">Tác giả: {book.author}</div>
                <div className="text-yellow-500 font-semibold mb-1">★ {book.rating} / 5</div>
                <div className="text-blue-600 font-bold mb-2">{Number(book.price).toLocaleString()}₫</div>
                <div className="text-xs text-gray-400 mb-2">{book.publishYear} • {book.language}</div>
                <div className="text-xs text-gray-500 line-clamp-2 mb-2">{book.description}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 