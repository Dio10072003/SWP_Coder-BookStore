import React from 'react';

const CartItem = ({ item, onRemove, onUpdateQuantity }) => (
  <div className="flex items-center justify-between gap-4 bg-white/60 backdrop-blur-md rounded-2xl shadow-lg p-4 mb-4 transition-transform hover:scale-[1.025] hover:shadow-2xl group">
    <div className="flex items-center gap-4">
      {/* Product image or placeholder */}
      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center overflow-hidden shadow group-hover:ring-2 group-hover:ring-purple-300 transition-all">
        {item.image ? (
          <img src={item.image} alt={item.title} className="object-cover w-full h-full" />
        ) : (
          <svg width="36" height="36" fill="none" viewBox="0 0 24 24" className="opacity-60">
            <rect x="3" y="6" width="18" height="13" rx="2" fill="#a78bfa"/>
            <rect x="7" y="10" width="4" height="4" rx="1" fill="#f472b6"/>
            <rect x="13" y="10" width="4" height="4" rx="1" fill="#f472b6"/>
          </svg>
        )}
      </div>
      <div>
        <div className="font-semibold text-lg text-purple-800 drop-shadow-sm">{item.title}</div>
        <div className="text-sm text-gray-500">{item.price.toLocaleString()} VND</div>
      </div>
    </div>
    <div className="flex items-center gap-2">
      {/* Quantity stepper */}
      <button
        onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
        className="w-8 h-8 rounded-full bg-purple-200 text-purple-700 font-bold flex items-center justify-center hover:bg-purple-300 transition"
        aria-label="Decrease quantity"
      >-</button>
      <input
        type="number"
        min={1}
        value={item.quantity}
        onChange={e => onUpdateQuantity(item.id, Math.max(1, Number(e.target.value)))}
        className="w-12 border rounded px-1 text-center focus:ring-2 focus:ring-purple-300"
      />
      <button
        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
        className="w-8 h-8 rounded-full bg-pink-200 text-pink-700 font-bold flex items-center justify-center hover:bg-pink-300 transition"
        aria-label="Increase quantity"
      >+</button>
      <button
        onClick={() => onRemove(item.id)}
        className="ml-2 text-red-500 hover:underline hover:text-red-700 font-medium transition"
      >
        Remove
      </button>
    </div>
  </div>
);

export default CartItem; 