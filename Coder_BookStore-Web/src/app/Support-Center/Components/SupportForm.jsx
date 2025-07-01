import React, { useState } from 'react';

export default function SupportForm({ onSuccess }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/support-tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Gửi yêu cầu thất bại');
      }
      setForm({ name: '', email: '', subject: '', message: '' });
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 mb-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Gửi yêu cầu hỗ trợ</h2>
      <div className="mb-3">
        <input name="name" value={form.name} onChange={handleChange} required placeholder="Họ tên" className="w-full p-2 border rounded" />
      </div>
      <div className="mb-3">
        <input name="email" value={form.email} onChange={handleChange} required type="email" placeholder="Email" className="w-full p-2 border rounded" />
      </div>
      <div className="mb-3">
        <input name="subject" value={form.subject} onChange={handleChange} required placeholder="Chủ đề" className="w-full p-2 border rounded" />
      </div>
      <div className="mb-3">
        <textarea name="message" value={form.message} onChange={handleChange} required placeholder="Nội dung hỗ trợ" className="w-full p-2 border rounded min-h-[80px]" />
      </div>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        {loading ? 'Đang gửi...' : 'Gửi yêu cầu'}
      </button>
    </form>
  );
} 