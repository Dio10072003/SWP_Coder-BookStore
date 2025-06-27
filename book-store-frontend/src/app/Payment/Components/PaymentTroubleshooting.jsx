import React from 'react';

const PaymentTroubleshooting = () => {
    return (
        <section className="relative bg-gradient-to-br from-yellow-50 via-white to-pink-50 rounded-2xl shadow-xl p-6 md:p-8 mb-8 overflow-hidden animate-fade-in">
            <div className="flex items-center mb-3 gap-2">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-yellow-200 shadow-md mr-2 animate-float">
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-yellow-500">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
                        <circle cx="12" cy="12" r="10" stroke="#fbbf24" strokeWidth="2" fill="#fff" />
                    </svg>
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-yellow-700 drop-shadow">Xử lý sự cố thanh toán</h2>
            </div>
            <p className="text-gray-700 text-base md:text-lg mb-1">Nếu gặp vấn đề khi thanh toán, hãy thử các bước sau:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-base md:text-lg">
                <li>Kiểm tra lại thông tin thẻ hoặc tài khoản.</li>
                <li>Đảm bảo kết nối internet ổn định.</li>
                <li>Thử lại hoặc chọn phương thức thanh toán khác.</li>
            </ul>
            <span className="absolute -top-8 -left-8 w-24 h-24 bg-yellow-200 opacity-20 rounded-full blur-2xl animate-blob z-0" />
            <span className="absolute -bottom-8 -right-8 w-24 h-24 bg-pink-200 opacity-10 rounded-full blur-2xl animate-blob2 z-0" />
        </section>
    );
};

export default PaymentTroubleshooting;
