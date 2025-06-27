import React from 'react';
import { FaFileContract } from 'react-icons/fa';

const TermsHeader = () => {
    return (
        <header className="text-center py-8 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 rounded-2xl shadow-lg mb-4">
            <div className="flex justify-center mb-3">
                <FaFileContract className="text-5xl text-white drop-shadow" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow">Điều Khoản Dịch Vụ của Coder-BookStore</h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">Vui lòng đọc kỹ các điều khoản và điều kiện này trước khi sử dụng dịch vụ của chúng tôi.</p>
        </header>
    );
};

export default TermsHeader;