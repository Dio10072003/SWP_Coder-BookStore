import React from 'react';

const PrivacyHeader = () => {
    return (
        <header className="relative flex flex-col items-center justify-center py-16 md:py-24 bg-gradient-to-br from-purple-400 via-pink-300 to-blue-200 overflow-hidden rounded-b-3xl shadow-xl mb-10 animate-gradient-move">
            {/* Icon bảo mật lớn */}
            <span className="inline-flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/60 shadow-2xl mb-6 animate-float">
                <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-purple-700 w-16 h-16 md:w-24 md:h-24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3l7 4v5c0 5.25-3.5 9.75-7 11-3.5-1.25-7-5.75-7-11V7l7-4z" />
                    <circle cx="12" cy="12" r="3" fill="#fff" />
                </svg>
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg text-center mb-4">Chính Sách Bảo Mật</h1>
            <p className="text-lg md:text-2xl text-white/90 text-center max-w-2xl font-medium mb-2">Bảo vệ thông tin cá nhân của bạn với sự minh bạch, an toàn và sáng tạo nhất từ Coder-BookStore.</p>
            {/* Hiệu ứng blob nền động */}
            <span className="absolute -top-16 -left-16 w-64 h-64 bg-pink-300 opacity-30 rounded-full blur-3xl animate-blob z-0" />
            <span className="absolute -bottom-16 -right-16 w-64 h-64 bg-blue-200 opacity-20 rounded-full blur-3xl animate-blob2 z-0" />
        </header>
    );
};

export default PrivacyHeader;