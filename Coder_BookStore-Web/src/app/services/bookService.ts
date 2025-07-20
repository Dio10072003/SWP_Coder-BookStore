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
  minYear?: number;
  maxYear?: number;
  minRating?: number;
  maxPrice?: number;
}

export interface CreateBookData {
  title: string;
  author: string;
  price: string;
  img?: string;
  rating?: number;
  description?: string;
  category: string;
  publishYear?: number;
  pages?: number;
  language?: string;
  isbn?: string;
}

export interface UpdateBookData extends Partial<CreateBookData> {
  id: number;
}

class BookService {
  private baseUrl = '/api/books';

  async getAllBooks(filters?: BookFilters): Promise<Book[]> {
    try {
      const params = new URLSearchParams();
      if (filters?.category && filters.category !== 'All') params.append('category', filters.category);
      if (filters?.search && filters.search.trim()) params.append('search', filters.search);
      if (typeof filters?.year === 'number' && !isNaN(filters.year)) params.append('year', filters.year.toString());
      if (typeof filters?.minYear === 'number' && !isNaN(filters.minYear)) params.append('minYear', filters.minYear.toString());
      if (typeof filters?.maxYear === 'number' && !isNaN(filters.maxYear)) params.append('maxYear', filters.maxYear.toString());
      if (typeof filters?.minRating === 'number' && !isNaN(filters.minRating)) params.append('minRating', filters.minRating.toString());
      if (typeof filters?.maxPrice === 'number' && !isNaN(filters.maxPrice)) params.append('maxPrice', filters.maxPrice.toString());

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

  async createBook(bookData: CreateBookData): Promise<Book> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating book:', error);
      throw error;
    }
  }

  async updateBook(id: number, bookData: Partial<CreateBookData>): Promise<Book> {
    try {
      const response = await fetch(`${this.baseUrl}?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error updating book:', error);
      throw error;
    }
  }

  async deleteBook(id: number): Promise<{ message: string; book: Book }> {
    try {
      const response = await fetch(`${this.baseUrl}?id=${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error deleting book:', error);
      throw error;
    }
  }

  async getFeaturedBooks(limit: number = 6): Promise<Book[]> {
    const { data } = await this.getAllBooksWithTotal();
    return data.slice(0, limit);
  }

  async getBooksByCategory(category: string): Promise<Book[]> {
    const { data } = await this.getAllBooksWithTotal({ category });
    return data;
  }

  async searchBooks(query: string): Promise<Book[]> {
    const { data } = await this.getAllBooksWithTotal({ search: query });
    return data;
  }

  async getBooksByYear(year: number): Promise<Book[]> {
    const { data } = await this.getAllBooksWithTotal({ year });
    return data;
  }

  async getBooksByAuthor(authorName: string): Promise<Book[]> {
    try {
      const params = new URLSearchParams();
      params.append('author', authorName);
      
      const url = `${this.baseUrl}?${params.toString()}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      // API returns { data, total } format
      return result.data || [];
    } catch (error) {
      console.error('Error fetching books by author:', error);
      // Return empty array as fallback
      return [];
    }
  }

  async getBooksByRating(minRating: number): Promise<Book[]> {
    const { data } = await this.getAllBooksWithTotal({ minRating });
    return data;
  }

  async getBooksByPriceRange(maxPrice: number): Promise<Book[]> {
    const { data } = await this.getAllBooksWithTotal({ maxPrice });
    return data;
  }

  async getBestPicks(limit: number = 6): Promise<Book[]> {
    try {
      // Fetch books with high ratings (4.0 and above) and limit the results
      const params = new URLSearchParams();
      params.append('minRating', '4.0');
      params.append('limit', limit.toString());
      
      const url = `${this.baseUrl}?${params.toString()}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      // API returns { data, total } format
      const books = result.data || [];
      
      // Sort by rating (highest first) and return limited results
      return books
        .sort((a: Book, b: Book) => (b.rating || 0) - (a.rating || 0))
        .slice(0, limit);
    } catch (error) {
      console.error('Error fetching best picks:', error);
      // Return empty array as fallback
      return [];
    }
  }

  async getCategories(): Promise<string[]> {
    const { data } = await this.getAllBooksWithTotal();
    if (!data) return [];
    return Array.from(new Set(data.map((b: Book) => b.category))).filter(Boolean);
  }

  async getYears(): Promise<number[]> {
    try {
      const { data } = await this.getAllBooksWithTotal();
      if (!data) return [];
      // Lấy tất cả năm xuất bản từ sách, loại bỏ trùng lặp và sắp xếp
      const years = Array.from(new Set(data.map((b: Book) => b.publishYear))).filter(Boolean);
      return years.sort((a, b) => b - a); // Sắp xếp giảm dần (năm mới nhất trước)
    } catch (error) {
      console.error('Error fetching years:', error);
      return [];
    }
  }

  async getAuthors(): Promise<string[]> {
    const { data } = await this.getAllBooksWithTotal();
    if (!data) return [];
    return Array.from(new Set(data.map((b: Book) => b.author))).filter(Boolean);
  }

  async getLanguages(): Promise<string[]> {
    const { data } = await this.getAllBooksWithTotal();
    if (!data) return [];
    return Array.from(new Set(data.map((b: Book) => b.language))).filter(Boolean);
  }

  async getAllBooksWithTotal(filters?: BookFilters & { page?: number; limit?: number }): Promise<{ data: Book[]; total: number }> {
    try {
      console.log('getAllBooksWithTotal called with filters:', filters);
      const params = new URLSearchParams();
      if (filters?.category && filters.category !== 'All') params.append('category', filters.category);
      if (filters?.search && filters.search.trim()) params.append('search', filters.search);
      if (typeof filters?.year === 'number' && !isNaN(filters.year)) params.append('year', filters.year.toString());
      if (typeof filters?.minYear === 'number' && !isNaN(filters.minYear)) params.append('minYear', filters.minYear.toString());
      if (typeof filters?.maxYear === 'number' && !isNaN(filters.maxYear)) params.append('maxYear', filters.maxYear.toString());
      if (typeof filters?.minRating === 'number' && !isNaN(filters.minRating)) params.append('minRating', filters.minRating.toString());
      if (typeof filters?.maxPrice === 'number' && !isNaN(filters.maxPrice)) params.append('maxPrice', filters.maxPrice.toString());
      if (typeof filters?.page === 'number' && !isNaN(filters.page) && filters.page > 0) params.append('page', filters.page.toString());
      if (typeof filters?.limit === 'number' && !isNaN(filters.limit) && filters.limit > 0) params.append('limit', filters.limit.toString());
      const url = `${this.baseUrl}${params.toString() ? `?${params.toString()}` : ''}`;
      console.log('Fetching URL:', url);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log('API response:', result);
      if (Array.isArray(result)) {
        // fallback nếu API chưa trả về total
        return { data: result, total: result.length };
      }
      return result;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  }
}

export const bookService = new BookService(); 