import React from 'react';

const CategoryNav = () => {
  const categories = ['Lập Trình', 'Khoa Học', 'Văn Học', 'Công Nghệ', 'Tự Phát Triển'];

  return (
    <nav className="py-6 px-4 bg-gray-900 shadow-lg">
      <ul className="flex justify-center space-x-6">
        {categories.map((category, index) => (
          <li key={index}>
            <a
              href={`#${category.toLowerCase()}`}
              className="text-lg font-mono text-cyan-400 hover:text-cyan-200 transition-all duration-300 transform hover:scale-110 hover:rotate-3 hover:shadow-[0_0_15px_rgba(0,255,255,0.5)]"
            >
              {category}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoryNav;