import React from 'react';

const blogs = [
  { id: 1, title: '5 cuốn sách lập trình nên đọc năm 2024', desc: 'Tổng hợp những cuốn sách giúp bạn nâng cao kỹ năng lập trình.', image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=facearea&w=400&h=250' },
  { id: 2, title: 'Làm sao để đọc sách hiệu quả?', desc: 'Bí quyết đọc sách nhanh, nhớ lâu và áp dụng vào thực tế.', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&h=250' },
  { id: 3, title: 'Tại sao nên học lập trình từ sớm?', desc: 'Lợi ích của việc học lập trình cho học sinh, sinh viên.', image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=facearea&w=400&h=250' },
];

const BlogList = () => (
  <section className="py-8 px-4 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
    {blogs.map(blog => (
      <div key={blog.id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
        <img src={blog.image} alt={blog.title} className="w-full h-32 object-cover rounded-lg mb-4" />
        <h2 className="text-xl font-semibold mb-2 text-green-600">{blog.title}</h2>
        <p className="text-gray-600 text-center">{blog.desc}</p>
      </div>
    ))}
  </section>
);

export default BlogList; 