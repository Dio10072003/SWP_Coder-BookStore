'use client';
import React, { useState } from 'react';
import { FaBoxOpen, FaClipboardList, FaTruck, FaCheckCircle, FaSearch, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import OrderStep from './Components/OrderStep.jsx';
import OrderOverview from './Components/OrderOverview.jsx';
import OrderTimeline from './Components/OrderTimeline.jsx';
import OrderSupport from './Components/OrderSupport.jsx';
import OrderRating from './Components/OrderRating.jsx';

const statusSteps = [
  { key: 'ordered', label: 'Đã đặt hàng', icon: <FaClipboardList />, color: 'text-blue-500', desc: 'Đơn hàng của bạn đã được ghi nhận.' },
  { key: 'processing', label: 'Đang xử lý', icon: <FaBoxOpen />, color: 'text-yellow-500', desc: 'Chúng tôi đang chuẩn bị đơn hàng cho bạn.' },
  { key: 'shipping', label: 'Đang giao', icon: <FaTruck />, color: 'text-purple-500', desc: 'Đơn hàng đang trên đường đến bạn.' },
  { key: 'delivered', label: 'Đã giao', icon: <FaCheckCircle />, color: 'text-green-500', desc: 'Bạn đã nhận được đơn hàng.' },
];

function getStepIndex(status) {
  return statusSteps.findIndex(s => s.key === status);
}

export default function OrderTrackingPage() {
  const [orderCode, setOrderCode] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [trackings, setTrackings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // Để demo, có thể thay bằng logic thực tế
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ order_code: '', status: 'ordered', location: '', note: '' });
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setTrackings([]);
    fetch(`/api/order-tracking?order_code=${orderCode}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          // Sắp xếp theo updated_at giảm dần
          setTrackings(data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)));
        } else {
          setError('Không tìm thấy đơn hàng này!');
        }
        setLoading(false);
        setSubmitted(true);
      })
      .catch(() => {
        setError('Lỗi tra cứu đơn hàng');
        setLoading(false);
      });
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `/api/order-tracking/${editingId}` : '/api/order-tracking';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Lỗi');
      setShowForm(false);
      setEditingId(null);
      setForm({ order_code: '', status: 'ordered', location: '', note: '' });
      setTrackings([data, ...trackings]);
      setOrderCode(data.order_code);
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (tracking) => {
    setForm({
      order_code: tracking.order_code,
      status: tracking.status,
      location: tracking.location || '',
      note: tracking.note || '',
    });
    setEditingId(tracking.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn chắc chắn muốn xóa tracking này?')) return;
    setLoading(true);
    await fetch(`/api/order-tracking/${id}`, { method: 'DELETE' });
    setLoading(false);
    setTrackings(trackings.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-green-50 py-12 px-4 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-cyan-700 drop-shadow">Tra cứu đơn hàng</h1>
      <p className="text-center text-lg text-gray-600 mb-10 max-w-xl">Nhập mã đơn hàng để kiểm tra trạng thái giao dịch và vận chuyển của bạn tại Coder-BookStore.</p>
      {showForm ? (
        <form onSubmit={handleFormSubmit} className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 mb-8 flex flex-col gap-4">
          <h2 className="text-2xl font-bold mb-2 text-cyan-700">{editingId ? 'Sửa tracking' : 'Tạo tracking mới'}</h2>
          <input
            type="text"
            placeholder="Mã đơn hàng"
            value={form.order_code}
            onChange={e => setForm(f => ({ ...f, order_code: e.target.value }))}
            className="px-4 py-2 rounded border border-cyan-300"
            required
            disabled={!!editingId}
          />
          <select
            value={form.status}
            onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
            className="px-4 py-2 rounded border border-cyan-300"
            required
          >
            {statusSteps.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
          </select>
          <input
            type="text"
            placeholder="Vị trí hiện tại (nếu có)"
            value={form.location}
            onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
            className="px-4 py-2 rounded border border-cyan-300"
          />
          <textarea
            placeholder="Ghi chú (nếu có)"
            value={form.note}
            onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
            className="px-4 py-2 rounded border border-cyan-300"
          />
          <div className="flex gap-3 mt-2">
            <button type="submit" className="px-6 py-2 bg-cyan-600 text-white rounded font-semibold hover:bg-cyan-700 transition-all flex items-center gap-2">
              {editingId ? <FaEdit /> : <FaPlus />} {editingId ? 'Cập nhật' : 'Tạo mới'}
            </button>
            <button type="button" className="px-6 py-2 bg-gray-200 text-cyan-700 rounded font-semibold hover:bg-gray-300 transition-all" onClick={() => { setShowForm(false); setEditingId(null); }}>Hủy</button>
          </div>
        </form>
      ) : !submitted ? (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4 mb-12 w-full max-w-lg">
          <input
            type="text"
            placeholder="Nhập mã đơn hàng..."
            value={orderCode}
            onChange={e => setOrderCode(e.target.value)}
            className="flex-1 px-5 py-3 rounded-xl border-2 border-cyan-200 focus:border-cyan-500 outline-none text-lg shadow"
            required
          />
          <button type="submit" className="flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white rounded-xl font-semibold shadow hover:bg-cyan-700 transition-all">
            <FaSearch />
            Tra cứu
          </button>
          {isAdmin && (
            <button type="button" className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl font-semibold shadow hover:bg-green-600 transition-all" onClick={() => { setShowForm(true); setEditingId(null); setForm({ order_code: '', status: 'ordered', location: '', note: '' }); }}>
              <FaPlus /> Thêm tracking
            </button>
          )}
        </form>
      ) : (
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-cyan-700">Trạng thái đơn hàng: <span className="text-cyan-900">{orderCode}</span></h2>
          {loading ? <div className="text-center">Đang tải...</div> : error ? <div className="text-center text-red-500">{error}</div> : trackings.length > 0 ? (
            <>
              <OrderOverview tracking={trackings[0]} />
              <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-6">
                {statusSteps.map((step, idx) => (
                  <OrderStep
                    key={step.key}
                    icon={step.icon}
                    label={step.label}
                    desc={step.desc}
                    color={step.color}
                    active={idx <= getStepIndex(trackings[0].status)}
                    isLast={idx === statusSteps.length - 1}
                  />
                ))}
              </div>
              <OrderTimeline trackings={trackings} />
              <OrderRating tracking={trackings[0]} />
              <OrderSupport />
              <h3 className="mt-8 mb-2 text-lg font-bold text-cyan-700">Lịch sử trạng thái (bảng)</h3>
              <ul className="divide-y divide-cyan-100">
                {trackings.map((t, idx) => (
                  <li key={t.id} className="py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <span className="font-semibold text-cyan-800">{statusSteps.find(s => s.key === t.status)?.label || t.status}</span>
                    <span className="text-gray-500 text-sm">{t.location}</span>
                    <span className="text-gray-400 text-xs">{new Date(t.updated_at).toLocaleString()}</span>
                    {isAdmin && (
                      <span className="flex gap-2">
                        <button className="px-3 py-1 bg-yellow-400 text-white rounded font-semibold hover:bg-yellow-500 flex items-center gap-1" onClick={() => handleEdit(t)}><FaEdit /></button>
                        <button className="px-3 py-1 bg-red-500 text-white rounded font-semibold hover:bg-red-600 flex items-center gap-1" onClick={() => handleDelete(t.id)}><FaTrash /></button>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          <button
            className="mt-8 px-6 py-2 bg-gray-100 text-cyan-700 rounded-lg font-semibold hover:bg-gray-200 transition-all"
            onClick={() => { setSubmitted(false); setOrderCode(''); setTrackings([]); setError(null); }}
          >
            Tra cứu đơn khác
          </button>
        </div>
      )}
    </div>
  );
} 