import Container from "../../../components/ui/Container";
import {
  FaGlobeAmericas,
  FaLanguage,
  FaGraduationCap,
  FaClipboardCheck,
  FaAward,
  FaBook,
  FaBriefcase,
  FaChild,
  FaBookOpen,
  FaTrophy,
  FaGem,
} from "react-icons/fa";

const categories = [
  {
    id: 1,
    name: "Tiếng Anh",
    icon: FaGlobeAmericas,
    color: "#3b82f6",
    books: "2,345",
  },
  {
    id: 2,
    name: "Tiếng Hàn",
    icon: FaLanguage,
    color: "#1e40af",
    books: "1,234",
  },
  {
    id: 3,
    name: "Tiếng Nhật",
    icon: FaGraduationCap,
    color: "#2563eb",
    books: "987",
  },
  {
    id: 4,
    name: "IELTS",
    icon: FaClipboardCheck,
    color: "#1d4ed8",
    books: "567",
  },
  { id: 5, name: "TOEIC", icon: FaAward, color: "#1e3a8a", books: "432" },
  { id: 6, name: "Văn học", icon: FaBook, color: "#3730a3", books: "3,456" },
  { id: 7, name: "Kinh tế", icon: FaBriefcase, color: "#06b6d4", books: "876" },
  { id: 8, name: "Thiếu nhi", icon: FaChild, color: "#0ea5e9", books: "1,567" },
];

export default function CategoryNav() {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            📚 Danh Mục Sách Hot
          </h2>
          <p className="text-gray-600 text-lg">
            Khám phá hàng nghìn đầu sách theo chủ đề yêu thích
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-transparent hover:border-blue-300"
              style={{
                background: `linear-gradient(135deg, ${category.color}15, ${category.color}25)`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300 flex justify-center">
                  <category.icon
                    className="w-8 h-8"
                    style={{ color: category.color }}
                  />
                </div>
                <h3 className="font-bold text-sm text-gray-800 mb-1">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-600">{category.books} cuốn</p>
              </div>

              <div
                className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: category.color }}
              ></div>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl p-6 text-center">
            <div className="text-3xl mb-3 flex justify-center">
              <FaBookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg text-blue-800 mb-2">
              Sách Mới Nhất
            </h3>
            <p className="text-blue-700 text-sm mb-4">Cập nhật hàng tuần</p>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
              Xem ngay
            </button>
          </div>

          <div className="bg-gradient-to-r from-blue-200 to-blue-300 rounded-xl p-6 text-center">
            <div className="text-3xl mb-3 flex justify-center">
              <FaTrophy className="w-8 h-8 text-blue-700" />
            </div>
            <h3 className="font-bold text-lg text-blue-900 mb-2">
              Sách Bestseller
            </h3>
            <p className="text-blue-800 text-sm mb-4">Top sách bán chạy</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Khám phá
            </button>
          </div>

          <div className="bg-gradient-to-r from-blue-300 to-blue-400 rounded-xl p-6 text-center">
            <div className="text-3xl mb-3 flex justify-center">
              <FaGem className="w-8 h-8 text-blue-800" />
            </div>
            <h3 className="font-bold text-lg text-blue-900 mb-2">
              Sách Độc Quyền
            </h3>
            <p className="text-blue-800 text-sm mb-4">Chỉ có tại cửa hàng</p>
            <button className="bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors">
              Tìm hiểu
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
