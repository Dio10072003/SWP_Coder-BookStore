"use client";

import React, { useState } from "react";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState('User');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    // Add registration logic here (e.g., API call)
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, role, password, passwordHash: '' })
      });
      if (res.ok) {
        setSuccess('Đăng ký thành công!');
      } else {
        const data = await res.json();
        setError(data.error || 'Đăng ký thất bại');
      }
    } catch (err) {
      setError('Lỗi kết nối máy chủ');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-gray-200 font-medium">Họ Tên</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nhập họ tên..."
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-gray-200 font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Nhập email..."
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-gray-200 font-medium">Mật Khẩu</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Nhập mật khẩu..."
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-gray-200 font-medium">Vai trò</label>
        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <option value="User">User</option>
          <option value="Staff">Staff</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full px-6 py-3 bg-cyan-400 text-indigo-900 font-bold rounded-lg hover:bg-cyan-500 transition-all duration-300"
      >
        Đăng Ký
      </button>
      <p className="text-center text-gray-400">
        Đã có tài khoản?{" "}
        <a href="/Login" className="text-yellow-400 hover:underline">
          Đăng nhập ngay
        </a>
      </p>
      {error && <div className="text-red-500 text-center">{error}</div>}
      {success && <div className="text-green-500 text-center">{success}</div>}
    </form>
  );
};

export default RegisterForm;
