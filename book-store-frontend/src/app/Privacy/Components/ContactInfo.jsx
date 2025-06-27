import React from 'react';

const ContactInfo = () => {
    return (
        <section className="relative bg-gradient-to-br from-purple-100 via-pink-50 to-white rounded-2xl shadow-2xl p-8 md:p-10 mb-8 overflow-hidden flex flex-col items-center text-center animate-fade-in">
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-200 shadow-lg mb-4 animate-float">
                <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-purple-700 w-9 h-9">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10.5V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h7.5M21 10.5l-9 6.5-9-6.5" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 21l4-4m0 0l-4-4m4 4H9" />
                </svg>
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-purple-800 drop-shadow mb-2">Liên hệ chúng tôi</h2>
            <p className="mb-4 text-gray-700 text-base md:text-lg">Nếu bạn có bất kỳ câu hỏi nào về Chính Sách Bảo Mật này, xin vui lòng liên hệ với <span className="font-semibold text-purple-700">Coder-BookStore</span>:</p>
            <ul className="space-y-2 text-gray-800 text-base md:text-lg mb-4">
                <li>
                    <span className="font-medium">Email:</span> 
                    <a 
                        href="mailto:support@coderbookstore.com" 
                        className="text-purple-700 font-semibold hover:underline hover:text-pink-600 transition-colors duration-200 ml-1"
                    >support@coderbookstore.com</a>
                </li>
                <li>
                    <span className="font-medium">Địa chỉ:</span> Phường Nhơn Bình, Thành phố Quy Nhơn, Bình Định, Việt Nam.
                </li>
                <li>
                    <span className="font-medium">Điện thoại:</span> 
                    <a 
                        href="tel:+84901234567" 
                        className="text-purple-700 font-semibold hover:underline hover:text-pink-600 transition-colors duration-200 ml-1"
                    >(84) 901 234 567</a>
                </li>
            </ul>
            <a href="mailto:support@coderbookstore.com" className="inline-block mt-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-400 text-white font-bold rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300">Gửi Email Ngay</a>
            {/* Hiệu ứng blob nền động */}
            <span className="absolute -top-8 -left-8 w-32 h-32 bg-purple-200 opacity-30 rounded-full blur-2xl animate-blob z-0" />
            <span className="absolute -bottom-8 -right-8 w-32 h-32 bg-pink-200 opacity-20 rounded-full blur-2xl animate-blob2 z-0" />
        </section>
    );
};

export default ContactInfo;