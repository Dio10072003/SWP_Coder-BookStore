'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
// Đã thêm FaStarHalfAlt để hiển thị nửa sao chính xác hơn
import { FaBookOpen, FaInfoCircle, FaPhoneAlt, FaChevronRight, FaStar, FaFire, FaFeatherAlt, FaStarHalfAlt } from 'react-icons/fa'; 
import Image from 'next/image';
import { useFeaturedBooks } from './hooks/useBooks';
import Loading from './components/Loading';
import Error from './components/Error';
import HeroSection from './HomePage/Components/HeroSection';
import BestPicksSection from './HomePage/Components/BestPicksSection';

export default function Home() {
  const [greet, setGreet] = useState('Hello');
  const { books, loading, error } = useFeaturedBooks(6);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreet('Good Morning');
    else if (hour < 18) setGreet('Good Afternoon');
    else setGreet('Good Evening');
  }, []);

  const explore = [
    {
      href: '/AboutPage',
      icon: <FaInfoCircle className="text-4xl text-blue-500 dark:text-blue-300" />,
      label: 'Our Story',
      desc: 'Discover our passion and journey in the world of coding literature.',
    },
    {
      href: '/Contact',
      icon: <FaPhoneAlt className="text-4xl text-green-500 dark:text-green-300" />,
      label: 'Contact Us',
      desc: 'We are always happy to help and hear your feedback!',
    },
    {
      href: '/Categories',
      icon: <FaBookOpen className="text-4xl text-purple-500 dark:text-purple-300" />,
      label: 'Browse Categories',
      desc: 'Dive into various programming languages and tech topics.',
    },
  ];

  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  // Function to render star ratings - Cập nhật để hiển thị nửa sao chính xác hơn
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />); // Sử dụng FaStarHalfAlt
    }
    while (stars.length < 5) {
      stars.push(<FaStar key={`empty-${stars.length}`} className="text-gray-300 dark:text-gray-600" />);
    }
    return <div className="flex items-center gap-1">{stars}</div>;
  };

  // Lấy feedback động từ API
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const testimonialTimeout = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    fetch('/api/feedback')
      .then(res => res.json())
      .then(data => Array.isArray(data) ? setFeedbacks(data) : setFeedbacks([]));
  }, []);
  useEffect(() => {
    if (!feedbacks.length) return;
    if (testimonialTimeout.current) clearTimeout(testimonialTimeout.current);
    testimonialTimeout.current = setTimeout(() => {
      setTestimonialIdx(i => (i + 1) % feedbacks.length);
    }, 4000);
    return () => testimonialTimeout.current && clearTimeout(testimonialTimeout.current);
  }, [testimonialIdx, feedbacks]);

  return (
    <>
      {/* Section banner sự kiện đặc biệt */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative py-10 px-2 max-w-5xl mx-auto mb-10 animate-fade-in-up"
      >
        <span className="absolute -top-8 -left-8 w-40 h-40 bg-gradient-to-br from-yellow-400 via-pink-300 to-fuchsia-400 opacity-30 rounded-full blur-2xl animate-blob z-0" />
        <span className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-br from-pink-200 via-yellow-200 to-purple-200 opacity-20 rounded-full blur-2xl animate-blob2 z-0" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-r from-yellow-100 via-pink-100 to-fuchsia-100 rounded-2xl shadow-xl border-4 border-pink-200 p-8">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-400 to-fuchsia-500 drop-shadow mb-2">🎉 Sự kiện "Book Week" Đặc Biệt!</h2>
            <p className="text-lg text-gray-700 mb-2">Giảm giá đến <span className="font-bold text-pink-600">50%</span> cho hàng trăm đầu sách lập trình, tặng voucher cho thành viên mới!</p>
            <Link href="/Promotions" className="inline-block px-6 py-2 bg-gradient-to-r from-pink-500 to-yellow-400 text-white rounded-full font-bold shadow hover:scale-110 hover:shadow-xl transition-all mt-2">Xem ưu đãi</Link>
          </div>
          <img src="/public/images/Coder-BookStore-Logo.svg" alt="Book Week" className="w-32 h-32 object-contain mx-auto md:mx-0 animate-bounce-slow" />
        </div>
      </motion.section>

      {/* Hero Section mới */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
        <HeroSection />
      </motion.div>

      {/* Best Picks Section mới */}
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}>
        <BestPicksSection />
      </motion.div>

      {/* Featured Books Section - làm mới style */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative py-20 px-2 max-w-7xl mx-auto animate-fade-in-up"
      >
        <span className="absolute -top-16 -left-16 w-72 h-72 bg-gradient-to-br from-pink-300 via-yellow-200 to-fuchsia-300 opacity-30 rounded-full blur-3xl animate-blob z-0" />
        <span className="absolute -bottom-16 -right-16 w-72 h-72 bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-200 opacity-20 rounded-full blur-3xl animate-blob2 z-0" />
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-fuchsia-500 drop-shadow mb-10">
          <FaFire className="inline-block text-yellow-400 mr-2 align-middle animate-pulse" />
          Sách Nổi Bật & Mới Nhất
        </h2>
        {loading && <Loading message="Đang tải sách..." />}
        {error && <Error message={`Lỗi: ${error}`} />}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {books.map(({ id, title, author, price, img, rating }) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 * id }}
                className="rounded-3xl shadow-2xl bg-gradient-to-br from-yellow-50 via-pink-50 to-fuchsia-100 border-4 border-pink-200 p-6 flex flex-col items-center hover:scale-105 hover:shadow-3xl transition-transform duration-300 group relative overflow-hidden"
              >
                <span className="absolute -top-8 -right-8 w-24 h-24 bg-pink-200 opacity-20 rounded-full blur-2xl animate-blob2 z-0" />
                <img
                  src={img}
                  alt={title}
                  className="w-32 h-44 object-cover rounded-xl mb-4 border-2 border-white shadow-lg group-hover:scale-105 transition"
                />
                <h3 className="text-lg font-bold text-pink-700 mb-1 text-center drop-shadow-lg">{title}</h3>
                <p className="text-sm text-gray-500 mb-1">by <span className="font-semibold text-blue-700">{author}</span></p>
                <div className="flex items-center mb-1">
                  {renderStars(rating)}
                  <span className="text-xs text-gray-600 ml-2">({rating})</span>
                </div>
                <p className="font-extrabold text-lg text-yellow-600 mb-2">{Number(price).toLocaleString()}₫</p>
                <Link href={`/Books/${id}`} className="inline-block px-5 py-2 bg-gradient-to-r from-pink-500 to-yellow-400 text-white rounded-full font-bold shadow hover:scale-110 hover:shadow-xl transition-all mt-auto">Xem chi tiết <FaChevronRight className="inline-block ml-1 text-xs" /></Link>
              </motion.div>
            ))}
          </div>
        )}
        <div className="text-center mt-12">
          <Link href="/Books" className="inline-block px-8 py-3 text-lg bg-gradient-to-r from-purple-600 via-pink-400 to-yellow-400 text-white rounded-full font-extrabold shadow-xl hover:scale-110 hover:shadow-2xl transition-transform duration-300">Xem tất cả sách <FaChevronRight className="inline-block ml-2 text-xs" /></Link>
        </div>
      </motion.section>

      {/* Section cảm nhận khách hàng - lấy động từ API */}
      {feedbacks.length > 0 && (
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative py-16 px-2 max-w-3xl mx-auto animate-fade-in-up"
        >
          <span className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-pink-300 via-yellow-200 to-fuchsia-300 opacity-30 rounded-full blur-2xl animate-blob z-0" />
          <span className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-200 opacity-20 rounded-full blur-2xl animate-blob2 z-0" />
          <h2 className="text-2xl md:text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-yellow-400 to-fuchsia-400 drop-shadow mb-10">
            Cảm Nhận Khách Hàng
          </h2>
          <div className="flex flex-col items-center justify-center">
            <motion.div
              key={testimonialIdx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.7 }}
              className="bg-white/80 rounded-2xl shadow-xl p-8 flex flex-col items-center max-w-xl mx-auto border-4 border-pink-200"
            >
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(feedbacks[testimonialIdx].name || 'user')}`} alt={feedbacks[testimonialIdx].name} className="w-20 h-20 rounded-full border-4 border-yellow-300 shadow mb-4" />
              <blockquote className="text-lg italic text-gray-700 text-center mb-2">“{feedbacks[testimonialIdx].content}”</blockquote>
              <span className="font-bold text-pink-600">{feedbacks[testimonialIdx].name}</span>
              <div className="flex items-center gap-1 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} className={i < (feedbacks[testimonialIdx].rating || 0) ? 'text-yellow-400' : 'text-gray-300'} />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Section đối tác */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative py-16 px-2 max-w-6xl mx-auto animate-fade-in-up"
      >
        <span className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-blue-300 via-green-200 to-cyan-300 opacity-30 rounded-full blur-2xl animate-blob z-0" />
        <span className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-green-200 via-blue-200 to-cyan-200 opacity-20 rounded-full blur-2xl animate-blob2 z-0" />
        <h2 className="text-2xl md:text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-green-400 to-cyan-400 drop-shadow mb-10">
          Đối Tác & Nhà Xuất Bản
        </h2>
        <div className="flex flex-wrap justify-center gap-8 items-center">
          <img src="/public/images/Coder-BookStore-Logo.svg" alt="Coder Bookstore" className="h-16 w-auto grayscale hover:grayscale-0 transition-all duration-300" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_NXB_Tre.png" alt="NXB Trẻ" className="h-14 w-auto grayscale hover:grayscale-0 transition-all duration-300" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2e/Logo_NXB_Giao_Duc.png" alt="NXB Giáo Dục" className="h-14 w-auto grayscale hover:grayscale-0 transition-all duration-300" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Logo_NXB_Hong_Duc.png" alt="NXB Hồng Đức" className="h-14 w-auto grayscale hover:grayscale-0 transition-all duration-300" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2e/Logo_NXB_Kim_Dong.png" alt="NXB Kim Đồng" className="h-14 w-auto grayscale hover:grayscale-0 transition-all duration-300" />
        </div>
      </motion.section>

      {/* Explore More Section - làm mới style */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative py-16 px-2 max-w-7xl mx-auto animate-fade-in-up"
      >
        <span className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-blue-300 via-green-200 to-cyan-300 opacity-30 rounded-full blur-2xl animate-blob z-0" />
        <span className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-green-200 via-blue-200 to-cyan-200 opacity-20 rounded-full blur-2xl animate-blob2 z-0" />
        <h2 className="text-2xl md:text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-green-400 to-cyan-400 drop-shadow mb-10">
          Khám Phá Thêm
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {explore.map((item, idx) => (
            <Link key={item.href} href={item.href} className="rounded-2xl shadow-xl bg-gradient-to-br from-white via-gray-50 to-blue-50 border-2 border-blue-200 p-8 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-transform duration-300 group relative">
              <span className="mb-4">{item.icon}</span>
              <span className="text-xl font-bold text-blue-700 mb-2 drop-shadow-lg">{item.label}</span>
              <span className="text-gray-500 text-center mb-2">{item.desc}</span>
              <span className="mt-auto inline-block px-4 py-1 bg-gradient-to-r from-blue-400 to-green-400 text-white rounded-full font-semibold shadow hover:scale-110 hover:shadow-lg transition-all text-sm">Khám phá <FaChevronRight className="inline-block ml-1 text-xs" /></span>
            </Link>
          ))}
        </div>
      </motion.section>

      {/* Section call-to-action cuối trang */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-center py-16 bg-gradient-to-br from-pink-100 via-purple-100 to-yellow-100 rounded-2xl shadow-lg border-4 border-pink-200 max-w-4xl mx-auto my-12 animate-fade-in-up"
      >
        <h2 className="text-2xl font-extrabold text-pink-700 mb-4">
          Sẵn Sàng Nâng Tầm Kỹ Năng Của Bạn?
        </h2>
        <p className="text-base text-gray-700 max-w-xl mx-auto mb-6">
          Tham gia cộng đồng Coder-Bookstore ngay hôm nay để không bỏ lỡ những kiến thức mới nhất!
        </p>
        <div className="flex justify-center gap-3">
          <Link href="/Register" className="inline-block px-6 py-2 bg-purple-600 text-white text-base rounded-full font-bold shadow-lg hover:bg-purple-700 hover:scale-110 transition-transform duration-300">Đăng Ký Ngay</Link>
          <Link href="/Contact" className="inline-block px-6 py-2 bg-white text-purple-600 text-base rounded-full font-bold shadow-lg hover:bg-gray-100 hover:scale-110 transition-transform duration-300 border border-purple-600">Tìm Hiểu Thêm</Link>
        </div>
      </motion.section>
    </>
  );
}