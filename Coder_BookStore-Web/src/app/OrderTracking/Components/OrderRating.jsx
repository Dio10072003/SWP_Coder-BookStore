import React, { useState } from 'react';

export default function OrderRating({ tracking }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  if (!tracking || tracking.status !== 'delivered') return null;
  if (submitted) return <div className="bg-green-50 rounded-xl p-4 text-green-700 font-semibold mt-6">Cảm ơn bạn đã đánh giá đơn hàng!</div>;
  return (
    <form className="bg-white rounded-xl shadow p-6 mt-6 flex flex-col gap-3" onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
      <div className="font-bold text-cyan-700">Đánh giá đơn hàng</div>
      <div className="flex gap-1 text-2xl">
        {[1,2,3,4,5].map(star => (
          <span key={star} className={star <= rating ? 'text-yellow-400 cursor-pointer' : 'text-gray-300 cursor-pointer'} onClick={() => setRating(star)}>&#9733;</span>
        ))}
      </div>
      <textarea
        className="rounded border border-cyan-200 px-3 py-2"
        placeholder="Nhận xét của bạn (tuỳ chọn)"
        value={comment}
        onChange={e => setComment(e.target.value)}
      />
      <button type="submit" className="px-6 py-2 bg-cyan-600 text-white rounded font-semibold hover:bg-cyan-700 transition">Gửi đánh giá</button>
    </form>
  );
} 