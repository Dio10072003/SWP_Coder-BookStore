'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// Đã thêm FaStarHalfAlt để hiển thị nửa sao chính xác hơn
import { FaBookOpen, FaInfoCircle, FaPhoneAlt, FaChevronRight, FaStar, FaFire, FaFeatherAlt, FaStarHalfAlt } from 'react-icons/fa'; 
import Image from 'next/image';
import { useFeaturedBooks } from './hooks/useBooks';
import Loading from './components/Loading';
import Error from './components/Error';

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

  return (
    // ĐÃ XÓA THẺ <main> BÊN NGOÀI NÀY
    <> {/* Sử dụng Fragment thay vì thẻ <main> */}
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="relative text-center mb-14 bg-white dark:bg-gray-800 p-5 md:p-8 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden"
      >
        {/* Blob nền động */}
        <span className="absolute -top-10 -left-10 w-56 h-56 bg-pink-200 opacity-20 rounded-full blur-2xl animate-blob z-0" />
        <span className="absolute -bottom-10 -right-10 w-56 h-56 bg-yellow-200 opacity-10 rounded-full blur-2xl animate-blob2 z-0" />
        {/* Icon sách phía trên */}
        <div className="flex justify-center mb-2 relative z-10">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-yellow-300 via-pink-300 to-purple-300 shadow-lg animate-bounce-slow">
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-yellow-500"><rect x="4" y="7" width="16" height="10" rx="2" strokeWidth={2} /><path d="M8 11h8" strokeWidth={2} /></svg>
          </span>
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight animate-bounce-slow">
            <span className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">{greet},</span>
            <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-lg">
              Welcome to Coder-Bookstore!
            </span>
          </h1>
          <div className="flex flex-col items-center">
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-2 leading-relaxed relative">
              Your ultimate destination for inspiring coding books and resources to elevate your skills and fuel your passion.
              <span className="block h-1 w-32 mx-auto mt-2 bg-gradient-to-r from-yellow-400 via-pink-400 to-fuchsia-400 rounded-full opacity-70" />
            </p>
          </div>
          <Link
            href="/Books"
            className="inline-block px-8 py-3 bg-gradient-to-r from-pink-500 via-yellow-400 to-fuchsia-500 text-white text-base rounded-full font-bold shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out mt-4 animate-fade-in"
            aria-label="Browse all books at Coder-Bookstore"
          >
            Explore Our Collection <FaChevronRight className="inline-block ml-2 -mr-1 text-xs" />
          </Link>
        </div>
      </motion.section>

      {/* Featured Books Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="mb-16"
      >
        <h2 className="text-2xl md:text-3xl font-extrabold text-purple-700 dark:text-purple-400 mb-8 text-center drop-shadow-md">
          <FaFire className="inline-block text-yellow-500 mr-2 align-middle" />
          Sách Nổi Bật <span className="text-pink-500">& Mới Nhất</span>
        </h2>
        
        {loading && <Loading message="Đang tải sách..." />}
        {error && <Error message={`Lỗi: ${error}`} />}
        
        {!loading && !error && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
          >
            {books.map(({ id, title, author, price, img, rating }) => (
              <motion.article
                key={id}
                variants={{
                  hidden: { opacity: 0, y: 50, scale: 0.95 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 dark:border-gray-700 flex flex-col hover:-translate-y-1 hover:scale-[1.025]"
              >
                <div className="relative w-full aspect-[3/4] overflow-hidden rounded-t-xl bg-gray-100 dark:bg-gray-700">
                  <Image
                    src={img}
                    alt={title}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority={id <= 3}
                    className="group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-t-xl"
                  />
                </div>
                
                <div className="p-4 flex flex-col flex-grow">
                  <div>
                    <h3 className="text-base font-bold text-pink-600 dark:text-pink-400 mb-1 leading-snug line-clamp-2 min-h-[40px]">{title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">by <span className="font-semibold">{author}</span></p>
                    <div className="flex items-center mb-1">
                      {renderStars(rating)}
                      <span className="text-xs text-gray-600 dark:text-gray-400 ml-2">({rating})</span>
                    </div>
                    <p className="font-extrabold text-base text-yellow-600 dark:text-yellow-400 mb-2">{price}</p>
                  </div>
                  <Link
                    href={`/Books/${id}`}
                    className="inline-flex items-center justify-center gap-2 text-pink-500 font-semibold hover:text-white transition-colors duration-200 mt-auto bg-pink-100 dark:bg-gray-700 py-1.5 rounded-lg hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-400 hover:shadow-lg text-xs border border-pink-200 dark:border-gray-600"
                    aria-label={`Details about ${title}`}
                  >
                    Xem chi tiết <FaChevronRight className="text-xs" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
        
        <div className="text-center mt-10">
          <Link
            href="/Books"
            className="inline-block px-6 py-2 text-base bg-purple-600 text-white rounded-full font-semibold shadow-lg hover:bg-purple-700 hover:scale-105 transition-transform duration-300 ease-in-out"
            aria-label="View all books"
          >
            Xem tất cả sách <FaChevronRight className="inline-block ml-2 text-xs" />
          </Link>
        </div>
      </motion.section>

      {/* Explore More Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="mb-16"
      >
        <h2 className="text-2xl md:text-3xl font-extrabold text-pink-700 dark:text-pink-400 mb-8 text-center drop-shadow-md">
          <FaFeatherAlt className="inline-block text-purple-500 mr-2 align-middle" />
          Khám Phá Thêm
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {explore.map(({ href, icon, label, desc }) => (
            <motion.div
              key={href}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg hover:shadow-2xl transition-transform hover:scale-105 duration-300 border border-gray-100 dark:border-gray-700 flex flex-col items-center text-center justify-center"
            >
              <div className="mb-3 p-3 rounded-full bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 dark:from-yellow-950 dark:via-pink-950 dark:to-purple-950 shadow-inner">
                {icon}
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-1">{label}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
              <Link
                href={href}
                className="mt-4 inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold hover:text-purple-800 dark:hover:text-purple-200 transition-colors duration-200 text-sm"
                aria-label={`Go to ${label}`}
              >
                Tìm hiểu thêm <FaChevronRight className="text-xs" />
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action or Testimonial Section (New) */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
        className="text-center py-10 bg-gradient-to-br from-pink-100 via-purple-100 to-yellow-100 dark:from-pink-900/50 dark:via-purple-900/50 dark:to-yellow-900/50 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
      >
        <h2 className="text-2xl font-extrabold text-pink-700 dark:text-pink-400 mb-4">
          Sẵn Sàng Nâng Tầm Kỹ Năng Của Bạn?
        </h2>
        <p className="text-base text-gray-700 dark:text-gray-300 max-w-xl mx-auto mb-6">
          Tham gia cộng đồng Coder-Bookstore ngay hôm nay để không bỏ lỡ những kiến thức mới nhất!
        </p>
        <div className="flex justify-center gap-3">
          <Link
            href="/Register"
            className="inline-block px-6 py-2 bg-purple-600 text-white text-base rounded-full font-bold shadow-lg hover:bg-purple-700 hover:scale-105 transition-transform duration-300"
            aria-label="Register now"
          >
            Đăng Ký Ngay
          </Link>
          <Link
            href="/Contact"
            className="inline-block px-6 py-2 bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-300 text-base rounded-full font-bold shadow-lg hover:bg-gray-100 dark:hover:bg-gray-600 hover:scale-105 transition-transform duration-300 border border-purple-600 dark:border-purple-400"
            aria-label="Learn more about us"
          >
            Tìm Hiểu Thêm
          </Link>
        </div>
      </motion.section>
    </> // ĐÃ XÓA THẺ <main> BÊN NGOÀI NÀY
  );
}