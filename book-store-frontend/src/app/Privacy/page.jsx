// app/privacy/page.jsx
import React from 'react';
import PrivacyHeader from './Components/PrivacyHeader';
import PolicySection from './Components/PolicySection';
import ContactInfo from './Components/ContactInfo';
import UpdateNotice from './Components/UpdateNotice';

export default function PrivacyPage() {
    return (
        <div className="privacy-page-container min-h-screen bg-gray-50">
            <PrivacyHeader />
            <main className="privacy-main-content">
                <PolicySection title="1. Thông tin chúng tôi thu thập">
                    <p>Chúng tôi thu thập các loại thông tin cá nhân sau khi bạn tương tác với Coder-BookStore:</p>
                    <ul>
<li><strong>Thông tin nhận dạng cá nhân:</strong> Tên, địa chỉ email, địa chỉ giao hàng, số điện thoại, ngày sinh khi bạn đăng ký tài khoản hoặc đặt hàng.</li>
                        <li><strong>Thông tin thanh toán:</strong> Chi tiết thanh toán được xử lý thông qua các cổng an toàn của bên thứ ba (chúng tôi không lưu trữ thông tin thẻ tín dụng đầy đủ).</li>
                        <li><strong>Dữ liệu sử dụng trang web:</strong> Địa chỉ IP, loại trình duyệt, trang đã truy cập, thời gian truy cập để cải thiện trải nghiệm người dùng.</li>
                    </ul>
                </PolicySection>

                <PolicySection title="2. Cách chúng tôi sử dụng thông tin">
                    <p>Thông tin thu thập được sử dụng để:</p>
                    <ul>
                        <li>Xử lý và giao các đơn hàng sách của bạn một cách hiệu quả.</li>
                        <li>Cá nhân hóa trải nghiệm mua sắm và đề xuất sách phù hợp với sở thích của bạn.</li>
                        <li>Gửi email về xác nhận đơn hàng, cập nhật vận chuyển, sách mới, và các chương trình khuyến mãi.</li>
                        <li>Cải thiện trang web, dịch vụ và trải nghiệm khách hàng dựa trên phản hồi của bạn.</li>
                    </ul>
                </PolicySection>

                <PolicySection title="3. Bảo mật thông tin của bạn">
                    <p>Coder-BookStore áp dụng nhiều biện pháp bảo mật nghiêm ngặt để bảo vệ thông tin cá nhân của bạn. Mọi giao dịch nhạy cảm được mã hóa sử dụng công nghệ Secure Socket Layer (SSL). Chúng tôi cam kết không lưu trữ thông tin thẻ tín dụng của bạn trên máy chủ của chúng tôi.</p>
                </PolicySection>

                <PolicySection title="4. Chia sẻ thông tin với bên thứ ba">
                    <p>Chúng tôi không bán, trao đổi hoặc chuyển giao thông tin nhận dạng cá nhân của bạn cho các bên ngoài. Điều này không bao gồm các đối tác vận chuyển và cung cấp dịch vụ thanh toán đáng tin cậy hỗ trợ chúng tôi trong việc vận hành trang web và phục vụ bạn, miễn là các bên đó đồng ý giữ bí mật thông tin này. Chúng tôi cũng có thể tiết lộ thông tin khi tin rằng việc này là cần thiết để tuân thủ pháp luật, thực thi chính sách của trang web hoặc bảo vệ quyền, tài sản hoặc sự an toàn của chúng tôi hoặc người khác.</p>
                </PolicySection>

                <ContactInfo />
                <UpdateNotice />
            </main>
        </div>
    );
}