'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart, FaArrowUp } from 'react-icons/fa';
import { JSX } from 'react';

export default function Footer(): JSX.Element {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  return (
    <footer className="bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 text-white py-8 px-2 mt-12 relative overflow-hidden rounded-t-lg">
      {/* Blob nhỏ, mờ hơn */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute w-20 h-20 bg-pink-600 rounded-full opacity-5 blur-2xl -top-4 -left-4 animate-blob" />
        <div className="absolute w-28 h-28 bg-purple-600 rounded-full opacity-5 blur-2xl -bottom-8 -right-4 animate-blob animation-delay-2000" />
        <div className="absolute w-24 h-24 bg-red-600 rounded-full opacity-5 blur-2xl top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2 animate-blob animation-delay-4000" />
      </div>
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4 pb-6 border-b border-white border-opacity-10"
        >
          {/* About */}
          <motion.div variants={fadeInVariants} className="text-center md:text-left lg:col-span-1">
            <h3 className="text-2xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-pink-200 drop-shadow-sm">
              Coder-Bookstore
            </h3>
            <p className="text-sm text-gray-200 leading-relaxed max-w-xs mx-auto md:mx-0 font-light">
              Nguồn tri thức lập trình, nơi đam mê và công nghệ hội tụ. Khám phá tuyển chọn sách chất lượng, từ cơ bản đến nâng cao.
            </p>
          </motion.div>
          {/* Khám phá */}
          <motion.div variants={fadeInVariants} className="text-center md:text-left">
            <h4 className="text-base font-bold mb-3 text-yellow-200">Khám phá</h4>
            <ul className="space-y-1 text-sm font-light">
              <li><Link href="/" className="hover:text-pink-200 transition-colors duration-200 hover:underline">Trang chủ</Link></li>
              <li><Link href="/Books" className="hover:text-pink-200 transition-colors duration-200 hover:underline">Tất cả sách</Link></li>
              <li><Link href="/Categories" className="hover:text-pink-200 transition-colors duration-200 hover:underline">Danh mục sách</Link></li>
              <li><Link href="/Authors" className="hover:text-pink-200 transition-colors duration-200 hover:underline">Tác giả nổi bật</Link></li>
              <li><Link href="/NewArrivals" className="hover:text-pink-200 transition-colors duration-200 hover:underline">Sách mới về</Link></li>
              <li><Link href="/BestSeller" className="hover:text-pink-200 transition-colors duration-200 hover:underline">Sách bán chạy</Link></li>
              <li><Link href="/Promotions" className="hover:text-pink-200 transition-colors duration-200 hover:underline">Ưu đãi & Khuyến mãi</Link></li>
              <li><Link href="/Blog" className="hover:text-pink-200 transition-colors duration-200 hover:underline">Bài viết & Tin tức</Link></li>
              <li><Link href="/Events" className="hover:text-pink-200 transition-colors duration-200 hover:underline">Sự kiện</Link></li>
              <li><Link href="/AboutPage" className="hover:text-pink-200 transition-colors duration-200 hover:underline">Về chúng tôi</Link></li>
              <li><Link href="/Career" className="hover:text-pink-200 transition-colors duration-200 hover:underline">Cơ hội nghề nghiệp</Link></li>
            </ul>
          </motion.div>
          {/* Dịch vụ khách hàng */}
          <motion.div variants={fadeInVariants} className="text-center md:text-left">
            <h4 className="text-base font-bold mb-3 text-yellow-200">Dịch vụ khách hàng</h4>
            <ul className="space-y-1 text-sm font-light">
              <li><Link href="/Privacy" className="hover:text-pink-200 transition-colors duration-200 hover:underline">Chính sách bảo mật</Link></li>
              <li><Link href="/Terms" className="hover:text-pink-200 transition-colors duration-200 hover:underline">Điều khoản dịch vụ</Link></li>
              <li><Link href="/Faq" className="hover:text-pink-200 transition-colors duration-200 hover:underline">Câu hỏi thường gặp</Link></li>
              <li><Link href="/ShipReturns" className="hover:text-pink-200 transition-colors duration-200 hover:underline">Vận chuyển & Đổi trả</Link></li>
              <li><Link href="/Support-Center" className="hover:text-pink-200 transition-colors duration-200 hover:underline">Trung tâm hỗ trợ</Link></li>
              <li><Link href="/Payment" className="hover:text-pink-200 transition-colors duration-200 hover:underline">Phương thức thanh toán</Link></li>
              <li><Link href="/OrderTracking" className="hover:text-pink-200 transition-colors duration-200 hover:underline">Theo dõi đơn hàng</Link></li>
              <li><Link href="/Feedback" className="hover:text-pink-200 transition-colors duration-200 hover:underline">Gửi phản hồi</Link></li>
              <li><Link href="/Contact" className="hover:text-pink-200 transition-colors duration-200 hover:underline">Liên hệ</Link></li>
            </ul>
          </motion.div>
        </motion.div>
        {/* Contact & Social */}
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-6 pt-4 border-t border-white border-opacity-10 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          {/* Contact Info */}
          <div className="text-center md:text-left flex-grow">
            <h4 className="text-base font-bold mb-2 text-yellow-200">Liên hệ chúng tôi</h4>
            <div className="space-y-1 text-sm font-light">
              <p className="flex items-center justify-center md:justify-start gap-1.5">
                <FaEnvelope className="text-pink-300 text-base" />
                <a href="mailto:support@coderbookstore.com" className="hover:text-pink-200 transition-colors duration-200">support@coderbookstore.com</a>
              </p>
              <p className="flex items-center justify-center md:justify-start gap-1.5">
                <FaPhone className="text-pink-300 text-base" />
                <a href="tel:+84123456789" className="hover:text-pink-200 transition-colors duration-200">+84 123 456 789 (24/7)</a>
              </p>
              <p className="flex items-center justify-center md:justify-start gap-1.5">
                <FaMapMarkerAlt className="text-pink-300 text-base mt-0.5" />
                <span>KĐT An Phú Thịnh, Nhơn Bình, Quy Nhơn, Bình Định</span>
              </p>
            </div>
          </div>
          {/* Social Icons */}
          <div className="text-center md:text-right">
            <h4 className="text-base font-bold mb-2 text-yellow-200">Kết nối với chúng tôi</h4>
            <div className="flex justify-center md:justify-end space-x-2 text-white text-opacity-80">
              {[
                { href: 'https://facebook.com/coderbookstore', icon: <FaFacebookF size={16} />, label: 'Facebook' },
                { href: 'https://twitter.com/coderbookstore', icon: <FaTwitter size={16} />, label: 'Twitter' },
                { href: 'https://instagram.com/coderbookstore', icon: <FaInstagram size={16} />, label: 'Instagram' },
                { href: 'https://linkedin.com/company/coderbookstore', icon: <FaLinkedinIn size={16} />, label: 'LinkedIn' },
                { href: 'https://github.com/coderbookstore', icon: <FaGithub size={16} />, label: 'GitHub' },
                { href: 'http://youtube.com/coderbookstore', icon: <FaYoutube size={16} />, label: 'YouTube' },
              ].map((social) => (
                <motion.a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yellow-200 transition-colors duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-200 rounded-full"
                  aria-label={`Theo dõi chúng tôi trên ${social.label}`}
                  whileHover={{ rotate: 5 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-4 text-gray-300 text-opacity-80 gap-2">
          <motion.p
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: 0.2 }}
            className="text-center md:text-left text-xs italic max-w-xs"
          >
            "Mỗi trang sách là một bước tiến trên hành trình khám phá thế giới muôn màu của bạn."
          </motion.p>
          <motion.p
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: 0.3 }}
            className="text-center md:text-right text-xs flex items-center gap-1"
          >
            © {new Date().getFullYear()} Coder-Bookstore. Crafted with <FaHeart className="text-pink-400 animate-pulse text-xs" /> in Vietnam. All rights reserved.
          </motion.p>
        </div>
      </div>
      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        whileHover={{ scale: 1.08, backgroundColor: '#c026d3' }}
        whileTap={{ scale: 0.95 }}
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 bg-fuchsia-600 text-white p-2.5 rounded-full shadow-lg hover:bg-fuchsia-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:ring-opacity-60 z-50"
        aria-label="Cuộn lên đầu trang"
        title="Cuộn lên đầu trang"
      >
        <FaArrowUp className="w-4 h-4" />
      </motion.button>
    </footer>
  );
}