import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const AcceptanceNotice = () => {
    return (
        <section className="flex items-center justify-center gap-3 bg-green-50 rounded-xl p-4 mb-2">
            <FaCheckCircle className="text-green-500 text-2xl" />
            <span className="text-green-800 font-semibold">Bằng việc truy cập hoặc sử dụng trang web của Coder-BookStore, bạn đồng ý chịu sự ràng buộc của các Điều Khoản Dịch Vụ này.</span>
        </section>
    );
};

export default AcceptanceNotice;