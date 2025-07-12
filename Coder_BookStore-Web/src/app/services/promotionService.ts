export interface Promotion {
  id: string;
  title: string;
  description?: string;
  discount: number;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  image?: string;
}

class PromotionService {
  private baseUrl = '/api/promotions';

  async getAllPromotions(): Promise<Promotion[]> {
    try {
      const response = await fetch(this.baseUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching promotions:', error);
      throw error;
    }
  }

  async getPromotionById(id: string): Promise<Promotion> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching promotion:', error);
      throw error;
    }
  }

  async createPromotion(data: Omit<Promotion, 'id' | 'created_at' | 'updated_at'>): Promise<Promotion> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Lỗi tạo promotion');
    }
    return await response.json();
  }

  async updatePromotion(id: string, data: Partial<Promotion>): Promise<Promotion> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Lỗi cập nhật promotion');
    }
    return await response.json();
  }

  async deletePromotion(id: string): Promise<{ message: string }> {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Lỗi xóa promotion');
    }
    return await response.json();
  }
}

const promotionService = new PromotionService();
export default promotionService; 