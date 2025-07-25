"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CartProvider, useCart } from "./CartContext";
import CartList from "./Components/CartList";
import CartSummary from "./Components/CartSummary";

function CartPageContent() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const isEmpty = cart.length === 0;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 relative overflow-x-hidden">
      <div
        className="absolute inset-0 pointer-events-none select-none opacity-40 z-0"
        aria-hidden
      >
        {/* Decorative blurred circles for glassmorphism */}
        <div className="absolute w-96 h-96 bg-purple-300 rounded-full blur-3xl top-[-10%] left-[-10%]" />
        <div className="absolute w-80 h-80 bg-pink-200 rounded-full blur-2xl bottom-[-10%] right-[-10%]" />
      </div>
      <div className="relative z-10 w-full max-w-4xl px-4 py-10 flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div className="backdrop-blur-lg bg-white/70 rounded-3xl shadow-2xl p-8 min-h-[400px]">
            <h1 className="text-3xl font-extrabold mb-6 text-purple-700 tracking-tight drop-shadow">
              🛒 Your Cart
            </h1>
            <CartList
              items={cart}
              onRemove={removeFromCart}
              onUpdateQuantity={updateQuantity}
            />
            {isEmpty && (
              <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
                <svg
                  width="120"
                  height="120"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="mb-4 opacity-70"
                >
                  <path
                    d="M7 18c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v9c0 1.1-.9 2-2 2H7zm0 0v1a3 3 0 0 0 6 0v-1"
                    stroke="#a78bfa"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="9" cy="21" r="1" fill="#a78bfa" />
                  <circle cx="15" cy="21" r="1" fill="#a78bfa" />
                </svg>
                <div className="text-lg text-gray-500 mb-2">
                  Your cart is empty!
                </div>
                <a
                  href="/Books"
                  className="mt-2 px-6 py-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full font-semibold shadow hover:scale-105 transition-transform"
                >
                  Browse Books
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="w-full md:w-80 md:sticky md:top-24">
          <CartSummary items={cart} onClear={clearCart} />
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("user")) {
      router.replace("/Login");
    }
  }, [router]);
  return (
    <CartProvider>
      <CartPageContent />
    </CartProvider>
  );
}
/*
'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CartProvider, useCart } from './CartContext';
import CartList from './Components/CartList';
import CartSummary from './Components/CartSummary';

function CartPageContent() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const isEmpty = cart.length === 0;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 relative overflow-x-hidden">
      <div className="absolute inset-0 pointer-events-none select-none opacity-40 z-0" aria-hidden>
        {/* Decorative blurred circles for glassmorphism 
        <div className="absolute w-96 h-96 bg-purple-300 rounded-full blur-3xl top-[-10%] left-[-10%]" />
        <div className="absolute w-80 h-80 bg-pink-200 rounded-full blur-2xl bottom-[-10%] right-[-10%]" />
      </div>
      <div className="relative z-10 w-full max-w-4xl px-4 py-10 flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div className="backdrop-blur-lg bg-white/70 rounded-3xl shadow-2xl p-8 min-h-[400px]">
            <h1 className="text-3xl font-extrabold mb-6 text-purple-700 tracking-tight drop-shadow">🛒 Your Cart</h1>
            <CartList items={cart} onRemove={removeFromCart} onUpdateQuantity={updateQuantity} />
            {isEmpty && (
              <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
                <svg width="120" height="120" fill="none" viewBox="0 0 24 24" className="mb-4 opacity-70">
                  <path d="M7 18c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v9c0 1.1-.9 2-2 2H7zm0 0v1a3 3 0 0 0 6 0v-1" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="9" cy="21" r="1" fill="#a78bfa"/>
                  <circle cx="15" cy="21" r="1" fill="#a78bfa"/>
                </svg>
                <div className="text-lg text-gray-500 mb-2">Your cart is empty!</div>
                <a href="/Books" className="mt-2 px-6 py-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full font-semibold shadow hover:scale-105 transition-transform">Browse Books</a>
              </div>
            )}
          </div>
        </div>
        <div className="w-full md:w-80 md:sticky md:top-24">
          <CartSummary items={cart} onClear={clearCart} />
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('user')) {
      router.replace('/Login');
    }
  }, [router]);
  return (
    <CartProvider>
      <CartPageContent />
    </CartProvider>
  );
} 
*/
