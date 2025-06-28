'use client';
import React from 'react';
import { FaQuestionCircle, FaPhoneAlt, FaMoneyCheckAlt, FaUndoAlt, FaShippingFast, FaShieldAlt } from 'react-icons/fa';
import SupportCard from './Components/SupportCard.jsx';

const supports = [
  {
    title: 'Câu hỏi thường gặp',
    desc: 'Tìm câu trả lời cho các thắc mắc phổ biến về mua hàng, tài khoản, vận chuyển...',
    icon: <FaQuestionCircle className="text-3xl text-blue-500" />,
    href: '/Faq',
    color: 'from-blue-100 to-blue-50',
  },
  {
    title: 'Liên hệ hỗ trợ',
    desc: 'Kết nối với đội ngũ CSKH qua email, hotline hoặc chat trực tuyến.',
    icon: <FaPhoneAlt className="text-3xl text-pink-500" />,
    href: '/Contact',
    color: 'from-pink-100 to-pink-50',
  },
  {
    title: 'Hướng dẫn thanh toán',
    desc: 'Chi tiết các phương thức thanh toán, bảo mật và lưu ý khi giao dịch.',
    icon: <FaMoneyCheckAlt className="text-3xl text-green-500" />,
    href: '/Payment',
    color: 'from-green-100 to-green-50',
  },
  {
    title: 'Chính sách đổi trả',
    desc: 'Quy trình đổi/trả hàng, điều kiện áp dụng và các lưu ý quan trọng.',
    icon: <FaUndoAlt className="text-3xl text-yellow-500" />,
    href: '/ShipReturns',
    color: 'from-yellow-100 to-yellow-50',
  },
  {
    title: 'Vận chuyển & giao nhận',
    desc: 'Thông tin về phí ship, thời gian giao hàng, theo dõi đơn hàng.',
    icon: <FaShippingFast className="text-3xl text-purple-500" />,
    href: '/ShipReturns',
    color: 'from-purple-100 to-purple-50',
  },
  {
    title: 'Chính sách bảo mật',
    desc: 'Cam kết bảo vệ thông tin cá nhân và quyền riêng tư của khách hàng.',
    icon: <FaShieldAlt className="text-3xl text-cyan-500" />,
    href: '/Privacy',
    color: 'from-cyan-100 to-cyan-50',
  },
];

export default function SupportCenterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-yellow-50 py-12 px-4">
      <h1 className="text-5xl font-extrabold text-center mb-6 text-blue-700 drop-shadow-lg">Trung Tâm Hỗ Trợ</h1>
      <p className="text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto">Chúng tôi luôn sẵn sàng hỗ trợ bạn mọi lúc, mọi nơi. Hãy chọn chủ đề bạn quan tâm để được giải đáp nhanh chóng và tận tình!</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {supports.map((item, idx) => (
          <SupportCard
            key={idx}
            title={item.title}
            desc={item.desc}
            icon={item.icon}
            href={item.href}
            color={item.color}
          />
        ))}
      </div>
    </div>
  );
} 