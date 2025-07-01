import React from 'react';
import Link from 'next/link';

const authors = [
  { id: 1, name: 'Nguyễn Nhật Ánh', bio: 'Tác giả nổi tiếng với các tác phẩm thiếu nhi.', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: 2, name: 'J.K. Rowling', bio: 'Tác giả của loạt truyện Harry Potter.', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: 3, name: 'Haruki Murakami', bio: 'Nhà văn Nhật Bản với phong cách kỳ ảo.', image: 'https://randomuser.me/api/portraits/men/65.jpg' },
];

const AuthorList = () => (
  <section className="py-8 px-4 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
    {authors.map(author => (
      <Link
        key={author.id}
        href={`/Authors/${author.id}`}
        className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition cursor-pointer"
      >
        <img src={author.image} alt={author.name} className="w-24 h-24 rounded-full mb-4 object-cover" />
        <h2 className="text-xl font-semibold mb-2">{author.name}</h2>
        <p className="text-gray-600 text-center">{author.bio}</p>
      </Link>
    ))}
  </section>
);

export default AuthorList; 