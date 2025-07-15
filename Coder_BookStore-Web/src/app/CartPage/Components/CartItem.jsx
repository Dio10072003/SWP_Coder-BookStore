import React from 'react';
import { FaTrash } from 'react-icons/fa';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => (
  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/30 backdrop-blur-2xl rounded-3xl shadow-2xl border-2 border-gradient-to-br from-purple-300/60 via-pink-200/60 to-yellow-200/60 p-4 sm:p-6 md:p-8 mb-6 transition-transform hover:scale-[1.035] hover:shadow-2xl group animate-gradient-move">
    <div className="flex items-center gap-4 w-full sm:w-auto">
      {/* Product image or placeholder */}
      <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center overflow-hidden shadow-lg border-4 border-white/40 group-hover:ring-4 group-hover:ring-pink-300 transition-all">
        {item.image ? (
          <img src={item.image} alt={item.title} className="object-cover w-full h-full" />
        ) : (
          <svg width="48" height="48" fill="none" viewBox="0 0 24 24" className="opacity-60">
            <rect x="3" y="6" width="18" height="13" rx="2" fill="#a78bfa"/>
            <rect x="7" y="10" width="4" height="4" rx="1" fill="#f472b6"/>
            <rect x="13" y="10" width="4" height="4" rx="1" fill="#f472b6"/>
          </svg>
        )}
      </div>
      <div>
        <div className="font-extrabold text-lg sm:text-xl md:text-2xl bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-500 bg-clip-text text-transparent animate-gradient-move mb-1">{item.title}</div>
        <div className="text-base md:text-lg font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-move">{item.price.toLocaleString()} VND</div>
      </div>
    </div>
    <div className="flex items-center gap-2 mt-4 sm:mt-0">
      {/* Quantity stepper */}
      <button
        onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
        className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-purple-300 to-pink-300 text-purple-800 font-extrabold flex items-center justify-center hover:bg-purple-400 hover:text-white shadow-lg transition text-xl md:text-2xl animate-glow"
        aria-label="Decrease quantity"
      >-</button>
      <input
        type="number"
        min={1}
        value={item.quantity}
        onChange={e => onUpdateQuantity(item.id, Math.max(1, Number(e.target.value)))}
        className="w-14 sm:w-16 md:w-20 border-2 border-purple-200 rounded-xl px-2 text-center focus:ring-2 focus:ring-pink-300 text-lg md:text-xl bg-white/60 shadow"
      />
      <button
        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
        className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-pink-300 to-yellow-300 text-pink-800 font-extrabold flex items-center justify-center hover:bg-pink-400 hover:text-white shadow-lg transition text-xl md:text-2xl animate-glow"
        aria-label="Increase quantity"
      >+</button>
      <button
        onClick={() => onRemove(item.id)}
        className="ml-3 w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-pink-400 to-orange-400 text-white shadow-lg hover:scale-110 hover:shadow-2xl transition-all animate-shake"
        title="Xóa sản phẩm"
      >
        <FaTrash />
      </button>
    </div>
    <style jsx global>{`
      @keyframes glow {
        0% { box-shadow: 0 0 8px #a78bfa, 0 0 16px #f472b6; }
        50% { box-shadow: 0 0 24px #a78bfa, 0 0 32px #f472b6; }
        100% { box-shadow: 0 0 8px #a78bfa, 0 0 16px #f472b6; }
      }
      .animate-glow {
        animation: glow 2.5s infinite alternate;
      }
      @keyframes shake {
        10%, 90% { transform: translateX(-1px); }
        20%, 80% { transform: translateX(2px); }
        30%, 50%, 70% { transform: translateX(-4px); }
        40%, 60% { transform: translateX(4px); }
      }
      .animate-shake:hover {
        animation: shake 0.4s;
      }
    `}</style>
  </div>
);

export default CartItem; 