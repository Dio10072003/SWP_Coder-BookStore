import React from 'react';
import ShipReturnHeader from './Components/ShipReturnHeader.jsx';
import ShipSection from './Components/ShipSection.jsx';
import ReturnSection from './Components/ReturnSection.jsx';
import SupportContact from './Components/SupportContact.jsx';
import FAQLink from './Components/FAQLink.jsx';

export default function ShipReturnPage() {
    return (
        <div className="Ship-return-page-container min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-yellow-50 relative overflow-x-hidden">
            <ShipReturnHeader />
            <main className="Ship-return-main-content relative z-10 max-w-3xl mx-auto px-4 md:px-0">
                <section className="policy-section-group mb-8">
                    <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
                        <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-500 animate-float"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 17v-6a2 2 0 012-2h13a2 2 0 012 2v6M5 17h14M7 17v2a2 2 0 002 2h2a2 2 0 002-2v-2" /></svg>
                        1. Chính sách vận chuyển
                    </h2>
                    <ReturnSection
                        title="Thời gian giao sách:"
                        icon={<svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 17v-6a2 2 0 012-2h13a2 2 0 012 2v6M5 17h14M7 17v2a2 2 0 002 2h2a2 2 0 002-2v-2" /></svg>}
                        gradient="from-blue-100 via-white to-blue-50"
                    >
                        <ul>
                            <li><strong>Nội thành Quy Nhơn:</strong> Giao siêu tốc trong 1-2 ngày làm việc. Đặt hôm nay, nhận sách liền tay!</li>
                            <li><strong>Các tỉnh thành khác:</strong> Dự kiến 3-5 ngày làm việc, tuỳ vị trí và đối tác vận chuyển.</li>
                            <li><span className="text-blue-600 font-semibold">Lưu ý:</span> Đơn cuối tuần/ngày lễ sẽ xử lý vào ngày làm việc tiếp theo.</li>
                        </ul>
                    </ReturnSection>
                    <ReturnSection
                        title="Phí vận chuyển:"
                        icon={<svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-pink-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 0V4m0 16v-4" /></svg>}
                        gradient="from-pink-100 via-white to-yellow-50"
                    >
                        <ul>
                            <li><span className="font-semibold text-pink-600">Miễn phí</span> cho đơn từ 300.000 VND.</li>
                            <li>Đơn dưới 300.000 VND: Phí tính theo trọng lượng và địa chỉ, hiển thị rõ khi thanh toán.</li>
                        </ul>
                    </ReturnSection>
                    <ReturnSection
                        title="Theo dõi đơn hàng:"
                        icon={<svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-yellow-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                        gradient="from-yellow-100 via-white to-blue-50"
                    >
                        <p>Sau khi gửi hàng, bạn sẽ nhận email xác nhận kèm mã vận đơn. <span className="font-semibold text-yellow-600">Theo dõi trạng thái</span> trực tuyến mọi lúc trên website đối tác vận chuyển.</p>
                    </ReturnSection>
                </section>

                <section className="policy-section-group mb-8">
                    <h2 className="text-2xl font-bold text-pink-700 mb-4 flex items-center gap-2">
                        <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-pink-500 animate-float"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12v1a8 8 0 11-16 0v-1" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v4m0 0a4 4 0 014 4v1a4 4 0 01-8 0v-1a4 4 0 014-4z" /></svg>
                        2. Chính sách đổi trả sách
                    </h2>
                    <ShipSection
                        title="Thời hạn đổi trả:"
                        icon={<svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                        gradient="from-blue-100 via-white to-pink-50"
                    >
                        <p>Bạn có thể yêu cầu đổi trả trong <span className="font-semibold text-blue-600">7 ngày</span> kể từ khi nhận hàng. Đổi trả dễ dàng, không lo rủi ro!</p>
                    </ShipSection>
                    <ShipSection
                        title="Điều kiện đổi trả:"
                        icon={<svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-yellow-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" /><rect x="4" y="4" width="16" height="16" rx="2" /></svg>}
                        gradient="from-yellow-100 via-white to-blue-50"
                    >
                        <ul>
                            <li>Sách còn nguyên vẹn, chưa sử dụng, không rách, ướt, bẩn, không dấu hiệu đã đọc.</li>
                            <li>Cần có hóa đơn hoặc bằng chứng mua hàng hợp lệ.</li>
                            <li>Chỉ nhận đổi trả nếu sách lỗi do xuất bản hoặc hư hỏng nặng khi vận chuyển.</li>
                        </ul>
                    </ShipSection>
                    <ShipSection
                        title="Quy trình đổi trả:"
                        icon={<svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-pink-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17l4 4 4-4m-4-4V3" /></svg>}
                        gradient="from-pink-100 via-white to-yellow-50"
                    >
                        <ol className="list-decimal pl-5 space-y-1">
                            <li>Liên hệ bộ phận hỗ trợ qua email/điện thoại để thông báo yêu cầu đổi trả.</li>
                            <li>Cung cấp thông tin đơn hàng và mô tả chi tiết lỗi/hư hỏng.</li>
                            <li>Đóng gói sản phẩm cẩn thận, gửi về địa chỉ được cung cấp.</li>
                            <li>Chúng tôi kiểm tra và phản hồi kết quả sớm nhất.</li>
                        </ol>
                    </ShipSection>
                </section>

                <SupportContact />
                <FAQLink />
            </main>
        </div>
    );
}