import React from 'react';

const FAQCard = ({ question, answer }) => (
  <div className="relative bg-gradient-to-br from-white via-blue-50 to-pink-50 rounded-2xl shadow-lg p-6 md:p-8 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl animate-fade-in">
    <div className="flex items-start gap-3 mb-2">
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-pink-100 shadow-md mr-2 animate-float">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-pink-500 w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16h6" />
        </svg>
      </span>
      <h2 className="text-lg md:text-xl font-bold text-blue-800 drop-shadow flex-1">{question}</h2>
    </div>
    <div className="text-gray-700 text-base md:text-lg pl-12">{answer}</div>
  </div>
);

export default FAQCard; 