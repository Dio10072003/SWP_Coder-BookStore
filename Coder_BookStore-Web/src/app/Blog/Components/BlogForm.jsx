'use client';

import React, { useState, useEffect } from 'react';

const initialState = { title: '', content: '', image: '' };

const BlogForm = ({ onSuccess, editingBlog }) => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (editingBlog) {
      setForm({
        title: editingBlog.title || '',
        content: editingBlog.content || '',
        image: editingBlog.image || '',
      });
    } else {
      setForm(initialState);
    }
  }, [editingBlog]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const method = editingBlog ? 'PUT' : 'POST';
      const url = editingBlog ? `/api/posts/${editingBlog.id}` : '/api/posts';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Lỗi');
      setSuccess(editingBlog ? 'Cập nhật thành công!' : 'Tạo mới thành công!');
      setForm(initialState);
      onSuccess && onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">{editingBlog ? 'Sửa bài viết' : 'Tạo bài viết mới'}</h2>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Tiêu đề</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Nội dung</label>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 min-h-[120px]"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Ảnh (URL)</label>
        <input
          type="text"
          name="image"
          value={form.image}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {success && <div className="text-green-600 mb-2">{success}</div>}
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Đang lưu...' : (editingBlog ? 'Cập nhật' : 'Tạo mới')}
      </button>
      {editingBlog && (
        <button
          type="button"
          className="ml-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          onClick={() => setForm(initialState)}
        >
          Hủy
        </button>
      )}
    </form>
  );
};

export default BlogForm; 