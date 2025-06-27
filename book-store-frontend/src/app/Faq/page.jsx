'use client';
import React, { useState } from 'react';
import FaqCard from './Components/FaqCard.jsx';

const faqs = [
  { q: 'Làm thế nào để đặt sách trên Coder-BookStore?', a: 'Bạn chỉ cần chọn sách, thêm vào giỏ hàng và tiến hành thanh toán theo hướng dẫn.' },
  { q: 'Tôi có thể thanh toán bằng những hình thức nào?', a: 'Chúng tôi hỗ trợ thanh toán qua thẻ ngân hàng, ví điện tử và COD.' },
  { q: 'Bao lâu tôi nhận được sách sau khi đặt hàng?', a: 'Thời gian giao hàng từ 2-5 ngày làm việc tùy khu vực.' },
  { q: 'Làm sao để kiểm tra tình trạng đơn hàng?', a: 'Bạn có thể kiểm tra trong mục "Đơn hàng của tôi" sau khi đăng nhập.' },
  { q: 'Tôi muốn đổi/trả sách thì làm thế nào?', a: 'Liên hệ bộ phận CSKH trong vòng 7 ngày kể từ khi nhận hàng để được hỗ trợ.' },
  { q: 'Coder-BookStore có chương trình khuyến mãi nào không?', a: 'Chúng tôi thường xuyên có các chương trình ưu đãi, hãy theo dõi mục Khuyến Mãi!' },
  { q: 'Tôi có thể mua sách bản điện tử không?', a: 'Hiện tại chúng tôi chỉ cung cấp sách giấy, chưa hỗ trợ ebook.' },
  { q: 'Làm sao để nhận hóa đơn VAT?', a: 'Vui lòng điền thông tin xuất hóa đơn khi đặt hàng hoặc liên hệ CSKH.' },
  { q: 'Tôi có thể hủy đơn hàng sau khi đặt không?', a: 'Bạn có thể hủy đơn trước khi đơn được xác nhận giao cho đơn vị vận chuyển.' },
  { q: 'Coder-BookStore có hỗ trợ xuất hóa đơn cho doanh nghiệp không?', a: 'Có, chúng tôi hỗ trợ xuất hóa đơn VAT cho doanh nghiệp.' },
  { q: 'Tôi muốn trở thành cộng tác viên/đối tác thì làm thế nào?', a: 'Hãy liên hệ với chúng tôi qua mục Liên Hệ để biết thêm chi tiết.' },
  { q: 'Có thể đặt sách làm quà tặng không?', a: 'Bạn có thể chọn gói quà tặng khi đặt hàng và ghi chú lời chúc.' },
  { q: 'Tôi bị lỗi khi thanh toán, phải làm sao?', a: 'Vui lòng thử lại hoặc liên hệ CSKH để được hỗ trợ kịp thời.' },
  { q: 'Có thể nhận sách tại cửa hàng không?', a: 'Hiện tại chúng tôi chỉ bán online, chưa có cửa hàng trực tiếp.' },
  { q: 'Làm sao để nhận thông báo về sách mới?', a: 'Đăng ký nhận bản tin hoặc theo dõi fanpage của chúng tôi.' },
];

const cardColors = [
  'bg-pink-100', 'bg-yellow-100', 'bg-green-100', 'bg-blue-100', 'bg-purple-100',
  'bg-red-100', 'bg-indigo-100', 'bg-teal-100', 'bg-orange-100', 'bg-cyan-100',
  'bg-lime-100', 'bg-fuchsia-100', 'bg-amber-100', 'bg-emerald-100', 'bg-sky-100',
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = idx => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 py-12 px-4">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-blue-700 drop-shadow">Câu hỏi thường gặp (FAQ)</h1>
      <div className="max-w-3xl mx-auto space-y-6">
        {faqs.map((faq, idx) => (
          <FaqCard
            key={idx}
            question={faq.q}
            answer={faq.a}
            isOpen={openIndex === idx}
            onClick={() => handleToggle(idx)}
            color={cardColors[idx % cardColors.length]}
          />
        ))}
      </div>
    </div>
  );
} 