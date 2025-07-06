import Link from 'next/link';
import React from 'react';

// Icon phù hợp cho từng thể loại phổ biến
const categoryIcons = {
  Programming: '💻',
  'Data Science': '📊',
  Design: '🎨',
  Architecture: '🏛️',
  Security: '🔒',
  Mobile: '📱',
  Database: '🗄️',
  'Game Development': '🎮',
  Blockchain: '⛓️',
  Cloud: '☁️',
  'Project Management': '📋',
  Biography: '👤',
  Fantasy: '🧙',
  Fiction: '📖',
  History: '🏺',
  Mystery: '🕵️',
  Nonfiction: '📚',
  Romance: '💖',
  ScienceFiction: '🚀',
  'Science Fiction': '🚀',
  SelfHelp: '🌱',
  'Self Help': '🌱',
  Thriller: '🔎',
  'True Crime': '🕵️‍♂️',
  Horror: '👻',
  Poetry: '📝',
  Adventure: '🏞️',
  Philosophy: '🤔',
  Business: '💼',
  Children: '🧒',
  Comics: '🦸',
  Cooking: '🍳',
  Health: '💪',
  Travel: '✈️',
  Art: '🖼️',
  Religion: '⛪',
  Sports: '🏅',
  Memoir: '📔',
  Classic: '🏛️',
};

export default function CategoryCard({ category }) {
  // Luôn decode tên thể loại để icon đúng
  const displayCategory = decodeURIComponent(category.name || '');
  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-50 hover:from-blue-200 hover:to-blue-100 text-center p-6 rounded-2xl shadow-lg transition-all duration-200 group cursor-pointer border border-blue-200">
      <Link href={`/Categories/${category.name}`} className="flex flex-col items-center gap-2">
        <span className="text-4xl mb-2 drop-shadow-sm">
          {categoryIcons[displayCategory] || '📚'}
        </span>
        <span className="text-xl font-bold text-blue-700 group-hover:underline mb-1">{displayCategory}</span>
        <span className="text-gray-600 text-sm line-clamp-2 h-10">{category.description || 'Khám phá sách thuộc thể loại này.'}</span>
      </Link>
    </div>
  );
} 