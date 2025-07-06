import CategoryCard from './CategoryCard.jsx';
import React, { useEffect, useState } from 'react';
import { categoryService } from '../../services/categoryService';

const emptyCategory = { name: '', description: '' };

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create'); // 'create' | 'edit'
  const [form, setForm] = useState(emptyCategory);
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchCategories = () => {
    setLoading(true);
    categoryService.getAllCategories()
      .then(data => setCategories(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openCreateModal = () => {
    setForm(emptyCategory);
    setModalType('create');
    setShowModal(true);
    setEditingId(null);
    setFormError(null);
  };

  const openEditModal = (cat) => {
    setForm({ name: cat.name || '', description: cat.description || '' });
    setModalType('edit');
    setShowModal(true);
    setEditingId(cat.id);
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
      if (modalType === 'create') {
        await categoryService.createCategory(form);
        setSuccessMsg('Đã thêm thể loại!');
      } else if (modalType === 'edit' && editingId) {
        await categoryService.updateCategory(editingId, form);
        setSuccessMsg('Đã cập nhật thể loại!');
      }
      setShowModal(false);
      fetchCategories();
    } catch (err) {
      setFormError(err.message || 'Lỗi không xác định');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa thể loại này?')) return;
    setDeleteLoading(true);
    try {
      await categoryService.deleteCategory(id);
      setSuccessMsg('Đã xóa thể loại!');
      fetchCategories();
    } catch (err) {
      setFormError(err.message || 'Lỗi không xác định');
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) return <div className="text-center py-8 text-lg">Đang tải thể loại...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Lỗi: {error}</div>;

  return (
    <section className="py-8 px-4 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Danh sách thể loại</h1>
        <button onClick={openCreateModal} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">+ Thêm thể loại</button>
      </div>
      {successMsg && <div className="text-green-600 mb-2">{successMsg}</div>}
      {formError && <div className="text-red-500 mb-2">{formError}</div>}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <li key={cat.id} className="relative group">
            <CategoryCard category={cat} />
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition z-10">
              <button onClick={() => openEditModal(cat)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded text-xs">Sửa</button>
              <button onClick={() => handleDelete(cat.id)} className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs" disabled={deleteLoading}>Xóa</button>
            </div>
          </li>
        ))}
      </ul>
      {/* Modal thêm/sửa thể loại */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form onSubmit={handleFormSubmit} className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <h2 className="text-xl font-bold mb-4">{modalType === 'create' ? 'Thêm thể loại' : 'Sửa thể loại'}</h2>
            <label className="block mb-2">Tên thể loại
              <input name="name" value={form.name} onChange={handleFormChange} className="w-full border rounded px-3 py-2 mb-2" required />
            </label>
            <label className="block mb-2">Mô tả
              <textarea name="description" value={form.description} onChange={handleFormChange} className="w-full border rounded px-3 py-2 mb-2" />
            </label>
            <div className="flex justify-end gap-2 mt-4">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Hủy</button>
              <button type="submit" className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white font-bold">Lưu</button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
} 