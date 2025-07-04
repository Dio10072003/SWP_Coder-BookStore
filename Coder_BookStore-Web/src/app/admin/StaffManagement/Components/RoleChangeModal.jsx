import React from 'react';

export default function RoleChangeModal({ open, user, newRole, onConfirm, onCancel, errorMsg }) {
  if (!open || !user) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full relative">
        <h2 className="text-xl font-bold mb-2">Xác nhận đổi vai trò</h2>
        <div className="mb-2">Bạn có chắc chắn muốn đổi vai trò của <b>{user.name}</b> thành <b>{newRole}</b>?</div>
        {errorMsg && <div className="text-red-600 mb-2">{errorMsg}</div>}
        <div className="flex gap-4 justify-end">
          <button onClick={onCancel} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">Hủy</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Xác nhận</button>
        </div>
      </div>
    </div>
  );
} 