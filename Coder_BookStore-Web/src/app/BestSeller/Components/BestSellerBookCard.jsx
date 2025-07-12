import React, { useState } from 'react';
import { addToCartLocal } from '../../utils/cartUtils';
import { FaShoppingCart, FaCheckCircle } from 'react-icons/fa';

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
  Memoir: '📔',
  Classic: '🏛️',
};

const sizeMap = {
  xl: 'w-72 h-96 text-xl p-6',
  lg: 'w-60 h-80 text-lg p-5',
  md: 'w-48 h-64 text-base p-4',
  sm: 'w-36 h-52 text-[15px] p-3',
};

const Star = ({ filled }) => (
  <svg
    className={`w-4 h-4 ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
    fill={filled ? 'currentColor' : 'none'}
    viewBox="0 0 20 20"
    stroke="currentColor"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
  </svg>
);

const DEFAULT_IMG =
  'https://cdn.pixabay.com/photo/2016/09/01/09/29/book-1639736_1280.jpg';

export default function BestSellerBookCard({ book, size = 'md', onQuickView, highlight }) {
  const [added, setAdded] = useState(false);
  const displayCategory = decodeURIComponent(book.category || '');
  const imgSrc = book.img || book.imageUrl || DEFAULT_IMG;

  const isLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem('user');
  const handleAdd = (e) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      alert("Bạn chỉ có thể làm điều đó với một tài khoản hợp lệ thôi");
      return;
    }
    addToCartLocal(book);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div
      className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col items-center text-center group border border-transparent hover:border-yellow-300 animate-fade-in cursor-pointer ${sizeMap[size]} ${highlight ? 'border-4 border-yellow-400 shadow-2xl scale-105 ring-2 ring-yellow-200 ring-offset-2' : ''}`}
      style={highlight ? { boxShadow: '0 0 32px 0 #fde68a, 0 8px 32px 0 #fbbf24' } : {}}
      onClick={() => onQuickView && onQuickView(book)}
    >
      {/* Badge Best Seller */}
      <div className="absolute top-2 left-2 bg-gradient-to-br from-yellow-400 to-pink-400 text-white px-2 py-0.5 rounded-full shadow-lg text-[11px] font-bold rotate-[-8deg] group-hover:scale-110 transition-transform z-10 whitespace-nowrap">Best Seller</div>
      {/* Icon thể loại */}
      <div className="absolute top-2 right-2 text-lg">{categoryIcons[displayCategory] || '📚'}</div>
      <img src={imgSrc} alt={book.title} className="w-full h-[60%] object-cover rounded-md mb-1 shadow-md group-hover:scale-105 transition-transform duration-300 bg-gray-100" />
      <div className="flex-grow w-full flex flex-col items-center">
        <h3 className="font-bold text-gray-800 mb-1 line-clamp-2 min-h-[38px] text-sm md:min-h-[32px]">{book.title}</h3>
        <p className="text-[11px] text-gray-600 mb-0.5">Tác giả: <span className="font-medium text-blue-700">{book.author}</span></p>
        <div className="flex items-center justify-center mb-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} filled={i < book.rating} />
          ))}
          <span className="text-[10px] text-gray-500 ml-1">({book.rating}/5)</span>
        </div>
        <p className="text-pink-600 font-bold mb-0.5 text-sm">{Number(book.price).toLocaleString()}₫</p>
        <p className="text-[10px] text-gray-700 mb-1 line-clamp-2 min-h-[24px] md:min-h-[20px]">{book.description}</p>
      </div>
      <div className="relative">
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-yellow-400 text-white font-bold shadow-md hover:scale-105 hover:from-cyan-500 hover:to-yellow-500 transition-all duration-200"
          onClick={handleAdd}
        >
          <FaShoppingCart />
          Thêm Vào Giỏ
        </button>
        {added && (
          <span className="absolute left-1/2 -translate-x-1/2 top-[-36px] bg-green-500 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1 shadow animate-bounce">
            <FaCheckCircle /> Đã thêm!
          </span>
        )}
      </div>
    </div>
  );
}