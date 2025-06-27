import React from 'react';
import { FaUserTie } from 'react-icons/fa';

const CareerHeader = () => {
    return (
        <header className="text-center py-8 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 rounded-2xl shadow-lg mb-4">
            <div className="flex justify-center mb-3">
                <FaUserTie className="text-5xl text-white drop-shadow" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow">Cơ Hội Nghề Nghiệp tại Coder-BookStore</h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">Hãy gia nhập đội ngũ đam mê sách và công nghệ của chúng tôi! Cùng nhau kiến tạo tri thức và phát triển sự nghiệp.</p>
        </header>
    );
};

export default CareerHeader;