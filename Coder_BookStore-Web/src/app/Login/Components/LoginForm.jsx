"use client";

import React, { useState } from "react";
import LoginInput from "./LoginInput.jsx";
import LoginButton from "./LoginButton.jsx";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here (e.g., API call)
    console.log("Login attempt:", { email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <LoginInput
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Nhập email của bạn..."
      />
      <LoginInput
        label="Mật Khẩu"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Nhập mật khẩu..."
      />
      <LoginButton text="Đăng Nhập" />
      <p className="text-center text-gray-400">
        Chưa có tài khoản?{" "}
        <a href="/Register" className="text-cyan-400 hover:underline">
          Đăng ký ngay
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
