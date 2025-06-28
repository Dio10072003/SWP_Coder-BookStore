import React from 'react';

const ContactForPaymentHelp = () => {
    return (
        <section className="relative bg-gradient-to-br from-pink-50 via-white to-blue-50 rounded-2xl shadow-xl p-6 md:p-8 my-8 overflow-hidden text-center animate-fade-in">
            <div className="flex items-center justify-center mb-3 gap-2">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-pink-200 shadow-md mr-2 animate-float">
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-pink-500">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.104 0 2-.896 2-2V7a2 2 0 10-4 0v2c0 1.104.896 2 2 2z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11v2a7 7 0 0014 0v-2" />
                    </svg>
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-pink-700 drop-shadow">Cần trợ giúp về thanh toán?</h2>
            </div>
            <p className="mb-2 text-gray-700">Nếu bạn vẫn gặp khó khăn, đừng ngần ngại liên hệ với đội ngũ hỗ trợ của chúng tôi:</p>
            <p className="mb-1 text-gray-800">Hotline: <a href="tel:+84901234567" className="text-blue-600 font-semibold hover:underline">(84) 901 234 567</a></p>
            <p className="mb-4 text-gray-800">Email: <a href="mailto:payment@coderbookstore.com" className="text-blue-600 font-semibold hover:underline">payment@coderbookstore.com</a></p>
            <a href="mailto:payment@coderbookstore.com" className="inline-block mt-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-blue-400 text-white font-bold rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300">Liên hệ ngay</a>
            <span className="absolute -top-8 -left-8 w-24 h-24 bg-pink-200 opacity-30 rounded-full blur-2xl animate-blob z-0" />
            <span className="absolute -bottom-8 -right-8 w-24 h-24 bg-blue-200 opacity-20 rounded-full blur-2xl animate-blob2 z-0" />
        </section>
    );
};

export default ContactForPaymentHelp;