import React from 'react';
import Image from 'next/image';
import coderTour from '@/assets/Coder-Tour.jpg';

const PromotionHeader = () => (
  <header className="py-10 text-center bg-gradient-to-r from-pink-500 to-yellow-500 text-white">
    <div className="flex justify-center mb-3">
      <Image
        src={coderTour}
        alt="CoderTour Logo"
        width={56}
        height={56}
        className="rounded-full shadow-lg animate-float bg-white/80 p-1"
        style={{ objectFit: 'contain' }}
      />
    </div>
    <h1 className="text-4xl font-bold mb-2">Khuyến Mãi Đặc Biệt</h1>
    <p className="text-lg">Khám phá các chương trình ưu đãi hấp dẫn chỉ có tại Coder-BookStore!</p>
  </header>
);

export default PromotionHeader; 