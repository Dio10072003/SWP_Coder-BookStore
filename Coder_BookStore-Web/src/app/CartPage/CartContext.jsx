"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { orderService } from "../services/orderService";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (book) => {
    setCart((prev) => {
      const found = prev.find((item) => item.id === book.id);
      if (found) {
        return prev.map((item) =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...book, quantity: 1 }];
    });
  };

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((item) => item.id !== id));
  const clearCart = () => setCart([]);
  const updateQuantity = (id, quantity) =>
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );

  const checkout = async () => {
    if (cart.length === 0) return false;
    const order = {
      order_code: "ORDER-" + Date.now(),
      status: "Đã đặt hàng",
      location: "Hệ thống",
      note: "Đơn hàng từ website",
    };
    try {
      await orderService.createOrder(order);
      clearCart();
      return true;
    } catch (err) {
      alert("Lỗi khi lưu đơn hàng: " + err.message);
      return false;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
/*
'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { orderService } from '../services/orderService';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('cart');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (book) => {
    setCart(prev => {
      const found = prev.find(item => item.id === book.id);
      if (found) {
        return prev.map(item =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...book, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
  const clearCart = () => setCart([]);
  const updateQuantity = (id, quantity) => setCart(prev =>
    prev.map(item => item.id === id ? { ...item, quantity } : item)
  );

  const checkout = async () => {
    if (cart.length === 0) return false;
    const order = {
      order_code: 'ORDER-' + Date.now(),
      status: 'Đã đặt hàng',
      location: 'Hệ thống',
      note: 'Đơn hàng từ website',
    };
    try {
      await orderService.createOrder(order);
      clearCart();
      return true;
    } catch (err) {
      alert('Lỗi khi lưu đơn hàng: ' + err.message);
      return false;
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity, checkout }}>
      {children}
    </CartContext.Provider>
  );
}; 
*/
