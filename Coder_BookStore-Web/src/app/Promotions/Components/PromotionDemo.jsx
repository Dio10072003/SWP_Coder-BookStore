'use client';
import React, { useEffect, useState } from 'react';
import promotionService from '../../services/promotionService';

export default function PromotionDemo({ onChange }) {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDiscount, setNewDiscount] = useState(0);
  const [newDesc, setNewDesc] = useState('');
  const [newImage, setNewImage] = useState('');
  const [message, setMessage] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [selectedPromo, setSelectedPromo] = useState(null);

  useEffect(() => { fetchList(); }, []);
  useEffect(() => {
    if (message) {
      const t = setTimeout(() => { setMessage(''); }, 2000);
      return () => clearTimeout(t);
    }
  }, [message]);

  // Always update form fields when selectedId or promotions change
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
      setNewTitle(''); setNewDesc(''); setNewDiscount(0); setNewImage('');
    }
  }, [selectedId, promotions]);

  const fetchList = async () => {
    setLoading(true);
    try {
      setPromotions(await promotionService.getAllPromotions());
    } catch (e) {}
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
        await fetchList();
        if (onChange) onChange();
        // Update form fields with latest data
        const updated = promotions.find(p => p.id === selectedId);
        if (updated) {
          setNewTitle(updated.title || '');
          setNewDesc(updated.description || '');
          setNewDiscount(updated.discount || 0);
          setNewImage(updated.image || '');
        }
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
        setSelectedId('');
        setNewTitle(''); setNewDesc(''); setNewDiscount(0); setNewImage('');
        await fetchList();
        if (onChange) onChange();
      }
    } catch (e) {}
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
      await fetchList();
      if (onChange) onChange();
    } catch (e) {}
    setActionLoading(false);
  };

  return (
    <div className="w-full px-2 sm:px-4 md:px-8 lg:max-w-2xl lg:mx-auto p-6 bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl mt-8 border border-pink-200">
      <h2 className="text-2xl font-extrabold mb-6 text-pink-500 tracking-tight text-center drop-shadow">Demo Promotion CRUD</h2>
      {message && <div className="mb-4 text-green-600 font-bold text-center animate-fade-in">{message}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
        <label className="flex flex-col gap-1 font-semibold text-gray-700">
          Tiêu đề
          <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Tiêu đề" className="rounded-full px-5 py-3 border-2 border-transparent focus:border-pink-400 bg-white/90 shadow focus:ring-2 focus:ring-pink-200 text-base font-semibold transition-all" required />
        </label>
        <label className="flex flex-col gap-1 font-semibold text-gray-700">
          Mô tả
          <input value={newDesc} onChange={e => setNewDesc(e.target.value)} placeholder="Mô tả" className="rounded-full px-5 py-3 border-2 border-transparent focus:border-pink-400 bg-white/90 shadow focus:ring-2 focus:ring-pink-200 text-base font-semibold transition-all" />
        </label>
        <label className="flex flex-col gap-1 font-semibold text-gray-700">
          Discount (%)
          <input value={newDiscount} onChange={e => setNewDiscount(e.target.value)} type="number" placeholder="Discount (%)" className="rounded-full px-5 py-3 border-2 border-transparent focus:border-pink-400 bg-white/90 shadow focus:ring-2 focus:ring-pink-200 text-base font-semibold transition-all" required />
        </label>
        <label className="flex flex-col gap-1 font-semibold text-gray-700">
          Image URL
          <input value={newImage} onChange={e => setNewImage(e.target.value)} placeholder="Image URL" className="rounded-full px-5 py-3 border-2 border-transparent focus:border-pink-400 bg-white/90 shadow focus:ring-2 focus:ring-pink-200 text-base font-semibold transition-all" />
        </label>
        <button type="submit" className="bg-gradient-to-r from-pink-400 to-yellow-400 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-all text-lg disabled:opacity-60" disabled={actionLoading}>
          {actionLoading ? 'Đang xử lý...' : (selectedId ? 'Cập nhật' : 'Tạo mới')}
        </button>
      </form>
      <div className="mb-4">
        <label className="block mb-2 font-semibold text-gray-700">Chọn promotion để thao tác:</label>
        <select
          value={selectedId}
          onChange={e => setSelectedId(e.target.value)}
          className="rounded-full px-5 py-3 border-2 border-pink-200 bg-white/90 shadow w-full text-base font-semibold focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition-all"
        >
          <option value="">-- Chọn promotion --</option>
          {promotions.map(promo => (
            <option key={promo.id} value={promo.id} className="text-base">
              {promo.title} - {promo.discount}%
            </option>
          ))}
        </select>
      </div>
      {selectedPromo && (
        <div className="flex gap-4 justify-center mt-4">
          <button onClick={handleDelete} className="bg-red-500 px-6 py-3 rounded-full text-white font-bold shadow hover:bg-red-600 transition-all text-base disabled:opacity-60" disabled={actionLoading}>Xóa</button>
        </div>
      )}
      <style jsx>{`
        .animate-fade-in { animation: fade-in 0.7s ease both; }
        @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
      `}</style>
    </div>
  );
} 