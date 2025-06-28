import React from "react";

const LoginInput = ({ label, type, value, onChange, placeholder }) => {
  return (
    <div className="space-y-2">
      <label className="block text-gray-200 font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
      />
    </div>
  );
};

export default LoginInput;
