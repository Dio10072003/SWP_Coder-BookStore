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
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  useEffect(() => {
    setLoading(true);
    fetch('/api/faqs')
      .then(res => res.json())
      .then(data => {
        setFaqs(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Lỗi tải danh sách FAQ');
        setLoading(false);
      });
  }, []);

  const handleToggle = idx => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // Lấy danh sách chủ đề duy nhất
  const categories = ['Tất cả', ...Array.from(new Set(faqs.map(f => f.category || 'Khác')))]
    .filter((v, i, a) => a.indexOf(v) === i);

  // Lọc FAQ theo chủ đề
  const filteredFaqs = selectedCategory === 'Tất cả'
    ? faqs
    : faqs.filter(f => (f.category || 'Khác') === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 py-12 px-4">
      {/* Assuming FAQHeader handles the title. If not, you can add an h1 here. */}
      {/* <FAQHeader /> */}
      <h1 className="text-4xl font-extrabold text-center mb-10 text-blue-700 drop-shadow">Câu hỏi thường gặp (FAQ)</h1>
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full border font-semibold text-sm transition-all duration-200 ${selectedCategory === cat ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-700 border-blue-300 hover:bg-blue-100'}`}
            onClick={() => { setSelectedCategory(cat); setOpenIndex(null); }}
          >
            {cat}
          </button>
        ))}
      </div>
      <main className="max-w-3xl mx-auto px-4 md:px-0 relative z-10">
        <div className="space-y-6">
          {loading && <div className="text-center text-lg">Đang tải...</div>}
          {error && <div className="text-center text-red-500">{error}</div>}
          {filteredFaqs.map((faq, idx) => (
            <FAQCard
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === idx}
              onClick={() => handleToggle(idx)}
              color={cardColors[idx % cardColors.length]} // Applying colors from the 'main' branch
            />
          ))}
        </div>
      </main>
    </div>
  );
}