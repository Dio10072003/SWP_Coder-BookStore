import React from 'react';

const FilterOptions = () => {
    return (
        <div className="filter-options">
            <label htmlFor="category-filter">Lọc theo thể loại:</label>
            <select id="category-filter" className="filter-select">
                <option value="all">Tất cả</option>
                <option value="programming">Lập trình</option>
                <option value="datastructure">Cấu trúc dữ liệu & Giải thuật</option>
                <option value="web-dev">Phát triển Web</option>
                <option value="ai-ml">AI & Machine Learning</option>
            </select>

            <label htmlFor="year-filter">Năm xuất bản:</label>
            <select id="year-filter" className="filter-select">
                <option value="all">Tất cả</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
            </select>
        </div>
    );
};