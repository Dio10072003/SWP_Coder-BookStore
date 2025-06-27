import React from 'react';

const SecurityStatement = () => {
    return (
        <section className="relative bg-gradient-to-br from-blue-50 via-white to-pink-50 rounded-2xl shadow-xl p-6 md:p-8 mb-8 overflow-hidden animate-fade-in">
            <div className="flex items-center mb-3 gap-2">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-200 shadow-md mr-2 animate-float">
                    <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-600">
                        <rect x="4" y="11" width="16" height="8" rx="2" fill="#fff" stroke="#3b82f6" strokeWidth="2" />
                        <path d="M8 11V8a4 4 0 018 0v3" stroke="#f472b6" strokeWidth="2" />
                        <circle cx="12" cy="16" r="2" fill="#fbbf24" />
                    </svg>
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-blue-800 drop-shadow">Bảo mật thanh toán</h2>
            </div>
            <p className="text-gray-700 text-base md:text-lg mb-1">An toàn của bạn là ưu tiên số 1. Mọi giao dịch đều được mã hóa SSL, tuân thủ chuẩn PCI DSS.</p>
            <p className="text-gray-700 text-base md:text-lg">Chúng tôi <span className="font-semibold text-blue-700">không lưu trữ</span> thông tin thẻ tín dụng trên hệ thống, bảo vệ dữ liệu tuyệt đối.</p>
            <span className="absolute -top-8 -left-8 w-24 h-24 bg-blue-200 opacity-20 rounded-full blur-2xl animate-blob z-0" />
            <span className="absolute -bottom-8 -right-8 w-24 h-24 bg-pink-200 opacity-10 rounded-full blur-2xl animate-blob2 z-0" />
        </section>
    );
};

export default SecurityStatement;