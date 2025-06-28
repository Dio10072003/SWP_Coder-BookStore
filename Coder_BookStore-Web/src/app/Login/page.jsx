import React from "react";
import LoginForm from "./Components/LoginForm.jsx";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-700 flex items-center justify-center p-6">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-yellow-400 mb-4">
          Chào mừng trở lại với <span className="text-pink-400">Coder-BookStore</span>!
        </h1>
        <p className="text-center text-gray-300 mb-6 text-base">
          Đăng nhập để tiếp tục hành trình chinh phục tri thức, khám phá kho sách lập trình và nhận những ưu đãi đặc biệt dành riêng cho bạn.
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
