import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 px-6 text-center bg-gradient-to-r from-purple-600 to-indigo-800">
      <div className="absolute inset-0 opacity-20 animate-pulse bg-[url('https://www.transparenttextures.com/patterns/circuit.png')]"></div>
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-wider animate-bounce">
        Khám Phá Vũ Trụ <span className="text-yellow-400">Code & Sách!</span>
      </h1>
      <p className="mt-4 text-lg md:text-2xl text-gray-200 animate-fadeIn">
        Nơi các lập trình viên và người yêu sách hội tụ!
      </p>
      <button className="mt-8 px-8 py-4 bg-yellow-400 text-indigo-900 font-bold rounded-full hover:bg-yellow-500 transition-all duration-300 animate-pulse">
        Bắt Đầu Ngay!
      </button>
    </section>
  );
};

export default HeroSection;