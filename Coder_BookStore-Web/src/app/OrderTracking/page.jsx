'use client';
import React, { useState } from 'react';
import { FaBoxOpen, FaClipboardList, FaTruck, FaCheckCircle, FaSearch } from 'react-icons/fa';
import OrderStep from './Components/OrderStep.jsx';

const orderSteps = [
  { label: 'Đã đặt hàng', icon: <FaClipboardList />, color: 'text-blue-500', desc: 'Đơn hàng của bạn đã được ghi nhận.' },
  { label: 'Đang xử lý', icon: <FaBoxOpen />, color: 'text-yellow-500', desc: 'Chúng tôi đang chuẩn bị đơn hàng cho bạn.' },
  { label: 'Đang giao', icon: <FaTruck />, color: 'text-purple-500', desc: 'Đơn hàng đang trên đường đến bạn.' },
  { label: 'Đã giao', icon: <FaCheckCircle />, color: 'text-green-500', desc: 'Bạn đã nhận được đơn hàng.' },
];

export default function OrderTrackingPage() {
  const [orderCode, setOrderCode] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    if (!orderCode.trim()) return;
    setLoading(true);
    setError('');
    setOrder(null);
    try {
      const res = await fetch(`/api/order-tracking/${orderCode}`);
      if (!res.ok) throw new Error('Không tìm thấy đơn, kiểm tra lại mã nhé! Hoặc đơn hàng đã đi lạc sang vũ trụ khác 🚀');
      const data = await res.json();
      setOrder(data);
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  let currentStep = 0;
  if (order && order.status) {
    if (order.status === 'processing') currentStep = 1;
    else if (order.status === 'shipping') currentStep = 2;
    else if (order.status === 'delivered') currentStep = 3;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-green-50 py-12 px-4 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-cyan-700 drop-shadow">Tra cứu đơn hàng</h1>
      <p className="text-center text-lg text-gray-600 mb-10 max-w-xl">Nhập mã đơn hàng để kiểm tra trạng thái giao dịch và vận chuyển của bạn tại Coder-BookStore.</p>
      {!submitted ? (
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
            {loading ? 'Đang tra cứu...' : 'Tra cứu'}
          </button>
        </form>
      ) : (
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
          {error ? (
            <div className="text-center text-red-500 mb-4">{error}</div>
          ) : order ? (
            <>
              <h2 className="text-2xl font-bold mb-6 text-cyan-700">Trạng thái đơn hàng: <span className="text-cyan-900">{orderCode}</span></h2>
              <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                {orderSteps.map((step, idx) => (
                  <OrderStep
                    key={idx}
                    icon={step.icon}
                    label={step.label}
                    desc={step.desc}
                    color={step.color}
                    active={idx <= currentStep}
                    isLast={idx === orderSteps.length - 1}
                  />
                ))}
              </div>
              <div className="mt-6 text-gray-700 text-sm">
                <div><b>Khách hàng:</b> {order.customer_name || 'Ẩn danh'}</div>
                <div><b>Ngày đặt:</b> {order.created_at ? new Date(order.created_at).toLocaleString() : 'Không rõ'}</div>
                <div><b>Trạng thái:</b> <span className="font-semibold text-cyan-700">{order.status || 'Không rõ'}</span></div>
                <div><b>Ghi chú:</b> {order.note || 'Không có ghi chú gì, mọi thứ đều ổn! 😎'}</div>
              </div>
            </>
          ) : null}
          <button
            className="mt-8 px-6 py-2 bg-gray-100 text-cyan-700 rounded-lg font-semibold hover:bg-gray-200 transition-all"
            onClick={() => { setSubmitted(false); setOrderCode(''); setOrder(null); setError(''); }}
          >
            Tra cứu đơn khác
          </button>
        </div>
      )}
    </div>
  );
} 