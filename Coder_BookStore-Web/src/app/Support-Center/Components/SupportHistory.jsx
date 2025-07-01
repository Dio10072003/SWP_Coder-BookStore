import React, { useEffect, useState } from 'react';

export default function SupportHistory() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/support-tickets');
      if (!res.ok) throw new Error('Không thể tải lịch sử hỗ trợ');
      const data = await res.json();
      setTickets(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center text-blue-600">Đang tải lịch sử hỗ trợ...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!tickets.length) return <div className="text-center text-gray-500">Chưa có yêu cầu hỗ trợ nào.</div>;

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h3 className="text-xl font-bold mb-4 text-blue-700">Lịch sử yêu cầu hỗ trợ</h3>
      <ul className="space-y-4">
        {tickets.map(ticket => (
          <li key={ticket.id} className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-blue-700">{ticket.subject}</span>
              <span className="text-xs text-gray-400">{new Date(ticket.created_at).toLocaleString()}</span>
            </div>
            <div className="text-gray-700 mb-1">{ticket.message}</div>
            <div className="text-xs text-gray-500">Trạng thái: <span className="font-medium text-green-600">{ticket.status}</span></div>
          </li>
        ))}
      </ul>
    </div>
  );
} 