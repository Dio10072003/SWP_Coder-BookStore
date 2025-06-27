// app/privacy/page.jsx
import React from 'react';
import PrivacyHeader from './Components/PrivacyHeader';
import PolicySection from './Components/PolicySection';
import ContactInfo from './Components/ContactInfo';
import UpdateNotice from './Components/UpdateNotice';

export default function PrivacyPage() {
    return (
        <div className="privacy-page-container min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-x-hidden">
            {/* Hiệu ứng blob nền động toàn trang */}
            <span className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-pink-200 opacity-20 rounded-full blur-3xl animate-blob z-0" />
            <span className="absolute top-1/3 -left-40 w-[400px] h-[300px] bg-purple-200 opacity-10 rounded-full blur-2xl animate-blob2 z-0" />
            <span className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-blue-200 opacity-10 rounded-full blur-3xl animate-blob z-0" />

            <PrivacyHeader />
            <main className="privacy-main-content relative z-10 max-w-3xl mx-auto px-4 md:px-0">
                <PolicySection
                    title="1. Chúng tôi thu thập những gì?"
                    gradient="from-pink-100 via-white to-purple-50"
                    icon={
                        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-pink-500 w-8 h-8 animate-float">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-2a4 4 0 014-4h10a4 4 0 014 4v2" />
                        </svg>
                    }
                >
                    <p><span className="font-semibold text-pink-600">Chúng tôi chỉ thu thập những gì thực sự cần thiết</span> để phục vụ bạn tốt nhất. Dữ liệu của bạn không phải là con số, mà là sự tin tưởng!</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li><strong>Thông tin cá nhân:</strong> Họ tên, email, địa chỉ giao hàng, số điện thoại, ngày sinh – chỉ khi bạn đăng ký hoặc đặt hàng.</li>
                        <li><strong>Thông tin thanh toán:</strong> Luôn được mã hóa và xử lý qua đối tác uy tín. Chúng tôi không bao giờ lưu trữ số thẻ của bạn.</li>
                        <li><strong>Dữ liệu sử dụng:</strong> IP, trình duyệt, trang bạn ghé thăm – giúp chúng tôi làm bạn hài lòng hơn mỗi ngày.</li>
                    </ul>
                </PolicySection>

                <PolicySection
                    title="2. Chúng tôi dùng thông tin của bạn như thế nào?"
                    gradient="from-purple-100 via-white to-blue-50"
                    icon={
                        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-purple-500 w-8 h-8 animate-float">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 01-8 0" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11v2m0 4h.01" />
                            <rect x="4" y="15" width="16" height="5" rx="2" />
                        </svg>
                    }
                >
                    <p><span className="font-semibold text-purple-600">Mỗi dòng dữ liệu là một lời cam kết phục vụ bạn tốt hơn.</span> Chúng tôi sử dụng thông tin để:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Giao sách nhanh, đúng, đủ – không để bạn phải chờ đợi.</li>
                        <li>Cá nhân hóa trải nghiệm: Đề xuất sách, ưu đãi, nội dung phù hợp với bạn.</li>
                        <li>Thông báo đơn hàng, vận chuyển, sự kiện mới – chỉ những gì bạn quan tâm.</li>
                        <li>Không ngừng cải tiến dịch vụ dựa trên phản hồi của bạn.</li>
                    </ul>
                </PolicySection>

                <PolicySection
                    title="3. Bảo mật – Ưu tiên số 1"
                    gradient="from-blue-100 via-white to-purple-50"
                    icon={
                        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-500 w-8 h-8 animate-float">
                            <rect x="3" y="11" width="18" height="10" rx="2" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11V7a5 5 0 0110 0v4" />
                            <circle cx="12" cy="16" r="2" />
                        </svg>
                    }
                >
                    <p><span className="font-semibold text-blue-600">Chúng tôi bảo vệ dữ liệu của bạn như chính tài sản của mình.</span> Mọi giao dịch đều được mã hóa SSL, hệ thống bảo mật nhiều lớp, không lưu trữ thông tin thẻ trên máy chủ. An toàn của bạn là ưu tiên số 1!</p>
                </PolicySection>

                <PolicySection
                    title="4. Chia sẻ thông tin – Minh bạch & trách nhiệm"
                    gradient="from-yellow-100 via-white to-pink-50"
                    icon={
                        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-yellow-500 w-8 h-8 animate-float">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11V7a4 4 0 10-8 0v4m16 0a4 4 0 01-8 0" />
                        </svg>
                    }
                >
                    <p><span className="font-semibold text-yellow-600">Chúng tôi không bán dữ liệu – chỉ chia sẻ khi thực sự cần thiết.</span> Đối tác vận chuyển, thanh toán đều phải tuân thủ bảo mật nghiêm ngặt. Chỉ tiết lộ khi pháp luật yêu cầu hoặc để bảo vệ quyền lợi của bạn và cộng đồng.</p>
                </PolicySection>

                {/* Có thể thêm stepper/timeline nếu muốn */}

                <ContactInfo />
                <UpdateNotice />
            </main>
        </div>
    );
}