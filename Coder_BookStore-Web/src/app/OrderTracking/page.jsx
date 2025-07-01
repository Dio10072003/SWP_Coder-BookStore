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
  // Use a more robust findIndex that accounts for status variations or keys
  return statusSteps.findIndex(s => s.key === status);
}

export default function OrderTrackingPage() {
  const [orderCode, setOrderCode] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [trackings, setTrackings] = useState([]); // Array to hold all tracking updates for an order
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // Set to true for admin view, false for user view
  const [showForm, setShowForm] = useState(false); // To toggle create/edit form
  const [form, setForm] = useState({ order_code: '', status: 'ordered', location: '', note: '' });
  const [editingId, setEditingId] = useState(null); // ID of the tracking entry being edited

  // Handles submitting the order code for tracking
  const handleSubmit = async e => {
    e.preventDefault();
    if (!orderCode.trim()) {
      setError('Vui lòng nhập mã đơn hàng.');
      return;
    }

    setLoading(true);
    setError(null);
    setTrackings([]); // Clear previous tracking data

    try {
      const res = await fetch(`/api/order-tracking?order_code=${orderCode.trim()}`);
      const data = await res.json();

      if (!res.ok) {
        // If the server returns an error (e.g., 404 Not Found)
        throw new Error(data.error || 'Không tìm thấy đơn, kiểm tra lại mã nhé! Hoặc đơn hàng đã đi lạc sang vũ trụ khác 🚀');
      }

      if (Array.isArray(data) && data.length > 0) {
        // Sort tracking entries by updated_at in descending order
        setTrackings(data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)));
      } else {
        setError('Không tìm thấy thông tin theo dõi cho đơn hàng này.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setSubmitted(true); // Set submitted to true regardless of success or failure to show results/error
    }
  };

  // Handles submitting the form for creating or updating a tracking entry (Admin function)
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
      if (!res.ok) throw new Error(data.error || `Lỗi khi ${editingId ? 'cập nhật' : 'tạo mới'} tracking.`);

      // Update the trackings list after successful operation
      if (editingId) {
        setTrackings(trackings.map(t => (t.id === editingId ? data : t)));
      } else {
        setTrackings([data, ...trackings]); // Add new tracking to the top
      }

      // Reset form and UI states
      setShowForm(false);
      setEditingId(null);
      setForm({ order_code: '', status: 'ordered', location: '', note: '' });
      setOrderCode(data.order_code); // Ensure current order code is set if a new one was added
      setSubmitted(true); // Ensure view switches to tracking details
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Pre-fills the form for editing a tracking entry (Admin function)
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

  // Handles deleting a tracking entry (Admin function)
  const handleDelete = async (id) => {
    if (!window.confirm('Bạn chắc chắn muốn xóa mục theo dõi này?')) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/order-tracking/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Không thể xóa mục theo dõi này.');
      setTrackings(trackings.filter(t => t.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Determine the current active step for the visual progress bar
  const latestStatus = trackings.length > 0 ? trackings[0].status : null;
  const currentStepIndex = getStepIndex(latestStatus);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-green-50 py-12 px-4 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-cyan-700 drop-shadow">Tra cứu đơn hàng</h1>
      <p className="text-center text-lg text-gray-600 mb-10 max-w-xl">Nhập mã đơn hàng để kiểm tra trạng thái giao dịch và vận chuyển của bạn tại Coder-BookStore.</p>

      {/* Admin/Create/Edit Form */}
      {showForm ? (
        <form onSubmit={handleFormSubmit} className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 mb-8 flex flex-col gap-4">
          <h2 className="text-2xl font-bold mb-2 text-cyan-700">{editingId ? 'Sửa thông tin theo dõi' : 'Thêm thông tin theo dõi mới'}</h2>
          <input
            type="text"
            placeholder="Mã đơn hàng"
            value={form.order_code}
            onChange={e => setForm(f => ({ ...f, order_code: e.target.value }))}
            className="px-4 py-2 rounded border border-cyan-300 focus:border-cyan-500 outline-none"
            required
            disabled={!!editingId} {/* Disable order code edit when editing existing entry */}
          />
          <select
            value={form.status}
            onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
            className="px-4 py-2 rounded border border-cyan-300 focus:border-cyan-500 outline-none"
            required
          >
            {statusSteps.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
          </select>
          <input
            type="text"
            placeholder="Vị trí hiện tại (nếu có)"
            value={form.location}
            onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
            className="px-4 py-2 rounded border border-cyan-300 focus:border-cyan-500 outline-none"
          />
          <textarea
            placeholder="Ghi chú (nếu có)"
            value={form.note}
            onChange={e => setForm(f => ({ ...f, note: e.target.value }))}
            className="px-4 py-2 rounded border border-cyan-300 focus:border-cyan-500 outline-none resize-y"
            rows="3"
          />
          <div className="flex gap-3 mt-2">
            <button type="submit" className="px-6 py-2 bg-cyan-600 text-white rounded font-semibold hover:bg-cyan-700 transition-all flex items-center gap-2">
              {loading ? 'Đang xử lý...' : (editingId ? <><FaEdit /> Cập nhật</> : <><FaPlus /> Tạo mới</>)}
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-gray-200 text-cyan-700 rounded font-semibold hover:bg-gray-300 transition-all"
              onClick={() => { setShowForm(false); setEditingId(null); setForm({ order_code: '', status: 'ordered', location: '', note: '' }); }}
            >
              Hủy
            </button>
          </div>
        </form>
      ) : !submitted ? (
        // Initial search form
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4 mb-12 w-full max-w-lg">
          <input
            type="text"
            placeholder="Nhập mã đơn hàng..."
            value={orderCode}
            onChange={e => setOrderCode(e.target.value)}
            className="flex-1 px-5 py-3 rounded-xl border-2 border-cyan-200 focus:border-cyan-500 outline-none text-lg shadow"
            required
          />
          <button type="submit" className="flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white rounded-xl font-semibold shadow hover:bg-cyan-700 transition-all" disabled={loading}>
            <FaSearch />
            {loading ? 'Đang tra cứu...' : 'Tra cứu'}
          </button>
          {/* Admin Toggle (for demo purposes) */}
          <button
            type="button"
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${isAdmin ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setIsAdmin(!isAdmin)}
          >
            {isAdmin ? 'Chế độ Người dùng' : 'Chế độ Admin'}
          </button>
          {isAdmin && (
            <button
              type="button"
              className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl font-semibold shadow hover:bg-green-600 transition-all"
              onClick={() => { setShowForm(true); setEditingId(null); setForm({ order_code: orderCode, status: 'ordered', location: '', note: '' }); }}
            >
              <FaPlus /> Thêm tracking
            </button>
          )}
        </form>
      ) : (
        // Order tracking results
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
          {loading ? (
            <div className="text-center text-blue-500 animate-pulse">Đang tải thông tin...</div>
          ) : error ? (
            <div className="text-center text-red-500 mb-4">{error}</div>
          ) : trackings.length > 0 ? (
            <>
              <h2 className="text-2xl font-bold mb-6 text-cyan-700">Trạng thái đơn hàng: <span className="text-cyan-900">{orderCode}</span></h2>
              
              {/* Order Steps/Progress Bar */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-6">
                {statusSteps.map((step, idx) => (
                  <OrderStep
                    key={step.key}
                    icon={step.icon}
                    label={step.label}
                    desc={step.desc}
                    color={step.color}
                    active={idx <= currentStepIndex}
                    isLast={idx === statusSteps.length - 1}
                  />
                ))}
              </div>

              {/* Order Overview (latest status) */}
              <OrderOverview tracking={trackings[0]} statusSteps={statusSteps} />

              {/* Order Timeline */}
              <OrderTimeline trackings={trackings} statusSteps={statusSteps} />

              {/* Order Rating */}
              <OrderRating tracking={trackings[0]} />

              {/* Order Support */}
              <OrderSupport />

              {/* History table for Admin/Detailed view */}
              {isAdmin && (
                <>
                  <h3 className="mt-8 mb-2 text-lg font-bold text-cyan-700">Lịch sử trạng thái (quản lý)</h3>
                  <ul className="divide-y divide-cyan-100">
                    {trackings.map((t) => (
                      <li key={t.id} className="py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <span className="font-semibold text-cyan-800">{statusSteps.find(s => s.key === t.status)?.label || t.status}</span>
                        <span className="text-gray-500 text-sm">{t.location}</span>
                        <span className="text-gray-400 text-xs">{new Date(t.updated_at).toLocaleString()}</span>
                        <span className="flex gap-2">
                          <button className="px-3 py-1 bg-yellow-400 text-white rounded font-semibold hover:bg-yellow-500 flex items-center gap-1" onClick={() => handleEdit(t)}><FaEdit /> Sửa</button>
                          <button className="px-3 py-1 bg-red-500 text-white rounded font-semibold hover:bg-red-600 flex items-center gap-1" onClick={() => handleDelete(t.id)}><FaTrash /> Xóa</button>
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </>
          ) : (
            // No tracking found message after submission
            <div className="text-center text-gray-600">
              Không tìm thấy thông tin theo dõi cho mã đơn hàng này. Vui lòng kiểm tra lại.
            </div>
          )}

          <button
            className="mt-8 px-6 py-2 bg-gray-100 text-cyan-700 rounded-lg font-semibold hover:bg-gray-200 transition-all"
            onClick={() => { setSubmitted(false); setOrderCode(''); setTrackings([]); setError(null); setShowForm(false); setEditingId(null); setForm({ order_code: '', status: 'ordered', location: '', note: '' }); }}
          >
            Tra cứu đơn khác
          </button>
        </div>
      )}
    </div>
  );
}