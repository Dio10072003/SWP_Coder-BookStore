'use client'
import React, { useEffect, useState } from 'react';
import { authorService } from '../../services/authorService';
import { bookService } from '../../services/bookService';

const DEFAULT_AVATAR = 'https://randomuser.me/api/portraits/lego/1.jpg';

export default function AuthorDetailPage(props) {
  const params = React.use(props.params);
  const { id } = params;
  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const authorData = await authorService.getAuthorById(id);
        const allBooks = await bookService.getAllBooks();
        setAuthor(authorData);
        setBooks(Array.isArray(allBooks) ? allBooks.filter(b => b.author === authorData.name) : []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) return <div className="text-center py-8">Đang tải thông tin tác giả...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;
  if (!author) return <div className="text-center py-8">Không tìm thấy tác giả.</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 flex flex-col items-center mb-8">
        <img src={author.avatar || DEFAULT_AVATAR} alt={author.name} className="w-28 h-28 rounded-full mb-4 object-cover" />
        <h1 className="text-3xl font-bold mb-2">{author.name}</h1>
        <div className="text-gray-500 text-base mb-2">{author.country} {author.birth_year ? `(${author.birth_year})` : ''}</div>
        <div className="text-xs text-blue-600 mb-2">{Array.isArray(author.genres) ? author.genres.join(', ') : ''}</div>
        <p className="text-gray-700 text-center mb-2">{author.bio}</p>
      </div>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Các sách của tác giả</h2>
        {books.length === 0 ? (
          <div className="text-gray-500">Chưa có sách nào.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {books.map(book => (
              <a
                key={book.id}
                href={`/Books/${book.id}`}
                className="bg-white rounded-xl shadow p-4 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition cursor-pointer"
              >
                <img src={book.img} alt={book.title} className="w-24 h-32 object-cover rounded mb-2" />
                <h3 className="font-semibold text-lg mb-1 text-center line-clamp-2">{book.title}</h3>
                <div className="text-pink-600 font-bold mb-1">{Number(book.price).toLocaleString()}₫</div>
                <div className="flex items-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < book.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" /></svg>
                  ))}
                  <span className="text-xs text-gray-500 ml-1">({book.rating}/5)</span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 