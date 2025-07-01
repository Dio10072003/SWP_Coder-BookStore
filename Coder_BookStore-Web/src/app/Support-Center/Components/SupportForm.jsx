import React, { useState } from 'react';

export default function SupportForm({ onSuccess }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const res = await fetch('/api/support-tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Có gì đó không ổn, thử lại sau nhé!');
      }
      setForm({ name: '', email: '', subject: '', message: '' });
      setSuccess(true);
      if (onSuccess) onSuccess();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 mb-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Gửi yêu cầu hỗ trợ
        <span className="block text-sm text-gray-400 font-normal">Đừng ngại, hỏi càng nhiều càng tốt! Chúng tôi trả lời nghiêm túc, không cà khịa đâu 😇</span>
      </h2>
      <div className="mb-3">
        <input name="name" value={form.name} onChange={handleChange} required placeholder="Họ tên (đừng ghi biệt danh nhé!)" className="w-full p-2 border rounded" />
      </div>
      <div className="mb-3">
        <input name="email" value={form.email} onChange={handleChange} required type="email" placeholder="Email (để còn gửi phản hồi)" className="w-full p-2 border rounded" />
      </div>
      <div className="mb-3">
        <input name="subject" value={form.subject} onChange={handleChange} required placeholder="Chủ đề (ví dụ: Đơn hàng, Sách, ... )" className="w-full p-2 border rounded" />
      </div>
      <div className="mb-3">
        <textarea name="message" value={form.message} onChange={handleChange} required placeholder="Nội dung hỗ trợ (càng chi tiết càng tốt, càng nhanh được giải quyết!)" className="w-full p-2 border rounded min-h-[80px]" />
      </div>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {success && <div className="text-green-600 mb-2 animate-fade-in">Gửi thành công! Đội hỗ trợ sẽ phản hồi sớm nhất có thể (trừ khi đang đi uống cà phê ☕).</div>}
      <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        {loading ? 'Đang gửi... Đợi xíu nhé!' : 'Gửi yêu cầu'}
      </button>
    </form>
  );
} 