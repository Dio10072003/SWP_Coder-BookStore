'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { authorService } from '../../services/authorService';

const DEFAULT_AVATAR = 'https://randomuser.me/api/portraits/lego/1.jpg';
const PAGE_SIZE = 3;

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    authorService.getAllAuthors()
      .then(setAuthors)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-8">Đang tải danh sách tác giả...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;

  const totalPages = Math.ceil(authors.length / PAGE_SIZE);
  const pagedAuthors = authors.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section className="py-8 px-4 max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {pagedAuthors.map(author => (
          <Link
            key={author.id}
            href={`/Authors/${author.id}`}
            className="bg-white rounded-3xl shadow-xl p-6 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition cursor-pointer border-4 border-yellow-400 ring-2 ring-yellow-200 ring-offset-2"
            style={{ boxShadow: '0 0 24px 0 #fde68a, 0 8px 24px 0 #fbbf24' }}
          >
            <img src={author.avatar || DEFAULT_AVATAR} alt={author.name} className="w-24 h-24 rounded-full mb-4 object-cover border-2 border-yellow-300 shadow" />
            <h2 className="text-xl font-semibold mb-2">{author.name}</h2>
            <p className="text-gray-600 text-center mb-1">{author.bio}</p>
            <div className="text-gray-500 text-sm mb-1">{author.country} {author.birth_year ? `(${author.birth_year})` : ''}</div>
            <div className="text-xs text-blue-600 mb-1">{Array.isArray(author.genres) ? author.genres.join(', ') : ''}</div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center gap-2">
        <button
          className="px-3 py-1 rounded bg-gray-200 hover:bg-yellow-200 font-semibold"
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Trước
        </button>
        <span className="px-3 py-1 font-bold text-yellow-700">{page} / {totalPages}</span>
        <button
          className="px-3 py-1 rounded bg-gray-200 hover:bg-yellow-200 font-semibold"
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Sau
        </button>
      </div>
    </section>
  );
};

export default AuthorList; 