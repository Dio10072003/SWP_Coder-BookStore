"use client";
import React, { useState, useEffect } from "react";
import BlogHeader from "./Components/BlogHeader.jsx";
import BlogList from "./Components/BlogList.jsx";
import BlogDetail from "./Components/BlogDetail.jsx";
import BlogForm from "./Components/BlogForm.jsx";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false); // for reloading after CRUD

  useEffect(() => {
    setLoading(true);
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Lỗi tải danh sách bài viết");
        setLoading(false);
      });
  }, [refresh]);

  const handleSelectBlog = (blog) => setSelectedBlog(blog);
  const handleRefresh = () => {
    setRefresh((r) => !r);
    setSelectedBlog(null);
    setEditingBlog(null);
  };
  const handleEditBlog = (blog) => setEditingBlog(blog);

  return (
    <div className="min-h-screen bg-blue-50">
      <BlogHeader />
      <BlogForm onSuccess={handleRefresh} editingBlog={editingBlog} />
      <BlogList
        blogs={blogs}
        loading={loading}
        error={error}
        onSelect={handleSelectBlog}
      />
      <BlogDetail
        blog={selectedBlog}
        onRefresh={handleRefresh}
        onEdit={handleEditBlog}
      />
    </div>
  );
}
/*
'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head'; // Nếu dùng Next.js
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
  const [refresh, setRefresh] = useState(false); // Toggle to refetch data

  useEffect(() => {
    setLoading(true);
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(err => {
        setError('⚠️ Lỗi tải danh sách bài viết!');
        setLoading(false);
      });
  }, [refresh]);

  const handleSelectBlog = (blog) => setSelectedBlog(blog);
  const handleEditBlog = (blog) => setEditingBlog(blog);
  const handleRefresh = () => {
    setRefresh(prev => !prev);
    setSelectedBlog(null);
    setEditingBlog(null);
  };

  return (
    <>
      <Head>
        <title>Blog Management | My App</title>
        <meta name="description" content="Quản lý blog bằng CRUD với Next.js và API" />
      </Head>

      <div className="min-h-screen bg-blue-50 px-4 py-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <BlogHeader />

          <BlogForm onSuccess={handleRefresh} editingBlog={editingBlog} />

          {loading && (
            <div className="text-center text-gray-500">Đang tải danh sách blog...</div>
          )}

          {error && (
            <div className="text-center text-red-600 font-semibold">{error}</div>
          )}

          {!loading && !error && blogs.length === 0 && (
            <div className="text-center text-gray-500 italic">Chưa có bài viết nào.</div>
          )}

          <BlogList
            blogs={blogs}
            loading={loading}
            error={error}
            onSelect={handleSelectBlog}
          />

          {selectedBlog && (
            <BlogDetail
              blog={selectedBlog}
              onRefresh={handleRefresh}
              onEdit={handleEditBlog}
            />
          )}
        </div>
      </div>
    </>
  );
}

*/
