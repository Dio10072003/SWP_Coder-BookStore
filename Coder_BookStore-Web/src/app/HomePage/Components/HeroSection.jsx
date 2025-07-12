import React from 'react';
import Link from 'next/link';
import { FaBookOpen, FaRocket, FaStar, FaPaintBrush } from 'react-icons/fa';
import Image from 'next/image';
import coderTour from '@/assets/Coder-Tour.jpg';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-24 px-6 text-center bg-gradient-to-br from-[#ffecd2] via-[#fcb69f] to-[#a1c4fd] rounded-3xl shadow-2xl border-4 border-white/60">
      {/* Blob nghệ thuật động */}
      <span className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-pink-400 via-yellow-300 to-purple-400 opacity-40 rounded-full blur-3xl animate-blob z-0" />
      <span className="absolute -bottom-24 -right-24 w-96 h-96 bg-gradient-to-tr from-blue-400 via-fuchsia-400 to-yellow-200 opacity-40 rounded-full blur-3xl animate-blob2 z-0" />
      {/* Sóng nghệ thuật */}
      <svg className="absolute left-0 right-0 top-0 w-full h-32 z-10" viewBox="0 0 1440 320"><path fill="#fff" fillOpacity="0.3" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
      {/* Icon nghệ thuật */}
      <span className="absolute top-10 left-1/2 -translate-x-1/2 z-20 animate-float">
        <FaPaintBrush className="text-7xl text-pink-300 drop-shadow-2xl" />
      </span>
      <span className="absolute top-24 left-1/4 z-20 animate-spin-slow">
        <FaRocket className="text-5xl text-yellow-300 drop-shadow-xl" />
      </span>
      <span className="absolute bottom-16 right-1/4 z-20 animate-bounce-slow">
        <FaStar className="text-4xl text-fuchsia-300 drop-shadow-xl" />
      </span>
      {/* Logo CoderTour nổi bật */}
      <div className="flex justify-center mb-4 z-30">
        <Image
          src={coderTour}
          alt="CoderTour Logo"
          width={100}
          height={100}
          className="rounded-full shadow-2xl animate-float bg-white/80 p-2"
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="relative z-30 flex flex-col items-center justify-center">
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-wider mb-6 bg-gradient-to-r from-fuchsia-500 via-yellow-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl animate-gradient-move font-heading outline-text">
          Nghệ Thuật Sáng Tạo
        </h1>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white drop-shadow-lg animate-fadeIn font-heading">
          <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent">Khám Phá Vũ Trụ Code & Sách!</span>
        </h2>
        <p className="mt-2 text-lg md:text-2xl text-white/90 animate-fadeIn font-semibold drop-shadow font-body max-w-2xl">
          Nơi các lập trình viên và người yêu sách hội tụ!<br />
          <span className="text-pink-200 text-base md:text-lg font-normal">Khám phá kho sách lập trình, phát triển bản thân, truyền cảm hứng mỗi ngày.</span>
        </p>
        <Link
          href="/Books"
          className="mt-10 inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-fuchsia-500 via-yellow-400 to-pink-400 text-white text-2xl font-extrabold rounded-full shadow-2xl hover:scale-110 hover:shadow-3xl transition-all duration-300 border-2 border-white animate-glow font-heading"
        >
          <FaBookOpen className="text-3xl" /> Bắt Đầu Ngay!
        </Link>
      </div>
      {/* Hiệu ứng ngôi sao nhỏ */}
      <span className="absolute top-8 right-16 text-yellow-200 text-3xl animate-pulse-slow"><FaStar /></span>
      <span className="absolute bottom-8 left-16 text-pink-200 text-2xl animate-pulse-slow"><FaStar /></span>
    </section>
  );
};

export default HeroSection;
// CSS hiệu ứng bổ sung (thêm vào globals.css hoặc module tương ứng):
// .animate-blob { animation: blob 8s infinite ease-in-out; }
// .animate-blob2 { animation: blob2 10s infinite ease-in-out; }
// .animate-float { animation: float 6s infinite ease-in-out; }
// .animate-spin-slow { animation: spin 12s linear infinite; }
// .animate-bounce-slow { animation: bounce 3s infinite; }
// .animate-gradient-move { animation: gradientMove 6s ease-in-out infinite; background-size: 200% 200%; }
// .animate-glow { box-shadow: 0 0 32px 8px #fcb69f88, 0 0 64px 16px #a1c4fd55; animation: glow 2s alternate infinite; }
// .outline-text { text-shadow: 2px 2px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff; }
// @keyframes blob { 0%,100%{transform:scale(1);} 33%{transform:scale(1.1,0.9);} 66%{transform:scale(0.9,1.1);} }
// @keyframes blob2 { 0%,100%{transform:scale(1);} 50%{transform:scale(1.2,0.8);} }
// @keyframes float { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-20px);} }
// @keyframes spin { 0%{transform:rotate(0);} 100%{transform:rotate(360deg);} }
// @keyframes bounce { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-12px);} }
// @keyframes gradientMove { 0%,100%{background-position:0% 50%;} 50%{background-position:100% 50%;} }
// @keyframes glow { 0%{box-shadow:0 0 32px 8px #fcb69f88,0 0 64px 16px #a1c4fd55;} 100%{box-shadow:0 0 48px 16px #fcb69faa,0 0 80px 24px #a1c4fdaa;} }