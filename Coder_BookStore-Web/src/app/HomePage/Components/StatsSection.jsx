"use client";

import React, { useState, useEffect } from 'react';

const StatsSection = () => {
  const [books, setBooks] = useState(0);
  const [users, setUsers] = useState(0);

  useEffect(() => {
    const bookInterval = setInterval(() => {
      setBooks((prev) => (prev < 1500 ? prev + 50 : 1500));
    }, 50);
    const userInterval = setInterval(() => {
      setUsers((prev) => (prev < 500 ? prev + 10 : 500));
    }, 50);
    return () => {
      clearInterval(bookInterval);
      clearInterval(userInterval);
    };
  }, []);

  return (
    <section className="relative py-8 px-2 bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 rounded-lg shadow my-6 overflow-hidden text-center">
      <span className="absolute -top-6 -left-6 w-24 h-24 bg-yellow-200 opacity-10 rounded-full blur-2xl animate-blob z-0" />
      <span className="absolute -bottom-6 -right-6 w-24 h-24 bg-pink-200 opacity-5 rounded-full blur-2xl animate-blob2 z-0" />
      <h2 className="text-2xl font-bold text-yellow-500 mb-6 flex items-center justify-center gap-2">
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-yellow-400"><rect x="4" y="7" width="16" height="10" rx="2" strokeWidth={2} /><path d="M8 11h8" strokeWidth={2} /></svg>
        Thành Tựu Của Chúng Tôi
      </h2>
      <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-12">
        <div className="bg-white/70 rounded-lg shadow p-4 flex flex-col items-center min-w-[120px]">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mb-1 text-cyan-400"><rect x="4" y="7" width="16" height="10" rx="2" strokeWidth={2} /></svg>
          <p className="text-3xl font-mono text-cyan-400 font-extrabold">{books}+</p>
          <p className="text-base text-gray-700 font-semibold">Sách</p>
        </div>
        <div className="bg-white/70 rounded-lg shadow p-4 flex flex-col items-center min-w-[120px]">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mb-1 text-pink-400"><circle cx="12" cy="12" r="10" strokeWidth={2} /></svg>
          <p className="text-3xl font-mono text-pink-400 font-extrabold">{users}+</p>
          <p className="text-base text-gray-700 font-semibold">Người Dùng</p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;