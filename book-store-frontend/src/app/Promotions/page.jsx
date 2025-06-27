import React from 'react';
import PromotionHeader from './Components/PromotionHeader.jsx';
import PromotionList from './Components/PromotionList.jsx';
import PromotionDetail from './Components/PromotionDetail.jsx';

export default function PromotionsPage() {
  return (
    <div className="min-h-screen bg-yellow-50">
      <PromotionHeader />
      <PromotionList />
      <PromotionDetail />
    </div>
  );
} 