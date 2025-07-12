"use client";
import { useParams } from "next/navigation";
import { FaStar, FaStarHalfAlt, FaCalendar, FaFileAlt, FaLanguage, FaBarcode } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useBook } from "../../hooks/useBooks";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { addToCartLocal } from '../../utils/cartUtils';
import { useState } from 'react';

export default function BookDetailPage() {
  const { id } = useParams();
  const { book, loading, error } = useBook(Number(id));

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

  if (loading) return <Loading message="Đang tải thông tin sách..." />;
  if (error) return <Error message={`Lỗi: ${error}`} />;
  if (!book) return <Error message="Không tìm thấy sách!" />;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Book Image */}
          <div className="w-full lg:w-1/3 flex-shrink-0">
            <div className="w-full aspect-[3/4] relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
              <Image 
                src={book.img || "https://placehold.co/300x400?text=No+Image"} 
                alt={book.title} 
                fill 
                style={{ objectFit: 'cover' }} 
                className="rounded-xl" 
              />
            </div>
          </div>

          {/* Book Details */}
          <div className="flex-1 flex flex-col gap-4">
            <div>
              <h1 className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2">{book.title}</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-3">
                Tác giả: <span className="font-semibold text-gray-800 dark:text-gray-200">{book.author}</span>
              </p>
              
              {/* Rating */}
              <div className="flex items-center mb-3">
                {renderStars(book.rating)}
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">({book.rating}/5)</span>
              </div>

              {/* Price */}
              <p className="font-extrabold text-2xl text-yellow-600 dark:text-yellow-400 mb-4">{book.price}</p>
            </div>

            {/* Description */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Mô tả</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {book.description || 'Chưa có mô tả cho sách này.'}
              </p>
            </div>

            {/* Book Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <FaCalendar className="text-purple-500 text-lg" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Năm xuất bản</p>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">{book.publishYear}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <FaFileAlt className="text-blue-500 text-lg" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Số trang</p>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">{book.pages} trang</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <FaLanguage className="text-green-500 text-lg" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Ngôn ngữ</p>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">{book.language}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <FaBarcode className="text-orange-500 text-lg" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">ISBN</p>
                  <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{book.isbn}</p>
                </div>
              </div>
            </div>

            {/* Category */}
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium">
                {book.category}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <AddToCartButton book={book} />
              <button className="px-6 py-3 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 transition-colors">
                Mua ngay
              </button>
              <Link 
                href="/Books" 
                className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors text-center"
              >
                Quay lại danh sách
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 

function AddToCartButton({ book }) {
  const [added, setAdded] = useState(false);
  const handleAdd = () => {
    addToCartLocal(book);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };
  return (
    <div className="relative">
      <button
        onClick={handleAdd}
        className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
      >
        Thêm vào giỏ hàng
      </button>
      {added && (
        <span className="absolute left-1/2 -translate-x-1/2 top-[-36px] bg-green-500 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1 shadow animate-bounce">
          Đã thêm!
        </span>
      )}
    </div>
  );
} 