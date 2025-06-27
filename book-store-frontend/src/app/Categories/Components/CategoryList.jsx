import CategoryCard from './CategoryCard.jsx';
import React from 'react';

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

export default function CategoryList() {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((cat) => (
        <CategoryCard key={cat} category={cat} />
      ))}
    </ul>
  );
} 