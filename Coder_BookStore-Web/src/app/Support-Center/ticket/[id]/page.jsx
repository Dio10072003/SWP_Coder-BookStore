'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function TicketDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // TODO: Thay bằng logic phân quyền thực tế
  const isAdmin = true; // Giả lập admin, có thể sửa thành false để test giao diện user

  useEffect(() => {
    fetchTicket();
    // eslint-disable-next-line
  }, [id]);

  const fetchTicket = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/support-tickets/${id}`);
      if (!res.ok) throw new Error('Không tìm thấy ticket');
      const data = await res.json();
      setTicket(data);
      setStatus(data.status);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setSaving(true);
    try {
      const res = await fetch(`/api/support-tickets/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...ticket, status: newStatus }),
      });
      if (!res.ok) throw new Error('Cập nhật trạng thái thất bại');
      setStatus(newStatus);
      fetchTicket();
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Bạn có chắc chắn muốn xoá ticket này?')) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/support-tickets/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Xoá thất bại');
      router.push('/Support-Center');
    } catch (err) {
      alert(err.message);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <div className="text-center py-8 text-blue-600">Đang tải...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!ticket) return null;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-10">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Chi tiết yêu cầu hỗ trợ</h2>
      <div className="mb-2"><span className="font-semibold">Họ tên:</span> {ticket.name}</div>
      <div className="mb-2"><span className="font-semibold">Email:</span> {ticket.email}</div>
      <div className="mb-2"><span className="font-semibold">Chủ đề:</span> {ticket.subject}</div>
      <div className="mb-2"><span className="font-semibold">Nội dung:</span> <span className="whitespace-pre-line">{ticket.message}</span></div>
      <div className="mb-2"><span className="font-semibold">Thời gian gửi:</span> {new Date(ticket.created_at).toLocaleString()}</div>
      <div className="mb-4"><span className="font-semibold">Trạng thái:</span> {isAdmin ? (
        <select value={status} onChange={handleStatusChange} disabled={saving} className="ml-2 px-2 py-1 rounded border">
          <option value="open">Open</option>
          <option value="pending">Pending</option>
          <option value="closed">Closed</option>
        </select>
      ) : (
        <span className="ml-2 font-semibold text-green-700">{status}</span>
      )}
      </div>
      {isAdmin && (
        <button onClick={handleDelete} disabled={deleting} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
          {deleting ? 'Đang xoá...' : 'Xoá ticket'}
        </button>
      )}
    </div>
  );
} 