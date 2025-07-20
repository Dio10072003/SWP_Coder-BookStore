// orderService.ts
export interface OrderTracking {
  id?: number;
  order_code: string;
  status: string;
  location: string;
  note: string;
  updated_at?: string;
  created_at?: string;
}

const API_URL = '/api/order-tracking';

export const orderService = {
  async createOrder(order: Omit<OrderTracking, 'id' | 'updated_at' | 'created_at'>) {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order),
    });
    if (!res.ok) throw new Error('Lỗi tạo đơn hàng');
    return res.json();
  },
  async getOrders(order_code?: string) {
    const url = order_code ? `${API_URL}?order_code=${order_code}` : API_URL;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Lỗi lấy danh sách đơn hàng');
    return res.json();
  },
}; 