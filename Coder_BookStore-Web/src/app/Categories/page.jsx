"use client";
import CategoryList from "./Components/CategoryList.jsx";

export default function CategoriesPage() {
  return (
    <div className="p-6 bg-white min-h-screen text-gray-900">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">
        📖 Browse by Category
      </h2>
      <CategoryList />
    </div>
  );
}
/*
'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import CategoryList from './Components/CategoryList.jsx';

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <Head>
        <title>Book Categories | Explore Genres</title>
        <meta name="description" content="Khám phá các thể loại sách khác nhau và tìm cuốn sách yêu thích của bạn." />
      </Head>

      <div className="p-6 bg-gradient-to-br from-white to-blue-50 min-h-screen text-gray-900">
        {/* Header *
        <h2 className="text-3xl font

 */
