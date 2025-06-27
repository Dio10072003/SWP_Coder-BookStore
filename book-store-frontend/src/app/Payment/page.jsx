'use client';
// app/payment-method/page.jsx
import React, { useState } from 'react';
import PaymentHeader from './Components/PaymentHeader';
import PaymentOptionCard from './Components/PaymentOptionCard';
import PaymentOptionDialog from './Components/PaymentOptionDialog';
import SecurityStatement from './Components/SecurityStatement';
import PaymentTroubleshooting from './Components/PaymentTroubleshooting';
import ContactForPaymentHelp from './Components/ContactForPaymentHelp';

const paymentOptions = [
  {
    title: 'Thanh toán khi nhận sách (COD)',
    description: 'Thanh toán trực tiếp cho nhân viên giao hàng ngay khi bạn nhận được sách. Đây là lựa chọn tiện lợi và an toàn.',
    icon: '💵',
    notes: 'Chỉ áp dụng cho các đơn hàng có giá trị dưới 5.000.000 VND.'
  },
  {
    title: 'Chuyển khoản ngân hàng',
    description: 'Thực hiện chuyển khoản trực tiếp vào tài khoản ngân hàng của Coder-BookStore. Thông tin tài khoản sẽ được cung cấp khi bạn chọn phương thức này.',
    icon: '🏦',
    notes: 'Vui lòng ghi rõ mã đơn hàng trong nội dung chuyển khoản để chúng tôi xác nhận nhanh chóng.'
  },
  {
    title: 'Thẻ tín dụng/ghi nợ (Visa, Mastercard, JCB)',
    description: 'Thanh toán an toàn và nhanh chóng qua cổng thanh toán trực tuyến. Chúng tôi chấp nhận các loại thẻ phổ biến.',
    icon: '💳',
    notes: 'Đảm bảo thông tin thẻ của bạn chính xác để tránh gián đoạn giao dịch.'
  },
  {
    title: 'Ví điện tử (Momo, ZaloPay, VNPay)',
    description: 'Sử dụng các ví điện tử phổ biến để thanh toán chỉ với vài thao tác trên điện thoại. Tiện lợi và tức thì.',
    icon: '📱',
    notes: 'Đảm bảo tài khoản ví điện tử của bạn có đủ số dư.'
  }
];

export default function PaymentMethodPage() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="payment-method-page-container min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-yellow-50">
      <PaymentHeader />
      <main className="payment-main-content max-w-3xl mx-auto px-4 md:px-0">
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
          {paymentOptions.map((option, idx) => (
            <PaymentOptionCard
              key={option.title}
              title={option.title}
              icon={option.icon}
              onClick={() => setSelected(idx)}
            />
          ))}
        </section>
        <PaymentOptionDialog
          open={selected !== null}
          onClose={() => setSelected(null)}
          {...(selected !== null ? paymentOptions[selected] : {})}
        />
        <SecurityStatement />
        <PaymentTroubleshooting />
        <ContactForPaymentHelp />
      </main>
    </div>
  );
}