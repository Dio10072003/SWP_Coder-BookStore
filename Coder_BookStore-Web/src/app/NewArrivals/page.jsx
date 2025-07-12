'use client'
import React, { useEffect, useState, useRef } from 'react';
import { bookService } from '../services/bookService';
import { categoryService } from '../services/categoryService';
import { FaRocket, FaStar, FaShoppingCart, FaCheckCircle, FaFilter, FaTimes, FaEye, FaHeart, FaClock, FaCalendarAlt, FaFire, FaNewspaper, FaTags, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { addToCartLocal } from '../utils/cartUtils';
import Image from 'next/image';
import coderTour from '@/assets/Coder-Tour.jpg';

// Modal xem nhanh chi tiết sách
function BookQuickViewModal({ book, onClose }) {
  if (!book) return null;
  
  const [added, setAdded] = useState(false);
  const isLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem('user');
  
  const handleAdd = () => {
    if (!isLoggedIn) {
      alert("Bạn chỉ có thể làm điều đó với một tài khoản hợp lệ thôi");
      return;
    }
    addToCartLocal(book);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-8 max-w-2xl w-full mx-4 relative animate-fade-in-up">
        <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center text-gray-500 hover:text-red-500 transition-all duration-300">
          <FaTimes />
        </button>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-shrink-0">
            <div className="relative">
              <img src={book.img || book.imageUrl} alt={book.title} className="w-48 h-64 object-cover rounded-2xl shadow-xl" />
              <div className="absolute -top-3 -left-3 bg-gradient-to-r from-green-400 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                <FaRocket className="inline mr-1" />
                Mới
              </div>
            </div>
          </div>
          
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{book.title}</h2>
              <p className="text-gray-600 mb-3">Tác giả: <span className="font-semibold text-blue-600">{book.author}</span></p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={`w-5 h-5 ${i < book.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                ))}
                <span className="ml-2 text-gray-600 font-semibold">{book.rating}/5</span>
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <FaFire />
                <span className="font-semibold">Hot</span>
              </div>
            </div>
            
            <div className="text-3xl font-bold text-blue-600 mb-4">
              {Number(book.price).toLocaleString()}₫
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-blue-500" />
                <span>{book.publishYear}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-green-500" />
                <span>{book.language}</span>
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-6">{book.description}</p>
            
            <div className="flex gap-3">
              <button 
                onClick={handleAdd}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  added 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:scale-105'
                }`}
              >
                {added ? <FaCheckCircle /> : <FaShoppingCart />}
                {added ? 'Đã thêm!' : 'Thêm vào giỏ'}
              </button>
              <button 
                onClick={() => window.location.href = `/Books/${book.id}`}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2"
              >
                <FaEye />
                Chi tiết
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NewArrivalPage() {
    const [newBooks, setNewBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [quickViewBook, setQuickViewBook] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [showFilters, setShowFilters] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const timeRef = useRef(null);
    const slideRef = useRef(null);

    // Lấy danh sách thể loại cho filter
    useEffect(() => {
        categoryService.getAllCategories()
            .then(data => setCategories(data))
            .catch(() => setCategories([]));
    }, []);

    // Lấy sách mới nhất, filter, phân trang
    useEffect(() => {
        setLoading(true);
        setError(null);
        const yearNow = new Date().getFullYear();
        bookService.getAllBooksWithTotal({
            limit: 12 * page,
            ...(selectedCategory ? { category: selectedCategory } : {})
        })
            .then(({ data }) => {
                // Chỉ lấy sách xuất bản trong 2 năm gần nhất
                const filtered = data.filter(b => b.publishYear >= yearNow - 1);
                // Sắp xếp theo publishYear, created_at, id
                const sorted = [...filtered].sort((a, b) => (b.publishYear - a.publishYear) || (new Date(b.created_at || 0) - new Date(a.created_at || 0)) || (b.id - a.id));
                setNewBooks(sorted);
                setHasMore(sorted.length >= 12 * page);
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [selectedCategory, page]);

    // Cập nhật thời gian thực
    useEffect(() => {
        timeRef.current = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => {
            if (timeRef.current) {
                clearInterval(timeRef.current);
            }
        };
    }, []);

    // Auto slide cho featured books
    useEffect(() => {
        if (newBooks.length > 0) {
            slideRef.current = setInterval(() => {
                setCurrentSlide(prev => (prev + 1) % Math.min(3, newBooks.length));
            }, 4000);
        }
        return () => {
            if (slideRef.current) {
                clearInterval(slideRef.current);
            }
        };
    }, [newBooks.length]);

    // Chọn sách nổi bật nhất (mới nhất)
    const featuredBooks = newBooks.slice(0, 3);

    // Xác định sách "Mới" (xuất bản trong 6 tháng gần nhất)
    const isNewBook = (book) => {
        const now = new Date();
        const pub = new Date(book.publishYear, 0, 1);
        return (now - pub) < 183 * 24 * 60 * 60 * 1000; // ~6 tháng
    };

    // Loading skeleton
    const Skeleton = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                    <div className="w-full h-48 bg-gray-200 rounded-xl mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-green-50 relative overflow-hidden">
            {/* Background animated elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -left-40 w-80 h-80 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
                <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-60 animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${3 + Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            {/* Logo phụ CoderTour */}
            <div className="fixed top-6 right-6 z-50">
                <Image 
                    src={coderTour} 
                    alt="CoderTour Logo" 
                    width={60} 
                    height={60} 
                    className="rounded-full shadow-2xl animate-pulse bg-white/10 backdrop-blur-sm p-2" 
                />
            </div>

            {/* Header */}
            <div className="relative z-10 flex flex-col items-center justify-center py-12">
                <div className="flex items-center gap-6 mb-6">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-green-500 p-1 animate-spin-slow">
                            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                                <FaRocket className="text-3xl text-cyan-600 animate-bounce" />
                            </div>
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full animate-ping flex items-center justify-center">
                            <FaNewspaper className="text-white text-sm" />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-500 via-blue-500 to-green-500 bg-clip-text text-transparent drop-shadow-2xl font-heading tracking-tight animate-gradient-move">
                            NEW ARRIVALS
                        </h1>
                        <div className="flex items-center gap-4 mt-2 text-gray-600">
                            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2">
                                <FaClock className="text-blue-500" />
                                <span className="font-mono text-sm font-bold">
                                    {currentTime.toLocaleTimeString('vi-VN', { 
                                        hour: '2-digit', 
                                        minute: '2-digit' 
                                    })}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2">
                                <FaFire className="text-green-500" />
                                <span className="font-semibold text-sm">Cập nhật thời gian thực</span>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-xl md:text-2xl text-gray-700 font-light mb-8 text-center max-w-4xl leading-relaxed">
                    Khám phá những đầu sách công nghệ, lập trình, AI, blockchain... vừa cập bến! Đừng bỏ lỡ những xu hướng mới nhất dành cho coder.
                </p>
            </div>

            {/* Featured Books Carousel */}
            {featuredBooks.length > 0 && (
                <div className="relative z-10 max-w-6xl mx-auto px-4 mb-12">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">🔥 Sách nổi bật mới nhất</h2>
                        <p className="text-gray-600">Những tựa sách hot nhất vừa được phát hành</p>
                    </div>
                    
                    <div className="relative">
                        <div className="flex overflow-hidden rounded-3xl shadow-2xl">
                            {featuredBooks.map((book, index) => (
                                <div
                                    key={book.id}
                                    className={`flex-shrink-0 w-full transition-transform duration-700 ease-in-out ${
                                        index === currentSlide ? 'translate-x-0' : 'translate-x-full'
                                    }`}
                                >
                                    <div className="bg-gradient-to-br from-white to-gray-50 p-8 md:p-12">
                                        <div className="flex flex-col lg:flex-row items-center gap-8">
                                            <div className="flex-shrink-0">
                                                <div className="relative">
                                                    <img 
                                                        src={book.img || book.imageUrl} 
                                                        alt={book.title} 
                                                        className="w-64 h-80 object-cover rounded-2xl shadow-xl" 
                                                    />
                                                    <div className="absolute -top-3 -left-3 bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                                                        <FaRocket className="inline mr-1" />
                                                        Mới nhất
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex-1 text-center lg:text-left">
                                                <h3 className="text-3xl font-bold text-gray-800 mb-4">{book.title}</h3>
                                                <p className="text-xl text-gray-600 mb-4">Tác giả: <span className="font-semibold text-blue-600">{book.author}</span></p>
                                                
                                                <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                                                    <div className="flex items-center gap-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <FaStar key={i} className={`w-5 h-5 ${i < book.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                                                        ))}
                                                        <span className="ml-2 text-gray-600 font-semibold">{book.rating}/5</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-green-600">
                                                        <FaFire />
                                                        <span className="font-semibold">Hot</span>
                                                    </div>
                                                </div>
                                                
                                                <div className="text-4xl font-bold text-blue-600 mb-6">
                                                    {Number(book.price).toLocaleString()}₫
                                                </div>
                                                
                                                <p className="text-gray-700 leading-relaxed mb-8 text-lg">{book.description}</p>
                                                
                                                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                                    <button 
                                                        onClick={() => setQuickViewBook(book)}
                                                        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                                                    >
                                                        <FaEye />
                                                        Xem chi tiết
                                                    </button>
                                                    <button 
                                                        onClick={() => window.location.href = `/Books/${book.id}`}
                                                        className="px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                                                    >
                                                        <FaArrowRight />
                                                        Mua ngay
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Navigation dots */}
                        <div className="flex justify-center mt-6 gap-2">
                            {featuredBooks.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                        index === currentSlide ? 'bg-blue-500 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Controls */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 mb-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 hover:bg-white transition-all duration-300 shadow-lg"
                        >
                            <FaFilter className="text-blue-500" />
                            <span className="font-semibold text-gray-700">Bộ lọc</span>
                        </button>
                        {selectedCategory && (
                            <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
                                <span className="text-sm font-semibold">{selectedCategory}</span>
                                <button 
                                    onClick={() => setSelectedCategory('')}
                                    className="w-5 h-5 rounded-full bg-blue-200 hover:bg-blue-300 flex items-center justify-center text-xs"
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-gray-800">{newBooks.length}</div>
                        <div className="text-sm text-gray-600">Sách mới</div>
                    </div>
                </div>

                {/* Filter dropdown */}
                {showFilters && (
                    <div className="mt-4 bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-xl animate-fade-in">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Lọc theo danh mục</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                            <button
                                onClick={() => setSelectedCategory('')}
                                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                                    selectedCategory === '' 
                                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                Tất cả
                            </button>
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.name)}
                                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                                        selectedCategory === category.name 
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Main content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 pb-12">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">✨ Tất cả sách mới về ✨</h2>
                    <p className="text-gray-600">Khám phá bộ sưu tập sách mới nhất</p>
                </div>
                
                {loading ? (
                    <Skeleton />
                ) : error ? (
                    <div className="text-center py-16">
                        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
                            <div className="text-red-500 text-6xl mb-4">⚠️</div>
                            <h3 className="text-xl font-bold text-red-700 mb-2">Có lỗi xảy ra</h3>
                            <p className="text-red-600">{error}</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {newBooks.map((book, index) => (
                            <BookCard 
                                key={book.id} 
                                book={book} 
                                isNew={isNewBook(book)}
                                onQuickView={setQuickViewBook}
                            />
                        ))}
                    </div>
                )}

                {hasMore && !loading && (
                    <div className="flex justify-center mt-12">
                        <button 
                            onClick={() => setPage(p => p + 1)} 
                            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:from-blue-600 hover:to-purple-700 hover:scale-105 transition-all duration-300 text-lg flex items-center gap-2"
                        >
                            <FaArrowRight />
                            Xem thêm sách mới
                        </button>
                    </div>
                )}
            </div>

            {/* Quick view modal */}
            <BookQuickViewModal book={quickViewBook} onClose={() => setQuickViewBook(null)} />
        </div>
    );
}

// Book Card Component
function BookCard({ book, isNew, onQuickView }) {
    const [added, setAdded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const isLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem('user');
    
    const handleAdd = (e) => {
        e.stopPropagation();
        if (!isLoggedIn) {
            alert("Bạn chỉ có thể làm điều đó với một tài khoản hợp lệ thôi");
            return;
        }
        addToCartLocal(book);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const categoryIcons = {
        Programming: '💻',
        'Data Science': '📊',
        Design: '🎨',
        Architecture: '🏛️',
        Security: '🔒',
        Mobile: '📱',
        Database: '🗄️',
        'Game Development': '🎮',
        Blockchain: '⛓️',
        Cloud: '☁️',
        'Project Management': '📋',
        Biography: '👤',
        Fantasy: '🧙',
        Fiction: '📖',
        History: '🏺',
        Mystery: '🕵️',
        Nonfiction: '📚',
        Romance: '💖',
        ScienceFiction: '🚀',
        'Science Fiction': '🚀',
        SelfHelp: '🌱',
        'Self Help': '🌱',
        Thriller: '🔎',
        'True Crime': '🕵️‍♂️',
        Horror: '👻',
        Poetry: '📝',
        Adventure: '🏞️',
        Philosophy: '🤔',
        Business: '💼',
        Children: '🧒',
        Comics: '🦸',
        Cooking: '🍳',
        Health: '💪',
        Travel: '✈️',
        Art: '🖼️',
        Religion: '⛪',
        Sports: '🏅',
        Memoir: '📔',
        Classic: '🏛️',
    };

    const displayCategory = decodeURIComponent(book.category || '');

    return (
        <div
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer transform hover:scale-105"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onQuickView(book)}
        >
            {/* New badge */}
            {isNew && (
                <div className="absolute top-3 left-3 bg-gradient-to-r from-green-400 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg z-10 animate-pulse">
                    <FaRocket className="inline mr-1" />
                    Mới
                </div>
            )}

            {/* Category icon */}
            <div className="absolute top-3 right-3 text-2xl z-10">
                {categoryIcons[displayCategory] || '📚'}
            </div>

            {/* Image */}
            <div className="relative overflow-hidden">
                <img 
                    src={book.img || book.imageUrl} 
                    alt={book.title} 
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-blue-700 font-semibold bg-blue-100 px-2 py-1 rounded-full">
                        {displayCategory}
                    </span>
                </div>
                
                <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 text-lg group-hover:text-blue-600 transition-colors duration-300">
                    {book.title}
                </h3>
                <p className="text-gray-600 mb-3 text-sm">
                    Tác giả: <span className="font-semibold text-blue-600">{book.author}</span>
                </p>
                
                <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={`w-4 h-4 ${i < book.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                        ))}
                    </div>
                    <span className="text-sm text-gray-600 font-semibold">{book.rating}/5</span>
                </div>

                <div className="text-2xl font-bold text-blue-600 mb-4">
                    {Number(book.price).toLocaleString()}₫
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {book.description}
                </p>

                <div className="text-xs text-gray-500 mb-4">
                    Phát hành: {book.releaseDate || book.publishYear}
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={handleAdd}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                            added 
                                ? 'bg-green-500 text-white' 
                                : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                        }`}
                    >
                        {added ? <FaCheckCircle /> : <FaShoppingCart />}
                        {added ? 'Đã thêm!' : 'Thêm giỏ'}
                    </button>
                    <button className="w-12 h-12 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl flex items-center justify-center transition-all duration-300">
                        <FaHeart />
                    </button>
                </div>
            </div>

            {/* Hover overlay */}
            {isHovered && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 text-center">
                        <FaEye className="text-2xl text-blue-600 mx-auto mb-2" />
                        <p className="text-sm font-semibold text-gray-700">Xem chi tiết</p>
                    </div>
                </div>
            )}
        </div>
    );
}