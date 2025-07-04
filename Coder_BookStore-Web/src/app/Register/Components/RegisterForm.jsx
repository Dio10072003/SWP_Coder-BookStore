"use client";

import React, { useState, useEffect } from "react";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Used for success messages
  const [error, setError] = useState("");     // Used for error messages
  const [role, setRole] = useState("User");
  const [roleOptions, setRoleOptions] = useState([
    { value: "User", label: "User", disabled: false },
    { value: "Staff", label: "Staff", disabled: false },
    { value: "Admin", label: "Admin", disabled: false },
  ]);
  const [roleWarning, setRoleWarning] = useState("");

  // Effect to fetch user counts and update role options/warnings
  useEffect(() => {
    const fetchRoleLimits = async () => {
      try {
        const res = await fetch("/api/users");
        if (!res.ok) {
          throw new Error("Failed to fetch user data.");
        }
        const users = await res.json();

        const adminCount = users.filter((u) => u.role === "Admin").length;
        const staffCount = users.filter((u) => u.role === "Staff").length;

        const newRoleOptions = [
          { value: "User", label: "User", disabled: false },
          { value: "Staff", label: "Staff", disabled: staffCount >= 20 },
          { value: "Admin", label: "Admin", disabled: adminCount >= 1 },
        ];
        setRoleOptions(newRoleOptions);

        // Adjust selected role if it becomes disabled
        if (adminCount >= 1 && role === "Admin") setRole("User");
        if (staffCount >= 20 && role === "Staff") setRole("User");

        let warning = "";
        if (adminCount >= 1) warning += "Chỉ cho phép tối đa 1 Admin. ";
        if (staffCount >= 20) warning += "Chỉ cho phép tối đa 20 Staff.";
        setRoleWarning(warning.trim());
      } catch (err) {
        console.error("Error fetching role limits:", err);
        // Optionally set an error state here for the user
      }
    };

    fetchRoleLimits();
  }, [role]); // Re-run if selected role changes, to potentially adjust it

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages
    setError("");   // Clear previous errors

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Ensure passwordHash is not sent if not needed by your API
        // If your API expects passwordHash, you'll need to hash it on the client or update your API
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Đăng ký thành công! Bạn có thể đăng nhập.");
        // Clear form fields on successful registration
        setName("");
        setEmail("");
        setPassword("");
        // Re-fetch role limits after successful registration, in case a role count changed
        // This will trigger the useEffect
      } else {
        setError(data.error || "Đăng ký thất bại!");
      }
    } catch (err) {
      setError("Lỗi kết nối máy chủ!");
      console.error("Registration error:", err);
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
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          {roleOptions.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
              {opt.disabled ? " (Đã đủ)" : ""}
            </option>
          ))}
        </select>
        {roleWarning && (
          <p className="text-yellow-400 text-sm mt-1">{roleWarning}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full px-6 py-3 bg-cyan-400 text-indigo-900 font-bold rounded-lg hover:bg-cyan-500 transition-all duration-300"
      >
        Đăng Ký
      </button>
      {/* Display messages based on 'main' branch's state variables */}
      {message && <p className="text-green-400 text-center">{message}</p>}
      {error && <p className="text-red-400 text-center">{error}</p>}
      <p className="text-center text-gray-400">
        Đã có tài khoản?{" "}
        <a href="/Login" className="text-yellow-400 hover:underline">
          Đăng nhập ngay
        </a>
      </p>
    </form>
  );
};

export default RegisterForm;