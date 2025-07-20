import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { addToCartLocal } from '../../utils/cartUtils';

function formatVND(price) {
  if (typeof price === 'number') return price.toLocaleString('vi-VN') + '₫';
  if (typeof price === 'string' && !isNaN(Number(price))) return Number(price).toLocaleString('vi-VN') + '₫';
  return price;
}

const gradientColors = [
  ['#6366f1', '#a21caf'],
  ['#f59e42', '#f43f5e'],
  ['#22d3ee', '#2563eb'],
  ['#facc15', '#f472b6'],
  ['#34d399', '#3b82f6'],
  ['#f87171', '#fbbf24'],
  ['#a3e635', '#06b6d4'],
  ['#f472b6', '#6366f1'],
];

const BookGrid = ({ books = [], onEdit, onDelete }) => {
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

  if (!books || books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-16 h-16 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-700 mb-2">Không tìm thấy sách nào</h3>
        <p className="text-gray-500 mb-6">Hãy thử thay đổi bộ lọc hoặc tìm kiếm từ khóa khác.</p>
      </div>
    );
  }

  return (
    <section className="py-6 px-2 sm:py-8 sm:px-4 md:py-10 md:px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-7 md:gap-10">
        {books.map((book, idx) => (
          <div
            key={book.id}
            className="relative rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 flex flex-col items-center border-4 font-bold transition-transform duration-300 hover:scale-105 hover:shadow-2xl bg-white/60 backdrop-blur-md group overflow-hidden animate-gradient-move"
            style={{
              borderImage: `linear-gradient(135deg, ${gradientColors[idx % gradientColors.length][0]}, ${gradientColors[idx % gradientColors.length][1]}) 1`,
              borderWidth: 4,
              borderStyle: 'solid',
            }}
          >
            {/* Animated border overlay */}
            <div className="absolute inset-0 pointer-events-none rounded-3xl z-0 group-hover:opacity-100 opacity-0 transition-opacity duration-300" style={{
              background: `linear-gradient(120deg, ${gradientColors[idx % gradientColors.length][0]}55, ${gradientColors[idx % gradientColors.length][1]}55)`
            }} />
            <div className="relative z-10 flex flex-col items-center w-full">
              <Image
                src={book.img || 'https://placehold.co/180x260?text=No+Image'}
                alt={book.title}
                width={180}
                height={260}
                className="rounded-xl mb-4 shadow-lg object-cover w-[140px] h-[200px] sm:w-[160px] sm:h-[230px] md:w-[180px] md:h-[260px]"
                style={{ background: '#f3f3f3' }}
              />
              <div className="text-lg sm:text-xl md:text-2xl font-extrabold mb-1 truncate w-full text-center" title={book.title} style={{ fontFamily: 'Montserrat, Arial, sans-serif', letterSpacing: '-0.02em' }}>{book.title}</div>
              <div className="text-sm sm:text-base md:text-lg mb-2 w-full text-center text-pink-600 font-semibold" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>by {book.author}</div>
              <div className="flex gap-2 mb-2">
                <span className="bg-pink-100 text-pink-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">{book.category}</span>
                <span className="bg-purple-100 text-purple-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">{book.publishYear}</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="animate-bounce text-base md:text-lg">{renderStars(book.rating)}</span>
                <span className="text-xs sm:text-sm text-gray-500">({book.rating || 0})</span>
              </div>
              <div className="mb-4 text-xl md:text-2xl font-bold text-yellow-500 drop-shadow">{formatVND(book.price)}</div>
              <div className="flex gap-2 w-full mb-2">
                <Link
                  href={`/Books/${book.id}`}
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-pink-500 hover:to-purple-500 transition-all shadow-lg text-center text-xs sm:text-sm md:text-base"
                  style={{ fontFamily: 'Inter, Arial, sans-serif' }}
                >
                  Xem chi tiết
                </Link>
                <AddToCartButton book={book} />
              </div>
              <div className="flex gap-2 w-full">
                <button
                  onClick={() => onEdit(book)}
                  className="flex-1 px-3 py-2 rounded-lg bg-yellow-400 text-white font-semibold hover:bg-yellow-500 transition"
                >
                  Sửa
                </button>
                <button
                  onClick={() => onDelete(book)}
                  className="flex-1 px-3 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

function AddToCartButton({ book }) {
  const [added, setAdded] = React.useState(false);
  const isLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem('user');
  const handleAdd = () => {
    if (!isLoggedIn) {
      alert("Bạn chỉ có thể làm điều đó với một tài khoản hợp lệ thôi");
      return;
    }
    addToCartLocal(book);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };
  return (
    <div className="relative flex-1">
      <button
        onClick={handleAdd}
        className="w-full px-4 py-2 bg-gradient-to-r from-yellow-400 to-pink-400 text-white rounded-xl font-bold hover:from-pink-400 hover:to-yellow-400 transition-all shadow-lg"
        style={{ fontFamily: 'Inter, Arial, sans-serif' }}
      >
        Thêm vào giỏ
      </button>
      {added && (
        <span className="absolute left-1/2 -translate-x-1/2 top-[-36px] bg-green-500 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1 shadow animate-bounce">
          Đã thêm!
        </span>
      )}
    </div>
  );
}

export default BookGrid;