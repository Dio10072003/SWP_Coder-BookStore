import React from "react";
import LoginForm from "./Components/LoginForm.jsx";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-700 flex items-center justify-center p-6">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-yellow-400 mb-6">
          Đăng Nhập Coder-BookStore
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
