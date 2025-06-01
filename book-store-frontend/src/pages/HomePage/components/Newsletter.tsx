import { useState } from "react";
import Container from "../../../components/ui/Container";
import Button from "../../../components/ui/Button";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">
      <Container>
        <div className="text-center max-w-4xl mx-auto text-white">
          {/* Header */}
          <div className="mb-8">
            <div className="text-6xl mb-6">📧</div>
            <h2 className="text-4xl font-bold mb-4">
              🎯 Đăng Ký Nhận Tin Khuyến Mãi
            </h2>
            <p className="text-xl opacity-90 leading-relaxed max-w-2xl mx-auto">
              Là người đầu tiên nhận thông tin về sách mới, ưu đãi đặc biệt và
              các chương trình khuyến mãi hấp dẫn từ Book Store.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-3">🔥</div>
              <h3 className="font-bold text-lg mb-2">Ưu đãi độc quyền</h3>
              <p className="text-sm opacity-90">
                Giảm giá đặc biệt chỉ dành cho subscriber
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-3">📚</div>
              <h3 className="font-bold text-lg mb-2">Sách mới nhất</h3>
              <p className="text-sm opacity-90">
                Cập nhật đầu tiên về sách mới ra mắt
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-3">🎁</div>
              <h3 className="font-bold text-lg mb-2">Quà tặng miễn phí</h3>
              <p className="text-sm opacity-90">
                Nhận voucher và quà tặng đặc biệt
              </p>
            </div>
          </div>

          {/* Subscription Form */}
          {isSubscribed ? (
            <div className="bg-green-500/30 backdrop-blur-sm border-2 border-green-400 rounded-2xl p-8 max-w-md mx-auto">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-2xl font-bold mb-2">Đăng ký thành công!</h3>
              <p className="opacity-90">
                Cảm ơn bạn đã đăng ký! Chúng tôi sẽ gửi những ưu đãi tốt nhất
                đến email của bạn.
              </p>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSubmit}>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      placeholder="✉️ Nhập địa chỉ email của bạn..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 px-6 py-4 rounded-xl border-2 border-white/30 bg-white/20 text-white placeholder-white/70 text-lg focus:outline-none focus:border-white focus:bg-white/30 transition-all"
                    />
                    <button
                      type="submit"
                      className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-orange-50 transition-all transform hover:scale-105 whitespace-nowrap"
                    >
                      🚀 Đăng Ký Ngay
                    </button>
                  </div>
                  <p className="text-sm opacity-75 mt-4">
                    💡 Bằng cách đăng ký, bạn đồng ý nhận email từ chúng tôi.
                    Bạn có thể hủy đăng ký bất cứ lúc nào.
                  </p>
                </div>
              </form>
            </div>
          )}

          {/* Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-1">15,000+</div>
              <div className="text-sm opacity-90">Độc giả đã đăng ký</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">50+</div>
              <div className="text-sm opacity-90">Ưu đãi mỗi tháng</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">98%</div>
              <div className="text-sm opacity-90">Khách hàng hài lòng</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
