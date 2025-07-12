import React from 'react';
import Link from 'next/link';
import { FaBookOpen, FaRocket, FaStar } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 px-6 text-center bg-gradient-to-br from-purple-700 via-indigo-800 to-fuchsia-700 rounded-3xl shadow-2xl border-4 border-yellow-100">
      {/* Blob động và icon */}
      <span className="absolute -top-10 -left-10 w-56 h-56 bg-yellow-300 opacity-20 rounded-full blur-2xl animate-blob z-0" />
      <span className="absolute -bottom-10 -right-10 w-56 h-56 bg-pink-300 opacity-20 rounded-full blur-2xl animate-blob2 z-0" />
      <span className="absolute top-8 left-1/2 -translate-x-1/2 z-10 animate-bounce-slow">
        <FaRocket className="text-5xl md:text-7xl text-yellow-300 drop-shadow-xl" />
      </span>
      <div className="relative z-20">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-wider mb-4 animate-bounce-slow font-heading">
          <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-lg">Khám Phá Vũ Trụ</span>
          <span className="inline-block ml-2 text-yellow-300">Code & Sách!</span>
        </h1>
        <p className="mt-4 text-lg md:text-2xl text-white/90 animate-fadeIn font-semibold drop-shadow font-body">
          Nơi các lập trình viên và người yêu sách hội tụ!<br />
          <span className="text-pink-200 text-base md:text-lg font-normal">Khám phá kho sách lập trình, phát triển bản thân, truyền cảm hứng mỗi ngày.</span>
        </p>
        <Link
          href="/Books"
          className="mt-10 inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-yellow-400 via-pink-400 to-fuchsia-400 text-white text-xl font-extrabold rounded-full shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300 border-2 border-white animate-pulse font-heading"
        >
          <FaBookOpen className="text-2xl" /> Bắt Đầu Ngay!
        </Link>
      </div>
      {/* Hiệu ứng ngôi sao */}
      <span className="absolute top-10 right-20 text-yellow-200 text-3xl animate-pulse-slow"><FaStar /></span>
      <span className="absolute bottom-10 left-20 text-pink-200 text-2xl animate-pulse-slow"><FaStar /></span>
    </section>
  );
};

export default HeroSection;