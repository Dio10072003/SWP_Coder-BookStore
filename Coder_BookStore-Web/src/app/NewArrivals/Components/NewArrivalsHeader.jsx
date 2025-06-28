// components/new-arrival/NewArrivalsHeader.jsx
import React from 'react';
import { FaRocket } from 'react-icons/fa';

const NewArrivalsHeader = () => (
  <header className="text-center py-8 bg-gradient-to-r from-cyan-500 via-pink-400 to-yellow-400 rounded-2xl shadow-lg mb-4 animate-fade-in">
    <div className="flex justify-center mb-3">
      <FaRocket className="text-5xl text-white drop-shadow animate-bounce" />
    </div>
    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow">Sách Mới Độc Đáo & Sáng Tạo</h1>
    <p className="text-lg text-white/90 max-w-2xl mx-auto">Khám phá những đầu sách công nghệ, lập trình, AI, blockchain... vừa cập bến! Đừng bỏ lỡ những xu hướng mới nhất dành cho coder.</p>
  </header>
);

export default NewArrivalsHeader;