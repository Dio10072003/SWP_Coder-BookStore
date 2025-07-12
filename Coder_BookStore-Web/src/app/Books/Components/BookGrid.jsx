import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaStar, FaStarHalfAlt, FaBookOpen, FaCrown, FaCalendarAlt, FaFileAlt } from 'react-icons/fa';
import { bookService } from '../../services/bookService';
import { addToCartLocal } from '../../utils/cartUtils';

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
  ['#6366f1', '#a21caf'], // tím xanh
  ['#f59e42', '#f43f5e'], // cam hồng
  ['#22d3ee', '#2563eb'], // xanh biển
  ['#facc15', '#f472b6'], // vàng hồng
  ['#34d399', '#3b82f6'], // xanh lá-xanh dương
  ['#f87171', '#fbbf24'], // đỏ cam
  ['#a3e635', '#06b6d4'], // xanh lá-xanh ngọc
  ['#f472b6', '#6366f1'], // hồng tím
];
const borderColors = [
  '#a21caf', '#f43f5e', '#2563eb', '#facc15', '#34d399', '#f87171', '#a3e635', '#f472b6',
];

const BookGrid = ({ books = [] }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create');
  const [form, setForm] = useState(emptyBook);
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

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
      if (modalType === 'create') {
        await bookService.createBook(form);
        setSuccessMsg('Đã thêm sách!');
      } else if (modalType === 'edit' && editingId) {
        await bookService.updateBook(editingId, form);
        setSuccessMsg('Đã cập nhật sách!');
      }
      setShowModal(false);
    } catch (err) {
      setFormError(err.message || 'Lỗi không xác định');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa sách này?')) return;
    setDeleteLoading(true);
    try {
      await bookService.deleteBook(id);
      setSuccessMsg('Đã xóa sách!');
    } catch (err) {
      setFormError(err.message || 'Lỗi không xác định');
    } finally {
      setDeleteLoading(false);
    }
  };

  const renderStars = (rating) => {
    if (!rating) return null;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
    }
    while (stars.length < 5) {
      stars.push(<FaStar key={`empty-${stars.length}`} className="text-gray-300" />);
    }
    return <div className="flex items-center gap-1">{stars}</div>;
  };

  if (!books || books.length === 0) {
    return <div className="text-center py-10 text-yellow-400 text-lg">Không tìm thấy sách nào.</div>;
  }

  return (
    <section className="py-10 px-4 max-w-7xl mx-auto">
      <div className="flex justify-center items-center mb-6">
        <h1 className="text-3xl font-bold text-pink-600">Danh sách sách</h1>
      </div>
      {successMsg && <div className="text-green-600 mb-2">{successMsg}</div>}
      {formError && <div className="text-red-500 mb-2">{formError}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {books.map((book, idx) => (
          <div
            key={book.id}
            className="rounded-2xl shadow-xl p-6 flex flex-col items-center border-4 font-bold transition-transform duration-200 hover:scale-105 hover:shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${gradientColors[idx % gradientColors.length][0]}, ${gradientColors[idx % gradientColors.length][1]})`,
              borderColor: borderColors[idx % borderColors.length],
              color: '#fff',
            }}
          >
            <img
              src={book.img || 'https://placehold.co/120x180?text=No+Image'}
              alt={book.title}
              className="w-28 h-40 object-cover rounded-lg mb-4 border-2 border-white shadow"
            />
            <div className="text-lg mb-1 truncate w-full text-center" title={book.title}>{book.title}</div>
            <div className="text-sm mb-2 w-full text-center" style={{ color: '#facc15', fontWeight: 600 }}>by {book.author}</div>
            <div className="flex gap-2 mb-2">
              <span className="bg-white bg-opacity-20 px-2 py-1 rounded text-xs">{book.category}</span>
              <span className="bg-white bg-opacity-20 px-2 py-1 rounded text-xs">{book.publishYear}</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-yellow-300">★</span>
              <span>{book.rating || 0}</span>
            </div>
            <div className="mb-4 text-lg">{book.price}₫</div>
            <a
              href={`/Books/${book.id}`}
              className="mt-auto px-4 py-2 rounded-lg font-bold bg-white text-indigo-700 hover:bg-yellow-400 hover:text-indigo-900 transition-colors shadow border-2 border-white"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
            >
              Xem chi tiết
            </a>
            <AddToCartButton book={book} />
          </div>
        ))}
      </div>
      {/* Modal thêm/sửa sách */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form onSubmit={handleFormSubmit} className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <h2 className="text-xl font-bold mb-4">{modalType === 'create' ? 'Thêm sách' : 'Sửa sách'}</h2>
            <label className="block mb-2">Tên sách
              <input name="title" value={form.title} onChange={handleFormChange} className="w-full border rounded px-3 py-2 mb-2" required />
            </label>
            <label className="block mb-2">Tác giả
              <input name="author" value={form.author} onChange={handleFormChange} className="w-full border rounded px-3 py-2 mb-2" required />
            </label>
            <label className="block mb-2">Giá (VND)
              <input name="price" value={form.price} onChange={handleFormChange} className="w-full border rounded px-3 py-2 mb-2" required />
            </label>
            <label className="block mb-2">Ảnh bìa (URL)
              <input name="img" value={form.img} onChange={handleFormChange} className="w-full border rounded px-3 py-2 mb-2" />
            </label>
            <label className="block mb-2">Đánh giá (0-5)
              <input name="rating" type="number" min="0" max="5" step="0.1" value={form.rating} onChange={handleFormChange} className="w-full border rounded px-3 py-2 mb-2" />
            </label>
            <label className="block mb-2">Mô tả
              <textarea name="description" value={form.description} onChange={handleFormChange} className="w-full border rounded px-3 py-2 mb-2" />
            </label>
            <label className="block mb-2">Thể loại
              <input name="category" value={form.category} onChange={handleFormChange} className="w-full border rounded px-3 py-2 mb-2" required />
            </label>
            <label className="block mb-2">Năm xuất bản
              <input name="publishYear" type="number" value={form.publishYear} onChange={handleFormChange} className="w-full border rounded px-3 py-2 mb-2" />
            </label>
            <label className="block mb-2">Số trang
              <input name="pages" type="number" value={form.pages} onChange={handleFormChange} className="w-full border rounded px-3 py-2 mb-2" />
            </label>
            <label className="block mb-2">Ngôn ngữ
              <input name="language" value={form.language} onChange={handleFormChange} className="w-full border rounded px-3 py-2 mb-2" />
            </label>
            <label className="block mb-2">ISBN
              <input name="isbn" value={form.isbn} onChange={handleFormChange} className="w-full border rounded px-3 py-2 mb-2" />
            </label>
            <div className="flex justify-end gap-2 mt-4">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Hủy</button>
              <button type="submit" className="px-4 py-2 rounded bg-pink-500 hover:bg-pink-600 text-white font-bold">Lưu</button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

function AddToCartButton({ book }) {
  const [added, setAdded] = useState(false);
  const handleAdd = () => {
    addToCartLocal(book);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };
  return (
    <div className="relative mt-2">
      <button
        onClick={handleAdd}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
      >
        Thêm vào giỏ hàng
      </button>
      {added && (
        <span className="absolute left-1/2 -translate-x-1/2 top-[-36px] bg-green-500 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1 shadow animate-bounce">
          Đã thêm!
        </span>
      )}
    </div>
  );
}

export default BookGrid;