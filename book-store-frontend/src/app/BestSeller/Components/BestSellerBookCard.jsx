import React from 'react';

const Star = ({ filled }) => (
  <svg
    className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
    fill={filled ? 'currentColor' : 'none'}
    viewBox="0 0 20 20"
    stroke="currentColor"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
  </svg>
);

const BestSellerBookCard = ({ id, title, author, price, imageUrl, rating, description }) => {
    return (
        <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col items-center p-5 text-center group border border-transparent hover:border-yellow-300 animate-fade-in">
            <img src={imageUrl} alt={title} className="w-32 h-40 object-cover rounded-md mb-4 shadow-md group-hover:scale-105 transition-transform duration-300" />
            <div className="flex-grow w-full">
                <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-2 min-h-[48px]">{title}</h3>
                <p className="text-sm text-gray-600 mb-2">Tác giả: <span className="font-medium text-blue-700">{author}</span></p>
                <div className="flex items-center justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} filled={i < rating} />
                    ))}
                    <span className="text-sm text-gray-500 ml-1">({rating}/5)</span>
                </div>
                <p className="text-xl font-bold text-pink-600 mb-2">{price} VND</p>
                <p className="text-xs text-gray-700 mb-4 line-clamp-3 min-h-[48px]">{description}</p>
            </div>
            <button className="bg-gradient-to-r from-yellow-400 to-pink-400 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300 mt-auto">
                Xem chi tiết
            </button>
        </div>
    );
};

export default BestSellerBookCard;