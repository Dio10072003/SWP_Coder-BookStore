import React from 'react';

const BestSellerHeader = () => {
    return (
        <header className="relative flex flex-col items-center justify-center py-12 md:py-16 bg-gradient-to-br from-yellow-200 via-pink-100 to-blue-100 overflow-hidden rounded-b-3xl shadow-xl mb-10 animate-gradient-move">
            <span className="inline-flex items-center justify-center w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/70 shadow-2xl mb-4 animate-float">
                <svg width="56" height="56" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-yellow-500 w-14 h-14 md:w-20 md:h-20">
                    <path d="M4 19V7a2 2 0 012-2h8a2 2 0 012 2v12" stroke="#fbbf24" strokeWidth="2" fill="#fff" />
                    <path d="M16 7h2a2 2 0 012 2v10" stroke="#f472b6" strokeWidth="2" fill="#fff" />
                    <path d="M8 11h4" stroke="#3b82f6" strokeWidth="2" />
                    <circle cx="19" cy="5" r="2" fill="#fbbf24" stroke="#f59e42" strokeWidth="1.5" />
                </svg>
            </span>
            <h1 className="text-2xl md:text-4xl font-extrabold text-yellow-700 drop-shadow-lg text-center mb-2">Sách Bán Chạy Nhất</h1>
            <p className="text-base md:text-xl text-gray-700 text-center max-w-2xl font-medium mb-2">Top những tựa sách công nghệ, lập trình được yêu thích nhất bởi cộng đồng <span className="text-pink-600 font-semibold">Coder-BookStore</span>.</p>
            <span className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-200 opacity-30 rounded-full blur-2xl animate-blob z-0" />
            <span className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-200 opacity-20 rounded-full blur-2xl animate-blob2 z-0" />
        </header>
    );
};

export default BestSellerHeader;