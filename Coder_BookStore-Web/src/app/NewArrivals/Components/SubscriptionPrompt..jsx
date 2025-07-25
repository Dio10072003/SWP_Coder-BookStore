'use client';
import React, { useState } from 'react';
import { FaBell, FaCheckCircle } from 'react-icons/fa';

export default function SubscriptionPrompt() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
    setEmail('');
  };

  return (
    <section className="bg-gradient-to-br from-cyan-50 via-yellow-50 to-pink-50 rounded-2xl shadow-lg p-8 text-center animate-fade-in-up">
      <h3 className="text-2xl font-bold text-cyan-700 mb-3 flex items-center justify-center gap-2"><FaBell className="text-cyan-500" />Nhận thông báo sách mới</h3>
      <p className="mb-4 text-gray-700">Đăng ký nhận bản tin của chúng tôi để không bỏ lỡ bất kỳ cuốn sách mới nào!</p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="flex-1 px-5 py-3 rounded-xl border-2 border-cyan-200 focus:border-pink-400 outline-none text-lg shadow"
          placeholder="Nhập email của bạn"
          required
        />
        <button type="submit" className="px-6 py-3 bg-gradient-to-r from-pink-500 to-yellow-400 text-white rounded-xl font-semibold shadow hover:from-yellow-400 hover:to-pink-500 transition-all text-lg">
          Đăng ký
        </button>
      </form>
      {submitted && (
        <div className="flex items-center gap-2 justify-center mt-3 text-green-600 font-semibold animate-fade-in">
          <FaCheckCircle /> Đăng ký thành công! Cảm ơn bạn!
        </div>
      )}
    </section>
  );
}
