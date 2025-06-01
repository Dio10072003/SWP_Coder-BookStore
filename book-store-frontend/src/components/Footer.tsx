import {
  FaBook,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaTrophy,
  FaCheckCircle,
  FaTruck,
  FaCreditCard,
  FaCogs,
  FaQuestionCircle,
} from "react-icons/fa";

import Container from "../ui/Container";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl flex items-center justify-center mr-4">
                  <FaBook className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-blue-400">
                    Book Store
                  </h3>
                  <p className="text-sm text-gray-400">
                    Tri thức - Khám phá - Sáng tạo
                  </p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Cửa hàng sách trực tuyến hàng đầu Việt Nam, chuyên cung cấp sách
                học ngoại ngữ, văn học và các đầu sách chất lượng cao.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg transition-colors"
                >
                  <FaFacebookF className="text-white" />
                </a>
                <a
                  href="#"
                  className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg transition-colors"
                >
                  <FaInstagram className="text-white" />
                </a>
                <a
                  href="#"
                  className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg transition-colors"
                >
                  <FaTwitter className="text-white" />
                </a>
                <a
                  href="#"
                  className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg transition-colors"
                >
                  <FaYoutube className="text-white" />
                </a>
              </div>
            </div>

            {/* Book Categories */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-blue-400 flex items-center">
                <FaBook className="mr-2" />
                Danh Mục Sách
              </h4>
              <ul className="space-y-3">
                {[
                  "Tiếng Anh - IELTS - TOEIC",
                  "Tiếng Hàn - Topik",
                  "Tiếng Nhật - N1-N5",
                  "Văn học Việt Nam",
                  "Văn học nước ngoài",
                  "Sách thiếu nhi",
                  "Kinh tế - Quản trị",
                  "Tâm lý - Kỹ năng sống",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-blue-400 flex items-center">
                <FaCogs className="mr-2" />
                Hỗ Trợ Khách Hàng
              </h4>
              <ul className="space-y-3">
                {[
                  "Hướng dẫn mua hàng",
                  "Chính sách đổi trả",
                  "Phương thức thanh toán",
                  "Chính sách giao hàng",
                  "Câu hỏi thường gặp",
                  "Liên hệ hỗ trợ",
                  "Theo dõi đơn hàng",
                  "Bảo hành sản phẩm",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-blue-400 flex items-center">
                <FaPhone className="mr-2" />
                Thông Tin Liên Hệ
              </h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FaMapMarkerAlt className="text-blue-400 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-white">
                      Cửa hàng chính
                    </p>
                    <p className="text-sm text-gray-300">
                      123 Abc, Def, Việt Nam
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FaPhone className="text-blue-400 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-white">Hotline</p>
                    <p className="text-sm text-gray-300">
                      1900-1234 (Miễn phí)
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FaEnvelope className="text-blue-400 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-white">Email</p>
                    <p className="text-sm text-gray-300">
                      contact@hanoibookstore.vn
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FaClock className="text-blue-400 mt-1" />
                  <div>
                    <p className="text-sm font-medium text-white">
                      Giờ làm việc
                    </p>
                    <p className="text-sm text-gray-300">
                      8:00 - 22:00 (Hàng ngày)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Awards & Certifications */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="bg-gray-800 rounded-lg p-4 hover:bg-blue-900 transition-colors">
                <FaTrophy className="text-2xl mb-2 text-blue-400 mx-auto" />
                <p className="text-sm text-gray-300">
                  Cửa hàng sách
                  <br />
                  uy tín nhất 2024
                </p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 hover:bg-blue-900 transition-colors">
                <FaCheckCircle className="text-2xl mb-2 text-blue-400 mx-auto" />
                <p className="text-sm text-gray-300">
                  Chứng nhận
                  <br />
                  chất lượng ISO
                </p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 hover:bg-blue-900 transition-colors">
                <FaTruck className="text-2xl mb-2 text-blue-400 mx-auto" />
                <p className="text-sm text-gray-300">
                  Giao hàng
                  <br />
                  toàn quốc
                </p>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 hover:bg-blue-900 transition-colors">
                <FaCreditCard className="text-2xl mb-2 text-blue-400 mx-auto" />
                <p className="text-sm text-gray-300">
                  Thanh toán
                  <br />
                  an toàn 100%
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-800 py-6">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-sm text-gray-400">
                © 2024 Book Store. Tất cả quyền được bảo lưu.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Giấy phép kinh doanh số: 0123456789 - Cấp bởi Sở KH&ĐT TP. Hà
                Nội
              </p>
            </div>
            <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                Điều khoản sử dụng
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                Chính sách bảo mật
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                Sitemap
              </a>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
