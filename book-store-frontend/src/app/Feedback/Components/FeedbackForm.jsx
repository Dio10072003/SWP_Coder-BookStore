import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import StarRating from './StarRating.jsx';

export default function FeedbackForm({
  onSubmit, name, setName, email, setEmail, content, setContent, rating, setRating, submitted
}) {
  return (
    <form onSubmit={onSubmit} className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6">
      <div>
        <label className="block mb-2 font-semibold text-gray-700">Tên của bạn</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-500 outline-none text-lg shadow"
          placeholder="Nhập tên..."
          required
        />
      </div>
      <div>
        <label className="block mb-2 font-semibold text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-500 outline-none text-lg shadow"
          placeholder="Nhập email..."
          required
        />
      </div>
      <div>
        <label className="block mb-2 font-semibold text-gray-700">Nội dung góp ý</label>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-500 outline-none text-lg shadow min-h-[100px]"
          placeholder="Nhập nội dung góp ý..."
          required
        />
      </div>
      <div>
        <label className="block mb-2 font-semibold text-gray-700">Đánh giá</label>
        <StarRating rating={rating} setRating={setRating} />
      </div>
      <button
        type="submit"
        className="mt-2 px-6 py-3 bg-pink-600 text-white rounded-xl font-semibold shadow hover:bg-pink-700 transition-all text-lg"
      >
        Gửi góp ý
      </button>
      {submitted && (
        <div className="flex items-center gap-2 mt-2 text-green-600 font-semibold animate-fade-in">
          <FaCheckCircle /> Gửi góp ý thành công! Cảm ơn bạn rất nhiều!
        </div>
      )}
    </form>
  );
} 