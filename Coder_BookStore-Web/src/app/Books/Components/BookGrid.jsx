import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaStar, FaStarHalfAlt, FaBookOpen, FaCrown, FaCalendarAlt, FaFileAlt } from 'react-icons/fa';

const BookGrid = ({ books = [] }) => {
  const renderStars = (rating) => {
    if (!rating) return null;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }
    while (stars.length < 5) {
      stars.push(<FaStar key={`empty-${stars.length}`} className="text-gray-300" />);
    }
    return <div className="flex items-center gap-1">{stars}</div>;
  };

  if (books.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-yellow-400 text-lg">Không tìm thấy sách nào.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {books.map((book) => {
        const isBest = book.rating >= 4.7;
        const isNew = book.publishYear >= 2023;
        return (
          <div
            key={book.id}
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col items-center p-5 text-center group border border-transparent hover:border-yellow-300 animate-fade-in"
          >
            {/* Badge nổi bật */}
            {isBest && (
              <span className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-pink-400 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow">
                <FaCrown className="text-base" /> Best Rated
              </span>
            )}
            {isNew && !isBest && (
              <span className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-green-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow">
                Mới ra mắt
              </span>
            )}
            <div className="relative w-full aspect-[3/4] mb-4 rounded-lg overflow-hidden">
              <Image
                src={book.img || 'https://placehold.co/300x400?text=No+Image'}
                alt={book.title}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg group-hover:scale-105 transition-transform duration-300 shadow-md"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between w-full">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1 line-clamp-2 min-h-[48px]">{book.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Tác giả: <span className="font-medium text-blue-700 dark:text-blue-300">{book.author}</span></p>
              <div className="flex items-center justify-center mb-2">
                {renderStars(book.rating)}
                <span className="text-sm text-gray-500 ml-1">({book.rating}/5)</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 px-2 py-1 rounded text-xs font-semibold">
                  <FaBookOpen /> {book.category}
                </span>
                <span className="inline-flex items-center gap-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-2 py-1 rounded text-xs font-semibold">
                  <FaCalendarAlt /> {book.publishYear}
                </span>
                <span className="inline-flex items-center gap-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 px-2 py-1 rounded text-xs font-semibold">
                  <FaFileAlt /> {book.pages} trang
                </span>
              </div>
              <p className="text-xs text-gray-700 dark:text-gray-200 mb-3 line-clamp-3 min-h-[48px]">{book.description}</p>
              <p className="text-xl font-bold text-pink-600 mb-2">{book.price}</p>
            </div>
            <Link
              href={`/Books/${book.id}`}
              className="bg-gradient-to-r from-yellow-400 to-pink-400 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300 mt-auto"
            >
              Xem chi tiết
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default BookGrid;