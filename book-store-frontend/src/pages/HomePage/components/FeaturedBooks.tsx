import Container from "../../../components/ui/Container";
import BookCard from "../../../components/ui/BookCard";
import { FaStar, FaBookOpen, FaShoppingCart, FaHeart } from "react-icons/fa";

const featuredBooks = [
  {
    id: 1,
    title: "IELTS Speaking Band 8",
    author: "Tran Minh",
    price: 189000,
    originalPrice: 250000,
    image: "📚",
    rating: 4.8,
    reviews: 1250,
    badge: "Hot Sale",
    discount: "-24%",
  },
  {
    id: 2,
    title: "Tiếng Hàn Cho Người Mới Bắt Đầu",
    author: "Kim So Young",
    price: 156000,
    originalPrice: 200000,
    image: "🇰🇷",
    rating: 4.9,
    reviews: 980,
    badge: "Bestseller",
    discount: "-22%",
  },
  {
    id: 3,
    title: "Ngữ Pháp Tiếng Anh Cơ Bản",
    author: "Nguyen Lan",
    price: 167000,
    originalPrice: 225000,
    image: "📖",
    rating: 4.7,
    reviews: 650,
    badge: "Mới về",
    discount: "-26%",
  },
  {
    id: 4,
    title: "TOEIC Listening & Reading",
    author: "David Park",
    price: 205000,
    originalPrice: 280000,
    image: "🎧",
    rating: 4.6,
    reviews: 2100,
    badge: "Top choice",
    discount: "-27%",
  },
  {
    id: 5,
    title: "Tiếng Nhật N5-N4",
    author: "Tanaka Yuki",
    price: 178000,
    originalPrice: 230000,
    image: "🇯🇵",
    rating: 4.8,
    reviews: 789,
    badge: "Độc quyền",
    discount: "-23%",
  },
  {
    id: 6,
    title: "Văn Học Việt Nam",
    author: "Pham Thi Hong",
    price: 145000,
    originalPrice: 195000,
    image: "🏛️",
    rating: 4.5,
    reviews: 432,
    badge: "Classic",
    discount: "-26%",
  },
];

export default function FeaturedBooks() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <Container>
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-bold mb-4">
            🔥 SÁCH BÁN CHẠY
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            📌 Sách Nổi Bật Tuần Này
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Những cuốn sách được độc giả yêu thích và đánh giá cao nhất. Cập
            nhật hàng tuần dựa trên doanh số và đánh giá.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBooks.map((book) => (
            <div key={book.id} className="group">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Badge */}
                <div className="relative">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {book.badge}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
                      {book.discount}
                    </span>
                  </div>

                  {/* Book Image */}
                  <div className="h-64 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <FaBookOpen className="w-20 h-20 text-blue-600" />
                  </div>
                </div>

                {/* Book Info */}
                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Tác giả: {book.author}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex items-center text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(book.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm ml-2">
                      {book.rating} ({book.reviews} đánh giá)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">
                        {book.price.toLocaleString("vi-VN")}đ
                      </span>
                      <span className="text-gray-500 line-through ml-2 text-sm">
                        {book.originalPrice.toLocaleString("vi-VN")}đ
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
                      <FaShoppingCart className="w-4 h-4" />
                      <span>Thêm vào giỏ</span>
                    </button>
                    <button className="px-4 py-3 border border-blue-500 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors duration-200 flex items-center justify-center">
                      <FaHeart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-12 py-4 rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 mx-auto">
            <FaBookOpen className="w-5 h-5" />
            <span>Xem Tất Cả Sách Nổi Bật →</span>
          </button>
        </div>
      </Container>
    </section>
  );
}
