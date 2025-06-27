import React from 'react';

const promotions = [
  { id: 1, title: 'Giảm 50% cho sách lập trình', desc: 'Áp dụng cho tất cả sách lập trình đến hết 30/6.', image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=facearea&w=400&h=250' },
  { id: 2, title: 'Mua 2 tặng 1', desc: 'Mua bất kỳ 2 cuốn sách, tặng ngay 1 cuốn bất kỳ.', image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=400&h=250' },
  { id: 3, title: 'Freeship toàn quốc', desc: 'Miễn phí vận chuyển cho đơn hàng từ 300.000đ.', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&h=250' },
];

const PromotionList = () => (
  <section className="py-8 px-4 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
    {promotions.map(promo => (
      <div key={promo.id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
        <img src={promo.image} alt={promo.title} className="w-full h-32 object-cover rounded-lg mb-4" />
        <h2 className="text-xl font-semibold mb-2 text-pink-600">{promo.title}</h2>
        <p className="text-gray-600 text-center">{promo.desc}</p>
      </div>
    ))}
  </section>
);

export default PromotionList; 