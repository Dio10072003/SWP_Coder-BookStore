'use client';
import CategoryList from './Components/CategoryList.jsx';

export default function CategoriesPage() {
  return (
    <div className="p-6 bg-white min-h-screen text-gray-900">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">📖 Browse by Category</h2>
      <CategoryList />
    </div>
  );
} 