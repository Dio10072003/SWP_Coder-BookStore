import React, { useState } from 'react';

function randomPassword(length = 8) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let pass = '';
  for (let i = 0; i < length; i++) pass += chars[Math.floor(Math.random() * chars.length)];
  return pass;
}

export default function ResetPasswordModal({ open, user, onConfirm, onCancel }) {
  const [password, setPassword] = useState('');
  if (!open || !user) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full relative">
        <h2 className="text-xl font-bold mb-2">Reset mật khẩu cho {user.name}</h2>
        <input
          type="text"
          className="w-full border rounded px-3 py-2 mb-3"
          placeholder="Nhập mật khẩu mới hoặc bấm tạo ngẫu nhiên"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={() => setPassword(randomPassword())} className="mb-3 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">Tạo ngẫu nhiên</button>
        <div className="flex gap-4 justify-end">
          <button onClick={onCancel} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Hủy</button>
          <button onClick={() => onConfirm(password)} className="px-4 py-2 rounded bg-yellow-600 text-white hover:bg-yellow-700">Xác nhận</button>
        </div>
      </div>
    </div>
  );
} 