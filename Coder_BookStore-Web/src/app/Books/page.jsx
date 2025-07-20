'use client';

import React, { useState, useEffect } from 'react';
import { bookService } from '../services/bookService';
import { categoryService } from '../services/categoryService';
import BookGrid from './Components/BookGrid';
import BookFilter from './Components/BookFilter';
import SearchBar from './Components/SearchBar';
import AddBookButton from './Components/AddBookButton';
import AddBookModal from './Components/AddBookModal';
import Pagination from './Components/Pagination';

const defaultForm = {
  title: '', author: '', price: '', img: '', rating: 0, description: '', category: '', publishYear: new Date().getFullYear(), pages: 0, language: '', isbn: ''
};

// Helper function để chuyển đổi giá về number
const parsePrice = (price) => {
  if (typeof price === 'number') return price;
  if (typeof price === 'string') {
    // Loại bỏ tất cả ký tự không phải số
    return Number(price.replace(/[^\d]/g, ''));
  }
  return 0;
};

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [formError, setFormError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalType, setModalType] = useState('create');
  const [editBook, setEditBook] = useState(null);
  const [toast, setToast] = useState(null);
  const [filters, setFilters] = useState({ category: undefined, search: '', year: undefined, minRating: undefined, maxPrice: undefined });

  useEffect(() => {
    categoryService.getAllCategories()
      .then(data => {
        const categoryNames = data.map(cat => typeof cat === 'string' ? cat : cat.name || cat.category);
        setCategories(categoryNames);
      })
      .catch(() => {
        setCategories(['Programming', 'Design', 'Data Science', 'Architecture', 'DevOps', 'Security', 'Mobile', 'Database', 'Game Development', 'Blockchain', 'Cloud', 'Project Management']);
      });
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = { page, limit: 12, ...filters };
      if (filters.category && filters.category !== 'All') params.category = filters.category;
      if (filters.search) params.search = filters.search;
      if (filters.year && filters.year !== 'All') params.year = filters.year;
      if (filters.minRating && filters.minRating !== 'All') params.minRating = filters.minRating;
      if (filters.maxPrice && filters.maxPrice !== 'All') params.maxPrice = filters.maxPrice;
      console.log('Fetching books with params:', params);
      console.log('maxPrice in params:', params.maxPrice, 'type:', typeof params.maxPrice);
      const { data, total } = await bookService.getAllBooksWithTotal(params);
      
      // Client-side filter để đảm bảo logic AND nghiêm ngặt
      let filteredData = data;
      
      // Filter theo thể loại
      if (filters.category && filters.category !== 'All') {
        filteredData = filteredData.filter(book => book.category === filters.category);
        console.log('Category filter applied:', filters.category, 'Books remaining:', filteredData.length);
      }
      
      // Filter theo năm xuất bản
      if (filters.year && filters.year !== 'All') {
        const yearNum = Number(filters.year);
        filteredData = filteredData.filter(book => {
          const bookYear = book.publishyear || book.publishYear || book.year;
          return Number(bookYear) === yearNum;
        });
        console.log('Year filter applied:', filters.year, 'Books remaining:', filteredData.length);
      }
      
      // Filter theo đánh giá tối thiểu
      if (filters.minRating && filters.minRating !== 'All') {
        const minRatingNum = Number(filters.minRating);
        filteredData = filteredData.filter(book => {
          const bookRating = Number(book.rating) || 0;
          return bookRating >= minRatingNum;
        });
        console.log('Rating filter applied:', filters.minRating, 'Books remaining:', filteredData.length);
      }
      
      // Filter theo giá tối đa
      if (filters.maxPrice && filters.maxPrice !== 'All') {
        const maxPriceNum = Number(filters.maxPrice);
        filteredData = filteredData.filter(book => {
          const bookPrice = parsePrice(book.price);
          console.log('Book:', book.title, 'Price:', bookPrice, 'Max:', maxPriceNum, 'Pass:', bookPrice <= maxPriceNum);
          return bookPrice <= maxPriceNum;
        });
        console.log('Price filter applied:', filters.maxPrice, 'Books remaining:', filteredData.length);
      }
      
      // Filter theo tìm kiếm
      if (filters.search && filters.search.trim()) {
        const searchTerm = filters.search.toLowerCase().trim();
        filteredData = filteredData.filter(book => {
          const title = (book.title || '').toLowerCase();
          const author = (book.author || '').toLowerCase();
          return title.includes(searchTerm) || author.includes(searchTerm);
        });
        console.log('Search filter applied:', filters.search, 'Books remaining:', filteredData.length);
      }
      
      setBooks(filteredData);
      setTotalPages(Math.ceil(total / 12));
      
      // Thông báo nếu không có sách nào thỏa mãn tất cả điều kiện
      if (filteredData.length === 0 && data.length > 0) {
        console.log('No books match all filters. Original books:', data.length, 'Filtered books:', filteredData.length);
        setToast('Không có sách nào thỏa mãn tất cả điều kiện lọc');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBooks(); }, [page, filters]);

  // CRUD handlers
  const handleAdd = () => {
    setForm(defaultForm);
    setModalType('create');
    setEditBook(null);
    setShowModal(true);
    setFormError(null);
  };
  const handleEdit = (book) => {
    setForm({ ...book });
    setModalType('edit');
    setEditBook(book);
    setShowModal(true);
    setFormError(null);
  };
  const handleDelete = async (book) => {
    if (!window.confirm(`Bạn có chắc muốn xóa sách "${book.title}"?`)) return;
    try {
      await bookService.deleteBook(book.id);
      setToast('Đã xóa sách!');
      fetchBooks();
    } catch (err) {
      setToast('Xóa thất bại: ' + (err.message || 'Lỗi không xác định'));
    }
  };
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: name === 'rating' || name === 'pages' || name === 'publishYear' ? Number(value) : value }));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setIsSubmitting(true);
    try {
      if (modalType === 'edit' && editBook) {
        await bookService.updateBook(editBook.id, form);
        setToast('Đã cập nhật sách!');
      } else {
        await bookService.createBook(form);
        setToast('Đã thêm sách!');
      }
      setShowModal(false);
      setEditBook(null);
      setForm(defaultForm);
      fetchBooks();
    } catch (err) {
      setFormError(err.message || 'Lỗi không xác định');
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setEditBook(null);
    setForm(defaultForm);
  };

  // Filter handlers - đảm bảo logic AND, tất cả filter phải thỏa mãn
  const handleCategoryChange = (category) => {
    setFilters(prev => ({ ...prev, category }));
    setPage(1);
  };
  const handleSearch = (search) => {
    setFilters(prev => ({ ...prev, search }));
    setPage(1);
  };
  const handleYearChange = (year) => {
    setFilters(prev => ({ ...prev, year }));
    setPage(1);
  };
  const handleRatingChange = (minRating) => {
    setFilters(prev => ({ ...prev, minRating }));
    setPage(1);
  };
  const handlePriceChange = (maxPrice) => {
    console.log('Books page - Price filter:', maxPrice, 'type:', typeof maxPrice);
    setFilters(prev => ({ ...prev, maxPrice }));
    setPage(1);
  };
  const clearFilters = () => {
    setFilters({ category: undefined, search: '', year: undefined, minRating: undefined, maxPrice: undefined }); 
    setPage(1);
  };

  // Toast auto-hide
  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(null), 2000); return () => clearTimeout(t); } }, [toast]);

  if (loading && books.length === 0) {
  return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
          </div>
        </div>
          </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Thư viện sách</h1>
          <p className="text-gray-600 text-lg">Khám phá bộ sưu tập sách đa dạng của chúng tôi</p>
        </div>
        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} />
        </div>
        {/* Filter */}
        <div className="mb-8">
        <BookFilter 
            categories={categories}
          onCategoryChange={handleCategoryChange}
            onSearch={handleSearch}
          onYearChange={handleYearChange}
          onRatingChange={handleRatingChange}
          onPriceChange={handlePriceChange}
            onClearFilters={clearFilters}
          />
        </div>
        {/* Add Book Button */}
        <AddBookButton onClick={handleAdd} />
                {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        {/* Active Filters Info */}
        {(() => {
          const activeFilters = [];
          if (filters.category && filters.category !== 'All') activeFilters.push(`Thể loại: ${filters.category}`);
          if (filters.search && filters.search.trim()) activeFilters.push(`Tìm kiếm: "${filters.search}"`);
          if (filters.year && filters.year !== 'All') activeFilters.push(`Năm: ${filters.year}`);
          if (filters.minRating && filters.minRating !== 'All') activeFilters.push(`Đánh giá: ${filters.minRating}+`);
          if (filters.maxPrice && filters.maxPrice !== 'All') activeFilters.push(`Giá: ≤${Number(filters.maxPrice).toLocaleString('vi-VN')}đ`);
          
          return activeFilters.length > 0 ? (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg">
              <div className="font-semibold mb-2">Đang áp dụng {activeFilters.length} bộ lọc:</div>
              <div className="flex flex-wrap gap-2">
                {activeFilters.map((filter, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 rounded text-sm">
                    {filter}
                  </span>
                ))}
              </div>
            </div>
          ) : null;
        })()}
        {/* Books Grid */}
        <BookGrid 
          books={books} 
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8">
            <div className="text-center text-sm text-gray-600 mb-4">
              Trang {page} / {totalPages} - Tổng {books.length} sách
            </div>
            <Pagination 
              currentPage={page} 
              totalPages={totalPages} 
              onPageChange={setPage} 
            />
        </div>
      )}
        {/* Add Book Modal */}
        {showModal && (
          <AddBookModal
            visible={showModal}
            form={form}
            formError={formError}
            onFormChange={handleFormChange}
            onSubmit={handleFormSubmit}
            onClose={handleCloseModal}
            modalType={modalType}
            isSubmitting={isSubmitting}
          />
        )}
        {/* Toast */}
        {toast && (
          <div className="fixed top-6 right-6 z-[9999] bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-xl shadow-lg font-bold animate-fade-in">
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}