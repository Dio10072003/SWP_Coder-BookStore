'use client'
import React, { useState, useEffect } from 'react';
import BlogHeader from './Components/BlogHeader.jsx';
import BlogList from './Components/BlogList.jsx';
import BlogDetail from './Components/BlogDetail.jsx';
import BlogForm from './Components/BlogForm.jsx';

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false); // for reloading after CRUD

  useEffect(() => {
    setLoading(true);
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Lỗi tải danh sách bài viết');
        setLoading(false);
      });
  }, [refresh]);

  const handleSelectBlog = (blog) => setSelectedBlog(blog);
  const handleRefresh = () => {
    setRefresh(r => !r);
    setSelectedBlog(null);
    setEditingBlog(null);
  };
  const handleEditBlog = (blog) => setEditingBlog(blog);

  return (
    <div className="min-h-screen bg-blue-50">
      <BlogHeader />
      <BlogForm onSuccess={handleRefresh} editingBlog={editingBlog} />
      <BlogList blogs={blogs} loading={loading} error={error} onSelect={handleSelectBlog} />
      <BlogDetail blog={selectedBlog} onRefresh={handleRefresh} onEdit={handleEditBlog} />
    </div>
  );
} 