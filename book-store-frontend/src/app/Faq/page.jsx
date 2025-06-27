import React from 'react';
import FAQHeader from './FAQHeader';
import FAQCard from './FAQCard';

const faqs = [
  {
    question: 'Làm sao để đặt sách trên Coder-BookStore?',
    answer: 'Bạn chỉ cần chọn sách, thêm vào giỏ hàng và làm theo hướng dẫn thanh toán. Đơn hàng sẽ được xác nhận qua email.'
  },
  {
    question: 'Tôi có thể theo dõi đơn hàng như thế nào?',
    answer: 'Sau khi đặt hàng, bạn sẽ nhận được mã vận đơn qua email. Dùng mã này để tra cứu trạng thái trên website đối tác vận chuyển.'
  },
  {
    question: 'Phí vận chuyển được tính ra sao?',
    answer: 'Đơn từ 300.000 VND được miễn phí vận chuyển. Đơn dưới mức này sẽ tính phí dựa trên trọng lượng và địa chỉ nhận hàng.'
  },
  {
    question: 'Tôi có thể đổi trả sách trong trường hợp nào?',
    answer: 'Bạn được đổi trả trong 7 ngày nếu sách bị lỗi do xuất bản, hư hỏng khi vận chuyển hoặc không đúng đơn đặt.'
  },
  {
    question: 'Làm sao để yêu cầu đổi trả?',
    answer: 'Liên hệ bộ phận hỗ trợ qua email hoặc điện thoại, cung cấp thông tin đơn hàng và lý do đổi trả.'
  },
  {
    question: 'Tôi có thể thanh toán bằng những hình thức nào?',
    answer: 'Coder-BookStore hỗ trợ thanh toán qua thẻ tín dụng, chuyển khoản ngân hàng, ví điện tử và COD.'
  },
  {
    question: 'Thông tin cá nhân của tôi có được bảo mật không?',
    answer: 'Chúng tôi cam kết bảo mật tuyệt đối thông tin khách hàng, sử dụng SSL và không chia sẻ cho bên thứ ba nếu không cần thiết.'
  },
  {
    question: 'Tôi quên mật khẩu, phải làm sao?',
    answer: 'Bạn hãy dùng chức năng "Quên mật khẩu" trên trang đăng nhập để lấy lại mật khẩu qua email.'
  },
  {
    question: 'Có thể thay đổi địa chỉ nhận hàng sau khi đặt không?',
    answer: 'Bạn hãy liên hệ ngay bộ phận hỗ trợ để được cập nhật địa chỉ nếu đơn chưa giao cho đối tác vận chuyển.'
  },
  {
    question: 'Sách đặt bao lâu thì có?',
    answer: 'Nội thành Quy Nhơn: 1-2 ngày. Các tỉnh khác: 3-5 ngày làm việc. Đơn cuối tuần/ngày lễ sẽ xử lý vào ngày làm việc tiếp theo.'
  },
  {
    question: 'Tôi có thể hủy đơn hàng không?',
    answer: 'Bạn có thể hủy đơn nếu đơn chưa được giao cho đối tác vận chuyển. Hãy liên hệ hỗ trợ càng sớm càng tốt.'
  },
  {
    question: 'Làm sao để nhận hóa đơn mua hàng?',
    answer: 'Hóa đơn điện tử sẽ được gửi qua email sau khi đơn hàng hoàn tất. Nếu cần bản giấy, hãy liên hệ hỗ trợ.'
  },
  {
    question: 'Tôi muốn xuất hóa đơn công ty?',
    answer: 'Vui lòng nhập thông tin công ty khi đặt hàng hoặc liên hệ hỗ trợ để được xuất hóa đơn VAT.'
  },
  {
    question: 'Có chương trình tích điểm/thành viên không?',
    answer: 'Coder-BookStore đang phát triển chương trình thành viên. Hãy theo dõi website để cập nhật ưu đãi mới nhất.'
  },
  {
    question: 'Làm sao liên hệ hỗ trợ nhanh nhất?',
    answer: 'Gọi (84) 901 234 567 hoặc email support@coderbookstore.com. Ngoài ra, bạn có thể nhấn nút "Cần hỗ trợ" ở cuối trang.'
  }
];

const FaqPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-yellow-50 py-0 relative overflow-x-hidden">
      <FAQHeader />
      <main className="max-w-3xl mx-auto px-4 md:px-0 relative z-10">
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <FAQCard key={idx} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default FaqPage; 