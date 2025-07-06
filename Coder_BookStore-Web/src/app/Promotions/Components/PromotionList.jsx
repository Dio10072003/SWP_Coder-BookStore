'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import promotionService from '../../services/promotionService';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=facearea&w=600&h=350';
const emptyPromo = {
  title: '',
  description: '',
  discount: 0,
  start_date: '',
  end_date: '',
  image: '',
};

const PromotionList = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create');
  const [form, setForm] = useState(emptyPromo);
  const [editingId, setEditingId] = useState(null);
  const [formError, setFormError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchPromotions = () => {
    setLoading(true);
    promotionService.getAllPromotions()
      .then(setPromotions)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  const openCreateModal = () => {
    setForm(emptyPromo);
    setModalType('create');
    setShowModal(true);
    setEditingId(null);
    setFormError(null);
  };

  const openEditModal = (promo) => {
    setForm({
      title: promo.title || '',
      description: promo.description || '',
      discount: promo.discount || 0,
      start_date: promo.start_date || '',
      end_date: promo.end_date || '',
      image: promo.image || '',
    });
    setModalType('edit');
    setShowModal(true);
    setEditingId(promo.id);
    setFormError(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: name === 'discount' ? Number(value) : value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    try {
      if (modalType === 'create') {
        await fetch('/api/promotions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        }).then(res => {
          if (!res.ok) throw new Error('Lỗi khi tạo khuyến mãi');
          return res.json();
        });
        setSuccessMsg('Đã thêm khuyến mãi!');
      } else if (modalType === 'edit' && editingId) {
        await fetch(`/api/promotions/${editingId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        }).then(res => {
          if (!res.ok) throw new Error('Lỗi khi cập nhật khuyến mãi');
          return res.json();
        });
        setSuccessMsg('Đã cập nhật khuyến mãi!');
      }
      setShowModal(false);
      fetchPromotions();
    } catch (err) {
      setFormError(err.message || 'Lỗi không xác định');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa khuyến mãi này?')) return;
    setDeleteLoading(true);
    try {
      await fetch(`/api/promotions/${id}`, { method: 'DELETE' })
        .then(res => {
          if (!res.ok) throw new Error('Lỗi khi xóa khuyến mãi');
          return res.json();
        });
      setSuccessMsg('Đã xóa khuyến mãi!');
      fetchPromotions();
    } catch (err) {
      setFormError(err.message || 'Lỗi không xác định');
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) return <div className="text-center py-10 text-lg">Đang tải khuyến mãi...</div>;
  if (error) return <div className="text-center py-10 text-red-500 font-semibold">Lỗi: {error}</div>;

  return (
    <section className="py-10 px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-pink-600">Danh sách khuyến mãi</h1>
        <button onClick={openCreateModal} className="bg-gradient-to-r from-pink-500 to-yellow-400 hover:from-yellow-400 hover:to-pink-500 text-white font-bold py-2 px-6 rounded-full shadow-lg transition">+ Thêm khuyến mãi</button>
      </div>
      {successMsg && <div className="text-green-600 mb-2">{successMsg}</div>}
      {formError && <div className="text-red-500 mb-2">{formError}</div>}
      {promotions.length === 0 && <div className="text-center text-gray-500 py-12 text-lg">Chưa có khuyến mãi nào.</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {promotions.map((promo) => (
          <div key={promo.id} className="relative bg-white rounded-3xl shadow-xl overflow-hidden group hover:shadow-2xl transition">
            <img
              src={promo.image || DEFAULT_IMAGE}
              alt={promo.title}
              className="w-full h-48 object-cover group-hover:brightness-90 transition"
            />
            <div className="absolute top-4 left-4 bg-pink-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
              {promo.discount > 0 ? `-${promo.discount}%` : 'Freeship'}
            </div>
            <div className="p-6 flex flex-col h-full">
              <h2 className="text-2xl font-bold mb-2 text-pink-600 group-hover:text-yellow-500 transition">{promo.title}</h2>
              <p className="text-gray-700 mb-4 flex-1 line-clamp-2 h-12">{promo.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500 mt-auto mb-2">
                <span>
                  {promo.start_date} - {promo.end_date}
                </span>
              </div>
              <div className="flex gap-2 mt-2">
                <button onClick={() => openEditModal(promo)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">Sửa</button>
                <button onClick={() => handleDelete(promo.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded" disabled={deleteLoading}>Xóa</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Modal thêm/sửa khuyến mãi */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form onSubmit={handleFormSubmit} className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <h2 className="text-xl font-bold mb-4">{modalType === 'create' ? 'Thêm khuyến mãi' : 'Sửa khuyến mãi'}</h2>
            <label className="block mb-2">Tiêu đề
              <input name="title" value={form.title} onChange={handleFormChange} className="w-full border rounded px-3 py-2 mb-2" required />
            </label>
            <label className="block mb-2">Mô tả
              <textarea name="description" value={form.description} onChange={handleFormChange} className="w-full border rounded px-3 py-2 mb-2" />
            </label>
            <label className="block mb-2">Phần trăm giảm giá (%)
              <input name="discount" type="number" value={form.discount} onChange={handleFormChange} className="w-full border rounded px-3 py-2 mb-2" min="0" max="100" required />
            </label>
            <label className="block mb-2">Ngày bắt đầu
              <input name="start_date" type="date" value={form.start_date} onChange={handleFormChange} className="w-full border rounded px-3 py-2 mb-2" required />
            </label>
            <label className="block mb-2">Ngày kết thúc
              <input name="end_date" type="date" value={form.end_date} onChange={handleFormChange} className="w-full border rounded px-3 py-2 mb-2" required />
            </label>
            <label className="block mb-2">Hình ảnh (URL)
              <input name="image" value={form.image} onChange={handleFormChange} className="w-full border rounded px-3 py-2 mb-2" />
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

export default PromotionList; 