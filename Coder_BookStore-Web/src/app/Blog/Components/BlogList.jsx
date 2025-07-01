import React from 'react';
import { useRouter } from 'next/navigation';

const BlogList = ({ blogs, loading, error }) => {
  const router = useRouter();
  if (loading) return <div className="text-center py-8">Đang tải bài viết...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!blogs || blogs.length === 0) return <div className="text-center py-8">Chưa có bài viết nào.</div>;

  return (
    <section className="py-8 px-4 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      {blogs.map(blog => (
        <div
          key={blog.id}
          className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center cursor-pointer hover:shadow-2xl transition"
          onClick={() => router.push(`/Blog/${blog.id}`)}
        >
          {/* Nếu có trường image thì hiển thị, không thì bỏ qua */}
          {blog.image && (
            <img src={blog.image} alt={blog.title} className="w-full h-32 object-cover rounded-lg mb-4" />
          )}
          <h2 className="text-xl font-semibold mb-2 text-green-600">{blog.title}</h2>
          <p className="text-gray-600 text-center line-clamp-3">{blog.content || blog.desc}</p>
        </div>
      ))}
    </section>
  );
};

export default BlogList; 