"use client";

import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaCommentDots } from 'react-icons/fa';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(false);
    setError('');
    if (!name || !email || !message) {
      setError('Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    // Add contact logic here (e.g., API call)
    setSuccess(true);
    setName(''); setEmail(''); setMessage('');
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <h2 className="text-2xl font-extrabold text-center text-cyan-300 mb-2 drop-shadow">Liên hệ với chúng tôi</h2>
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
        <FaCommentDots className="absolute left-4 top-5 text-cyan-400 text-lg" />
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Nội dung liên hệ..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-900/80 text-white border-2 border-gray-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300 outline-none text-lg font-semibold transition-all placeholder-gray-400 shadow min-h-[100px]"
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-pink-400 text-white font-extrabold text-lg shadow-lg hover:from-pink-400 hover:to-cyan-400 transition-all duration-300 tracking-wide mt-2"
      >
        Gửi Tin Nhắn
      </button>
      {success && <p className="text-green-400 text-center font-semibold animate-fade-in mt-2">Gửi thành công! Chúng tôi sẽ phản hồi sớm nhất có thể.</p>}
      {error && <p className="text-red-400 text-center font-semibold animate-fade-in mt-2">{error}</p>}
    </form>
  );
};

export default ContactForm;