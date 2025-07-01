'use client';

import React, { useEffect, useState } from 'react';

const BlogDetail = ({ blog, onRefresh, onEdit }) => {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!blog) {
      setDetail(null);
      return;
    }
    setLoading(true);
    fetch(`/api/posts/${blog.id}`)
      .then(res => res.json())
      .then(data => {
        setDetail(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Lỗi tải chi tiết bài viết');
        setLoading(false);
      });
  }, [blog]);

  if (!blog) {
    return (
      <section className="py-8 px-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Chi tiết bài viết</h2>
        <p className="text-gray-700">Chọn một bài viết để xem thông tin chi tiết.</p>
      </section>
    );
  }
  if (loading) return <div className="text-center py-8">Đang tải chi tiết...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!detail) return null;

  return (
    <section className="py-8 px-4 max-w-3xl mx-auto bg-white rounded-xl shadow-lg mt-4">
      <h2 className="text-2xl font-bold mb-4 text-green-700">{detail.title}</h2>
      {detail.image && <img src={detail.image} alt={detail.title} className="w-full h-48 object-cover rounded-lg mb-4" />}
      <div className="text-gray-800 mb-4 whitespace-pre-line">{detail.content}</div>
      <div className="flex gap-2">
        <button
          className="px-4 py-2 bg-yellow-400 rounded hover:bg-yellow-500"
          onClick={() => onEdit && onEdit(detail)}
        >
          Sửa
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
          onClick={async () => {
            if (window.confirm('Bạn chắc chắn muốn xóa bài viết này?')) {
              setLoading(true);
              await fetch(`/api/posts/${detail.id}`, { method: 'DELETE' });
              setLoading(false);
              onRefresh();
            }
          }}
        >
          Xóa
        </button>
      </div>
    </section>
  );
};

export default BlogDetail; 