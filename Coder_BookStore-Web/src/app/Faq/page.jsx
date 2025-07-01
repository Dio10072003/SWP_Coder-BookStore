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
  const [loading, setLoading] = useState(true); // Initialize to true as data will be fetched on mount
  const [error, setError] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  // Unified useEffect for data fetching
  useEffect(() => {
    const fetchFaqs = async () => {
      setLoading(true);
      setError(null); // Clear previous errors
      try {
        const res = await fetch('/api/faqs');
        if (!res.ok) {
          throw new Error('Không thể tải FAQ. Có thể server đang đi uống cà phê!');
        }
        const data = await res.json();
        setFaqs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []); // Empty dependency array means this runs once on mount

  const handleToggle = idx => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // Get unique categories and ensure 'Tất cả' is first
  const categories = ['Tất cả', ...Array.from(new Set(faqs.map(f => f.category || 'Khác')))]
    .filter((value, index, self) => self.indexOf(value) === index); // Ensure uniqueness

  // Filter FAQs based on selected category
  const filteredFaqs = selectedCategory === 'Tất cả'
    ? faqs
    : faqs.filter(f => (f.category || 'Khác') === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 py-12 px-4">
      <FAQHeader /> {/* Keep this if FAQHeader component exists and is desired */}
      
      {/* Title from Thien+ branch with added description */}
      <h1 className="text-4xl font-extrabold text-center mb-10 text-blue-700 drop-shadow">
        Câu hỏi thường gặp (FAQ)
        <span className="block text-base text-pink-500 mt-2 font-normal">Có thắc mắc thì hỏi, đừng ngại! Chúng tôi trả lời nghiêm túc, nhưng đôi khi cũng vui vẻ lắm 😎</span>
      </h1>

      {/* Category filter buttons from main branch */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full border font-semibold text-sm transition-all duration-200 ${selectedCategory === cat ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-700 border-blue-300 hover:bg-blue-100'}`}
            onClick={() => { setSelectedCategory(cat); setOpenIndex(null); }} // Close all FAQs when changing category
          >
            {cat}
          </button>
        ))}
      </div>

      <main className="max-w-3xl mx-auto px-4 md:px-0 relative z-10">
        {/* Loading and Error states */}
        {loading && <div className="text-center text-blue-500 animate-pulse">Đang tải... Đợi xíu nha, FAQ đang khởi động não 🧠</div>}
        {error && <div className="text-center text-red-500">{error}</div>}

        {/* Display FAQs or No data message */}
        {!loading && !error && (
          <div className="space-y-6">
            {filteredFaqs.length === 0 ? (
              <div className="text-center text-gray-500">
                Không tìm thấy câu hỏi nào trong chủ đề này.
              </div>
            ) : (
              filteredFaqs.map((faq, idx) => (
                <FAQCard
                  key={faq.id || idx} // Use faq.id if available, otherwise idx as fallback
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