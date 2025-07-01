'use client';
import React, { useEffect, useState } from 'react';
import promotionService from '../../services/promotionService';

export default function PromotionDemo() {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDiscount, setNewDiscount] = useState(0);
  const [newDesc, setNewDesc] = useState('');
  const [newImage, setNewImage] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [selectedPromo, setSelectedPromo] = useState(null);

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    if (message || error) {
      const t = setTimeout(() => { setMessage(''); setError(''); }, 2000);
      return () => clearTimeout(t);
    }
  }, [message, error]);

  useEffect(() => {
    if (selectedId) {
      const promo = promotions.find(p => p.id === selectedId);
      setSelectedPromo(promo || null);
      if (promo) {
        setNewTitle(promo.title || '');
        setNewDesc(promo.description || '');
        setNewDiscount(promo.discount || 0);
        setNewImage(promo.image || '');
      }
    } else {
      setSelectedPromo(null);
      setNewTitle('');
      setNewDesc('');
      setNewDiscount(0);
      setNewImage('');
    }
  }, [selectedId, promotions]);

  const fetchList = async () => {
    setLoading(true);
    try {
      setPromotions(await promotionService.getAllPromotions());
    } catch (e) {
      setError('Không thể tải danh sách!');
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      if (selectedId) {
        await promotionService.updatePromotion(selectedId, {
          title: newTitle,
          description: newDesc,
          discount: Number(newDiscount),
          image: newImage
        });
        setMessage('Đã cập nhật promotion!');
      } else {
        await promotionService.createPromotion({
          title: newTitle,
          description: newDesc,
          discount: Number(newDiscount),
          start_date: '2024-07-01',
          end_date: '2024-07-31',
          image: newImage
        });
        setMessage('Tạo mới thành công!');
      }
      setSelectedId('');
      setNewTitle(''); setNewDesc(''); setNewDiscount(0); setNewImage('');
      fetchList();
    } catch (e) {
      setError(selectedId ? 'Có lỗi khi cập nhật!' : 'Có lỗi khi tạo mới!');
    }
    setActionLoading(false);
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    if (!window.confirm('Bạn có chắc chắn muốn xóa?')) return;
    setActionLoading(true);
    try {
      await promotionService.deletePromotion(selectedId);
      setMessage('Đã xóa promotion!');
      setSelectedId('');
      setNewTitle(''); setNewDesc(''); setNewDiscount(0); setNewImage('');
      fetchList();
    } catch (e) {
      setError('Có lỗi khi xóa!');
    }
    setActionLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-xl shadow mt-8">
      <h2 className="text-xl font-bold mb-4">Demo Promotion CRUD</h2>
      {message && <div className="mb-2 text-green-600 font-bold animate-pulse">{message}</div>}
      {error && <div className="mb-2 text-red-500 font-bold animate-pulse">{error}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6">
        <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Tiêu đề" className="border p-2 rounded" required />
        <input value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="Mô tả" className="border p-2 rounded" />
        <input value={newDiscount} onChange={e => setNewDiscount(e.target.value)} type="number" placeholder="Discount (%)" className="border p-2 rounded" required />
        <input value={newImage} onChange={e => setNewImage(e.target.value)} placeholder="Image URL" className="border p-2 rounded" />
        <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded disabled:opacity-60" disabled={actionLoading}>
          {actionLoading ? 'Đang xử lý...' : (selectedId ? 'Cập nhật' : 'Tạo mới')}
        </button>
      </form>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Chọn promotion để thao tác:</label>
        <select
          value={selectedId}
          onChange={e => setSelectedId(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">-- Chọn promotion --</option>
          {promotions.map(promo => (
            <option key={promo.id} value={promo.id}>
              {promo.title} - {promo.discount}%
            </option>
          ))}
        </select>
      </div>
      {selectedPromo && (
        <div className="flex gap-4 justify-center mt-4">
          <button onClick={handleDelete} className="bg-red-500 px-5 py-2 rounded text-white font-bold disabled:opacity-60" disabled={actionLoading}>Xóa</button>
        </div>
      )}
    </div>
  );
} 