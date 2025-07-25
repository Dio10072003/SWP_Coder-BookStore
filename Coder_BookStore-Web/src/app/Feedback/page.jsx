"use client";
import React, { useState } from "react";
import FeedbackForm from "./Components/FeedbackForm.jsx";
import FeedbackList from "./Components/FeedbackList";

export default function FeedbackPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Gửi lên API
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, content, rating }),
    });
    if (res.ok) {
      setSubmitted(true);
      setRefresh((r) => !r);
      setName("");
      setEmail("");
      setContent("");
      setRating(0);
      setTimeout(() => setSubmitted(false), 3000);
    } else {
      alert("Gửi góp ý thất bại!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-blue-50 py-12 px-4 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-pink-700 drop-shadow">
        Góp ý & Đánh giá
      </h1>
      <p className="text-center text-lg text-gray-600 mb-10 max-w-xl">
        Chúng tôi luôn lắng nghe ý kiến của bạn để hoàn thiện dịch vụ tốt hơn
        mỗi ngày!
      </p>
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
      <FeedbackList refresh={refresh} />
    </div>
  );
}
/*
'use client';
import React, { useState } from 'react';
import FeedbackForm from './Components/FeedbackForm.jsx';
import FeedbackList from './Components/FeedbackList';

export default function FeedbackPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!name || !email || !content || rating === 0) {
      alert('Vui lòng nhập đầy đủ thông tin và chọn mức đánh giá!');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, content, rating }),
      });

      if (res.ok) {
        setSubmitted(true);
        setRefresh(r => !r);
        setName('');
        setEmail('');
        setContent('');
        setRating(0);
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        alert('Gửi góp ý thất bại!');
      }
    } catch (error) {
      console.error('Lỗi gửi góp ý:', error);
      alert('Đã xảy ra lỗi khi gửi góp ý!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-blue-50 py-12 px-4 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-pink-700 drop-shadow">Góp ý & Đánh giá</h1>
      <p className="text-center text-lg text-gray-600 mb-10 max-w-xl">
        Chúng tôi luôn lắng nghe ý kiến của bạn để hoàn thiện dịch vụ tốt hơn mỗi ngày!
      </p>

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
        loading={loading}
      />

      <FeedbackList refresh={refresh} />
    </div>
  );
}

*/
