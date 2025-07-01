import React, { useEffect, useState } from 'react';

export default function FeedbackList({ refresh }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFeedbacks();
    // eslint-disable-next-line
  }, [refresh]);

  const fetchFeedbacks = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/feedback');
      if (!res.ok) throw new Error('Không thể tải danh sách góp ý');
      const data = await res.json();
      setFeedbacks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn chắc chắn muốn xóa góp ý này?')) return;
    try {
      const res = await fetch(`/api/feedback/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Xóa thất bại');
      setFeedbacks(fbs => fbs.filter(fb => fb.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="text-center text-pink-600">Đang tải góp ý...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!feedbacks.length) return <div className="text-center text-gray-500">Chưa có góp ý nào.</div>;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h3 className="text-xl font-bold mb-4 text-pink-700">Danh sách góp ý</h3>
      <ul className="space-y-4">
        {feedbacks.map(fb => (
          <li key={fb.id} className="bg-white rounded-lg shadow p-4 border-l-4 border-pink-500 relative group">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-pink-700">{fb.name}</span>
              <span className="text-xs text-gray-400">{new Date(fb.created_at).toLocaleString()}</span>
            </div>
            <div className="text-gray-700 mb-1">{fb.content}</div>
            <div className="text-xs text-gray-500">Email: <span className="font-medium">{fb.email}</span></div>
            <div className="text-xs text-yellow-600">Đánh giá: <span className="font-bold">{fb.rating || 0} ★</span></div>
            <button onClick={() => handleDelete(fb.id)} className="absolute top-2 right-2 text-xs text-red-500 opacity-0 group-hover:opacity-100 transition">Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
} 