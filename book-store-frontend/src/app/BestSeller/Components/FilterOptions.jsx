import React from 'react';

const FilterOptions = () => {
    return (
        <section className="filter-options">
            <h2 className="sr-only">Tùy chọn lọc sách</h2> {/* Dùng sr-only để ẩn tiêu đề cho người dùng nhìn thấy nhưng vẫn có ý nghĩa cho trình đọc màn hình */}
            <div className="flex flex-wrap justify-center gap-4 p-4 bg-white shadow-sm rounded-lg mb-8">
                <select className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="">Lọc theo Thể loại</option>
                    <option value="programming">Lập trình</option>
                    <option value="data-science">Khoa học dữ liệu</option>
                    <option value="design">Thiết kế phần mềm</option>
                    <option value="cybersecurity">An ninh mạng</option>
                </select>
                <select className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="">Sắp xếp theo</option>
                    <option value="bestselling">Bán chạy nhất</option>
                    <option value="newest">Mới nhất</option>
                    <option value="price-asc">Giá: Thấp đến Cao</option>
                    <option value="price-desc">Giá: Cao đến Thấp</option>
                    <option value="rating">Đánh giá cao nhất</option>
                </select>
                {/* Có thể thêm input search hoặc các filter khác */}
                <input
                    type="text"
                    placeholder="Tìm kiếm sách..."
                    className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 flex-grow max-w-xs"
                />
            </div>
        </section>
    );
};

export default FilterOptions;