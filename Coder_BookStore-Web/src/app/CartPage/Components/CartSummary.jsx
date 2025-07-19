import React, { useState } from 'react';
import { FaTrash, FaCreditCard } from 'react-icons/fa';
import { useCart } from '../CartContext';

const CartSummary = ({ items, onClear }) => {
  const { checkout } = useCart();
  const [success, setSuccess] = useState(false);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isEmpty = items.length === 0;

  const handleCheckout = async () => {
    const ok = await checkout();
    if (ok) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
    }
  };
  return (
    <div className="sticky top-24 w-full md:w-80">
      <div className="backdrop-blur-2xl bg-white/40 rounded-3xl shadow-2xl border-2 border-gradient-to-br from-purple-300/60 via-pink-200/60 to-yellow-200/60 p-6 sm:p-8 md:p-10 flex flex-col items-center animate-gradient-move">
        <div className="font-extrabold text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-500 bg-clip-text text-transparent animate-gradient-move mb-2 tracking-tight drop-shadow">Tổng kết</div>
        <div className="w-full flex items-center justify-between text-base sm:text-lg md:text-xl font-bold mb-4">
          <span className="flex items-center gap-2"><FaCreditCard className="text-pink-400" /> Tổng:</span>
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-move">{total.toLocaleString()} VND</span>
        </div>
        <button
          onClick={onClear}
          disabled={isEmpty}
          className="w-full py-2 sm:py-2.5 md:py-3 mb-2 rounded-full bg-gradient-to-r from-pink-400 to-orange-400 text-white font-bold shadow-lg hover:scale-105 hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 animate-shake"
        >
          <FaTrash /> Xóa giỏ hàng
        </button>
        <button
          disabled={isEmpty}
          onClick={handleCheckout}
          className="w-full py-3 sm:py-3.5 md:py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-extrabold text-base sm:text-lg md:text-xl shadow-xl mt-2 animate-glow hover:scale-105 hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <FaCreditCard /> Thanh toán
        </button>
        {success && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-green-500 text-white rounded-xl shadow-lg font-bold text-lg animate-bounce">
            🎉 Mua hàng thành công!
          </div>
        )}
        <style jsx>{`
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
    </div>
  );
};

export default CartSummary; 