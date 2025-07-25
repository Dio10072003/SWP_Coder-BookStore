import React from 'react';
import { FaTag, FaStar } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const tagColors = [
  'bg-pink-200 text-pink-700',
  'bg-yellow-200 text-yellow-700',
  'bg-cyan-200 text-cyan-700',
  'bg-purple-200 text-purple-700',
  'bg-green-200 text-green-700',
  'bg-blue-200 text-blue-700',
];

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

export default function NewBookGrid({ books, onQuickView, isNewBook }) {
  const router = useRouter();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {books.map((book, idx) => {
        const displayCategory = decodeURIComponent(book.category || '');
        return (
          <div
            key={book.id}
            className="relative bg-white rounded-3xl shadow-xl border-4 border-transparent hover:border-pink-400 hover:shadow-2xl transition-all duration-300 p-5 flex flex-col items-center group overflow-hidden cursor-pointer"
            onClick={() => onQuickView && onQuickView(book)}
          >
            <div className="w-32 h-40 mb-4 rounded-2xl overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300 border-2 border-cyan-200 flex items-center justify-center bg-white">
              <img src={book.img || book.imageUrl} alt={book.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{categoryIcons[displayCategory] || '📚'}</span>
              <span className="text-xs text-blue-700 font-semibold">{displayCategory}</span>
            </div>
            <h3 className="text-xl font-bold text-blue-700 mb-1 text-center group-hover:text-pink-600 transition-colors line-clamp-2">{book.title}</h3>
            <div className="text-gray-600 text-sm mb-1">{book.author}</div>
            <div className="flex items-center gap-1 text-yellow-500 mb-1">
              <FaStar className="text-xs" />
              <span className="font-semibold">{book.rating}</span>
              <span className="text-gray-400 text-xs">/ 5</span>
            </div>
            <div className="text-xs text-gray-500 mb-2 line-clamp-2">{book.description}</div>
            <div className="flex flex-wrap gap-2 mb-2 justify-center">
              {book.tags && book.tags.map((tag, i) => (
                <span key={i} className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${tagColors[i % tagColors.length]}`}><FaTag className="text-xs" />{tag}</span>
              ))}
            </div>
            <div className="text-lg font-bold text-pink-600 mb-2">{Number(book.price).toLocaleString()} VND</div>
            <div className="text-xs text-gray-400 mb-2">Phát hành: {book.releaseDate || book.publishYear}</div>
            {isNewBook && isNewBook(book) && (
              <div className="absolute top-4 left-4 bg-gradient-to-br from-yellow-400 to-pink-400 text-white px-3 py-1 rounded-full shadow-lg text-xs font-bold rotate-[-8deg] group-hover:scale-110 transition-transform">Mới</div>
            )}
            <button className="mt-auto px-5 py-2 bg-gradient-to-r from-pink-500 to-yellow-400 text-white rounded-xl font-semibold shadow hover:from-yellow-400 hover:to-pink-500 transition-all" onClick={e => {e.stopPropagation(); onQuickView && onQuickView(book);}}>Xem nhanh</button>
          </div>
        );
      })}
    </div>
  );
}
