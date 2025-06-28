import React from 'react';
import { FaBalanceScale } from 'react-icons/fa';

const GoverningLaw = () => {
    return (
        <section className="flex items-center justify-center gap-3 bg-blue-100 rounded-xl p-4">
            <FaBalanceScale className="text-blue-500 text-2xl" />
            <div>
                <h2 className="text-lg font-bold text-blue-700 mb-1">Luật áp dụng</h2>
                <p className="text-blue-900">Các Điều Khoản này sẽ được điều chỉnh và giải thích theo luật pháp Việt Nam, không phân biệt các nguyên tắc xung đột pháp luật của nó.</p>
            </div>
        </section>
    );
};

export default GoverningLaw;