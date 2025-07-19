import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { bookService } from '../../services/bookService';
import Pagination from './Pagination';

const DEFAULT_IMG = 'https://placehold.co/180x260?text=No+Image';
const PAGE_SIZE = 8;

const emptyBook = {
  title: '',
  author: '',
  price: '',
  img: '',
  rating: 0,
  description: '',
  category: '',
  publishYear: new Date().getFullYear(),
  pages: 0,
  language: '',
  isbn: '',
};

const gradientColors = [
  ['#6366f1', '#a21caf'],
  ['#f59e42', '#f43f5e'],
  ['#22d3ee', '#2563eb'],
  ['#facc15', '#f472b6'],
  ['#34d399', '#3b82f6'],
  ['#f87171', '#fbbf24'],
  ['#a3e635', '#06b6d4'],
  ['#f472b6', '#6366f1'],
];

function formatVND(price) {
  if (typeof price === 'number') return price.toLocaleString('vi-VN') + '₫';
  if (typeof price === 'string' && !isNaN(Number(price))) return Number(price).toLocaleString('vi-VN') + '₫';
  return price;
}

export default function BookGrid() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create');
  const [form, setForm] = useState(emptyBook);
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const booksData = await bookService.getAllBooks();
      // Đảm bảo books là array
      setBooks(Array.isArray(booksData) ? booksData : booksData.data || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const openCreateModal = () => {
    setForm(emptyBook);
    setModalType('create');
    setShowModal(true);
    setEditingId(null);
    setFormError(null);
  };

  const openEditModal = (book) => {
    setForm({
      title: book.title || '',
      author: book.author || '',
      price: book.price || '',
      img: book.img || '',
      rating: book.rating || 0,
      description: book.description || '',
      category: book.category || '',
      publishYear: book.publishYear || new Date().getFullYear(),
      pages: book.pages || 0,
      language: book.language || '',
      isbn: book.isbn || '',
    });
    setModalType('edit');
    setShowModal(true);
    setEditingId(book.id);
    setFormError(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: name === 'rating' || name === 'pages' || name === 'publishYear' ? Number(value) : value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    try {
      // Loại bỏ hoàn toàn publishYear khỏi payload nếu còn sót lại
      const { publishYear, ...payload } = form;
      if (modalType === 'create') {
        await bookService.createBook(payload);
        setSuccessMsg('Đã thêm sách thành công!');
      } else if (modalType === 'edit' && editingId) {
        await bookService.updateBook(editingId, payload);
        setSuccessMsg('Đã cập nhật sách thành công!');
      }
      setShowModal(false);
      fetchBooks();
    } catch (err) {
      setFormError(err.message || 'Lỗi không xác định');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa sách này?')) return;
    setDeleteLoading(true);
    try {
      await bookService.deleteBook(id);
      setSuccessMsg('Đã xóa sách thành công!');
      fetchBooks();
    } catch (err) {
      setFormError(err.message || 'Lỗi không xác định');
    } finally {
      setDeleteLoading(false);
    }
  };

  const totalBooks = books.length;
  const limit = PAGE_SIZE;
  const totalPages = Math.ceil(totalBooks / limit);
  const pagedBooks = books.slice((page - 1) * limit, page * limit);

  // UI
  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Đang tải danh sách sách...</p>
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

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto bg-white rounded-3xl shadow-xl">
      {/* Action buttons */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-pink-500 bg-clip-text text-transparent">
          Danh sách sách
        </h2>
        <button
          onClick={openCreateModal}
          className="bg-gradient-to-r from-yellow-400 to-pink-400 hover:from-pink-500 hover:to-yellow-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Thêm sách
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
      {books.length === 0 && (
        <div className="text-center py-16">
          <div className="w-32 h-32 bg-gradient-to-br from-yellow-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-16 h-16 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">Chưa có sách nào</h3>
          <p className="text-gray-500 mb-6">Hãy thêm sách đầu tiên để bắt đầu!</p>
          <button
            onClick={openCreateModal}
            className="bg-gradient-to-r from-yellow-400 to-pink-400 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Thêm sách đầu tiên
          </button>
        </div>
      )}
      {/* Books grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {pagedBooks.map((book, idx) => (
          <div
            key={book.id}
            className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20 overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${gradientColors[idx % gradientColors.length][0]}15, ${gradientColors[idx % gradientColors.length][1]}15)`
            }}
          >
            {/* Animated border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400 via-pink-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            {/* Book info */}
            <div className="text-center mb-6">
              <div className="relative inline-block mb-4">
                <Image
                  src={book.img || DEFAULT_IMG}
                  alt={book.title}
                  width={96}
                  height={128}
                  className="w-24 h-32 rounded-xl object-cover border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                  style={{ background: '#f3f3f3' }}
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-yellow-600 transition-colors">
                {book.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                {book.description || 'Chưa có mô tả'}
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-4">
                {book.author && (
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {book.author}
                  </div>
                )}
                {book.publishYear && (
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    {book.publishYear}
                  </div>
                )}
              </div>
              <div className="flex flex-wrap justify-center gap-1 mb-4">
                {book.category && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                    {book.category}
                  </span>
                )}
              </div>
            </div>
            {/* Action buttons */}
            <div className="flex gap-2">
              <Link
                href={`/Books/${book.id}`}
                className="flex-1 bg-gradient-to-r from-yellow-400 to-pink-400 text-white font-semibold py-2 px-4 rounded-xl text-center hover:from-pink-400 hover:to-yellow-400 transition-all duration-300 hover:shadow-lg"
              >
                Xem chi tiết
              </Link>
              <button
                onClick={() => openEditModal(book)}
                className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                title="Sửa sách"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              <button
                onClick={() => handleDelete(book.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                title="Xóa sách"
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
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {modalType === 'create' ? 'Thêm sách mới' : 'Chỉnh sửa sách'}
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
                    Tên sách *
                  </label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    placeholder="Nhập tên sách"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tác giả
                  </label>
                  <input
                    name="author"
                    value={form.author}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    placeholder="Nhập tên tác giả"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Giá (VND)
                  </label>
                  <input
                    name="price"
                    value={form.price}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    placeholder="Nhập giá"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ảnh bìa (URL)
                  </label>
                  <input
                    name="img"
                    value={form.img}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    placeholder="https://example.com/book.jpg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Đánh giá (0-5)
                  </label>
                  <input
                    name="rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={form.rating}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mô tả
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all resize-none"
                    rows="3"
                    placeholder="Mô tả ngắn về sách"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Thể loại
                  </label>
                  <input
                    name="category"
                    value={form.category}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    placeholder="Thể loại sách"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Số trang
                    </label>
                    <input
                      name="pages"
                      value={form.pages}
                      onChange={handleFormChange}
                      type="number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ngôn ngữ
                  </label>
                  <input
                    name="language"
                    value={form.language}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    placeholder="Tiếng Việt"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ISBN
                  </label>
                  <input
                    name="isbn"
                    value={form.isbn}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    placeholder="Mã ISBN"
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
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-400 to-pink-400 text-white rounded-xl hover:from-pink-400 hover:to-yellow-400 transition-all font-semibold"
                  >
                    {modalType === 'create' ? 'Thêm sách' : 'Cập nhật'}
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