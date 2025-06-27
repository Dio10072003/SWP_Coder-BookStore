import React from 'react';

export default function SupportCard({ title, desc, icon, href, color }) {
  return (
    <a
      href={href}
      className={`group block rounded-2xl bg-gradient-to-br ${color} shadow-xl p-8 transition-transform duration-300 hover:scale-105 hover:shadow-2xl border-2 border-white`}
    >
      <div className="flex items-center mb-4">
        <div className="mr-4 p-3 rounded-full bg-white shadow-inner group-hover:scale-110 transition-transform">{icon}</div>
        <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{title}</h2>
      </div>
      <p className="text-gray-600 text-base">{desc}</p>
    </a>
  );
} 