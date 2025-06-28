import React from 'react';
import { FaStar, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';

export default function BookHighlight({ title, author, description, imageUrl, link }) {
  return (
    <section className="flex flex-col md:flex-row items-center gap-8 bg-gradient-to-br from-yellow-100 via-pink-100 to-cyan-100 rounded-3xl shadow-2xl p-8 mb-8 animate-fade-in-up">
      <div className="flex-shrink-0 w-48 h-64 rounded-2xl overflow-hidden shadow-lg border-4 border-pink-200 flex items-center justify-center bg-white">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 flex flex-col gap-3">
        <div className="flex items-center gap-2 mb-1">
          <FaStar className="text-yellow-400 text-2xl animate-pulse" />
          <span className="text-pink-600 font-bold uppercase tracking-wider">Sách nổi bật</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-blue-800 mb-1 drop-shadow">{title}</h2>
        <div className="text-lg text-gray-700 mb-2">Tác giả: <span className="font-semibold text-pink-700">{author}</span></div>
        <p className="text-gray-700 mb-3">{description}</p>
        <Link href={link} className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-pink-500 to-yellow-400 text-white rounded-xl font-semibold shadow hover:from-yellow-400 hover:to-pink-500 transition-all w-max">
          Xem chi tiết <FaArrowRight />
        </Link>
      </div>
    </section>
  );
}