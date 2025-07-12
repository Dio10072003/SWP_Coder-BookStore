"use client";

import React, { useState, useEffect } from 'react';
import { addToCartLocal } from '../../utils/cartUtils';
import { bookService } from '../../services/bookService';

export default function BestPicksSection() {
  const [picks, setPicks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBestPicks = async () => {
      try {
        setLoading(true);
        setError(null);
        const bestPicks = await bookService.getBestPicks(6); // Fetch 6 best picks
        setPicks(bestPicks);
      } catch (err) {
        console.error('Error fetching best picks:', err);
        setError('Failed to load best picks');
      } finally {
        setLoading(false);
      }
    };

    fetchBestPicks();
  }, []);

  // Wrapper for rainbow border
  const RainbowWrapper = ({ children }) => (
    <div className="relative py-12 px-4">
      <div className="rainbow-outer rounded-3xl p-[4px] md:p-[6px] shadow-2xl">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl h-full w-full">
          {children}
        </div>
      </div>
      <style jsx>{`
        .rainbow-outer {
          background: linear-gradient(270deg, #a78bfa, #f472b6, #facc15, #4ade80, #38bdf8, #a78bfa);
          background-size: 1200% 1200%;
          animation: rainbow-border 8s linear infinite;
        }
        @keyframes rainbow-border {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );

  if (loading) {
    return (
      <RainbowWrapper>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-white drop-shadow-lg">Best Picks</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="relative p-[2px] rounded-lg bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 animate-pulse">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg flex flex-col items-center text-center shadow-lg border border-white/30">
                  <div className="w-6 h-6 bg-white/40 rounded mb-2"></div>
                  <div className="h-4 bg-white/40 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-white/40 rounded w-1/2 mb-2"></div>
                  <div className="h-8 bg-white/40 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RainbowWrapper>
    );
  }

  if (error) {
    return (
      <RainbowWrapper>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-white drop-shadow-lg">Best Picks</h2>
          <div className="text-center">
            <p className="text-red-200 font-semibold text-lg mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-3 bg-white/25 backdrop-blur-sm rounded-lg hover:bg-white/35 transition-all duration-200 text-white font-semibold border border-white/30 shadow-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </RainbowWrapper>
    );
  }

  if (!picks || picks.length === 0) {
    return (
      <RainbowWrapper>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-white drop-shadow-lg">Best Picks</h2>
          <div className="text-center">
            <p className="text-white/80 font-medium text-lg">No best picks available at the moment.</p>
          </div>
        </div>
      </RainbowWrapper>
    );
  }

  return (
    <RainbowWrapper>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-white drop-shadow-lg">Best Picks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {picks.map((pick, index) => (
            <div
              key={pick.id || index}
              className="relative p-[2px] rounded-lg bg-gradient-to-r from-purple-400 via-pink-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400 bg-size-200 animate-gradient-xy hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg flex flex-col items-center text-center shadow-lg border border-white/30 h-full">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mb-2 text-yellow-400 drop-shadow-sm">
                  <rect x="4" y="7" width="16" height="10" rx="2" strokeWidth={2} />
                  <path d="M8 11h8" strokeWidth={2} />
                </svg>
                <h3 className="text-base font-bold text-white mb-2 line-clamp-2 min-h-[28px] drop-shadow-sm leading-tight">{pick.title}</h3>
                <p className="text-yellow-300 font-bold mb-3 text-sm drop-shadow-sm">{Number(pick.price).toLocaleString()} VND</p>
                <AddToCartButton book={pick} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes gradient-xy {
          0%, 100% {
            background-position: 0% 50%;
          }
          25% {
            background-position: 100% 50%;
          }
          50% {
            background-position: 100% 100%;
          }
          75% {
            background-position: 0% 100%;
          }
        }
        .animate-gradient-xy {
          animation: gradient-xy 3s ease infinite;
        }
        .bg-size-200 {
          background-size: 200% 200%;
        }
      `}</style>
    </RainbowWrapper>
  );
}

function AddToCartButton({ book }) {
  const [added, setAdded] = useState(false);
  const handleAdd = () => {
    addToCartLocal(book);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };
  return (
    <div className="relative">
      <button
        className="mt-auto px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-bold rounded-full shadow-lg hover:scale-105 hover:shadow-xl text-sm transition-all duration-200 border border-yellow-300"
        onClick={handleAdd}
      >
        Thêm Vào Giỏ
      </button>
      {added && (
        <span className="absolute left-1/2 -translate-x-1/2 top-[-40px] bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg animate-bounce border border-green-400">
          ✓ Đã thêm!
        </span>
      )}
    </div>
  );
}