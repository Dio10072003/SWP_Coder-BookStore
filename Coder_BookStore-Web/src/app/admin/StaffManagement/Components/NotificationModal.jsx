import React, { useState } from 'react';

export default function NotificationModal({ open, user, onSend, onCancel }) {
  const [message, setMessage] = useState('');
  if (!open || !user) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full relative">
        <h2 className="text-xl font-bold mb-2">Gửi thông báo cho {user.name}</h2>
        <textarea
          className="w-full border rounded px-3 py-2 mb-3"
          placeholder="Nhập nội dung thông báo..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          rows={4}
        />
        <div className="flex gap-4 justify-end">
          <button onClick={onCancel} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Hủy</button>
          <button onClick={() => onSend(message)} className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700">Gửi</button>
        </div>
      </div>
    </div>
  );
} 