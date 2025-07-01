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
}

const promotionService = new PromotionService();
export default promotionService; 