import React from 'react';
import CartItem from './CartItem';

const CartList = ({ items, onRemove, onUpdateQuantity }) => (
  <div className="animate-fade-in flex flex-col gap-2">
    {items.length === 0 ? null : (
      items.map((item, idx) => (
        <div key={item.id} style={{ animationDelay: `${idx * 60}ms` }} className="animate-fade-in-up">
          <CartItem
            item={item}
            onRemove={onRemove}
            onUpdateQuantity={onUpdateQuantity}
          />
        </div>
      ))
    )}
    <style jsx global>{`
      @keyframes fade-in-up {
        0% { opacity: 0; transform: translateY(24px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in-up {
        animation: fade-in-up 0.5s cubic-bezier(.4,0,.2,1) both;
      }
      @keyframes fade-in {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }
      .animate-fade-in {
        animation: fade-in 0.7s ease both;
      }
    `}</style>
  </div>
);

export default CartList; 