'use client'
import React from 'react';
import PromotionHeader from './Components/PromotionHeader.jsx';
import PromotionList from './Components/PromotionList.jsx';
import PromotionDetail from './Components/PromotionDetail.jsx';
import PromotionDemo from './Components/PromotionDemo.jsx';

export default function PromotionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-white">
      <PromotionHeader />
      <div className="flex flex-col items-center">
        <div className="w-full max-w-3xl">
          <PromotionDemo />
        </div>
      </div>
      <PromotionList />
      <PromotionDetail />
    </div>
  );
} 