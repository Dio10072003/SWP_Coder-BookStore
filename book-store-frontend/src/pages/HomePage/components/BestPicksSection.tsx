import Container from "../../../components/ui/Container";

export default function BestPicksSection() {
  const deals = [
    {
      id: 1,
      title: "Combo 3 Cuốn IELTS Complete",
      description: "Bộ sách IELTS hoàn chỉnh từ cơ bản đến nâng cao",
      originalPrice: 750000,
      salePrice: 525000,
      discount: 30,
      image: "📚",
      badge: "HOT DEAL",
      timeLeft: "Còn 2 ngày",
      features: ["Speaking", "Writing", "Reading", "Listening"],
    },
    {
      id: 2,
      title: "Sách Tiếng Hàn Topik I",
      description: "Chuẩn bị cho kỳ thi Topik I hiệu quả",
      originalPrice: 450000,
      salePrice: 315000,
      discount: 30,
      image: "🇰🇷",
      badge: "BESTSELLER",
      timeLeft: "Còn 5 ngày",
      features: ["Từ vựng", "Ngữ pháp", "Đọc hiểu", "Nghe"],
    },
    {
      id: 3,
      title: "Combo Văn Học Việt Nam",
      description: "Tuyển tập những tác phẩm kinh điển",
      originalPrice: 380000,
      salePrice: 266000,
      discount: 30,
      image: "🏛️",
      badge: "LIMITED",
      timeLeft: "Còn 3 ngày",
      features: ["Truyện ngắn", "Tiểu thuyết", "Thơ", "Kịch"],
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-red-500 text-white px-6 py-3 rounded-full text-sm font-bold mb-4 animate-pulse">
            🔥 KHUYẾN MÃI CỰC HOT
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            ⚡ Deals Đặc Biệt Hôm Nay
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tiết kiệm 30% cho tất cả combo sách học ngoại ngữ và văn học. Ưu đãi
            có thời hạn!
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 mb-12 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">⏰ Ưu đãi kết thúc trong:</h3>
          <div className="flex justify-center space-x-8">
            <div className="text-center">
              <div className="text-4xl font-bold">02</div>
              <div className="text-sm opacity-90">NGÀY</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">14</div>
              <div className="text-sm opacity-90">GIỜ</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">35</div>
              <div className="text-sm opacity-90">PHÚT</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">42</div>
              <div className="text-sm opacity-90">GIÂY</div>
            </div>
          </div>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {deals.map((deal) => (
            <div key={deal.id} className="group relative">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform group-hover:scale-105 transition-all duration-300">
                {/* Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {deal.badge}
                  </span>
                </div>
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    -{deal.discount}%
                  </span>
                </div>

                {/* Image */}
                <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <span className="text-8xl">{deal.image}</span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-900 mb-2">
                    {deal.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {deal.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {deal.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Pricing */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-3xl font-bold text-blue-600">
                          {deal.salePrice.toLocaleString("vi-VN")}đ
                        </span>
                        <span className="text-gray-500 line-through ml-2">
                          {deal.originalPrice.toLocaleString("vi-VN")}đ
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-blue-600 font-medium">
                          {deal.timeLeft}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105">
                    🛒 MUA NGAY - TIẾT KIỆM {deal.discount}%
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              🎯 Không tìm thấy combo phù hợp?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Liên hệ với chúng tôi để được tư vấn combo sách phù hợp nhất
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-orange-600 px-8 py-3 rounded-xl font-bold hover:bg-orange-50 transition-colors">
                📞 Tư vấn miễn phí
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white hover:text-orange-600 transition-colors">
                💬 Chat với chuyên gia
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
