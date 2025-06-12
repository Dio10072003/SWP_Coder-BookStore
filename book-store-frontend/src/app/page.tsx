'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBookOpen, FaInfoCircle, FaPhoneAlt, FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';

export default function Home() {
  const [greet, setGreet] = useState('Hello');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreet('Good Morning');
    else if (hour < 18) setGreet('Good Afternoon');
    else setGreet('Good Evening');
  }, []);

  const books = [
    {
      id: 1,
      title: 'Code Mastery: Advanced Techniques',
      author: 'Jane Doe',
      price: '99.000đ',
      img: 'https://images-na.ssl-images-amazon.com/images/I/41w7mJ0Oj-L._SX258_BO1,204,203,200_.jpg',
    },
    {
      id: 2,
      title: 'The Art of Clean Code',
      author: 'John Smith',
      price: '125.000đ',
      img: 'https://images-na.ssl-images-amazon.com/images/I/41xShlnTZTL._SX374_BO1,204,203,200_.jpg',
    },
    {
      id: 3,
      title: 'Beyond the Code: Software Architecture',
      author: 'Alex Brown',
      price: '150.000đ',
      img: 'https://images-na.ssl-images-amazon.com/images/I/51LnQxpLsuL._SX379_BO1,204,203,200_.jpg',
    },
    {
      id: 4,
      title: 'Mastering JavaScript ES6+',
      author: 'Emily White',
      price: '110.000đ',
      img: 'https://images-na.ssl-images-amazon.com/images/I/41N5hdRcw6L._SX258_BO1,204,203,200_.jpg',
    },
    {
      id: 5,
      title: 'Python for Data Science',
      author: 'David Green',
      price: '180.000đ',
      img: 'https://images-na.ssl-images-amazon.com/images/I/41uPjEenkFL._SX379_BO1,204,203,200_.jpg',
    },
    {
      id: 6,
      title: 'Designing User Interfaces',
      author: 'Sophia Lee',
      price: '135.000đ',
      img: 'https://images-na.ssl-images-amazon.com/images/I/41fnWzYPvFL._SX331_BO1,204,203,200_.jpg',
    },
  ];

  const explore = [
    {
      href: '/AboutPage',
      icon: <FaInfoCircle className="text-4xl text-pink-500" />,
      label: 'Our Story',
      desc: 'Discover our passion and journey.',
    },
    {
      href: '/Contact',
      icon: <FaPhoneAlt className="text-4xl text-yellow-500" />,
      label: 'Contact Us',
      desc: 'We love to hear from you!',
    },
    {
      href: '/Categories',
      icon: <FaBookOpen className="text-4xl text-purple-500" />,
      label: 'Browse Categories',
      desc: 'Find books for every coding passion.',
    },
  ];

  return (
    <main className="min-h-screen px-6 py-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-extrabold text-pink-600 drop-shadow-lg mb-4">
          {greet}, Welcome to <span className="text-yellow-500">Coder-Bookstore</span>!
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto">
          Explore a vibrant collection of the best coding books to boost your skills and creativity.
        </p>
        <Link
          href="/Books"
          className="inline-block mt-8 px-8 py-3 bg-gradient-to-r from-pink-500 via-yellow-400 to-pink-500 text-white rounded-full font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition-transform"
        >
          Browse Books
        </Link>
      </motion.section>

      {/* Featured Books */}
      <section className="mb-20">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-extrabold text-purple-700 mb-10 text-center drop-shadow-md"
        >
          Featured Books
        </motion.h2>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
        >
          {books.map(({ id, title, author, price, img }) => (
            <motion.article
              key={id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden group"
            >
              <Image
                src={img}
                alt={title}
                width={320}
                height={420}
                priority={id === 1}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold text-pink-600 dark:text-pink-400 mb-1">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">by {author}</p>
                <p className="font-semibold text-yellow-600 dark:text-yellow-400 mb-3">{price}</p>
                <Link
                  href={`/books/${id}`}
                  className="inline-flex items-center gap-2 text-pink-500 font-semibold hover:text-pink-700 dark:hover:text-pink-300 transition"
                  aria-label={`Details about ${title}`}
                >
                  Details <FaChevronRight />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* Explore More */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-extrabold text-pink-700 dark:text-pink-400 mb-8 text-center">
          Explore More
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {explore.map(({ href, icon, label, desc }) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center text-center bg-gradient-to-tr from-yellow-300 via-pink-300 to-purple-300 dark:from-yellow-700 dark:via-pink-700 dark:to-purple-900 p-8 rounded-2xl shadow-md hover:shadow-xl transition-transform hover:scale-105"
              aria-label={label}
            >
              <div className="mb-4">{icon}</div>
              <h3 className="text-2xl font-bold mb-1">{label}</h3>
              <p className="text-sm font-medium">{desc}</p>
            </Link>
          ))}
        </div>
      </motion.section>
    </main>
  );
}
