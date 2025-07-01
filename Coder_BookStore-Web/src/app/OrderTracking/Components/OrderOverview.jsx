import React from 'react';

export default function OrderOverview({ tracking }) {
  if (!tracking) return null;
  return (
    <div className="bg-cyan-50 rounded-xl shadow p-6 mb-6 flex flex-col gap-2">
      <div><b>Mã đơn hàng:</b> <span className="text-cyan-700 font-mono">{tracking.order_code}</span></div>
      <div><b>Ngày đặt:</b> {new Date(tracking.created_at).toLocaleString()}</div>
      <div><b>Trạng thái hiện tại:</b> <span className="font-semibold text-cyan-800">{tracking.status.toUpperCase()}</span></div>
      <div><b>Vị trí:</b> {tracking.location || 'Đang cập nhật...'}</div>
      <div><b>Ghi chú:</b> {tracking.note || 'Không có'}</div>
    </div>
  );
} 