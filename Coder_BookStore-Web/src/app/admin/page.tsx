'use client';

import React, { useState, useEffect } from 'react';
import { useBooks } from '../hooks/useBooks';
import { bookService, CreateBookData } from '../services/bookService';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { FaPlus, FaEdit, FaTrash, FaEye, FaBook, FaUser, FaUserTie, FaTags, FaChartBar } from 'react-icons/fa';

interface BookFormData {
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

const TABS = [
  { key: 'books', label: 'Sách', icon: <FaBook /> },
  { key: 'users', label: 'Người dùng', icon: <FaUser /> },
  { key: 'authors', label: 'Tác giả', icon: <FaUserTie /> },
  { key: 'categories', label: 'Thể loại', icon: <FaTags /> },
];

export default function AdminPage() {
  const { books, loading, error } = useBooks();
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<number | null>(null);
  const [formData, setFormData] = useState<BookFormData>(initialFormData);
  const [categories, setCategories] = useState<string[]>([]);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [tab, setTab] = useState('books');
  const [users, setUsers] = useState<any[]>([]);
  const [authors, setAuthors] = useState<any[]>([]);
  const [categoriesData, setCategoriesData] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingAuthors, setLoadingAuthors] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [stats, setStats] = useState({ books: 0, users: 0, authors: 0, categories: 0 });

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
      setLoadingUsers(true);
      fetch('/api/users')
        .then(res => res.json())
        .then(data => setUsers(Array.isArray(data) ? data : []))
        .finally(() => setLoadingUsers(false));
    }
  }, [tab]);

  useEffect(() => {
    if (tab === 'authors') {
      setLoadingAuthors(true);
      fetch('/api/authors')
        .then(res => res.json())
        .then(data => setAuthors(Array.isArray(data) ? data : []))
        .finally(() => setLoadingAuthors(false));
    }
  }, [tab]);

  useEffect(() => {
    if (tab === 'categories') {
      setLoadingCategories(true);
      fetch('/api/categories')
        .then(res => res.json())
        .then(data => setCategoriesData(Array.isArray(data) ? data : []))
        .finally(() => setLoadingCategories(false));
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
    } catch (e) {
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
        // Update existing book
        await bookService.updateBook(editingBook, formData);
        setSuccessMessage('Sách đã được cập nhật thành công!');
      } else {
        // Create new book
        await bookService.createBook(formData);
        setSuccessMessage('Sách đã được thêm thành công!');
      }
      resetForm();
      setShowForm(false);
      await fetchBookCount();
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Có lỗi xảy ra');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (book: any) => {
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
    setEditingBook(book.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc chắn muốn xóa sách này?')) {
      return;
    }

    try {
      await bookService.deleteBook(id);
      setSuccessMessage('Sách đã được xóa thành công!');
      await fetchBookCount();
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Có lỗi xảy ra khi xóa sách');
    }
  };

  const handleAddNew = () => {
    resetForm();
    setShowForm(true);
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
                                  <img
                                    className="h-14 w-10 rounded-lg object-cover border border-gray-300 dark:border-gray-700 shadow"
                                    src={book.img}
                                    alt={book.title}
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
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Danh sách người dùng</h2>
            {loadingUsers ? <Loading /> : (
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Tên</th>
                      <th className="px-4 py-2">Email</th>
                      <th className="px-4 py-2">Ngày tạo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id} className="border-b">
                        <td className="px-4 py-2">{user.name}</td>
                        <td className="px-4 py-2">{user.email}</td>
                        <td className="px-4 py-2">{new Date(user.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
        {tab === 'authors' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Danh sách tác giả</h2>
            {loadingAuthors ? <Loading /> : (
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Tên</th>
                      <th className="px-4 py-2">Quốc gia</th>
                      <th className="px-4 py-2">Năm sinh</th>
                      <th className="px-4 py-2">Thể loại</th>
                    </tr>
                  </thead>
                  <tbody>
                    {authors.map(author => (
                      <tr key={author.id} className="border-b">
                        <td className="px-4 py-2 flex items-center gap-2">
                          <img src={author.avatar} alt={author.name} className="w-8 h-8 rounded-full" />
                          {author.name}
                        </td>
                        <td className="px-4 py-2">{author.country}</td>
                        <td className="px-4 py-2">{author.birthYear}</td>
                        <td className="px-4 py-2">{author.genres?.join(', ')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
        {tab === 'categories' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Danh sách thể loại</h2>
            {loadingCategories ? <Loading /> : (
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Tên thể loại</th>
                      <th className="px-4 py-2">Mô tả</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoriesData.map(cat => (
                      <tr key={cat.id} className="border-b">
                        <td className="px-4 py-2">{cat.name}</td>
                        <td className="px-4 py-2">{cat.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 