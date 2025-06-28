import React from 'react';
import AuthorHeader from './Components/AuthorHeader.jsx';
import AuthorList from './Components/AuthorList.jsx';
import AuthorDetail from './Components/AuthorDetail.jsx';

export default function AuthorsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AuthorHeader />
      <AuthorList />
      <AuthorDetail />
    </div>
  );
} 