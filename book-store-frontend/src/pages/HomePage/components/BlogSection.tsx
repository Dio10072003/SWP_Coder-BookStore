import Container from "../../../components/ui/Container";

const articles = [
  {
    id: 1,
    title: "Lợi ích tuyệt vời từ việc học tiếng Hàn qua phim có phụ đề",
    excerpt:
      "Khám phá cách học tiếng Hàn hiệu quả thông qua việc xem phim có phụ đề và những lợi ích mà phương pháp này mang lại.",
    date: "10/09/2024",
    views: "407 lượt xem",
    category: "TÀI LIỆU TIẾNG HÀN",
    image: "🇰🇷",
    readTime: "5 phút đọc",
  },
  {
    id: 2,
    title: "Học từ vựng tiếng Hàn: Chủ đề các loại quả bằng cách gieo vần",
    excerpt:
      "Phương pháp học từ vựng tiếng Hàn về các loại quả một cách thú vị và dễ nhớ thông qua kỹ thuật gieo vần.",
    date: "08/09/2024",
    views: "328 lượt xem",
    category: "TÀI LIỆU TIẾNG HÀN",
    image: "🍎",
    readTime: "4 phút đọc",
  },
  {
    id: 3,
    title: "Những câu thành ngữ, tục ngữ hay bằng tiếng Hàn",
    excerpt:
      "Tổng hợp những câu thành ngữ, tục ngữ tiếng Hàn phổ biến và ý nghĩa của chúng trong giao tiếp hàng ngày.",
    date: "07/09/2024",
    views: "397 lượt xem",
    category: "TÀI LIỆU TIẾNG HÀN",
    image: "💭",
    readTime: "6 phút đọc",
  },
  {
    id: 4,
    title: "Từ vựng tiếng Hàn: Chủ đề công trường xây dựng",
    excerpt:
      "Học từ vựng tiếng Hàn chuyên ngành xây dựng, giúp bạn giao tiếp tốt hơn trong môi trường làm việc.",
    date: "06/09/2024",
    views: "375 lượt xem",
    category: "TÀI LIỆU TIẾNG HÀN",
    image: "🏗️",
    readTime: "7 phút đọc",
  },
  {
    id: 5,
    title: "Bí quyết học IELTS Writing Task 2 đạt band 8.0",
    excerpt:
      "Chia sẻ những kỹ thuật và mẹo hay để viết IELTS Writing Task 2 đạt điểm cao từ các chuyên gia.",
    date: "05/09/2024",
    views: "512 lượt xem",
    category: "TÀI LIỆU IELTS",
    image: "✍️",
    readTime: "8 phút đọc",
  },
  {
    id: 6,
    title: "Cách cải thiện kỹ năng nghe tiếng Anh qua podcast",
    excerpt:
      "Phương pháp học tiếng Anh hiệu quả thông qua việc nghe podcast và những channel podcast hay nhất.",
    date: "04/09/2024",
    views: "445 lượt xem",
    category: "TÀI LIỆU TIẾNG ANH",
    image: "🎧",
    readTime: "6 phút đọc",
  },
];

export default function BlogSection() {
  return (
    <section className="py-16 bg-gray-50">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-bold mb-4">
            📰 TIN TỨC & KIẾN THỨC
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            📖 Bài Viết Mới Nhất
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cập nhật những kiến thức mới nhất về học ngoại ngữ, mẹo học tập hiệu
            quả và thông tin về sách mới.
          </p>
        </div>

        {/* Featured Article */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-12">
                <span className="text-9xl">{articles[0].image}</span>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="mb-4">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {articles[0].category}
                  </span>
                  <span className="text-gray-500 text-sm ml-4">
                    {articles[0].date} • {articles[0].readTime}
                  </span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {articles[0].title}
                </h3>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  {articles[0].excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-colors">
                    Đọc tiếp →
                  </button>
                  <span className="text-gray-500 text-sm">
                    👁️ {articles[0].views}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(1).map((article) => (
            <div key={article.id} className="group">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Image */}
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <span className="text-6xl">{article.image}</span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-bold">
                      {article.category}
                    </span>
                    <span className="text-gray-500 text-xs">
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{article.date}</span>
                    <span>👁️ {article.views}</span>
                  </div>

                  <button className="mt-4 w-full bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 py-2 rounded-lg text-sm font-medium transition-colors">
                    Xem thêm
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 transform hover:scale-105">
            📚 Xem Tất Cả Bài Viết
          </button>
        </div>
      </Container>
    </section>
  );
}
