import Link from 'next/link';
import React from 'react';

export default function CategoryCard({ category }) {
  return (
    <li className="bg-blue-100 hover:bg-blue-200 text-center p-4 rounded-lg shadow transition duration-200">
      <Link href={`/Categories/${category}`}>
        <span className="text-lg font-semibold hover:underline">{category}</span>
      </Link>
    </li>
  );
} 