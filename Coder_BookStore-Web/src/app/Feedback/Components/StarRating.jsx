import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

export default function StarRating({ rating, setRating }) {
  return (
    <div className="flex items-center gap-2">
      {[1,2,3,4,5].map(i => (
        <button
          type="button"
          key={i}
          onClick={() => setRating(i)}
          className="focus:outline-none"
          aria-label={`Đánh giá ${i} sao`}
        >
          {i <= rating ? <FaStar className="text-yellow-400 text-2xl" /> : <FaRegStar className="text-gray-300 text-2xl" />}
        </button>
      ))}
      <span className="ml-2 text-pink-600 font-bold">{rating > 0 ? rating : ''}</span>
    </div>
  );
} 