import React from 'react';

const picks = [
  { title: 'Python Crash Course', price: '250K' },
  { title: 'The Pragmatic Programmer', price: '300K' },
  { title: 'Eloquent JavaScript', price: '200K' },
];

const BestPicksSection = () => {
  return (
    <section className="relative py-8 px-2 bg-gradient-to-br from-cyan-900 via-indigo-900 to-purple-900 rounded-lg shadow my-6 overflow-hidden">
      <span className="absolute -top-6 -left-6 w-24 h-24 bg-cyan-300 opacity-10 rounded-full blur-2xl animate-blob z-0" />
      <span className="absolute -bottom-6 -right-6 w-24 h-24 bg-yellow-200 opacity-5 rounded-full blur-2xl animate-blob2 z-0" />
      <h2 className="text-2xl font-bold text-center text-cyan-400 mb-6 flex items-center justify-center gap-2">
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-cyan-400"><rect x="4" y="7" width="16" height="10" rx="2" strokeWidth={2} /><path d="M8 11h8" strokeWidth={2} /></svg>
        Lựa Chọn Hàng Đầu
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {picks.map((pick, index) => (
          <div
            key={index}
            className="bg-white/10 p-4 rounded-lg flex flex-col items-center text-center shadow transition-all duration-200 hover:scale-105 hover:shadow-xl"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mb-1 text-cyan-300">
              <rect x="4" y="7" width="16" height="10" rx="2" strokeWidth={2} />
              <path d="M8 11h8" strokeWidth={2} />
            </svg>
            <h3 className="text-base font-bold text-white mb-1 line-clamp-2 min-h-[28px]">{pick.title}</h3>
            <p className="text-cyan-400 mb-2 text-sm font-semibold">{pick.price}</p>
            <button className="mt-auto px-4 py-1.5 bg-gradient-to-r from-cyan-400 to-yellow-400 text-indigo-900 font-bold rounded-full shadow hover:scale-105 hover:shadow-lg text-sm">Thêm Vào Giỏ</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestPicksSection;