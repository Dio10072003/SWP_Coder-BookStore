import React from 'react';

const categories = [
  { name: 'Lập Trình', icon: (
    <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 18l6-6-6-6M8 6l-6 6 6 6" /></svg>
  ) },
  { name: 'Khoa Học', icon: (
    <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth={2} /><path d="M12 6v6l4 2" strokeWidth={2} /></svg>
  ) },
  { name: 'Văn Học', icon: (
    <svg className="w-5 h-5 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16v16H4z" /></svg>
  ) },
  { name: 'Công Nghệ', icon: (
    <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="4" y="4" width="16" height="16" rx="2" strokeWidth={2} /><path d="M9 9h6v6H9z" strokeWidth={2} /></svg>
  ) },
  { name: 'Tự Phát Triển', icon: (
    <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
  ) },
];

const CategoryNav = () => {
  return (
    <nav className="py-4 px-2 bg-gray-900 shadow rounded-lg max-w-3xl mx-auto mt-6 mb-6">
      <ul className="flex flex-wrap justify-center gap-4 md:gap-6">
        {categories.map((cat, index) => (
          <li key={index} className="flex flex-col items-center group">
            <a
              href={`#${cat.name.toLowerCase().replace(/ /g, '-')}`}
              className="flex flex-col items-center text-base font-mono text-cyan-400 hover:text-cyan-200 transition-all duration-200 transform hover:scale-105"
            >
              {cat.icon}
              <span className="mt-1 text-sm md:text-base font-semibold group-hover:text-yellow-300 transition-colors">{cat.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoryNav;