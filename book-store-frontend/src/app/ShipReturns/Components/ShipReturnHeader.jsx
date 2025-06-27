import React from 'react';

const ShipReturnHeader = () => {
    return (
        <header className="relative flex flex-col items-center justify-center py-12 md:py-16 bg-gradient-to-br from-blue-200 via-pink-100 to-yellow-100 overflow-hidden rounded-b-3xl shadow-xl mb-10 animate-gradient-move">
            {/* Icon vận chuyển + sách */}
            <span className="inline-flex items-center justify-center w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/70 shadow-2xl mb-4 animate-float">
                <svg width="56" height="56" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-600 w-14 h-14 md:w-20 md:h-20">
                    <rect x="3" y="7" width="13" height="10" rx="2" fill="#fff" stroke="#3b82f6" strokeWidth="2" />
                    <path d="M16 9h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" stroke="#f472b6" strokeWidth="2" />
                    <rect x="6" y="10" width="7" height="1.5" rx="0.75" fill="#fbbf24" />
                    <circle cx="7.5" cy="17" r="1.5" fill="#3b82f6" />
                    <circle cx="17.5" cy="17" r="1.5" fill="#f472b6" />
                </svg>
            </span>
            <h1 className="text-2xl md:text-4xl font-extrabold text-blue-800 drop-shadow-lg text-center mb-2">Chính Sách Vận Chuyển & Đổi Trả Sách</h1>
            <p className="text-base md:text-xl text-gray-700 text-center max-w-2xl font-medium mb-2">Tất tần tật về nhận sách, đổi trả, quyền lợi và sự an tâm khi mua hàng tại <span className="text-pink-600 font-semibold">Coder-BookStore</span>.</p>
            {/* Hiệu ứng blob nền động */}
            <span className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200 opacity-30 rounded-full blur-2xl animate-blob z-0" />
            <span className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-200 opacity-20 rounded-full blur-2xl animate-blob2 z-0" />
        </header>
    );
};

export default ShipReturnHeader;