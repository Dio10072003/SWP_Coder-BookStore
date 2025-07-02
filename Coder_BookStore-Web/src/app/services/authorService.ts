export interface Author {
  id: string;
  name: string;
  bio?: string;
  avatar?: string;
  country?: string;
  birth_year?: number;
  genres?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface CreateAuthorData {
  name: string;
  bio?: string;
  avatar?: string;
  country?: string;
  birth_year?: number;
  genres?: string[];
}

export interface UpdateAuthorData extends Partial<CreateAuthorData> {
  id: string;
}

class AuthorService {
  private baseUrl = '/api/authors';

  async getAllAuthors(): Promise<Author[]> {
    const response = await fetch(this.baseUrl);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  }

  async getAuthorById(id: string): Promise<Author> {
    const response = await fetch(`${this.baseUrl}?id=${id}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  }

  async createAuthor(authorData: CreateAuthorData): Promise<Author> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(authorData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }

  async updateAuthor(id: string, authorData: Partial<CreateAuthorData>): Promise<Author> {
    const response = await fetch(`${this.baseUrl}?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(authorData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }

  async deleteAuthor(id: string): Promise<{ message: string }> {
    const response = await fetch(`${this.baseUrl}?id=${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }
}

export const authorService = new AuthorService(); 