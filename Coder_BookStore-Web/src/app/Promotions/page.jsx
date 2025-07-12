'use client'
import React, { useState, useCallback } from 'react';
import PromotionHeader from './Components/PromotionHeader.jsx';
import PromotionList from './Components/PromotionList.jsx';
import PromotionDetail from './Components/PromotionDetail.jsx';
import PromotionDemo from './Components/PromotionDemo.jsx';

export default function PromotionsPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const handleRefresh = useCallback(() => setRefreshKey(k => k + 1), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-white">
      <PromotionHeader />
      <div className="flex flex-col items-center">
        <div className="w-full max-w-3xl">
          <PromotionDemo onChange={handleRefresh} />
        </div>
      </div>
      <PromotionList refreshKey={refreshKey} />
      <PromotionDetail />
    </div>
  );
} 