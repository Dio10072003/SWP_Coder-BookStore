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
    <section className="py-12 px-6 bg-gray-900 text-center">
      <h2 className="text-4xl font-bold text-yellow-400 mb-8">Thành Tựu Của Chúng Tôi</h2>
      <div className="flex justify-center space-x-12">
        <div>
          <p className="text-5xl font-mono text-cyan-400">{books}+</p>
          <p className="text-lg text-gray-400">Sách</p>
        </div>
        <div>
          <p className="text-5xl font-mono text-cyan-400">{users}+</p>
          <p className="text-lg text-gray-400">Người Dùng</p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;