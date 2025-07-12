'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { authorService } from '../../services/authorService';
import { bookService } from '../../services/bookService';
import Pagination from './Pagination';

const DEFAULT_AVATAR = 'https://randomuser.me/api/portraits/lego/1.jpg';
const PAGE_SIZE = 6;

const emptyAuthor = {
  name: '',
  bio: '',
  avatar: '',
  country: '',
  birth_year: '',
  genres: '',
};

const gradientColors = [
  ['#667eea', '#764ba2'], // Purple gradient
  ['#f093fb', '#f5576c'], // Pink gradient
  ['#4facfe', '#00f2fe'], // Blue gradient
  ['#43e97b', '#38f9d7'], // Green gradient
  ['#fa709a', '#fee140'], // Pink-yellow gradient
  ['#a8edea', '#fed6e3'], // Mint-pink gradient
  ['#ffecd2', '#fcb69f'], // Orange gradient
  ['#ff9a9e', '#fecfef'], // Pink gradient
];

export default function AuthorList() {
  const [authors, setAuthors] = useState([]);
  const [authorBooks, setAuthorBooks] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create');
  const [form, setForm] = useState(emptyAuthor);
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchAuthors = async () => {
    setLoading(true);
    try {
      const authorsData = await authorService.getAllAuthors();
      setAuthors(authorsData);
      // Fetch all books once, ensure it's always an array
      const allBooksResult = await bookService.getAllBooks();
      const allBooks = Array.isArray(allBooksResult)
        ? allBooksResult
        : (allBooksResult && Array.isArray(allBooksResult.data))
          ? allBooksResult.data
          : [];
      const booksByAuthor = {};
      authorsData.forEach(author => {
        booksByAuthor[author.id] = allBooks.filter(book => book.author === author.name).length;
      });
      setAuthorBooks(booksByAuthor);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  const openCreateModal = () => {
    setForm(emptyAuthor);
    setModalType('create');
    setShowModal(true);
    setEditingId(null);
    setFormError(null);
  };

  const openEditModal = (author) => {
    setForm({
      name: author.name || '',
      bio: author.bio || '',
      avatar: author.avatar || '',
      country: author.country || '',
      birth_year: author.birth_year || '',
      genres: Array.isArray(author.genres) ? author.genres.join(', ') : (author.genres || ''),
    });
    setModalType('edit');
    setShowModal(true);
    setEditingId(author.id);
    setFormError(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    try {
      const payload = {
        ...form,
        birth_year: form.birth_year ? Number(form.birth_year) : undefined,
        genres: form.genres ? form.genres.split(',').map(g => g.trim()) : [],
      };
      if (modalType === 'create') {
        await authorService.createAuthor(payload);
        setSuccessMsg('Đã thêm tác giả thành công!');
      } else if (modalType === 'edit' && editingId) {
        await authorService.updateAuthor(editingId, payload);
        setSuccessMsg('Đã cập nhật tác giả thành công!');
      }
      setShowModal(false);
      fetchAuthors();
    } catch (err) {
      setFormError(err.message || 'Lỗi không xác định');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa tác giả này?')) return;
    setDeleteLoading(true);
    try {
      await authorService.deleteAuthor(id);
      setSuccessMsg('Đã xóa tác giả thành công!');
      fetchAuthors();
    } catch (err) {
      setFormError(err.message || 'Lỗi không xác định');
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Đang tải danh sách tác giả...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center text-red-500">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-lg">{error}</p>
        </div>
      </div>
    );
  }

  const totalAuthors = authors.length;
  const limit = PAGE_SIZE;
  const totalPages = Math.ceil(totalAuthors / limit);
  const pagedAuthors = authors.slice((page - 1) * limit, page * limit);

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto bg-white rounded-3xl shadow-xl">
      {/* Header with stats */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg border border-white/20">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{totalAuthors}</div>
            <div className="text-sm text-gray-600">Tác giả</div>
          </div>
          <div className="w-px h-12 bg-gray-300"></div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-600">
              {Object.values(authorBooks).reduce((sum, count) => sum + count, 0)}
            </div>
            <div className="text-sm text-gray-600">Tác phẩm</div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Danh sách tác giả
        </h2>
        <button 
          onClick={openCreateModal} 
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Thêm tác giả
        </button>
      </div>

      {/* Success/Error messages */}
      {successMsg && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          {successMsg}
        </div>
      )}
      
      {formError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {formError}
        </div>
      )}

      {/* Empty state */}
      {authors.length === 0 && (
        <div className="text-center py-16">
          <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-16 h-16 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">Chưa có tác giả nào</h3>
          <p className="text-gray-500 mb-6">Hãy thêm tác giả đầu tiên để bắt đầu!</p>
          <button 
            onClick={openCreateModal}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Thêm tác giả đầu tiên
          </button>
        </div>
      )}

      {/* Authors grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {pagedAuthors.map((author, idx) => (
          <div
            key={author.id}
            className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20 overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${gradientColors[idx % gradientColors.length][0]}15, ${gradientColors[idx % gradientColors.length][1]}15)`,
            }}
          >
            {/* Animated border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            
            {/* Author info */}
            <div className="text-center mb-6">
              <div className="relative inline-block mb-4">
                <img 
                  src={author.avatar || DEFAULT_AVATAR} 
                  alt={author.name} 
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300" 
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {authorBooks[author.id] || 0}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                {author.name}
              </h3>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {author.bio || 'Chưa có tiểu sử'}
              </p>
              
              <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-4">
                {author.country && (
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {author.country}
                  </div>
                )}
                {author.birth_year && (
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    {author.birth_year}
                  </div>
                )}
              </div>
              
              {author.genres && author.genres.length > 0 && (
                <div className="flex flex-wrap justify-center gap-1 mb-4">
                  {Array.isArray(author.genres) ? author.genres.slice(0, 3).map((genre, i) => (
                    <span key={i} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                      {genre}
                    </span>
                  )) : null}
                </div>
              )}
            </div>
            
            {/* Action buttons */}
            <div className="flex gap-2">
              <Link
                href={`/Authors/${author.id}`}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-xl text-center hover:from-pink-500 hover:to-purple-500 transition-all duration-300 hover:shadow-lg"
              >
                Xem chi tiết
              </Link>
              <button 
                onClick={() => openEditModal(author)}
                className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                title="Sửa tác giả"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              <button 
                onClick={() => handleDelete(author.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                title="Xóa tác giả"
                disabled={deleteLoading}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <Pagination page={page} setPage={setPage} total={totalAuthors} limit={limit} />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {modalType === 'create' ? 'Thêm tác giả mới' : 'Chỉnh sửa tác giả'}
                </h2>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tên tác giả *
                  </label>
                  <input 
                    name="name" 
                    value={form.name} 
                    onChange={handleFormChange} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Nhập tên tác giả"
                    required 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tiểu sử
                  </label>
                  <textarea 
                    name="bio" 
                    value={form.bio} 
                    onChange={handleFormChange} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                    rows="3"
                    placeholder="Mô tả ngắn về tác giả"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ảnh đại diện (URL)
                  </label>
                  <input 
                    name="avatar" 
                    value={form.avatar} 
                    onChange={handleFormChange} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Quốc gia
                    </label>
                    <input 
                      name="country" 
                      value={form.country} 
                      onChange={handleFormChange} 
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Việt Nam"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Năm sinh
                    </label>
                    <input 
                      name="birth_year" 
                      value={form.birth_year} 
                      onChange={handleFormChange} 
                      type="number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="1990"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Thể loại (phân cách bằng dấu phẩy)
                  </label>
                  <input 
                    name="genres" 
                    value={form.genres} 
                    onChange={handleFormChange} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Tiểu thuyết, Truyện ngắn, Thơ"
                  />
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                  >
                    Hủy
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-pink-500 hover:to-purple-500 transition-all font-semibold"
                  >
                    {modalType === 'create' ? 'Thêm tác giả' : 'Cập nhật'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
} 