'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useBooks } from '../hooks/useBooks';
import { bookService } from '../services/bookService';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { FaPlus, FaEdit, FaTrash, FaBook, FaUser, FaUserTie, FaTags } from 'react-icons/fa';
import { authorService, CreateAuthorData } from '../services/authorService';
import { categoryService, CreateCategoryData } from '../services/categoryService';
import { Author } from '../services/authorService';
import { Category } from '../services/categoryService';
import Image from "next/image";
import Link from 'next/link';

interface BookFormData {
  id?: number; // Make ID optional for new books
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

const initialFormData: BookFormData = {
  title: '',
  author: '',
  price: '',
  img: '',
  rating: 0,
  description: '',
  category: '',
  publishYear: new Date().getFullYear(),
  pages: 0,
  language: 'English',
  isbn: ''
};

const initialAuthorFormData: CreateAuthorData = {
  name: '',
  bio: '',
  avatar: '',
  country: '',
  birth_year: undefined,
  genres: [],
};

const initialCategoryFormData: CreateCategoryData = {
  name: '',
  description: '',
};

const TABS = [
  { key: 'books', label: 'Sách', icon: <FaBook /> },
  { key: 'authors', label: 'Tác giả', icon: <FaUserTie /> },
  { key: 'categories', label: 'Thể loại', icon: <FaTags /> },
];

function safeId(id: unknown): string | null {
  return (typeof id === 'string' || typeof id === 'number') ? String(id) : null;
}

export default function AdminPage() {
  const [reloadBooks, setReloadBooks] = useState(0);
  const bookFilters = useMemo(() => ({ limit: 1000, reload: reloadBooks }), [reloadBooks]);
  const { books, loading, error } = useBooks(bookFilters);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<number | null>(null);
  const [formData, setFormData] = useState<BookFormData>(initialFormData);
  const [categories, setCategories] = useState<string[]>([]);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [tab, setTab] = useState('books');
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  const [stats, setStats] = useState({ books: 0, users: 0, authors: 0, categories: 0 });

  // Keep all state declarations for both author and user management
  const [showAuthorForm, setShowAuthorForm] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<string | null>(null);
  const [authorFormData, setAuthorFormData] = useState<CreateAuthorData>(initialAuthorFormData);
  const [authorFormLoading, setAuthorFormLoading] = useState(false);
  const [authorFormError, setAuthorFormError] = useState<string | null>(null);
  const [authorSuccessMessage, setAuthorSuccessMessage] = useState<string | null>(null);

  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [categoryFormData, setCategoryFormData] = useState<CreateCategoryData>(initialCategoryFormData);
  const [categoryFormLoading, setCategoryFormLoading] = useState(false);
  const [categoryFormError, setCategoryFormError] = useState<string | null>(null);
  const [categorySuccessMessage, setCategorySuccessMessage] = useState<string | null>(null);

  const [accessDenied, setAccessDenied] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    if (!userStr) {
      setAccessDenied(true);
      return;
    }
    try {
      const user = JSON.parse(userStr);
      if (user.role !== 'Admin') {
        setAccessDenied(true);
      }
    } catch {
      setAccessDenied(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      setUserRole(user ? JSON.parse(user).role : "");
    }
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await bookService.getCategories();
        setCategories(cats);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (tab === 'authors') {
      fetch('/api/authors')
        .then(res => res.json())
        .then(data => setAuthors(Array.isArray(data) ? data : []));
    }
  }, [tab]);

  useEffect(() => {
    if (tab === 'categories') {
      fetch('/api/categories')
        .then(res => res.json())
        .then(data => setCategoriesData(Array.isArray(data) ? data : []));
    }
  }, [tab]);

  useEffect(() => {
    Promise.all([
      fetch('/api/books').then(res => res.json()),
      fetch('/api/users').then(res => res.json()),
      fetch('/api/authors').then(res => res.json()),
      fetch('/api/categories').then(res => res.json()),
    ]).then(([books, users, authors, categories]) => {
      setStats({
        books: Array.isArray(books) ? books.length : 0,
        users: Array.isArray(users) ? users.length : 0,
        authors: Array.isArray(authors) ? authors.length : 0,
        categories: Array.isArray(categories) ? categories.length : 0,
      });
    });
  }, []);

  const fetchBookCount = async () => {
    try {
      const res = await fetch('/api/books');
      const result = await res.json();
      if (typeof result.total === 'number') {
        setStats(prev => ({ ...prev, books: result.total }));
      } else if (Array.isArray(result)) {
        setStats(prev => ({ ...prev, books: result.length }));
      }
    } catch {
      setStats(prev => ({ ...prev, books: 0 }));
    }
  };

  useEffect(() => {
    if (tab === 'books') {
      fetchBookCount();
    }
  }, [tab]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' || name === 'publishYear' || name === 'pages' ? parseFloat(value) || 0 : value
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingBook(null);
    setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);
    setSuccessMessage(null);

    try {
      if (editingBook) {
        await bookService.updateBook(editingBook, formData);
        setSuccessMessage('Sách đã được cập nhật thành công!');
      } else {
        await bookService.createBook(formData);
        setSuccessMessage('Sách đã được thêm thành công!');
      }
      resetForm();
      setShowForm(false);
      setReloadBooks(r => r + 1);
      await fetchBookCount();
    } catch (error) {
      setFormError(
        error && typeof error === 'object' && 'message' in error
          ? (error as { message?: string })?.message ?? 'Có lỗi xảy ra'
          : 'Có lỗi xảy ra'
      );
    }
  };

  const handleEdit = (book: BookFormData) => {
    setFormData({
      title: book.title,
      author: book.author,
      price: book.price,
      img: book.img,
      rating: book.rating,
      description: book.description,
      category: book.category,
      publishYear: book.publishYear,
      pages: book.pages,
      language: book.language,
      isbn: book.isbn
    });
    setEditingBook(book.id ?? null); // Use nullish coalescing for cleaner ID handling
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa sách này?')) {
      return;
    }

    try {
      await bookService.deleteBook(id);
      setSuccessMessage('Sách đã được xóa thành công!');
      setReloadBooks(r => r + 1);
      await fetchBookCount();
    } catch (error) {
      setFormError(
        error && typeof error === 'object' && 'message' in error
          ? (error as { message?: string })?.message ?? 'Có lỗi xảy ra khi xóa sách'
          : 'Có lỗi xảy ra khi xóa sách'
      );
    }
  };

  const handleAddNew = () => {
    resetForm();
    setShowForm(true);
  };

  const fetchAuthors = async () => {
    try {
      const authors: Author[] = await authorService.getAllAuthors();
      setAuthors(authors);
    } catch {
      setAuthors([]);
    }
  };

  useEffect(() => {
    if (tab === 'authors') {
      fetchAuthors();
    }
  }, [tab]);

  const handleAuthorInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAuthorFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetAuthorForm = () => {
    setAuthorFormData(initialAuthorFormData);
    setEditingAuthor(null);
    setAuthorFormError(null);
  };

  const handleAuthorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthorFormLoading(true);
    setAuthorFormError(null);
    setAuthorSuccessMessage(null);
    try {
      if (editingAuthor) {
        await authorService.updateAuthor(editingAuthor, authorFormData);
        setAuthorSuccessMessage('Tác giả đã được cập nhật thành công!');
      } else {
        await authorService.createAuthor(authorFormData);
        setAuthorSuccessMessage('Tác giả đã được thêm thành công!');
      }
      resetAuthorForm();
      setShowAuthorForm(false);
      fetchAuthors();
    } catch (error) {
      setAuthorFormError(
        error && typeof error === 'object' && 'message' in error
          ? (error as { message?: string })?.message ?? 'Có lỗi xảy ra'
          : 'Có lỗi xảy ra'
      );
    } finally {
      setAuthorFormLoading(false);
    }
  };

  const handleEditAuthor = (author: Author) => {
    setAuthorFormData({
      name: author.name || '',
      bio: author.bio || '',
      avatar: author.avatar || '',
      country: author.country || '',
      birth_year: author.birth_year,
      genres: author.genres || [],
    });
    setEditingAuthor(safeId(author.id));
    setShowAuthorForm(true);
  };

  const handleDeleteAuthor = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa tác giả này?')) return;
    setAuthorFormLoading(true);
    try {
      await authorService.deleteAuthor(id);
      setAuthorSuccessMessage('Tác giả đã được xóa thành công!');
      fetchAuthors();
    } catch (error) {
      setAuthorFormError(
        error && typeof error === 'object' && 'message' in error
          ? (error as { message?: string })?.message ?? 'Có lỗi xảy ra'
          : 'Có lỗi xảy ra'
      );
    } finally {
      setAuthorFormLoading(false);
    }
  };

  const fetchCategoriesData = async () => {
    try {
      const categories: Category[] = await categoryService.getAllCategories();
      setCategoriesData(categories);
    } catch {
      setCategoriesData([]);
    }
  };

  useEffect(() => {
    if (tab === 'categories') {
      fetchCategoriesData();
    }
  }, [tab]);

  const handleCategoryInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCategoryFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetCategoryForm = () => {
    setCategoryFormData(initialCategoryFormData);
    setEditingCategory(null);
    setCategoryFormError(null);
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCategoryFormLoading(true);
    setCategoryFormError(null);
    setCategorySuccessMessage(null);
    try {
      if (editingCategory) {
        await categoryService.updateCategory(editingCategory, categoryFormData);
        setCategorySuccessMessage('Thể loại đã được cập nhật thành công!');
      } else {
        await categoryService.createCategory(categoryFormData);
        setCategorySuccessMessage('Thể loại đã được thêm thành công!');
      }
      resetCategoryForm();
      setShowCategoryForm(false);
      fetchCategoriesData();
    } catch (error) {
      setCategoryFormError(
        error && typeof error === 'object' && 'message' in error
          ? (error as { message?: string })?.message ?? 'Có lỗi xảy ra'
          : 'Có lỗi xảy ra'
      );
    } finally {
      setCategoryFormLoading(false);
    }
  };

  const handleEditCategory = (category: Category) => {
    setCategoryFormData({
      name: category.name || '',
      description: category.description || '',
    });
    setEditingCategory(safeId(category.id));
    setShowCategoryForm(true);
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa thể loại này?')) return;
    setCategoryFormLoading(true);
    try {
      await categoryService.deleteCategory(id);
      setCategorySuccessMessage('Thể loại đã được xóa thành công!');
      fetchCategoriesData();
    } catch (error) {
      setCategoryFormError(
        error && typeof error === 'object' && 'message' in error
          ? (error as { message?: string })?.message ?? 'Có lỗi xảy ra'
          : 'Có lỗi xảy ra'
      );
    } finally {
      setCategoryFormLoading(false);
    }
  };

  // Thêm màu sắc cho từng ô thống kê
  const statColors = [
    '#2563eb', // Sách - xanh dương
    '#22c55e', // Người dùng - xanh lá
    '#a21caf', // Tác giả - tím
    '#ec4899', // Thể loại - hồng
  ];

  if (accessDenied) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Bạn không có phận sự để truy cập tính năng này</h2>
          <Link href="/" className="text-blue-600 underline">Quay về trang chủ</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Thống kê tổng quan */}
        <div className="flex gap-4">
          {[
            { label: 'Sách', value: stats.books, icon: <FaBook />, color: statColors[0] },
            { label: 'Người dùng', value: stats.users, icon: <FaUser />, color: statColors[1] },
            { label: 'Tác giả', value: stats.authors, icon: <FaUserTie />, color: statColors[2] },
            { label: 'Thể loại', value: stats.categories, icon: <FaTags />, color: statColors[3] },
          ].map((stat) => (
            <div key={stat.label} style={{ borderTop: `4px solid ${stat.color}` }} className="rounded shadow p-4 flex-1 text-center bg-white">
              <div style={{ color: stat.color, fontSize: 32 }}>{stat.icon}</div>
              <div style={{ color: stat.color, fontWeight: 700, fontSize: 28 }}>{stat.value}</div>
              <div>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-semibold border-b-2 transition-all ${tab === t.key ? 'bg-white dark:bg-gray-800 border-blue-600 text-blue-700 dark:text-blue-300' : 'bg-gray-200 dark:bg-gray-700 border-transparent text-gray-600 dark:text-gray-300'}`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === 'books' && (
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                <div className="flex justify-between items-center">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Quản lý sách - Admin Panel
                  </h1>
                  <button
                    onClick={handleAddNew}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <FaPlus /> Thêm sách mới
                  </button>
                </div>
              </div>

              {/* Success/Error Messages */}
              {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                  {successMessage}
                </div>
              )}

              {formError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {formError}
                </div>
              )}

              {/* Book Form */}
              {showForm && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {editingBook ? 'Chỉnh sửa sách' : 'Thêm sách mới'}
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Tiêu đề *
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Tác giả *
                        </label>
                        <input
                          type="text"
                          name="author"
                          value={formData.author}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Giá *
                        </label>
                        <input
                          type="text"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          placeholder="150.000đ"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Thể loại *
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Chọn thể loại</option>
                          {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Đánh giá
                        </label>
                        <input
                          type="number"
                          name="rating"
                          value={formData.rating}
                          onChange={handleInputChange}
                          min="0"
                          max="5"
                          step="0.1"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Năm xuất bản
                        </label>
                        <input
                          type="number"
                          name="publishYear"
                          value={formData.publishYear}
                          onChange={handleInputChange}
                          min="1900"
                          max={new Date().getFullYear() + 1}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Số trang
                        </label>
                        <input
                          type="number"
                          name="pages"
                          value={formData.pages}
                          onChange={handleInputChange}
                          min="1"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Ngôn ngữ
                        </label>
                        <input
                          type="text"
                          name="language"
                          value={formData.language}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          ISBN
                        </label>
                        <input
                          type="text"
                          name="isbn"
                          value={formData.isbn}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        URL ảnh
                      </label>
                      <input
                        type="url"
                        name="img"
                        value={formData.img}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Mô tả
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="submit"
                        disabled={formLoading}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                      >
                        {formLoading ? 'Đang xử lý...' : (editingBook ? 'Cập nhật' : 'Thêm sách')}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowForm(false);
                          resetForm();
                        }}
                        className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Hủy
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Books List */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Danh sách sách ({stats.books})
                  </h2>
                </div>

                {loading && <Loading message="Đang tải danh sách sách..." />}
                {error && <Error message={`Lỗi: ${error}`} />}

                {!loading && !error && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 table-fixed admin-table">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Sách
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Thể loại
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Giá
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Đánh giá
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Thao tác
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {books.map((book) => (
                          <tr key={book.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap align-top">
                              <div className="flex items-center gap-3">
                                <div className="flex-shrink-0 h-14 w-10">
                                  <Image
                                    className="h-14 w-10 rounded-lg object-cover border border-gray-300 dark:border-gray-700 shadow"
                                    src={book.img}
                                    alt={book.title}
                                    width={40}
                                    height={40}
                                  />
                                </div>
                                <div className="ml-3 flex flex-col justify-center">
                                  <span className="font-bold text-base text-gray-900 dark:text-white leading-tight break-words" style={{ lineHeight: '1.3' }}>{book.title}</span>
                                  <span className="text-sm text-gray-500 dark:text-gray-400">{book.author}</span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 align-top">
                              {book.category}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 align-top">
                              {book.price}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-500 align-top">
                              {'⭐'.repeat(Math.floor(book.rating))} ({book.rating})
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium align-top">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleEdit(book)}
                                  className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                  title="Chỉnh sửa"
                                >
                                  <FaEdit className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={() => handleDelete(book.id!)} // Assuming book.id is always present for existing books
                                  className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                  title="Xóa"
                                >
                                  <FaTrash className="w-5 h-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {books.length === 0 && (
                          <tr>
                            <td colSpan={5} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                              Không có sách nào.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Authors Tab Content */}
        {tab === 'authors' && (
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                <div className="flex justify-between items-center">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Quản lý tác giả - Admin Panel
                  </h1>
                  <button
                    onClick={() => { resetAuthorForm(); setShowAuthorForm(true); }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <FaPlus /> Thêm tác giả mới
                  </button>
                </div>
              </div>

              {authorSuccessMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                  {authorSuccessMessage}
                </div>
              )}
              {authorFormError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {authorFormError}
                </div>
              )}

              {showAuthorForm && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {editingAuthor ? 'Chỉnh sửa tác giả' : 'Thêm tác giả mới'}
                  </h2>
                  <form onSubmit={handleAuthorSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tên tác giả *</label>
                      <input
                        type="text"
                        name="name"
                        value={authorFormData.name}
                        onChange={handleAuthorInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tiểu sử</label>
                      <textarea
                        name="bio"
                        value={authorFormData.bio || ''}
                        onChange={handleAuthorInputChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Avatar URL</label>
                      <input
                        type="text"
                        name="avatar"
                        value={authorFormData.avatar || ''}
                        onChange={handleAuthorInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quốc gia</label>
                      <input
                        type="text"
                        name="country"
                        value={authorFormData.country || ''}
                        onChange={handleAuthorInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Năm sinh</label>
                      <input
                        type="number"
                        name="birth_year"
                        value={authorFormData.birth_year || ''}
                        onChange={(e) => setAuthorFormData(prev => ({ ...prev, birth_year: parseInt(e.target.value) || undefined }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    {/* Genres can be handled with a comma-separated input or multi-select */}
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        disabled={authorFormLoading}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                      >
                        {authorFormLoading ? 'Đang xử lý...' : (editingAuthor ? 'Cập nhật' : 'Thêm tác giả')}
                      </button>
                      <button
                        type="button"
                        onClick={() => { setShowAuthorForm(false); resetAuthorForm(); }}
                        className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Hủy
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Danh sách tác giả ({stats.authors})
                  </h2>
                </div>
                {authorFormLoading && <Loading message="Đang tải danh sách tác giả..." />}
                {authors.length === 0 && !authorFormLoading && (
                  <div className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    Không có tác giả nào.
                  </div>
                )}
                {authors.length > 0 && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 table-fixed admin-table">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tên</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Quốc gia</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Năm sinh</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {authors.map(author => (
                          <tr key={author.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{author.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{author.country}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{author.birth_year}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleEditAuthor(author)}
                                  className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                  title="Chỉnh sửa"
                                >
                                  <FaEdit className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteAuthor(author.id ? String(author.id) : '')}
                                  className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                  title="Xóa"
                                >
                                  <FaTrash className="w-5 h-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Categories Tab Content */}
        {tab === 'categories' && (
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                <div className="flex justify-between items-center">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Quản lý thể loại - Admin Panel
                  </h1>
                  <button
                    onClick={() => { resetCategoryForm(); setShowCategoryForm(true); }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <FaPlus /> Thêm thể loại mới
                  </button>
                </div>
              </div>

              {categorySuccessMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                  {categorySuccessMessage}
                </div>
              )}
              {categoryFormError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {categoryFormError}
                </div>
              )}

              {showCategoryForm && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {editingCategory ? 'Chỉnh sửa thể loại' : 'Thêm thể loại mới'}
                  </h2>
                  <form onSubmit={handleCategorySubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tên thể loại *</label>
                      <input
                        type="text"
                        name="name"
                        value={categoryFormData.name}
                        onChange={handleCategoryInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mô tả</label>
                      <textarea
                        name="description"
                        value={categoryFormData.description || ''}
                        onChange={handleCategoryInputChange}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        disabled={categoryFormLoading}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                      >
                        {categoryFormLoading ? 'Đang xử lý...' : (editingCategory ? 'Cập nhật' : 'Thêm thể loại')}
                      </button>
                      <button
                        type="button"
                        onClick={() => { setShowCategoryForm(false); resetCategoryForm(); }}
                        className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Hủy
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Danh sách thể loại ({stats.categories})
                  </h2>
                </div>
                {categoryFormLoading && <Loading message="Đang tải danh sách thể loại..." />}
                {categoriesData.length === 0 && !categoryFormLoading && (
                  <div className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    Không có thể loại nào.
                  </div>
                )}
                {categoriesData.length > 0 && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 table-fixed admin-table">
                      <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tên</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Mô tả</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {categoriesData.map(category => (
                          <tr key={category.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{category.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{category.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleEditCategory(category)}
                                  className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                  title="Chỉnh sửa"
                                >
                                  <FaEdit className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteCategory(category.id ? String(category.id) : '')}
                                  className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                  title="Xóa"
                                >
                                  <FaTrash className="w-5 h-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {userRole === 'Admin' && (
        <Link href="/admin/StaffManagement" className="inline-block mb-4 px-4 py-2 bg-blue-700 text-white rounded-lg font-bold shadow hover:bg-blue-800 transition">Quản lý Staff</Link>
      )}
    </div>
  );
}