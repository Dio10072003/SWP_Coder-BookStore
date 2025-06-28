import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <div key={book.id} className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="relative w-full aspect-[3/4] mb-4 rounded-lg overflow-hidden">
            <Image
              src={book.img || 'https://placehold.co/300x400?text=No+Image'}
              alt={book.title}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
            />
          </div>
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{book.title}</h3>
          <p className="text-gray-400 mb-2">by {book.author}</p>
          <div className="flex items-center mb-2">
            {renderStars(book.rating)}
            <span className="text-xs text-gray-400 ml-2">({book.rating})</span>
          </div>
          <p className="text-yellow-400 font-bold text-lg mb-3">{book.price}</p>
          <Link
            href={`/Books/${book.id}`}
            className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            Xem chi tiết
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BookGrid;