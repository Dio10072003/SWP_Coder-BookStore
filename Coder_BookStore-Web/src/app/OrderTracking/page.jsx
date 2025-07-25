"use client";
import React, { useEffect, useState } from "react";
import { orderService } from "../services/orderService";

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
        setError(err.message || "Lỗi không xác định");
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="text-center py-16 text-lg">
        Đang tải lịch sử đơn hàng...
      </div>
    );
  if (error)
    return <div className="text-center py-16 text-red-500">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
        Lịch sử đơn hàng
      </h1>
      {orders.length === 0 ? (
        <div className="text-center text-gray-500">
          Bạn chưa có đơn hàng nào.
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id || order.order_code}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="font-bold text-lg text-purple-600">
                  Mã đơn: {order.order_code}
                </div>
                <div className="text-sm text-gray-500">
                  {order.created_at
                    ? new Date(order.created_at).toLocaleString()
                    : ""}
                </div>
              </div>
              <div className="mb-2">
                <span className="font-semibold">Trạng thái:</span>{" "}
                {order.status}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Vị trí:</span> {order.location}
              </div>
              <div className="mb-2">
                <span className="font-semibold">Ghi chú:</span> {order.note}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
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
