import React from 'react';

const SupportContact = () => {
    return (
        <section className="support-contact bg-gradient-to-br from-yellow-50 via-white to-blue-50 rounded-2xl shadow-lg p-6 md:p-8 my-8 text-center animate-fade-in">
            <h2 className="text-xl md:text-2xl font-bold text-blue-700 mb-2 flex items-center justify-center gap-2">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-400 animate-float"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.24 7.76a6 6 0 11-8.48 8.48 6 6 0 018.48-8.48z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" /></svg>
                Cần hỗ trợ?
            </h2>
            <p className="mb-2 text-gray-700">Nếu có bất kỳ câu hỏi nào về chính sách vận chuyển hoặc đổi trả, xin vui lòng liên hệ bộ phận hỗ trợ khách hàng của chúng tôi:</p>
            <p className="mb-1 text-gray-800">Email: <a href="mailto:support@coderbookstore.com" className="text-blue-600 font-semibold hover:underline">support@coderbookstore.com</a></p>
            <p className="mb-4 text-gray-800">Điện thoại: <a href="tel:+84901234567" className="text-blue-600 font-semibold hover:underline">(84) 901 234 567</a></p>
            <a href="/Faq" className="inline-block mt-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-pink-400 text-white font-bold rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300">Xem ngay Câu Hỏi Thường Gặp (FAQ)</a>
        </section>
    );
};

export default SupportContact;