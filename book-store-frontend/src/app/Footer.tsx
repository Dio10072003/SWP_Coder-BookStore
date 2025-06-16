'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart, FaArrowUp } from 'react-icons/fa';
import { JSX } from 'react';

export default function Footer(): JSX.Element {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Animation variants for more subtle fade-in
  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Reduced stagger delay
      },
    },
  };

  return (
    <footer className="bg-gradient-to-br from-purple-800 via-pink-800 to-red-800 text-white py-16 px-4 mt-24 relative overflow-hidden">
      {/* Abstract background elements for artistic touch - reduced opacity/size for less visual clutter */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute w-48 h-48 bg-pink-600 rounded-full opacity-05 blur-2xl -top-10 -left-10 animate-blob"></div>
        <div className="absolute w-64 h-64 bg-purple-600 rounded-full opacity-05 blur-2xl -bottom-20 -right-10 animate-blob animation-delay-2000"></div>
        <div className="absolute w-56 h-56 bg-red-600 rounded-full opacity-05 blur-2xl top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Main content grid - now 3 columns (About, Explore, Customer Service) */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8 pb-12 border-b border-white border-opacity-15" // Reduced padding bottom
        >
          {/* Section 1: Brand Philosophy / About Us - Kept concise */}
          <motion.div variants={fadeInVariants} className="text-center md:text-left lg:col-span-1">
            <h3 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-300 drop-shadow-md">
              Coder-Bookstore
            </h3>
            <p className="text-base text-gray-200 leading-relaxed max-w-sm mx-auto md:mx-0 font-light">
              Nguồn tri thức lập trình, nơi đam mê và công nghệ hội tụ. Khám phá tuyển chọn sách chất lượng, từ cơ bản đến nâng cao.
            </p>
          </motion.div>

          {/* Section 2: Khám phá (Quick Links) */}
          <motion.div variants={fadeInVariants} className="text-center md:text-left">
            <h4 className="text-xl font-bold mb-5 text-yellow-300">Khám phá</h4>
            <ul className="space-y-2 text-base font-light">
              <li><Link href="/" className="hover:text-pink-300 transition-colors duration-300 hover:underline">Trang chủ</Link></li>
              <li><Link href="/Books" className="hover:text-pink-300 transition-colors duration-300 hover:underline">Tất cả sách</Link></li>
              <li><Link href="/Categories" className="hover:text-pink-300 transition-colors duration-300 hover:underline">Danh mục sách</Link></li>
              <li><Link href="/Authors" className="hover:text-pink-300 transition-colors duration-300 hover:underline">Tác giả nổi bật</Link></li>
              <li><Link href="/NewArrivals" className="hover:text-pink-300 transition-colors duration-300 hover:underline">Sách mới về</Link></li>
              <li><Link href="/BestSellers" className="hover:text-pink-300 transition-colors duration-300 hover:underline">Sách bán chạy</Link></li>
              <li><Link href="/Promotions" className="hover:text-pink-300 transition-colors duration-300 hover:underline">Ưu đãi & Khuyến mãi</Link></li>
              <li><Link href="/Blog" className="hover:text-pink-300 transition-colors duration-300 hover:underline">Bài viết & Tin tức</Link></li>
              <li><Link href="/Events" className="hover:text-pink-300 transition-colors duration-300 hover:underline">Sự kiện</Link></li>
              <li><Link href="/AboutPage" className="hover:text-pink-300 transition-colors duration-300 hover:underline">Về chúng tôi</Link></li>
              <li><Link href="/Career" className="hover:text-pink-300 transition-colors duration-300 hover:underline">Cơ hội nghề nghiệp</Link></li>
            </ul>
          </motion.div>

          {/* Section 3: Dịch vụ khách hàng (Customer Service) */}
          <motion.div variants={fadeInVariants} className="text-center md:text-left">
            <h4 className="text-xl font-bold mb-5 text-yellow-300">Dịch vụ khách hàng</h4>
            <ul className="space-y-2 text-base font-light">
              <li><Link href="/Privacy" className="hover:text-pink-300 transition-colors duration-300 hover:underline">Chính sách bảo mật</Link></li>
              <li><Link href="/Terms" className="hover:text-pink-300 transition-colors duration-300 hover:underline">Điều khoản dịch vụ</Link></li>
              <li><Link href="/Faq" className="hover:text-pink-300 transition-colors duration-300 hover:underline">Câu hỏi thường gặp</Link></li>
              <li><Link href="/ShipReturns" className="hover:text-pink-300 transition-colors duration-300 hover:underline">Vận chuyển & Đổi trả</Link></li>
              <li><Link href="/Support-Center" className="hover:text-pink-300 transition-colors duration-300 hover:underline">Trung tâm hỗ trợ</Link></li>
              <li><Link href="/Payment" className="hover:text-pink-300 transition-colors duration-300 hover:underline">Phương thức thanh toán</Link></li>
              <li><Link href="/OrderTracking" className="hover:text-pink-300 transition-colors duration-300 hover:underline">Theo dõi đơn hàng</Link></li>
              <li><Link href="/Feedback" className="hover:text-pink-300 transition-colors duration-300 hover:underline">Gửi phản hồi</Link></li>
              <li><Link href="/Contact" className="hover:text-pink-300 transition-colors duration-300 hover:underline">Liên hệ</Link></li>
            </ul>
          </motion.div>
        </motion.div>

        {/* New Section: Contact Info & Social Icons - Placed below the main 3 columns */}
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 pt-8 border-t border-white border-opacity-15 flex flex-col md:flex-row justify-between items-center gap-8" // Added flex for alignment
        >
          {/* Contact Info */}
          <div className="text-center md:text-left flex-grow"> {/* Flex-grow to take available space */}
            <h4 className="text-xl font-bold mb-4 text-yellow-300">Liên hệ chúng tôi</h4>
            <div className="space-y-2 text-base font-light">
              <p className="flex items-center justify-center md:justify-start gap-2">
                <FaEnvelope className="text-pink-400 text-lg" />
                <a href="mailto:support@coderbookstore.com" className="hover:text-pink-300 transition-colors duration-300 text-sm">support@coderbookstore.com</a>
              </p>
              <p className="flex items-center justify-center md:justify-start gap-2">
                <FaPhone className="text-pink-400 text-lg" />
                <a href="tel:+84123456789" className="hover:text-pink-300 transition-colors duration-300 text-sm">+84 123 456 789 (24/7)</a>
              </p>
              <p className="flex items-center justify-center md:justify-start items-start gap-2">
                <FaMapMarkerAlt className="text-pink-400 text-lg mt-0.5" />
                <span className="text-sm">KĐT An Phú Thịnh, Nhơn Bình, Quy Nhơn, Bình Định</span>
              </p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="text-center md:text-right">
            <h4 className="text-xl font-bold mb-4 text-yellow-300">Kết nối với chúng tôi</h4>
            <div className="flex justify-center md:justify-end space-x-4 text-white text-opacity-80">
              {[
                { href: 'https://facebook.com/coderbookstore', icon: <FaFacebookF size={22} />, label: 'Facebook' },
                { href: 'https://twitter.com/coderbookstore', icon: <FaTwitter size={22} />, label: 'Twitter' },
                { href: 'https://instagram.com/coderbookstore', icon: <FaInstagram size={22} />, label: 'Instagram' },
                { href: 'https://linkedin.com/company/coderbookstore', icon: <FaLinkedinIn size={22} />, label: 'LinkedIn' },
                { href: 'https://github.com/coderbookstore', icon: <FaGithub size={22} />, label: 'GitHub' },
                { href: 'http://youtube.com/coderbookstore', icon: <FaYoutube size={22} />, label: 'YouTube' },
              ].map((social) => (
                <motion.a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-yellow-300 transition-colors duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-yellow-300 rounded-full"
                  aria-label={`Theo dõi chúng tôi trên ${social.label}`}
                  whileHover={{ rotate: 5 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>


        {/* Bottom Section: Artistic Quote & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 text-gray-300 text-opacity-80 gap-4">
          <motion.p
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: 0.3 }}
            className="text-center md:text-left text-sm italic max-w-lg"
          >
            "Mỗi trang sách là một bước tiến trên hành trình khám phá thế giới muôn màu của bạn."
          </motion.p>

          <motion.p
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: 0.4 }}
            className="text-center md:text-right text-xs flex items-center gap-1.5"
          >
            © {new Date().getFullYear()} Coder-Bookstore. Crafted with <FaHeart className="text-pink-500 animate-pulse text-base" /> in Vietnam. All rights reserved.
          </motion.p>
        </div>
      </div>

      {/* Scroll to Top Button - Floating */}
      <motion.button
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        whileHover={{ scale: 1.1, backgroundColor: '#c026d3' }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-fuchsia-600 text-white p-3.5 rounded-full shadow-xl hover:bg-fuchsia-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-fuchsia-500 focus:ring-opacity-60 z-50"
        aria-label="Cuộn lên đầu trang"
        title="Cuộn lên đầu trang"
      >
        <FaArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
}