// app/best-seller/page.jsx
'use client'; // Dòng này là cần thiết nếu bạn sử dụng useState và các Hook khác của React trong App Router

import React from 'react';
// Import các component từ đúng đường dẫn components/best-seller
import BestSellerHeader from './Components/BestSellerHeader';
import FilterOptions from './Components/FilterOptions';
import BookGrid from './Components/BookGrid';
import Pagination from './Components/Pagination';


export default function BestSellerPage() {
    // Dữ liệu sách bán chạy (có thể lấy từ API thực tế)
    const bestSellerBooks = [
        { id: 1, title: 'Clean Code: A Handbook of Agile Software Craftsmanship', author: 'Robert C. Martin', price: '250.000', imageUrl: 'https://via.placeholder.com/150/FF5733/FFFFFF?text=CleanCode', rating: 5, description: 'Cuốn sách kinh điển về cách viết code sạch và dễ bảo trì.' },
        { id: 2, title: 'The Pragmatic Programmer: Your Journey To Mastery', author: 'Andrew Hunt & David Thomas', price: '220.000', imageUrl: 'https://via.placeholder.com/150/33FF57/FFFFFF?text=PragProg', rating: 5, description: 'Những lời khuyên thực tế để trở thành một lập trình viên hiệu quả.' },
        { id: 3, title: 'Cracking the Coding Interview: 189 Programming Questions and Solutions', author: 'Gayle Laakmann McDowell', price: '350.000', imageUrl: 'https://via.placeholder.com/150/3357FF/FFFFFF?text=CodingInterview', rating: 4, description: 'Tài liệu không thể thiếu để chuẩn bị cho phỏng vấn lập trình.' },
        { id: 4, title: 'Design Patterns: Elements of Reusable Object-Oriented Software', author: 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides', price: '280.000', imageUrl: 'https://via.placeholder.com/150/FF33A1/FFFFFF?text=DesignPatterns', rating: 4, description: 'Giới thiệu các mẫu thiết kế phần mềm kinh điển.' },
        { id: 5, title: 'Introduction to Algorithms', author: 'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein', price: '400.000', imageUrl: 'https://via.placeholder.com/150/5733FF/FFFFFF?text=Algorithms', rating: 5, description: 'Cuốn sách giáo trình toàn diện về thuật toán và cấu trúc dữ liệu.' },
        { id: 6, title: 'You Don\'t Know JS Yet (Series)', author: 'Kyle Simpson', price: '180.000', imageUrl: 'https://via.placeholder.com/150/FF8C00/FFFFFF?text=YDKJS', rating: 5, description: 'Một series sách đi sâu vào các khía cạnh nâng cao của JavaScript.' },
        { id: 7, title: 'Code Complete: A Practical Handbook of Software Construction', author: 'Steve McConnell', price: '290.000', imageUrl: 'https://via.placeholder.com/150/00FFFF/FFFFFF?text=CodeComplete', rating: 4, description: 'Hướng dẫn thực tế để xây dựng phần mềm chất lượng cao.' },
        { id: 8, title: 'The Mythical Man-Month: Essays on Software Engineering', author: 'Frederick Brooks Jr.', price: '195.000', imageUrl: 'https://via.placeholder.com/150/8A2BE2/FFFFFF?text=ManMonth', rating: 4, description: 'Những bài luận kinh điển về quản lý dự án phần mềm.' },
    ];

    const [currentPage, setCurrentPage] = React.useState(1);
    const booksPerPage = 4; // Số sách hiển thị trên mỗi trang

    // Tính toán số trang và sách hiển thị
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = bestSellerBooks.slice(indexOfFirstBook, indexOfLastBook);
    const totalPages = Math.ceil(bestSellerBooks.length / booksPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Có thể thêm cuộn lên đầu trang khi chuyển trang
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="best-seller-page-container min-h-screen bg-gray-50">
            <BestSellerHeader />
            <main className="best-seller-main-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <FilterOptions />
                <BookGrid books={currentBooks} />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </main>
        </div>
    );
}