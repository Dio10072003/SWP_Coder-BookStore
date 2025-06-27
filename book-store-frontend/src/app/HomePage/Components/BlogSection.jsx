import React from 'react';

const posts = [
  { title: '10 Mẹo Lập Trình Hiệu Quả', date: '01/06/2025' },
  { title: 'Sách Hay Cho Dev Mới', date: '30/05/2025' },
];

const BlogSection = () => {
  return (
    <section className="relative py-8 px-2 bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 rounded-lg shadow my-6 overflow-hidden">
      <span className="absolute -top-6 -left-6 w-24 h-24 bg-pink-300 opacity-10 rounded-full blur-2xl animate-blob z-0" />
      <span className="absolute -bottom-6 -right-6 w-24 h-24 bg-yellow-200 opacity-5 rounded-full blur-2xl animate-blob2 z-0" />
      <h2 className="text-2xl font-mono text-center text-green-400 mb-6 flex items-center justify-center gap-2">
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-green-400"><rect x="4" y="7" width="16" height="10" rx="2" strokeWidth={2} /><path d="M8 11h8" strokeWidth={2} /></svg>
        Blog Coder
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post, index) => (
          <div
            key={index}
            className="p-4 bg-white/10 rounded-lg shadow flex flex-col justify-between transition-all duration-200 hover:scale-105 hover:shadow-xl"
          >
            <h3 className="text-lg font-mono text-white mb-1 line-clamp-2 min-h-[28px]">{post.title}</h3>
            <p className="text-green-400 mb-2 text-sm">{post.date}</p>
            <a href="#blog" className="inline-block mt-auto px-4 py-1.5 bg-gradient-to-r from-green-400 to-cyan-400 text-indigo-900 font-bold rounded-full shadow hover:scale-105 hover:shadow-lg text-sm">Đọc Thêm →</a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;