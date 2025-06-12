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

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md">
  <h1 className="text-2xl font-bold mb-2">📚 Coder-Bookstore</h1>
  <ul className="flex flex-wrap gap-4">
    {categories.map((cat) => (
      <li key={cat}>
        <Link href={`/categories/${cat}`}>
          <span className="hover:underline hover:text-yellow-200 cursor-pointer">
            {cat}
          </span>
        </Link>
      </li>
    ))}
  </ul>
</nav>

  );
}
