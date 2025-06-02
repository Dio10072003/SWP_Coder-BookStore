import React from 'react';

const BlogSection = () => {
  const posts = [
    { title: '10 Mẹo Lập Trình Hiệu Quả', date: '01/06/2025' },
    { title: 'Sách Hay Cho Dev Mới', date: '30/05/2025' },
  ];

  return (
    <section className="py-12 px-6 bg-indigo-950">
      <h2 className="text-4xl font-mono text-center text-green-400 mb-8 animate-pulse">Blog Coder</h2>
      <div className="space-y-6">
        {posts.map((post, index) => (
          <div
            key={index}
            className="p-6 bg-gray-800 rounded-lg opacity-0 animate-fadeIn animation-delay-300"
          >
            <h3 className="text-2xl font-mono text-white">{post.title}</h3>
            <p className="text-green-400">{post.date}</p>
            <a href="#blog" className="text-cyan-400 hover:underline">Đọc Thêm →</a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;