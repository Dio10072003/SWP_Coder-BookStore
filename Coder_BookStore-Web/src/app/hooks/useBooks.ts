import { useState, useEffect } from 'react';
import { bookService, Book, BookFilters } from '../services/bookService';

export const useBooks = (filters?: BookFilters & { page?: number; limit?: number }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data, total } = await bookService.getAllBooksWithTotal(filters);
        setBooks(data);
        setTotal(total);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch books');
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [filters]);

  return { books, loading, error, total };
};

export const useBook = (id: number) => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await bookService.getBookById(id);
        setBook(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch book');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  return { book, loading, error };
};

export const useFeaturedBooks = (limit: number = 6) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await bookService.getFeaturedBooks(limit);
        setBooks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch featured books');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedBooks();
  }, [limit]);

  return { books, loading, error };
};

export const useBookSearch = () => {
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchBooks = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await bookService.searchBooks(query);
      setSearchResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search books');
    } finally {
      setLoading(false);
    }
  };

  return { searchResults, loading, error, searchBooks };
}; 