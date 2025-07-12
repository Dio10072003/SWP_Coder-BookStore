import React from 'react';

const CartSummary = ({ items, onClear }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isEmpty = items.length === 0;
  return (
    <div className="sticky top-24 w-full md:w-80">
      <div className="backdrop-blur-lg bg-white/80 rounded-2xl shadow-xl p-6 flex flex-col items-center border border-purple-100">
        <div className="font-extrabold text-2xl text-purple-700 mb-2 tracking-tight drop-shadow">Summary</div>
        <div className="w-full flex justify-between text-lg font-semibold mb-4">
          <span>Total:</span>
          <span className="text-pink-600">{total.toLocaleString()} VND</span>
        </div>
        <button
          onClick={onClear}
          disabled={isEmpty}
          className="w-full py-2 mb-2 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-white font-bold shadow-lg hover:scale-105 hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Clear Cart
        </button>
        <button
          disabled={isEmpty}
          className="w-full py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-extrabold text-lg shadow-xl mt-2 animate-glow hover:scale-105 hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Checkout
        </button>
        <style jsx>{`
          @keyframes glow {
            0% { box-shadow: 0 0 8px #a78bfa, 0 0 16px #f472b6; }
            50% { box-shadow: 0 0 24px #a78bfa, 0 0 32px #f472b6; }
            100% { box-shadow: 0 0 8px #a78bfa, 0 0 16px #f472b6; }
          }
          .animate-glow {
            animation: glow 2.5s infinite alternate;
          }
        `}</style>
      </div>
    </div>
  );
};

export default CartSummary; 