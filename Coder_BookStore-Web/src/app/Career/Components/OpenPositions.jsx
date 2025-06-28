import React from 'react';
import PositionCard from './PositionCard';
import { FaUserPlus } from 'react-icons/fa';

const OpenPositions = () => {
    const positions = [
        {
            id: 1,
            title: 'Chuyên viên Tư vấn Sách Công nghệ',
            location: 'Quy Nhơn',
            type: 'Toàn thời gian',
            description: 'Tư vấn và giới thiệu sách chuyên ngành công nghệ thông tin cho khách hàng.',
            requirements: ['Yêu thích sách và công nghệ.', 'Kỹ năng giao tiếp tốt.', 'Có kiến thức cơ bản về lập trình là một lợi thế.'],
        },
        {
            id: 2,
            title: 'Nhân viên Content Marketing',
            location: 'Quy Nhơn',
            type: 'Toàn thời gian',
            description: 'Viết bài, tạo nội dung hấp dẫn về sách và các chủ đề công nghệ trên các nền tảng số.',
            requirements: ['Khả năng viết lách tốt.', 'Sáng tạo, có kinh nghiệm về SEO/marketing.', 'Có kinh nghiệm về sách hoặc IT.'],
        },
        {
            id: 3,
            title: 'Lập trình viên Web Frontend (React)',
            location: 'Quy Nhơn',
            type: 'Toàn thời gian',
            description: 'Phát triển và bảo trì giao diện người dùng cho website Coder-BookStore.',
            requirements: ['Thành thạo ReactJS, HTML, CSS, JavaScript.', 'Kinh nghiệm với RESTful APIs.', 'Có kinh nghiệm với Next.js là một lợi thế.'],
        },
    ];

    return (
        <section>
            <h2 className="text-2xl font-bold text-pink-700 mb-3 flex items-center gap-2"><FaUserPlus className="text-pink-500" />Vị Trí Đang Tuyển Dụng</h2>
            <div className="grid md:grid-cols-2 gap-6">
                {positions.map(pos => (
                    <PositionCard
                        key={pos.id}
                        title={pos.title}
                        location={pos.location}
                        type={pos.type}
                        description={pos.description}
                        requirements={pos.requirements}
                    />
                ))}
            </div>
        </section>
    );
};

export default OpenPositions;