import Button from "../../../components/ui/Button";
import Container from "../../../components/ui/Container";

export default function HeroSection() {
  return (
    <section className="bg-gray-50 py-8">
      <Container>
        {/* Main Banner */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8 lg:p-12">
              <div className="text-white">
                <div className="inline-block bg-yellow-400 text-blue-800 px-4 py-2 rounded-full text-sm font-bold mb-4">
                  🔥 KHUYẾN MÃI CỰC HOT
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                  Combo Trọn Bộ <span className="text-yellow-300">IELTS</span>
                </h1>
                <p className="text-xl mb-6 text-blue-100">
                  Khuyến mãi 30% khi mua kèm 3 bộ sách IELTS
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="primary"
                    size="large"
                    className="bg-yellow-400 hover:bg-yellow-500 text-blue-800 font-bold px-8 py-4 text-lg"
                  >
                    🛒 MUA NGAY
                  </Button>
                  <Button
                    variant="outline"
                    size="large"
                    className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 text-lg"
                  >
                    📖 XEM CHI TIẾT
                  </Button>
                </div>
              </div>

              <div className="text-center lg:text-right">
                <div className="relative">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 inline-block">
                    <div className="text-8xl mb-4">📚</div>
                    <div className="text-white text-2xl font-bold mb-2">
                      Tiết kiệm tới
                    </div>
                    <div className="text-yellow-300 text-6xl font-black">
                      30%
                    </div>
                  </div>
                  <div className="absolute -top-4 -right-4 bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl animate-bounce">
                    🎯
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Banners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl p-6 text-white text-center">
            <div className="text-4xl mb-3">🌟</div>
            <h3 className="font-bold text-lg mb-2">Sách Bestseller</h3>
            <p className="text-blue-100 text-sm mb-4">Top sách bán chạy nhất</p>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50">
              Khám phá ngay
            </button>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white text-center">
            <div className="text-4xl mb-3">📖</div>
            <h3 className="font-bold text-lg mb-2">Sách Mới Về</h3>
            <p className="text-blue-100 text-sm mb-4">Cập nhật sách mới nhất</p>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50">
              Xem ngay
            </button>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white text-center">
            <div className="text-4xl mb-3">🎁</div>
            <h3 className="font-bold text-lg mb-2">Quà Tặng</h3>
            <p className="text-blue-100 text-sm mb-4">Combo sách + quà tặng</p>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50">
              Nhận quà
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center justify-center bg-white rounded-lg p-4 shadow-md">
            <span className="text-2xl mr-3">🚚</span>
            <div>
              <div className="font-semibold text-sm">Miễn phí ship</div>
              <div className="text-xs text-gray-600">Đơn từ 299k</div>
            </div>
          </div>

          <div className="flex items-center justify-center bg-white rounded-lg p-4 shadow-md">
            <span className="text-2xl mr-3">💰</span>
            <div>
              <div className="font-semibold text-sm">Hoàn tiền</div>
              <div className="text-xs text-gray-600">100% đảm bảo</div>
            </div>
          </div>

          <div className="flex items-center justify-center bg-white rounded-lg p-4 shadow-md">
            <span className="text-2xl mr-3">🏆</span>
            <div>
              <div className="font-semibold text-sm">Chất lượng</div>
              <div className="text-xs text-gray-600">Sách chính hãng</div>
            </div>
          </div>

          <div className="flex items-center justify-center bg-white rounded-lg p-4 shadow-md">
            <span className="text-2xl mr-3">⏰</span>
            <div>
              <div className="font-semibold text-sm">Giao nhanh</div>
              <div className="text-xs text-gray-600">Trong 24h</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
