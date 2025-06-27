import React from 'react';
import BlogHeader from './Components/BlogHeader.jsx';
import BlogList from './Components/BlogList.jsx';
import BlogDetail from './Components/BlogDetail.jsx';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-blue-50">
      <BlogHeader />
      <BlogList />
      <BlogDetail />
    </div>
  );
} 