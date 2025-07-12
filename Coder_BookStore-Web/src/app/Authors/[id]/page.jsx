'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
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
        const authorBooks = await bookService.getBooksByAuthor(authorData.name);
        setAuthor(authorData);
        setBooks(authorBooks);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Đang tải thông tin tác giả...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center text-red-500">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-lg">{error}</p>
          <Link 
            href="/Authors"
            className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all"
          >
            Quay lại danh sách
          </Link>
        </div>
      </div>
    );
  }

  if (!author) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-16 h-16 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">Không tìm thấy tác giả</h3>
          <p className="text-gray-500 mb-6">Tác giả bạn đang tìm kiếm không tồn tại.</p>
          <Link 
            href="/Authors"
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all"
          >
            Quay lại danh sách
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Back button */}
      <div className="container mx-auto px-4 py-6">
        <Link 
          href="/Authors"
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold mb-6 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Quay lại danh sách tác giả
        </Link>
      </div>

      {/* Author header section */}
      <div className="container mx-auto px-4 pb-12">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
          <div className="relative">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 opacity-50"></div>
            
            <div className="relative p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Author avatar */}
                <div className="relative">
                  <img 
                    src={author.avatar || DEFAULT_AVATAR} 
                    alt={author.name} 
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-8 border-white shadow-2xl" 
                  />
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {books.length}
                  </div>
                </div>

                {/* Author info */}
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                    {author.name}
                  </h1>
                  
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
                    {author.country && (
                      <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full text-gray-700 font-medium">
                        <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {author.country}
                      </div>
                    )}
                    {author.birth_year && (
                      <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full text-gray-700 font-medium">
                        <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {author.birth_year}
                      </div>
                    )}
                  </div>

                  {author.bio && (
                    <p className="text-gray-700 text-lg leading-relaxed mb-6 max-w-3xl">
                      {author.bio}
                    </p>
                  )}

                  {author.genres && author.genres.length > 0 && (
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                      {Array.isArray(author.genres) ? author.genres.map((genre, i) => (
                        <span key={i} className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-full shadow-lg">
                          {genre}
                        </span>
                      )) : null}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Books section */}
      <div className="container mx-auto px-4 pb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Tác phẩm của {author.name}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto"></div>
        </div>

        {books.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-16 h-16 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">Chưa có tác phẩm nào</h3>
            <p className="text-gray-500 mb-6">Tác giả này chưa có sách nào trong hệ thống.</p>
            <Link 
              href="/Books"
              className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all"
            >
              Khám phá sách khác
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map(book => (
              <Link
                key={book.id}
                href={`/Books/${book.id}`}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20 overflow-hidden"
              >
                {/* Book cover */}
                <div className="relative mb-4">
                  <img 
                    src={book.img} 
                    alt={book.title} 
                    className="w-full h-48 object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    {book.category}
                  </div>
                </div>

                {/* Book info */}
                <div className="space-y-3">
                  <h3 className="font-bold text-lg text-gray-800 group-hover:text-purple-600 transition-colors line-clamp-2">
                    {book.title}
                  </h3>
                  
                  <div className="text-pink-600 font-bold text-lg">
                    {Number(book.price).toLocaleString()}₫
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < book.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.385-2.46c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({book.rating}/5)</span>
                  </div>

                  {book.publishYear && (
                    <div className="text-sm text-gray-500">
                      Xuất bản: {book.publishYear}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 