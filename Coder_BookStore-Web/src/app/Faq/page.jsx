'use client';
import React, { useState, useEffect } from 'react';
import FAQHeader from './FAQHeader'; // Assuming FAQHeader is a component that you want to keep
import FAQCard from './FAQCard'; // Assuming FAQCard is a component that you want to keep

const cardColors = [
  'bg-pink-100', 'bg-yellow-100', 'bg-green-100', 'bg-blue-100', 'bg-purple-100',
  'bg-red-100', 'bg-indigo-100', 'bg-teal-100', 'bg-orange-100', 'bg-cyan-100',
  'bg-lime-100', 'bg-fuchsia-100', 'bg-amber-100', 'bg-emerald-100', 'bg-sky-100',
];

export default function FaqPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/faqs');
      if (!res.ok) throw new Error('Không thể tải FAQ. Có thể server đang đi uống cà phê!');
      const data = await res.json();
      setFaqs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = idx => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 py-12 px-4">
      {/* Assuming FAQHeader handles the title. If not, you can add an h1 here. */}
      {/* <FAQHeader /> */}
      <h1 className="text-4xl font-extrabold text-center mb-10 text-blue-700 drop-shadow">
        Câu hỏi thường gặp (FAQ)
        <span className="block text-base text-pink-500 mt-2 font-normal">Có thắc mắc thì hỏi, đừng ngại! Chúng tôi trả lời nghiêm túc, nhưng đôi khi cũng vui vẻ lắm 😎</span>
      </h1>
      <main className="max-w-3xl mx-auto px-4 md:px-0 relative z-10">
        {loading && <div className="text-center text-blue-500 animate-pulse">Đang tải... Đợi xíu nha, FAQ đang khởi động não 🧠</div>}
        {error && <div className="text-center text-red-500">{error}</div>}
        {!loading && !error && (
          <div className="space-y-6">
            {faqs.length === 0 ? (
              <div className="text-center text-gray-500">Ko có gì đâu, hỏi tiếp đi!</div>
            ) : (
              faqs.map((faq, idx) => (
                <FAQCard
                  key={faq.id || idx}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === idx}
                  onClick={() => handleToggle(idx)}
                  color={cardColors[idx % cardColors.length]}
                />
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}