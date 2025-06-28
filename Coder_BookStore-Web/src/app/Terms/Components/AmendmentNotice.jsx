import React from 'react';
import { FaEdit } from 'react-icons/fa';

const AmendmentNotice = () => {
    return (
        <section className="flex items-center justify-center gap-3 bg-yellow-50 rounded-xl p-4 mb-2">
            <FaEdit className="text-yellow-500 text-2xl" />
            <div>
                <h2 className="text-lg font-bold text-yellow-700 mb-1">Quyền sửa đổi Điều khoản</h2>
                <p className="text-yellow-800">Coder-BookStore có quyền sửa đổi hoặc thay thế các Điều Khoản này bất cứ lúc nào theo quyết định riêng của chúng tôi. Mọi thay đổi sẽ có hiệu lực ngay khi được đăng tải trên trang này.</p>
            </div>
        </section>
    );
};

export default AmendmentNotice;