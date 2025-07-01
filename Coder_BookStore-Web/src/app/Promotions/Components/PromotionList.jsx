'use client';
import React, { useEffect, useState } from 'react';
import promotionService from '../../services/promotionService';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=facearea&w=600&h=350';

const PromotionList = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    promotionService.getAllPromotions()
      .then(setPromotions)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-10 text-lg">Đang tải khuyến mãi...</div>;
  if (error) return <div className="text-center py-10 text-red-500 font-semibold">Lỗi: {error}</div>;

  return (
    <section className="py-10 px-4 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {promotions.map((promo) => (
        <div
          key={promo.id}
          className="relative bg-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition duration-300 group"
        >
          <img
            src={promo.image || DEFAULT_IMAGE}
            alt={promo.title}
            className="w-full h-48 object-cover group-hover:brightness-90 transition"
          />
          <div className="absolute top-4 left-4 bg-pink-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
            {promo.discount > 0 ? `-${promo.discount}%` : 'Freeship'}
          </div>
          <div className="p-6 flex flex-col h-full">
            <h2 className="text-2xl font-bold mb-2 text-pink-600 group-hover:text-yellow-500 transition">{promo.title}</h2>
            <p className="text-gray-700 mb-4 flex-1">{promo.description}</p>
            <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
              <span>
                {promo.start_date} - {promo.end_date}
              </span>
              <button className="bg-yellow-400 text-white px-4 py-1 rounded-full font-semibold shadow hover:bg-yellow-500 transition">
                Xem chi tiết
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default PromotionList; 