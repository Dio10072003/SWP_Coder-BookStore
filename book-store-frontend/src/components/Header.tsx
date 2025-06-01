import { useRouter } from "next/router";
import { useAuth } from "../../hooks/useAuth";
import {
  FaPhone,
  FaEnvelope,
  FaTruck,
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaBook,
  FaHome,
  FaGlobeAmericas,
  FaPenFancy,
  FaGift,
  FaFire,
  FaNewspaper,
  FaInfo,
} from "react-icons/fa";

export default function Header() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <header className="bg-white shadow-lg border-b-2 border-blue-200">
      {/* Top bar with contact info */}
      <div className="bg-blue-500 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <FaPhone className="w-3 h-3" />
                <span>Hotline: 1900-1234</span>
              </span>
              <span className="flex items-center space-x-1">
                <FaEnvelope className="w-3 h-3" />
                <span>contact@hanoibookstore.vn</span>
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <FaTruck className="w-3 h-3" />
                <span>Miễn phí ship cho đơn từ 299k</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="h-12 w-12 flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg">
              <FaBook className="text-white text-2xl" />
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-blue-600">
                Book Store
              </h1>
              <p className="text-sm text-gray-600">
                Tri thức - Khám phá - Sáng tạo
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm sách, tác giả, nhà xuất bản..."
                className="w-full px-4 py-3 pr-12 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-1">
                <FaSearch className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* User Menu and Cart */}
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
              <FaHeart className="text-xl" />
              <span className="text-sm">Yêu thích</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 relative">
              <FaShoppingCart className="text-xl" />
              <span className="text-sm">Giỏ hàng</span>
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </button>
            <div className="flex items-center space-x-3 border-l pl-4">
              <span className="text-gray-700 text-sm">
                Xin chào,{" "}
                <span className="font-medium text-blue-600">{user?.name}</span>
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-8 py-3">
            <a
              href="/"
              className="text-blue-600 font-medium hover:text-blue-700 flex items-center space-x-1"
            >
              <FaHome className="w-4 h-4" />
              <span>Trang chủ</span>
            </a>
            <a
              href="/books"
              className="text-gray-700 hover:text-blue-600 flex items-center space-x-1"
            >
              <FaBook className="w-4 h-4" />
              <span>Sách trong nước</span>
            </a>
            <a
              href="/books"
              className="text-gray-700 hover:text-blue-600 flex items-center space-x-1"
            >
              <FaGlobeAmericas className="w-4 h-4" />
              <span>Sách nước ngoài</span>
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 flex items-center space-x-1"
            >
              <FaPenFancy className="w-4 h-4" />
              <span>Văn phòng phẩm</span>
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 flex items-center space-x-1"
            >
              <FaGift className="w-4 h-4" />
              <span>Quà tặng</span>
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 flex items-center space-x-1"
            >
              <FaFire className="w-4 h-4" />
              <span>Khuyến mãi</span>
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 flex items-center space-x-1"
            >
              <FaNewspaper className="w-4 h-4" />
              <span>Tin tức</span>
            </a>
            <a
              href="/about"
              className="text-gray-700 hover:text-blue-600 flex items-center space-x-1"
            >
              <FaInfo className="w-4 h-4" />
              <span>Về chúng tôi</span>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
