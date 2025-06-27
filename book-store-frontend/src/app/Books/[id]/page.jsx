"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { bookImages } from "../page";

export default function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBook() {
      setLoading(true);
      const res = await fetch("/api/books");
      const data = await res.json();
      const found = data.find((b) => b.id === Number(id));
      setBook(found);
      setLoading(false);
    }
    fetchBook();
  }, [id]);

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

  if (loading) return <div className="text-center py-20 text-lg">Đang tải thông tin sách...</div>;
  if (!book) return <div className="text-center py-20 text-red-500">Không tìm thấy sách!</div>;

  // Lấy ảnh minh họa nếu có
  const img = bookImages[book.title] || "https://placehold.co/300x400?text=No+Image";

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-8 items-center">
        <div className="w-48 h-64 relative flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
          <Image src={img} alt={book.title} fill style={{ objectFit: 'cover' }} className="rounded-xl" />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-pink-600 dark:text-pink-400 mb-1">{book.title}</h1>
          <p className="text-base text-gray-500 dark:text-gray-300 mb-1">Tác giả: <span className="font-semibold">{book.author}</span></p>
          <div className="flex items-center mb-1">{renderStars(book.rating)}<span className="ml-2 text-xs text-gray-600">({book.rating || 'N/A'})</span></div>
          <p className="font-extrabold text-lg text-yellow-600 dark:text-yellow-400 mb-2">{book.price}</p>
          <p className="text-sm text-gray-700 dark:text-gray-200 mb-2">{book.description || 'Chưa có mô tả cho sách này.'}</p>
          <Link href="/Books" className="inline-block mt-2 px-5 py-2 bg-purple-600 text-white rounded-full font-semibold shadow hover:bg-purple-700 transition-all text-sm">Quay lại danh sách</Link>
        </div>
      </div>
    </div>
  );
} 