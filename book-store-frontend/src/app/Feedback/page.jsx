'use client';
import React, { useState } from 'react';
import FeedbackForm from './Components/FeedbackForm.jsx';

export default function FeedbackPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setName(''); setEmail(''); setContent(''); setRating(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-blue-50 py-12 px-4 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-pink-700 drop-shadow">Góp ý & Đánh giá</h1>
      <p className="text-center text-lg text-gray-600 mb-10 max-w-xl">Chúng tôi luôn lắng nghe ý kiến của bạn để hoàn thiện dịch vụ tốt hơn mỗi ngày!</p>
      <FeedbackForm
        onSubmit={handleSubmit}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        content={content}
        setContent={setContent}
        rating={rating}
        setRating={setRating}
        submitted={submitted}
      />
    </div>
  );
} 