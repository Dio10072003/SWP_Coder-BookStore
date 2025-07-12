'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useBooks } from '../hooks/useBooks';
import { bookService } from '../services/bookService';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { FaPlus, FaEdit, FaTrash, FaBook, FaUser, FaUserTie, FaTags, FaCog, FaSignOutAlt, FaClock, FaStar, FaTimes } from 'react-icons/fa';
import { authorService, CreateAuthorData } from '../services/authorService';
import { categoryService, CreateCategoryData } from '../services/categoryService';
import { Author } from '../services/authorService';
import { Category } from '../services/categoryService';
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
  { key: 'books', label: 'Quản lý Sách', icon: <FaBook />, color: 'from-blue-500 to-purple-600' },
  { key: 'authors', label: 'Quản lý Tác giả', icon: <FaUserTie />, color: 'from-green-500 to-teal-600' },
  { key: 'categories', label: 'Quản lý Thể loại', icon: <FaTags />, color: 'from-orange-500 to-red-600' },
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
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  const [stats, setStats] = useState({ books: 0, users: 0, authors: 0, categories: 0 });
  const [currentTime, setCurrentTime] = useState(new Date());

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

  // Cập nhật thời gian thực
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
          ? (error as { message?: string })?.message ?? 'Có lỗi xảy ra'
          : 'Có lỗi xảy ra'
      );
    }
  };

  const handleAddNew = () => {
    resetForm();
    setShowForm(true);
  };

  const fetchAuthors = async () => {
    try {
      const response = await fetch('/api/authors');
      const data = await response.json();
      setAuthors(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

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
      await fetchAuthors();
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
      name: author.name,
      bio: author.bio || '',
      avatar: author.avatar || '',
      country: author.country || '',
      birth_year: author.birth_year,
      genres: author.genres || [],
    });
    setEditingAuthor(author.id);
    setShowAuthorForm(true);
  };

  const handleDeleteAuthor = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa tác giả này?')) {
      return;
    }
    try {
      await authorService.deleteAuthor(id);
      setAuthorSuccessMessage('Tác giả đã được xóa thành công!');
      await fetchAuthors();
    } catch (error) {
      setAuthorFormError(
        error && typeof error === 'object' && 'message' in error
          ? (error as { message?: string })?.message ?? 'Có lỗi xảy ra'
          : 'Có lỗi xảy ra'
      );
    }
  };

  const fetchCategoriesData = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategoriesData(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

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
      await fetchCategoriesData();
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
      name: category.name,
      description: category.description || '',
    });
    setEditingCategory(category.id);
    setShowCategoryForm(true);
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa thể loại này?')) {
      return;
    }
    try {
      await categoryService.deleteCategory(id);
      setCategorySuccessMessage('Thể loại đã được xóa thành công!');
      await fetchCategoriesData();
    } catch (error) {
      setCategoryFormError(
        error && typeof error === 'object' && 'message' in error
          ? (error as { message?: string })?.message ?? 'Có lỗi xảy ra'
          : 'Có lỗi xảy ra'
      );
    }
  };

  if (accessDenied) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md mx-4">
          <div className="text-red-500 text-6xl mb-6">🚫</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Truy cập bị từ chối</h1>
          <p className="text-gray-600 mb-6">Bạn không có quyền truy cập vào trang quản trị.</p>
          <Link href="/" className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
            Về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <FaCog className="text-white text-lg" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
                  <p className="text-sm text-gray-500">CoderTour BookStore</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
                <FaClock className="text-gray-500 text-sm" />
                <span className="text-sm font-mono text-gray-700">
                  {currentTime.toLocaleTimeString('vi-VN', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    second: '2-digit'
                  })}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <FaUser className="text-white text-sm" />
                </div>
                <span className="text-sm font-semibold text-gray-700">Admin</span>
              </div>
              
              <button className="p-2 text-gray-500 hover:text-red-500 transition-colors duration-300">
                <FaSignOutAlt />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng sách</p>
                <p className="text-3xl font-bold text-gray-800">{stats.books}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FaBook className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng tác giả</p>
                <p className="text-3xl font-bold text-gray-800">{stats.authors}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FaUserTie className="text-green-600 text-xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng thể loại</p>
                <p className="text-3xl font-bold text-gray-800">{stats.categories}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <FaTags className="text-orange-600 text-xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng người dùng</p>
                <p className="text-3xl font-bold text-gray-800">{stats.users}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <FaUser className="text-purple-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-2 mb-8">
          <div className="flex space-x-2">
            {TABS.map((tabItem) => (
              <button
                key={tabItem.key}
                onClick={() => setTab(tabItem.key)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  tab === tabItem.key
                    ? `bg-gradient-to-r ${tabItem.color} text-white shadow-lg`
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                {tabItem.icon}
                {tabItem.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {tab === 'books' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Quản lý Sách</h2>
                <button
                  onClick={handleAddNew}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
                >
                  <FaPlus />
                  Thêm sách mới
                </button>
              </div>

              {loading ? (
                <Loading />
              ) : error ? (
                <Error message={error} />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Hình ảnh</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tiêu đề</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tác giả</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Giá</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Đánh giá</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {books.map((book) => (
                        <tr key={book.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                                                     <td className="px-6 py-4">
                             <img src={book.img} alt={book.title} className="w-16 h-20 object-cover rounded-lg shadow" />
                           </td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-semibold text-gray-800">{book.title}</p>
                              <p className="text-sm text-gray-500">{book.category}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-700">{book.author}</td>
                          <td className="px-6 py-4">
                            <span className="font-semibold text-green-600">{Number(book.price).toLocaleString()}₫</span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1">
                              <FaStar className="text-yellow-400" />
                              <span className="font-semibold">{book.rating}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleEdit(book)}
                                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDelete(book.id!)}
                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
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
          )}

          {tab === 'authors' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Quản lý Tác giả</h2>
                <button
                  onClick={() => setShowAuthorForm(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-teal-700 transition-all duration-300 shadow-lg"
                >
                  <FaPlus />
                  Thêm tác giả mới
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tên</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Quốc gia</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Năm sinh</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {authors.map((author) => (
                      <tr key={author.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-gray-800">{author.name}</p>
                            <p className="text-sm text-gray-500">{author.bio}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{author.country}</td>
                        <td className="px-6 py-4 text-gray-700">{author.birth_year}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEditAuthor(author)}
                              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDeleteAuthor(author.id)}
                              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
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
            </div>
          )}

          {tab === 'categories' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Quản lý Thể loại</h2>
                <button
                  onClick={() => setShowCategoryForm(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg"
                >
                  <FaPlus />
                  Thêm thể loại mới
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tên</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Mô tả</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoriesData.map((category) => (
                      <tr key={category.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 font-semibold text-gray-800">{category.name}</td>
                        <td className="px-6 py-4 text-gray-700">{category.description}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEditCategory(category)}
                              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDeleteCategory(category.id)}
                              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
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
            </div>
          )}
        </div>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-fade-in">
          {successMessage}
        </div>
      )}
      {formError && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-fade-in">
          {formError}
        </div>
      )}
      {authorSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-fade-in">
          {authorSuccessMessage}
        </div>
      )}
      {authorFormError && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-fade-in">
          {authorFormError}
        </div>
      )}
      {categorySuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-fade-in">
          {categorySuccessMessage}
        </div>
      )}
      {categoryFormError && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-fade-in">
          {categoryFormError}
        </div>
      )}

      {/* Book Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingBook ? 'Chỉnh sửa sách' : 'Thêm sách mới'}
              </h2>
              <button
                onClick={() => { setShowForm(false); resetForm(); }}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center text-gray-500 hover:text-red-500 transition-all duration-300"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tiêu đề *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Nhập tiêu đề sách"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tác giả *
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Nhập tên tác giả"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Giá *
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="150.000"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Thể loại *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Chọn thể loại</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Năm xuất bản
                  </label>
                  <input
                    type="number"
                    name="publishYear"
                    value={formData.publishYear}
                    onChange={handleInputChange}
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Số trang
                  </label>
                  <input
                    type="number"
                    name="pages"
                    value={formData.pages}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ngôn ngữ
                  </label>
                  <input
                    type="text"
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ISBN
                  </label>
                  <input
                    type="text"
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  URL ảnh
                </label>
                <input
                  type="url"
                  name="img"
                  value={formData.img}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mô tả
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Nhập mô tả sách..."
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={formLoading}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {formLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <FaPlus />
                      {editingBook ? 'Cập nhật sách' : 'Thêm sách'}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowForm(false); resetForm(); }}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-300"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Author Form Modal */}
      {showAuthorForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingAuthor ? 'Chỉnh sửa tác giả' : 'Thêm tác giả mới'}
              </h2>
              <button
                onClick={() => { setShowAuthorForm(false); resetAuthorForm(); }}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center text-gray-500 hover:text-red-500 transition-all duration-300"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleAuthorSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tên tác giả *</label>
                <input
                  type="text"
                  name="name"
                  value={authorFormData.name}
                  onChange={handleAuthorInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  placeholder="Nhập tên tác giả"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tiểu sử</label>
                <textarea
                  name="bio"
                  value={authorFormData.bio || ''}
                  onChange={handleAuthorInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Nhập tiểu sử tác giả..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Avatar URL</label>
                  <input
                    type="text"
                    name="avatar"
                    value={authorFormData.avatar || ''}
                    onChange={handleAuthorInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Quốc gia</label>
                  <input
                    type="text"
                    name="country"
                    value={authorFormData.country || ''}
                    onChange={handleAuthorInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="Nhập quốc gia"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Năm sinh</label>
                <input
                  type="number"
                  name="birth_year"
                  value={authorFormData.birth_year || ''}
                  onChange={(e) => setAuthorFormData(prev => ({ ...prev, birth_year: parseInt(e.target.value) || undefined }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  placeholder="1990"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={authorFormLoading}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-teal-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {authorFormLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <FaPlus />
                      {editingAuthor ? 'Cập nhật tác giả' : 'Thêm tác giả'}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowAuthorForm(false); resetAuthorForm(); }}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-300"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category Form Modal */}
      {showCategoryForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingCategory ? 'Chỉnh sửa thể loại' : 'Thêm thể loại mới'}
              </h2>
              <button
                onClick={() => { setShowCategoryForm(false); resetCategoryForm(); }}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center text-gray-500 hover:text-red-500 transition-all duration-300"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleCategorySubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Tên thể loại *</label>
                <input
                  type="text"
                  name="name"
                  value={categoryFormData.name}
                  onChange={handleCategoryInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  placeholder="Nhập tên thể loại"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Mô tả</label>
                <textarea
                  name="description"
                  value={categoryFormData.description || ''}
                  onChange={handleCategoryInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Nhập mô tả thể loại..."
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={categoryFormLoading}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {categoryFormLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <FaPlus />
                      {editingCategory ? 'Cập nhật thể loại' : 'Thêm thể loại'}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowCategoryForm(false); resetCategoryForm(); }}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-300"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}