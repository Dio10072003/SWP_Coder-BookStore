'use client'; // <-- BẮT BUỘC nếu trong app/ và dùng useState

import React from 'react';

const Newsletter = () => {
  return (
    <section className="relative py-8 px-2 bg-gradient-to-br from-cyan-100 via-yellow-100 to-pink-100 rounded-lg shadow my-6 overflow-hidden text-center">
      <span className="absolute -top-6 -left-6 w-24 h-24 bg-cyan-200 opacity-10 rounded-full blur-2xl animate-blob z-0" />
      <span className="absolute -bottom-6 -right-6 w-24 h-24 bg-pink-200 opacity-5 rounded-full blur-2xl animate-blob2 z-0" />
      <h2 className="text-2xl font-bold text-cyan-500 mb-3 flex items-center justify-center gap-2">
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-cyan-400"><rect x="4" y="7" width="16" height="10" rx="2" strokeWidth={2} /><path d="M8 11h8" strokeWidth={2} /></svg>
        Đăng Ký Nhận Tin
      </h2>
      <p className="text-base text-gray-700 mb-4">Nhận thông báo về sách mới, ưu đãi và sự kiện đặc biệt!</p>
      <form className="flex flex-col md:flex-row justify-center items-center gap-2 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Nhập email của bạn..."
          className="w-full md:w-48 px-3 py-2 rounded-full border-2 border-cyan-300 focus:border-cyan-500 outline-none text-base shadow bg-white/80 placeholder-gray-400 transition-all duration-200"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-yellow-400 text-indigo-900 font-bold rounded-full shadow hover:scale-105 hover:shadow-lg text-sm"
        >
          Đăng Ký
        </button>
      </form>
    </section>
  );
};

export default Newsletter;
