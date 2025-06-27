import React from 'react';

const UpdateNotice = () => {
    return (
        <section className="relative bg-gradient-to-br from-blue-100 via-purple-50 to-white rounded-2xl shadow-2xl p-8 md:p-10 mb-8 overflow-hidden flex flex-col items-center text-center animate-fade-in">
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-200 shadow-lg mb-4 animate-float">
                <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-700 w-9 h-9">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-800 drop-shadow mb-2">Cập nhật Chính Sách</h2>
            <p className="text-gray-700 text-base md:text-lg mb-2">Chính Sách Bảo Mật này có thể được cập nhật định kỳ. Mọi thay đổi sẽ được đăng tải trên trang này.</p>
            <span className="block mt-2 font-semibold text-blue-700 text-lg md:text-xl">Lần cập nhật gần nhất: 16/06/2025.</span>
            {/* Hiệu ứng blob nền động */}
            <span className="absolute -top-8 -left-8 w-32 h-32 bg-blue-200 opacity-30 rounded-full blur-2xl animate-blob z-0" />
            <span className="absolute -bottom-8 -right-8 w-32 h-32 bg-purple-200 opacity-20 rounded-full blur-2xl animate-blob2 z-0" />
        </section>
    );
};

export default UpdateNotice;