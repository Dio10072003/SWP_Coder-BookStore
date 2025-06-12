'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaArrowUp } from 'react-icons/fa';
import { JSX } from 'react';

export default function Footer(): JSX.Element {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-gradient-to-r from-amber-50 via-pink-50 to-blue-50 dark:from-amber-900 dark:via-pink-900 dark:to-blue-900 py-10 px-6 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center lg:text-left">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h3 className="text-xl font-extrabold text-gray-800 dark:text-gray-200 mb-4">About Us</h3>
          <p className="text-base text-gray-600 dark:text-gray-300 max-w-xs mx-auto lg:mx-0">
            Coder-Bookstore is your go-to place for books that inspire coding and creativity.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <h3 className="text-xl font-extrabold text-gray-800 dark:text-gray-200 mb-4">Quick Links</h3>
          <ul className="space-y-3 text-base">
            {[
              { href: '/Privacy', label: 'Privacy Policy' },
              { href: '/Terms', label: 'Terms of Service' },
              { href: '/Help', label: 'Help' },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:underline transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <h3 className="text-xl font-extrabold text-gray-800 dark:text-gray-200 mb-4">Contact Us</h3>
          <ul className="space-y-3 text-base text-gray-600 dark:text-gray-300">
            <li className="flex justify-center lg:justify-start items-center gap-2">
              <FaEnvelope className="text-purple-600 dark:text-purple-400" />
              <a
                href="mailto:support@coderbookstore.com"
                className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
              >
                support@coderbookstore.com
              </a>
            </li>
            <li className="flex justify-center lg:justify-start items-center gap-2">
              <FaPhone className="text-purple-600 dark:text-purple-400" />
              <a
                href="tel:+1234567890"
                className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
              >
                +1 (234) 567-890
              </a>
            </li>
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
          <h3 className="text-xl font-extrabold text-gray-800 dark:text-gray-200 mb-4">Follow Us</h3>
          <div className="flex justify-center lg:justify-start space-x-6 text-gray-600 dark:text-gray-300">
            {[
              { href: 'https://facebook.com', icon: <FaFacebookF size={22} /> },
              { href: 'https://twitter.com', icon: <FaTwitter size={22} /> },
              { href: 'https://instagram.com', icon: <FaInstagram size={22} /> },
            ].map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col items-center gap-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-base text-gray-500 dark:text-gray-400 text-center"
        >
          © {new Date().getFullYear()} Coder-Bookstore. All rights reserved.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ scale: 1.1, backgroundColor: 'var(--tw-bg-opacity, 1)' }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-200"
          aria-label="Scroll to top"
          title="Scroll to Top"
        >
          <FaArrowUp className="w-5 h-5" />
        </motion.button>
      </div>
    </footer>
  );
}
