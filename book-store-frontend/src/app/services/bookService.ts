export interface Book {
  id: number;
  title: string;
  author: string;
  price: string;
  img: string;
  rating: number;
  description: string;
  category: string;
  publishYear: number;
  pages: number;
  language: string;
  isbn: string;
}

export interface BookFilters {
  category?: string;
  search?: string;
  year?: number;
  minRating?: number;
  maxPrice?: number;
}

class BookService {
  private baseUrl = '/api/books';

  async getAllBooks(filters?: BookFilters): Promise<Book[]> {
    try {
      const params = new URLSearchParams();
      if (filters?.category) params.append('category', filters.category);
      if (filters?.search) params.append('search', filters.search);
      if (filters?.year) params.append('year', filters.year.toString());
      if (filters?.minRating) params.append('minRating', filters.minRating.toString());
      if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());

      const url = `${this.baseUrl}${params.toString() ? `?${params.toString()}` : ''}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  }

  async getBookById(id: number): Promise<Book> {
    try {
      const response = await fetch(`${this.baseUrl}?id=${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching book:', error);
      throw error;
    }
  }

  async getFeaturedBooks(limit: number = 6): Promise<Book[]> {
    try {
      const books = await this.getAllBooks();
      // Return first N books as featured (you can modify this logic)
      return books.slice(0, limit);
    } catch (error) {
      console.error('Error fetching featured books:', error);
      throw error;
    }
  }

  async getBooksByCategory(category: string): Promise<Book[]> {
    try {
      return await this.getAllBooks({ category });
    } catch (error) {
      console.error('Error fetching books by category:', error);
      throw error;
    }
  }

  async searchBooks(query: string): Promise<Book[]> {
    try {
      return await this.getAllBooks({ search: query });
    } catch (error) {
      console.error('Error searching books:', error);
      throw error;
    }
  }

  async getBooksByYear(year: number): Promise<Book[]> {
    try {
      return await this.getAllBooks({ year });
    } catch (error) {
      console.error('Error fetching books by year:', error);
      throw error;
    }
  }

  async getBooksByRating(minRating: number): Promise<Book[]> {
    try {
      return await this.getAllBooks({ minRating });
    } catch (error) {
      console.error('Error fetching books by rating:', error);
      throw error;
    }
  }

  async getBooksByPriceRange(maxPrice: number): Promise<Book[]> {
    try {
      return await this.getAllBooks({ maxPrice });
    } catch (error) {
      console.error('Error fetching books by price range:', error);
      throw error;
    }
  }

  async getCategories(): Promise<string[]> {
    try {
      const books = await this.getAllBooks();
      const categories = [...new Set(books.map(book => book.category))];
      return categories.sort();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  async getYears(): Promise<number[]> {
    try {
      const books = await this.getAllBooks();
      const years = [...new Set(books.map(book => book.publishYear))];
      return years.sort((a, b) => b - a); // Sort descending
    } catch (error) {
      console.error('Error fetching years:', error);
      throw error;
    }
  }
}

export const bookService = new BookService(); 