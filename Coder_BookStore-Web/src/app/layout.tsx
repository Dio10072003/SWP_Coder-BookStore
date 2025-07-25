// app/layout.tsx
import "./globals.css";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export const metadata = {
  title: "Coder-Bookstore 🌈",
  description: "Thế giới sách đa dạng cho bạn đọc muôn phương",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="scroll-smooth bg-gradient-to-br from-purple-300 via-pink-300 to-yellow-300 dark:from-purple-900 dark:via-pink-900 dark:to-yellow-900"
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#a78bfa" />
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&family=Open+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col w-full bg-white text-gray-900 dark:text-gray-100 font-sans selection:bg-pink-500 selection:text-white">
        <Header />
        <main className="flex-grow w-full px-2 sm:px-4 md:px-8 lg:max-w-7xl lg:mx-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
/*
'use client';
import React, { useEffect, useState } from 'react';
import { orderService } from '../services/orderService';

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      try {
        const data = await orderService.getOrders();
        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || 'Lỗi không xác định');
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  if (loading) return <div className="text-center py-16 text-lg">Đang tải lịch sử đơn hàng...</div>;
  if (error) return <div className="text-center py-16 text-red-500">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Lịch sử đơn hàng</h1>
      {orders.length === 0 ? (
        <div className="text-center text-gray-500">Bạn chưa có đơn hàng nào.</div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id || order.order_code} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <div className="font-bold text-lg text-purple-600">Mã đơn: {order.order_code}</div>
                <div className="text-sm text-gray-500">{order.created_at ? new Date(order.created_at).toLocaleString() : ''}</div>
              </div>
              <div className="mb-2"><span className="font-semibold">Trạng thái:</span> {order.status}</div>
              <div className="mb-2"><span className="font-semibold">Vị trí:</span> {order.location}</div>
              <div className="mb-2"><span className="font-semibold">Ghi chú:</span> {order.note}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

*/
