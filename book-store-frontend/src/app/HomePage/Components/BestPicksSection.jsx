import React from 'react';

const BestPicksSection = () => {
  const picks = [
    { title: 'Python Crash Course', price: '250K' },
    {title: 'The Pragmatic Programmer', price: '300K' },
    { title: 'Eloquent JavaScript', price: '200K' },
  ];

  return (
    <section className="py-12 px-6 bg-gray-900">
      <h2 className="text-4xl font-bold text-center text-cyan-400 mb-8 animate-bounce">Lựa Chọn Hàng Đầu</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {picks.map((pick, index) => (
          <div
            key={index}
            className="bg-indigo-800 p-6 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,255,0.7)]"
          >
            <h3 className="text-xl font-bold text-white">{pick.title}</h3>
            <p className="text-cyan-400">{pick.price}</p>
            <button className="mt-4 px-4 py-2 bg-cyan-400 text-indigo-900 rounded hover:bg-cyan-500">
              Thêm Vào Giỏ
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestPicksSection;