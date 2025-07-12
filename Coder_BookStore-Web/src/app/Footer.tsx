'use client';

import Link from 'next/link';
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart, FaArrowUp } from 'react-icons/fa';

interface FooterProps {
  backgroundClass?: string;
  textClass?: string;
  className?: string;
}

const Footer: React.FC<FooterProps> = ({
  backgroundClass = 'bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-950',
  textClass = 'text-cyan-100',
  className = '',
}) => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className={`pt-10 pb-4 px-2 relative overflow-hidden ${backgroundClass} ${textClass} ${className} font-body`}>
      {/* Universe blob/nebula effect */}
      <span className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-blue-700 via-purple-700 to-cyan-700 opacity-30 rounded-full blur-3xl animate-blob z-0" />
      <span className="absolute -bottom-24 -right-24 w-[32rem] h-[32rem] bg-gradient-to-br from-cyan-700 via-indigo-800 to-purple-900 opacity-20 rounded-full blur-3xl animate-blob2 z-0" />
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-8">
        {/* About */}
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 drop-shadow-[0_0_8px_cyan] animate-pulse-slow">Coder-Bookstore</h3>
          <p className="text-base font-light text-cyan-200/80 mb-2">Nguồn tri thức lập trình, nơi đam mê và công nghệ hội tụ. Khám phá tuyển chọn sách chất lượng, đa thể loại, đa dạng nội dung.</p>
        </div>
        {/* Khám phá */}
        <div className="text-center md:text-left">
          <h4 className="text-base font-bold mb-3 text-cyan-300 drop-shadow-[0_0_6px_cyan]">Khám phá</h4>
          <ul className="space-y-1 text-sm font-light">
            <li><Link href="/">Trang chủ</Link></li>
            <li><Link href="/Books">Tất cả sách</Link></li>
            <li><Link href="/Schedule">Lịch phát sóng</Link></li>
            <li><Link href="/Categories">Danh mục sách</Link></li>
            <li><Link href="/Authors">Tác giả nổi bật</Link></li>
            <li><Link href="/NewArrivals">Sách mới về</Link></li>
            <li><Link href="/BestSeller">Sách bán chạy</Link></li>
            <li><Link href="/Promotions">Ưu đãi &amp; Khuyến mãi</Link></li>
            <li><Link href="/Blog">Bài viết &amp; Tin tức</Link></li>
            <li><Link href="/Events">Sự kiện</Link></li>
            <li><Link href="/AboutPage">Về chúng tôi</Link></li>
            <li><Link href="/Career">Cơ hội nghề nghiệp</Link></li>
          </ul>
        </div>
        {/* Dịch vụ khách hàng */}
        <div className="text-center md:text-left">
          <h4 className="text-base font-bold mb-3 text-cyan-300 drop-shadow-[0_0_6px_cyan]">Dịch vụ khách hàng</h4>
          <ul className="space-y-1 text-sm font-light">
            <li><Link href="/Privacy">Chính sách bảo mật</Link></li>
            <li><Link href="/Terms">Điều khoản dịch vụ</Link></li>
            <li><Link href="/Faq">Câu hỏi thường gặp</Link></li>
            <li><Link href="/ShipReturns">Vận chuyển &amp; Đổi trả</Link></li>
            <li><Link href="/Support-Center">Trung tâm hỗ trợ</Link></li>
            <li><Link href="/Payment">Phương thức thanh toán</Link></li>
            <li><Link href="/OrderTracking">Theo dõi đơn hàng</Link></li>
            <li><Link href="/Feedback">Gửi phản hồi</Link></li>
            <li><Link href="/Contact">Liên hệ</Link></li>
          </ul>
        </div>
      </div>
      <hr className="my-6 border-cyan-700/40" />
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Contact Info */}
        <div className="text-center md:text-left flex-grow">
          <h4 className="text-base font-bold mb-2 text-cyan-300 drop-shadow-[0_0_6px_cyan]">Liên hệ chúng tôi</h4>
          <div className="space-y-1 text-sm font-light">
            <p className="flex items-center justify-center md:justify-start gap-1.5 text-cyan-200">
              <FaEnvelope className="text-cyan-400 text-base" />
              <a href="mailto:support@coderbookstore.com" className="hover:text-blue-300 transition-colors duration-200">support@coderbookstore.com</a>
            </p>
            <p className="flex items-center justify-center md:justify-start gap-1.5 text-cyan-200">
              <FaPhone className="text-cyan-400 text-base" />
              <a href="tel:+84123456789" className="hover:text-blue-300 transition-colors duration-200">+84 123 456 789 (24/7)</a>
            </p>
            <p className="flex items-center justify-center md:justify-start gap-1.5 text-cyan-200">
              <FaMapMarkerAlt className="text-cyan-400 text-base mt-0.5" />
              <span>KĐT An Phú Thịnh, Nhơn Bình, Quy Nhơn, Gia Lai</span>
            </p>
          </div>
          <blockquote className="italic text-cyan-300/80 mt-3 text-sm">&quot;Mỗi trang sách là một bước tiến trên hành trình khám phá thế giới muôn màu của bạn.&quot;</blockquote>
        </div>
        {/* Social Icons */}
        <div className="text-center md:text-right">
          <h4 className="text-base font-bold mb-2 text-cyan-300 drop-shadow-[0_0_6px_cyan]">Kết nối với chúng tôi</h4>
          <div className="flex justify-center md:justify-end space-x-2 text-cyan-200">
            {[{
              href: 'https://facebook.com', icon: <FaFacebookF /> },
              { href: 'https://twitter.com', icon: <FaTwitter /> },
              { href: 'https://instagram.com', icon: <FaInstagram /> },
              { href: 'https://linkedin.com', icon: <FaLinkedinIn /> },
              { href: 'https://github.com', icon: <FaGithub /> },
              { href: 'https://youtube.com', icon: <FaYoutube /> },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition-colors duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded-full text-xl drop-shadow-[0_0_6px_cyan]"
                aria-label={`Theo dõi chúng tôi trên ${social.href}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="relative z-10 text-center text-xs text-cyan-400 mt-8">
        © 2025 Coder-Bookstore. Crafted with <FaHeart className="inline-block text-pink-400 mx-1 animate-pulse" /> in Vietnam. All rights reserved.
      </div>
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 bg-cyan-600 hover:bg-cyan-400 text-white p-3 rounded-full shadow-lg transition-all duration-300 animate-bounce-slow border-2 border-cyan-300"
        aria-label="Lên đầu trang"
      >
        <FaArrowUp className="text-xl" />
      </button>
    </footer>
  );
};

export default Footer;