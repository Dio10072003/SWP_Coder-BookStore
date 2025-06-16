import React from 'react';
import { FaStar } from 'react-icons/fa'; // Giả sử bạn đã cài react-icons

const BestSellerBookCard = ({ id, title, author, price, imageUrl, rating, description }) => {
    return (
        <div className="best-seller-book-card bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col items-center p-4 text-center">
            <img src={imageUrl} alt={title} className="w-32 h-40 object-cover rounded-md mb-4" />
            <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
                <p className="text-sm text-gray-600 mb-2">Tác giả: {author}</p>
                <div className="flex items-center justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                        <FaStar
                            key={i}
                            className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        />
                    ))}
                    <span className="text-sm text-gray-500 ml-1">({rating}/5)</span>
                </div>
                <p className="text-xl font-bold text-purple-700 mb-3">{price} VND</p>
                <p className="text-xs text-gray-700 mb-4 line-clamp-3">{description}</p> {/* line-clamp-3 để giới hạn số dòng */}
            </div>
            <button className="bg-purple-600 text-white px-5 py-2 rounded-md hover:bg-purple-700 transition-colors duration-300 mt-auto">
                Xem chi tiết
            </button>
        </div>
    );
};

export default BestSellerBookCard;