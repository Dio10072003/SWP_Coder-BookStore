import React from 'react';
import ShipReturnHeader from './Components/ShipReturnHeader.jsx';
import ShipSection from './Components/ShipSection.jsx';
import ReturnSection from './Components/ReturnSection.jsx';
import SupportContact from './Components/SupportContact.jsx';
import FAQLink from './Components/FAQLink.jsx';

export default function ShipReturnPage() {
    return (
        <div className="Ship-return-page-container min-h-screen bg-gray-50">
            <ShipReturnHeader />
            <main className="Ship-return-main-content">
                <section className="policy-section-group"> {/* Một section chung cho Chính sách vận chuyển */}
                    <h2>1. Chính sách vận chuyển</h2>
                    <ShipSection title="Thời gian giao sách:">
                        <ul>
                            <li><strong>Nội thành Quy Nhơn:</strong> Đơn hàng sẽ được giao trong vòng 1-2 ngày làm việc kể từ khi xác nhận đơn hàng.</li>
                            <li><strong>Các tỉnh thành khác:</strong> Thời gian giao hàng dự kiến từ 3-5 ngày làm việc, tùy thuộc vào địa điểm và đối tác vận chuyển.</li>
                            <li>Lưu ý: Các đơn hàng đặt vào cuối tuần hoặc ngày lễ sẽ được xử lý vào ngày làm việc tiếp theo.</li>
                        </ul>
                    </ShipSection>
                    <ShipSection title="Phí vận chuyển:">
                        <ul>
                            <li>Miễn phí vận chuyển cho tất cả các đơn hàng sách có tổng giá trị từ 300.000 VND trở lên.</li>
                            <li>Đối với đơn hàng dưới 300.000 VND, phí vận chuyển sẽ được tính dựa trên trọng lượng và địa chỉ nhận hàng, và sẽ được hiển thị rõ ràng khi bạn tiến hành thanh toán.</li>
                        </ul>
                    </ShipSection>
                    <ShipSection title="Theo dõi đơn hàng:">
                        <p>Sau khi đơn hàng được gửi đi, bạn sẽ nhận được một email xác nhận kèm theo mã vận đơn. Bạn có thể sử dụng mã này để theo dõi trạng thái giao hàng trực tuyến trên trang web của đối tác vận chuyển.</p>
                    </ShipSection>
                </section>

                <section className="policy-section-group"> {/* Một section chung cho Chính sách đổi trả */}
                    <h2>2. Chính sách đổi trả sách</h2>
                    <ReturnSection title="Thời hạn đổi trả:">
                        <p>Bạn có thể yêu cầu đổi trả sách trong vòng 7 ngày kể từ ngày bạn nhận được hàng.</p>
                    </ReturnSection>
                    <ReturnSection title="Điều kiện đổi trả:">
                        <ul>
                            <li>Sách phải còn nguyên vẹn, chưa qua sử dụng, không bị rách, ướt, bẩn, hoặc có dấu hiệu đã đọc.</li>
                            <li>Phải có đầy đủ hóa đơn mua hàng từ Coder-BookStore hoặc bằng chứng mua hàng hợp lệ.</li>
                            <li>Chúng tôi chấp nhận đổi trả nếu sách bị lỗi do nhà xuất bản (ví dụ: thiếu trang, in mờ, sai nội dung) hoặc bị hư hỏng nghiêm trọng trong quá trình vận chuyển.</li>
                        </ul>
                    </ReturnSection>
                    <ReturnSection title="Quy trình đổi trả:">
                        <ol>
                            <li>Liên hệ bộ phận hỗ trợ khách hàng của chúng tôi qua email hoặc điện thoại để thông báo về yêu cầu đổi trả.</li>
                            <li>Cung cấp thông tin đơn hàng và mô tả chi tiết về lỗi/hư hỏng của sách.</li>
                            <li>Đóng gói sản phẩm cẩn thận và gửi về địa chỉ được cung cấp.</li>
                            <li>Chúng tôi sẽ kiểm tra sản phẩm và thông báo kết quả trong thời gian sớm nhất.</li>
                        </ol>
                    </ReturnSection>
                </section>

                <SupportContact />
                <FAQLink />
            </main>
        </div>
    );
}