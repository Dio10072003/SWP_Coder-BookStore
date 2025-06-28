import React from "react";
import RegisterHeader from "./Components/RegisterHeader.jsx";
import RegisterForm from "./Components/RegisterForm.jsx";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-700 flex items-center justify-center p-6">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full">
        <RegisterHeader />
        <RegisterForm />
      </div>
    </div>
  );
}
