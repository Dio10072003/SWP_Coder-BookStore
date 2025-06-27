'use client';
import React from 'react';
import Link from 'next/link';
import { FaClock, FaBookOpen } from 'react-icons/fa';

const comingSoonBooks = [
  { title: 'Machine Learning Engineering', eta: '7/2025' },
  { title: 'Advanced React Patterns', eta: '8/2025' },
  { title: 'Quantum Computing for Developers', eta: '9/2025' },
  { title: 'The Future of AI: Trends and Predictions', eta: '10/2025' },
  { title: 'Building Scalable Web Applications', eta: '11/2025' },
  { title: 'Cybersecurity Essentials for Developers', eta: '12/2025' },
  { title: 'Blockchain Beyond Cryptocurrency', eta: '1/2026' },
];

export default function ComingSoonSection() {
  return (
    <section className="bg-gradient-to-br from-yellow-50 via-pink-50 to-cyan-50 rounded-2xl shadow-lg p-8 mb-8 animate-fade-in-up">
      <h3 className="text-2xl font-bold text-pink-700 mb-3 flex items-center gap-2"><FaClock className="text-yellow-500" />Sách Sắp Ra Mắt</h3>
      <p className="mb-4 text-gray-700">Đừng bỏ lỡ các tựa sách hấp dẫn sắp có mặt tại Coder-BookStore! Nhấn vào tên sách để xem chi tiết hoặc đặt trước.</p>
      <ul className="space-y-2 mb-6">
        {comingSoonBooks.map((book, idx) => (
          <li key={idx}>
            <Link href={`/Books?highlight=${encodeURIComponent(book.title)}`} className="inline-flex items-center gap-2 text-blue-700 font-semibold hover:underline hover:text-pink-600 transition-colors">
              <FaBookOpen className="text-cyan-500" />
              <span>"{book.title}"</span>
              <span className="text-xs text-gray-500 font-normal">- Dự kiến tháng {book.eta}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}