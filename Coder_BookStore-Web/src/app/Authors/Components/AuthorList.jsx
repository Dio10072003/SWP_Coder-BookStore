'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { authorService } from '../../services/authorService';

const DEFAULT_AVATAR = 'https://randomuser.me/api/portraits/lego/1.jpg';
const PAGE_SIZE = 3;

const emptyAuthor = {
  name: '',
  bio: '',
  avatar: '',
  country: '',
  birth_year: '',
  genres: '',
};

const gradientColors = [
  ['#a78bfa', '#f472b6'], // tím-hồng
  ['#f59e42', '#f43f5e'], // cam-hồng
  ['#22d3ee', '#2563eb'], // xanh biển
  ['#facc15', '#f472b6'], // vàng-hồng
  ['#34d399', '#3b82f6'], // xanh lá-xanh dương
  ['#f87171', '#fbbf24'], // đỏ-cam
  ['#a3e635', '#06b6d4'], // xanh lá-xanh ngọc
  ['#f472b6', '#6366f1'], // hồng-tím
];
const borderColors = [
  '#a21caf', '#f43f5e', '#2563eb', '#facc15', '#34d399', '#f87171', '#a3e635', '#f472b6',
];

export default function AuthorList() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create'); // 'create' | 'edit'
  const [form, setForm] = useState(emptyAuthor);
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchAuthors = () => {
    setLoading(true);
    authorService.getAllAuthors()
      .then(setAuthors)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
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
        setSuccessMsg('Đã thêm tác giả!');
      } else if (modalType === 'edit' && editingId) {
        await authorService.updateAuthor(editingId, payload);
        setSuccessMsg('Đã cập nhật tác giả!');
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
      setSuccessMsg('Đã xóa tác giả!');
      fetchAuthors();
    } catch (err) {
      setFormError(err.message || 'Lỗi không xác định');
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) return <div className="text-center py-8">Đang tải danh sách tác giả...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;

  const totalPages = Math.ceil(authors.length / PAGE_SIZE);
  const pagedAuthors = authors.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section className="py-8 px-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-700">Danh sách tác giả</h1>
        <button onClick={openCreateModal} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-2 px-6 rounded-full shadow-lg transition">+ Thêm tác giả</button>
      </div>
      {successMsg && <div className="text-green-600 mb-2">{successMsg}</div>}
      {formError && <div className="text-red-500 mb-2">{formError}</div>}
      {authors.length === 0 && <div className="text-center text-gray-500 py-12 text-lg">Chưa có tác giả nào.</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {pagedAuthors.map((author, idx) => (
          <div
            key={author.id}
            className="relative rounded-3xl shadow-xl p-7 flex flex-col items-center border-4 font-bold transition-transform duration-200 hover:scale-105 hover:shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${gradientColors[idx % gradientColors.length][0]}, ${gradientColors[idx % gradientColors.length][1]})`,
              borderColor: borderColors[idx % borderColors.length],
              color: '#fff',
            }}
          >
            <img src={author.avatar || DEFAULT_AVATAR} alt={author.name} className="w-28 h-28 rounded-full mb-4 object-cover border-4 border-white shadow-lg group-hover:scale-105 transition" />
            <h2 className="text-xl font-semibold mb-1 text-white drop-shadow-lg">{author.name}</h2>
            <p className="text-white text-center mb-1 line-clamp-2 h-10 opacity-90">{author.bio}</p>
            <div className="text-white text-sm mb-1 opacity-80">{author.country} {author.birth_year ? `(${author.birth_year})` : ''}</div>
            <div className="text-xs text-yellow-200 mb-2">{Array.isArray(author.genres) ? author.genres.join(', ') : ''}</div>
            <div className="flex gap-2 mt-2">
              <button onClick={() => openEditModal(author)} className="bg-white text-purple-700 font-bold px-3 py-1 rounded hover:bg-yellow-300 hover:text-purple-900 transition-colors shadow border-2 border-white">Sửa</button>
              <button onClick={() => handleDelete(author.id)} className="bg-white text-red-600 font-bold px-3 py-1 rounded hover:bg-red-400 hover:text-white transition-colors shadow border-2 border-white" disabled={deleteLoading}>Xóa</button>
            </div>
          </div>
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
      {/* Modal thêm/sửa tác giả */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form onSubmit={handleFormSubmit} className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <h2 className="text-xl font-bold mb-4">{modalType === 'create' ? 'Thêm tác giả' : 'Sửa tác giả'}</h2>
            <label className="block mb-2">Tên tác giả
              <input name="name" value={form.name} onChange={handleFormChange} className="w-full border rounded px-3 py-2 mb-2" required />
            </label>
            <label className="block mb-2">Tiểu sử
              <textarea name="bio" value={form.bio} onChange={handleFormChange} className="w-full border rounded px-3 py-2 mb-2" />
            </label>
            <label className="block mb-2">Avatar (URL)
              <input name="avatar" value={form.avatar} onChange={handleFormChange} className="w-full border rounded px-3 py-2 mb-2" />
            </label>
            <label className="block mb-2">Quốc gia
              <input name="country" value={form.country} onChange={handleFormChange} className="w-full border rounded px-3 py-2 mb-2" />
            </label>
            <label className="block mb-2">Năm sinh
              <input name="birth_year" value={form.birth_year} onChange={handleFormChange} className="w-full border rounded px-3 py-2 mb-2" type="number" />
            </label>
            <label className="block mb-2">Thể loại (phân cách bằng dấu phẩy)
              <input name="genres" value={form.genres} onChange={handleFormChange} className="w-full border rounded px-3 py-2 mb-2" />
            </label>
            <div className="flex justify-end gap-2 mt-4">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Hủy</button>
              <button type="submit" className="px-4 py-2 rounded bg-purple-500 hover:bg-purple-600 text-white font-bold">Lưu</button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
} 