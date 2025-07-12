"use client";

import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaLock, FaUserShield } from "react-icons/fa";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState("User");
  const [roleOptions, setRoleOptions] = useState([
    { value: "User", label: "User", disabled: false },
    { value: "Staff", label: "Staff", disabled: false },
    { value: "Admin", label: "Admin", disabled: false },
  ]);
  const [roleWarning, setRoleWarning] = useState("");

  useEffect(() => {
    const fetchRoleLimits = async () => {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) throw new Error("Failed to fetch user data.");
        const users = await res.json();
        const adminCount = users.filter((u) => u.role === "Admin").length;
        const staffCount = users.filter((u) => u.role === "Staff").length;
        const newRoleOptions = [
          { value: "User", label: "User", disabled: false },
          { value: "Staff", label: "Staff", disabled: staffCount >= 20 },
          { value: "Admin", label: "Admin", disabled: adminCount >= 1 },
        ];
        setRoleOptions(newRoleOptions);
        if (adminCount >= 1 && role === "Admin") setRole("User");
        if (staffCount >= 20 && role === "Staff") setRole("User");
        let warning = "";
        if (adminCount >= 1) warning += "Chỉ cho phép tối đa 1 Admin. ";
        if (staffCount >= 20) warning += "Chỉ cho phép tối đa 20 Staff.";
        setRoleWarning(warning.trim());
      } catch (err) {
        // silent
      }
    };
    fetchRoleLimits();
  }, [role]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Đăng ký thành công! Bạn có thể đăng nhập.");
        setName(""); setEmail(""); setPassword("");
      } else {
        setError(data.error || "Đăng ký thất bại!");
      }
    } catch (err) {
      setError("Lỗi kết nối máy chủ!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <h2 className="text-3xl font-extrabold text-center text-cyan-300 mb-2 drop-shadow">Đăng ký tài khoản</h2>
      <div className="relative">
        <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 text-lg" />
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Họ tên"
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-900/80 text-white border-2 border-gray-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300 outline-none text-lg font-semibold transition-all placeholder-gray-400 shadow"
        />
      </div>
      <div className="relative">
        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 text-lg" />
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-900/80 text-white border-2 border-gray-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300 outline-none text-lg font-semibold transition-all placeholder-gray-400 shadow"
        />
      </div>
      <div className="relative">
        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 text-lg" />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Mật khẩu"
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-900/80 text-white border-2 border-gray-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300 outline-none text-lg font-semibold transition-all placeholder-gray-400 shadow"
        />
      </div>
      <div className="relative">
        <FaUserShield className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 text-lg" />
        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-900/80 text-white border-2 border-gray-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300 outline-none text-lg font-semibold transition-all placeholder-gray-400 shadow"
        >
          {roleOptions.map(opt => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}{opt.disabled ? " (Đã đủ)" : ""}
            </option>
          ))}
        </select>
      </div>
      {roleWarning && <p className="text-yellow-400 text-sm text-center mt-1 animate-pulse">{roleWarning}</p>}
      <button
        type="submit"
        className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-pink-400 text-white font-extrabold text-lg shadow-lg hover:from-pink-400 hover:to-cyan-400 transition-all duration-300 tracking-wide mt-2"
      >
        Đăng Ký
      </button>
      {message && <p className="text-green-400 text-center font-semibold animate-fade-in mt-2">{message}</p>}
      {error && <p className="text-red-400 text-center font-semibold animate-fade-in mt-2">{error}</p>}
      <p className="text-center text-gray-400 mt-2">
        Đã có tài khoản?{' '}
        <a href="/Login" className="text-cyan-300 hover:underline font-bold">Đăng nhập ngay</a>
      </p>
    </form>
  );
};

export default RegisterForm;