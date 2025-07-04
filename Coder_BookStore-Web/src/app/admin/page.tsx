'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useBooks } from '../hooks/useBooks';
import { bookService } from '../services/bookService';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { FaPlus, FaEdit, FaTrash, FaEye, FaBook, FaUser, FaUserTie, FaTags } from 'react-icons/fa';
import { authorService, CreateAuthorData } from '../services/authorService';
import { userService, CreateUserData } from '../services/userService';
import { categoryService, CreateCategoryData } from '../services/categoryService';
import { User } from '../api/types/database';
import { Author } from '../services/authorService';
import { Category } from '../services/categoryService';
import Image from "next/image";

interface BookFormData {
  id?: number;
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

const initialUserFormData: CreateUserData = {
  email: '',
  name: '',
};

const initialCategoryFormData: CreateCategoryData = {
  name: '',
  description: '',
};

const TABS = [
  { key: 'books', label: 'Sách', icon: <FaBook /> },
  { key: 'users', label: 'Người dùng', icon: <FaUser /> },
  { key: 'authors', label: 'Tác giả', icon: <FaUserTie /> },
  { key: 'categories', label: 'Thể loại', icon: <FaTags /> },
];

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
  const [users, setUsers] = useState<User[]>([]);
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

  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [userFormData, setUserFormData] = useState<CreateUserData>(initialUserFormData);
  const [userFormLoading, setUserFormLoading] = useState(false);
  const [userFormError, setUserFormError] = useState<string | null>(null);
  const [userSuccessMessage, setUserSuccessMessage] = useState<string | null>(null);

  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [categoryFormData, setCategoryFormData] = useState<CreateCategoryData>(initialCategoryFormData);
  const [categoryFormLoading, setCategoryFormLoading] = useState(false);
  const [categoryFormError, setCategoryFormError] = useState<string | null>(null);
  const [categorySuccessMessage, setCategorySuccessMessage] = useState<string | null>(null);

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
    if (tab === 'users') {
      fetch('/api/users')
        .then(res => res.json())
        .then(data => setUsers(Array.isArray(data) ? data : []));
    }
  }, [tab]);

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
          ? (error as any).message
          : 'Có lỗi xảy ra'
      );
    } finally {
      setFormLoading(false);
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
    setEditingBook(book.id ?? null);
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
          ? (error as any).message
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

  const fetchUsers = async () => {
    try {
      const users: User[] = await userService.getAllUsers();
      setUsers(users);
    } catch {
      setUsers([]);
    }
  };

  useEffect(() => {
    if (tab === 'authors') {
      fetchAuthors();
    }
  }, [tab]);

  useEffect(() => {
    if (tab === 'users') {
      fetchUsers();
    }
  }, [tab]);

  const handleAuthorInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAuthorFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetAuthorForm = () => {
    setAuthorFormData(initialAuthorFormData);
    setEditingAuthor(null);
    setAuthorFormError(null);
  };

  const resetUserForm = () => {
    setUserFormData(initialUserFormData);
    setEditingUser(null);
    setUserFormError(null);
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
          ? (error as any).message
          : 'Có lỗi xảy ra'
      );
    } finally {
      setAuthorFormLoading(false);
    }
  };

  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUserFormLoading(true);
    setUserFormError(null);
    setUserSuccessMessage(null);
    try {
      if (editingUser) {
        await userService.updateUser(editingUser, userFormData);
        setUserSuccessMessage('Người dùng đã được cập nhật thành công!');
      } else {
        await userService.createUser(userFormData);
        setUserSuccessMessage('Người dùng đã được thêm thành công!');
      }
      resetUserForm();
      setShowUserForm(false);
      fetchUsers();
    } catch (error) {
      setUserFormError(
        error && typeof error === 'object' && 'message' in error
          ? (error as any).message
          : 'Có lỗi xảy ra'
      );
    } finally {
      setUserFormLoading(false);
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
    setEditingAuthor(author.id);
    setShowAuthorForm(true);
  };

  const handleEditUser = (user: User) => {
    setUserFormData({ email: user.email, name: user.name });
    setEditingUser(user.id);
    setShowUserForm(true);
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
          ? (error as any).message
          : 'Có lỗi xảy ra'
      );
    } finally {
      setAuthorFormLoading(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa người dùng này?')) return;
    setUserFormLoading(true);
    try {
      await userService.deleteUser(id);
      setUserSuccessMessage('Người dùng đã được xóa thành công!');
      fetchUsers();
    } catch (error) {
      setUserFormError(
        error && typeof error === 'object' && 'message' in error
          ? (error as any).message
          : 'Có lỗi xảy ra'
      );
    } finally {
      setUserFormLoading(false);
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
          ? (error as any).message
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
    setEditingCategory(category.id);
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
          ? (error as any).message
          : 'Có lỗi xảy ra'
      );
    } finally {
      setCategoryFormLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Thống kê tổng quan */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center">
            <FaBook className="text-3xl text-blue-600 mb-2" />
            <div className="text-2xl font-bold">{stats.books}</div>
            <div className="text-gray-600 dark:text-gray-300">Sách</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center">
            <FaUser className="text-3xl text-green-600 mb-2" />
            <div className="text-2xl font-bold">{stats.users}</div>
            <div className="text-gray-600 dark:text-gray-300">Người dùng</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center">
            <FaUserTie className="text-3xl text-purple-600 mb-2" />
            <div className="text-2xl font-bold">{stats.authors}</div>
            <div className="text-gray-600 dark:text-gray-300">Tác giả</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center">
            <FaTags className="text-3xl text-pink-600 mb-2" />
            <div className="text-2xl font-bold">{stats.categories}</div>
            <div className="text-gray-600 dark:text-gray-300">Thể loại</div>
          </div>
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
                    Danh sách sách ({books.length})
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
                                  <span className="font-bold text-base text-gray-900 dark:text-white leading-tight break-words" style={{lineHeight: '1.3'}}>{book.title}</span>
                                  <span className="text-sm text-gray-500 dark:text-gray-300 leading-snug" style={{lineHeight: '1.2'}}>Tác giả: <span className="font-medium text-blue-700 dark:text-blue-300">{book.author}</span></span>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap align-top">
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                                {book.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap align-top text-sm text-gray-900 dark:text-white font-bold">
                              {book.price}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap align-top text-sm text-gray-900 dark:text-white">
                              <span className="inline-flex items-center gap-1">
                                <span className="text-yellow-400">★</span>
                                <span className="font-semibold">{book.rating}</span>
                                <span className="text-xs text-gray-400">/5</span>
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap align-top text-sm font-medium">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => window.open(`/Books/${book.id}`, '_blank')}
                                  className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                  title="Xem chi tiết"
                                >
                                  <FaEye />
                                </button>
                                <button
                                  onClick={() => handleEdit(book)}
                                  className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                                  title="Chỉnh sửa"
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  onClick={() => handleDelete(book.id)}
                                  className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                  title="Xóa"
                                >
                                  <FaTrash />
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
        {tab === 'users' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Quản lý người dùng</h2>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700"
                onClick={() => { resetUserForm(); setShowUserForm(true); }}
              >
                <FaPlus className="inline mr-2" /> Thêm người dùng
              </button>
            </div>
            {userFormError && <Error message={userFormError} />}
            {userSuccessMessage && <div className="text-green-600 mb-2">{userSuccessMessage}</div>}
            <table className="min-w-full bg-white border rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Tên</th>
                  <th className="py-2 px-4 border-b">Ngày tạo</th>
                  <th className="py-2 px-4 border-b">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td className="py-2 px-4 border-b">{user.email}</td>
                    <td className="py-2 px-4 border-b">{user.name}</td>
                    <td className="py-2 px-4 border-b">{user.created_at ? new Date(user.created_at).toLocaleString() : ''}</td>
                    <td className="py-2 px-4 border-b">
                      <button className="mr-2 text-blue-600 hover:underline" onClick={() => handleEditUser(user)}><FaEdit /></button>
                      <button className="text-red-600 hover:underline" onClick={() => handleDeleteUser(user.id)}><FaTrash /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {showUserForm && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
                  <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={() => setShowUserForm(false)}>&times;</button>
                  <h3 className="text-xl font-bold mb-4">{editingUser ? 'Chỉnh sửa người dùng' : 'Thêm người dùng'}</h3>
                  <form onSubmit={handleUserSubmit}>
                    <div className="mb-4">
                      <label className="block mb-1 font-semibold">Email</label>
                      <input type="email" name="email" value={userFormData.email} onChange={handleUserInputChange} className="w-full border rounded px-3 py-2" required />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-1 font-semibold">Tên</label>
                      <input type="text" name="name" value={userFormData.name} onChange={handleUserInputChange} className="w-full border rounded px-3 py-2" required />
                    </div>
                    <div className="flex justify-end">
                      <button type="button" className="mr-2 px-4 py-2 bg-gray-300 rounded" onClick={() => setShowUserForm(false)}>Hủy</button>
                      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded" disabled={userFormLoading}>{userFormLoading ? 'Đang lưu...' : 'Lưu'}</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
        {tab === 'authors' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Quản lý tác giả</h2>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700"
                onClick={() => { resetAuthorForm(); setShowAuthorForm(true); }}
              >
                <FaPlus className="inline mr-2" /> Thêm tác giả
              </button>
            </div>
            {authorFormError && <Error message={authorFormError} />}
            {authorSuccessMessage && <div className="text-green-600 mb-2">{authorSuccessMessage}</div>}
            <table className="min-w-full bg-white border rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Tên</th>
                  <th className="py-2 px-4 border-b">Quốc gia</th>
                  <th className="py-2 px-4 border-b">Năm sinh</th>
                  <th className="py-2 px-4 border-b">Thể loại</th>
                  <th className="py-2 px-4 border-b">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {authors.map(author => (
                  <tr key={author.id}>
                    <td className="py-2 px-4 border-b">{author.name}</td>
                    <td className="py-2 px-4 border-b">{author.country}</td>
                    <td className="py-2 px-4 border-b">{author.birth_year}</td>
                    <td className="py-2 px-4 border-b">{Array.isArray(author.genres) ? author.genres.join(', ') : ''}</td>
                    <td className="py-2 px-4 border-b">
                      <button className="mr-2 text-blue-600 hover:underline" onClick={() => handleEditAuthor(author)}><FaEdit /></button>
                      <button className="text-red-600 hover:underline" onClick={() => handleDeleteAuthor(author.id)}><FaTrash /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {showAuthorForm && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
                  <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={() => setShowAuthorForm(false)}>&times;</button>
                  <h3 className="text-xl font-bold mb-4">{editingAuthor ? 'Chỉnh sửa tác giả' : 'Thêm tác giả'}</h3>
                  <form onSubmit={handleAuthorSubmit}>
                    <div className="mb-4">
                      <label className="block mb-1 font-semibold">Tên</label>
                      <input type="text" name="name" value={authorFormData.name} onChange={handleAuthorInputChange} className="w-full border rounded px-3 py-2" required />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-1 font-semibold">Quốc gia</label>
                      <input type="text" name="country" value={authorFormData.country} onChange={handleAuthorInputChange} className="w-full border rounded px-3 py-2" />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-1 font-semibold">Năm sinh</label>
                      <input type="number" name="birth_year" value={authorFormData.birth_year || ''} onChange={handleAuthorInputChange} className="w-full border rounded px-3 py-2" />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-1 font-semibold">Thể loại (phân cách bằng dấu phẩy)</label>
                      <input type="text" name="genres" value={Array.isArray(authorFormData.genres) ? authorFormData.genres.join(', ') : ''} onChange={e => setAuthorFormData(prev => ({ ...prev, genres: e.target.value.split(',').map(g => g.trim()).filter(Boolean) }))} className="w-full border rounded px-3 py-2" />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-1 font-semibold">Ảnh đại diện (URL)</label>
                      <input type="text" name="avatar" value={authorFormData.avatar} onChange={handleAuthorInputChange} className="w-full border rounded px-3 py-2" />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-1 font-semibold">Tiểu sử</label>
                      <textarea name="bio" value={authorFormData.bio} onChange={handleAuthorInputChange} className="w-full border rounded px-3 py-2" rows={3} />
                    </div>
                    <div className="flex justify-end">
                      <button type="button" className="mr-2 px-4 py-2 bg-gray-300 rounded" onClick={() => setShowAuthorForm(false)}>Hủy</button>
                      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded" disabled={authorFormLoading}>{authorFormLoading ? 'Đang lưu...' : 'Lưu'}</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
        {tab === 'categories' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Quản lý thể loại</h2>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700"
                onClick={() => { resetCategoryForm(); setShowCategoryForm(true); }}
              >
                <FaPlus className="inline mr-2" /> Thêm thể loại
              </button>
            </div>
            {categoryFormError && <Error message={categoryFormError} />}
            {categorySuccessMessage && <div className="text-green-600 mb-2">{categorySuccessMessage}</div>}
            <table className="min-w-full bg-white border rounded-lg">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Tên</th>
                  <th className="py-2 px-4 border-b">Mô tả</th>
                  <th className="py-2 px-4 border-b">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {categoriesData.map(category => (
                  <tr key={category.id}>
                    <td className="py-2 px-4 border-b">{category.name}</td>
                    <td className="py-2 px-4 border-b">{category.description}</td>
                    <td className="py-2 px-4 border-b">
                      <button className="mr-2 text-blue-600 hover:underline" onClick={() => handleEditCategory(category)}><FaEdit /></button>
                      <button className="text-red-600 hover:underline" onClick={() => handleDeleteCategory(category.id)}><FaTrash /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {showCategoryForm && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
                  <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={() => setShowCategoryForm(false)}>&times;</button>
                  <h3 className="text-xl font-bold mb-4">{editingCategory ? 'Chỉnh sửa thể loại' : 'Thêm thể loại'}</h3>
                  <form onSubmit={handleCategorySubmit}>
                    <div className="mb-4">
                      <label className="block mb-1 font-semibold">Tên</label>
                      <input type="text" name="name" value={categoryFormData.name} onChange={handleCategoryInputChange} className="w-full border rounded px-3 py-2" required />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-1 font-semibold">Mô tả</label>
                      <textarea name="description" value={categoryFormData.description} onChange={handleCategoryInputChange} className="w-full border rounded px-3 py-2" rows={3} />
                    </div>
                    <div className="flex justify-end">
                      <button type="button" className="mr-2 px-4 py-2 bg-gray-300 rounded" onClick={() => setShowCategoryForm(false)}>Hủy</button>
                      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded" disabled={categoryFormLoading}>{categoryFormLoading ? 'Đang lưu...' : 'Lưu'}</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 