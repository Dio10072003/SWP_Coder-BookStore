import React from 'react';

export default function FaqCard({ question, answer, isOpen, onClick, color }) {
  return (
    <div
      className={`rounded-xl shadow-lg transition-all duration-300 cursor-pointer border-2 border-white ${color} ${isOpen ? 'scale-105 shadow-2xl' : ''}`}
      onClick={onClick}
    >
      <div className="p-5 flex items-center justify-between">
        <span className="font-semibold text-lg text-gray-800">{question}</span>
        <span className={`ml-4 text-2xl font-bold transition-transform duration-200 ${isOpen ? 'rotate-45 text-pink-600' : 'text-blue-400'}`}>+</span>
      </div>
      {isOpen && (
        <div className="px-5 pb-5 text-gray-700 animate-fade-in">
          {answer}
        </div>
      )}
    </div>
  );
} 