import React from 'react';
import { FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

const CareerContact = () => {
    return (
        <section className="text-center">
            <h2 className="text-2xl font-bold text-green-700 mb-3 flex items-center justify-center gap-2"><FaEnvelope className="text-green-500" />Liên Hệ Tuyển Dụng</h2>
            <p className="mb-2 text-gray-700">Nếu bạn có bất kỳ câu hỏi nào về các vị trí tuyển dụng hoặc quy trình ứng tuyển, xin vui lòng liên hệ:</p>
            <p className="mb-1 text-lg"><FaEnvelope className="inline mr-2 text-green-500" />Email: <a href="mailto:careers@coderbookstore.com" className="text-blue-700 underline">careers@coderbookstore.com</a></p>
            <p className="text-lg"><FaPhoneAlt className="inline mr-2 text-green-500" />Điện thoại: <span className="text-blue-700">(84) 901 987 654</span></p>
        </section>
    );
};

export default CareerContact;