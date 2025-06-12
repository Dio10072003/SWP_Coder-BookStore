'use client';

import Link from 'next/link';

const categories = [
  'Biography',
  'Fantasy',
  'Fiction',
  'History',
  'Mystery',
  'Nonfiction',
  'Romance',
  'ScienceFiction',
  'SelfHelp',
  'Thriller',
];

export default function CategoriesPage() {
  return (
    <div className="p-6 bg-white min-h-screen text-gray-900">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">📖 Browse by Category</h2>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <li
            key={cat}
            className="bg-blue-100 hover:bg-blue-200 text-center p-4 rounded-lg shadow transition duration-200"
          >
            <Link href={`/categories/${cat}`}>
              <span className="text-lg font-semibold hover:underline">{cat}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
