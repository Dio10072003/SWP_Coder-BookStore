import React from "react";
import TermsHeader from "./Components/TermsHeader";
import TermsSection from "./Components/TermsSection";
import AcceptanceNotice from "./Components/AcceptanceNotice";
import AmendmentNotice from "./Components/AmendmentNotice";
import GoverningLaw from "./Components/GoverningLaw";

export default function TermOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-10 px-2">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <TermsHeader />
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <AcceptanceNotice />
        </div>
        <div className="space-y-6 mb-6">
          <TermsSection title="1. Tài khoản Người dùng">
            <p>
              Khi tạo tài khoản với chúng tôi, bạn phải cung cấp thông tin chính
              xác, đầy đủ và cập nhật. Bạn chịu trách nhiệm bảo mật mật khẩu của
              mình và cho tất cả các hoạt động xảy ra dưới tài khoản của bạn.
            </p>
          </TermsSection>
          <TermsSection title="2. Quy định về Đặt hàng và Thanh toán">
            <p>
              Khi bạn đặt hàng sách tại Coder-BookStore, bạn đồng ý cung cấp
              thông tin thanh toán chính xác và đầy đủ. Chúng tôi có quyền từ
              chối hoặc hủy bỏ đơn hàng của bạn vì một số lý do, bao gồm nhưng
              không giới hạn ở: lỗi sản phẩm hoặc giá cả, lỗi trong đơn hàng của
              bạn hoặc các vấn đề khác.
            </p>
          </TermsSection>
          <TermsSection title="3. Quyền sở hữu trí tuệ">
            <p>
              Tất cả nội dung trên trang web này, bao gồm văn bản, đồ họa, logo,
              hình ảnh, sách điện tử và phần mềm, là tài sản của Coder-BookStore
              hoặc các nhà cung cấp nội dung của chúng tôi và được bảo vệ bởi
              luật bản quyền.
            </p>
          </TermsSection>
          <TermsSection title="4. Hạn chế sử dụng">
            <p>
              Bạn không được phép sử dụng trang web cho bất kỳ mục đích bất hợp
              pháp hoặc bị cấm bởi các Điều Khoản này. Bạn không được sử dụng
              trang web theo bất kỳ cách nào có thể làm hỏng, vô hiệu hóa, quá
              tải hoặc làm suy yếu máy chủ của chúng tôi hoặc mạng được kết nối.
            </p>
          </TermsSection>
          <TermsSection title="5. Liên kết đến các trang web khác">
            <p>
              Trang web của chúng tôi có thể chứa các liên kết đến các trang web
              hoặc dịch vụ của bên thứ ba không thuộc sở hữu hoặc kiểm soát của
              Coder-BookStore. Chúng tôi không chịu trách nhiệm về nội dung,
              chính sách bảo mật hoặc các hoạt động của bất kỳ trang web hoặc
              dịch vụ bên thứ ba nào.
            </p>
          </TermsSection>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <AmendmentNotice />
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <GoverningLaw />
        </div>
      </div>
    </div>
  );
}
/*
import React from 'react';
import TermsHeader from './Components/TermsHeader';
import TermsSection from './Components/TermsSection';
import AcceptanceNotice from './Components/AcceptanceNotice';
import AmendmentNotice from './Components/AmendmentNotice';
import GoverningLaw from './Components/GoverningLaw';

export default function TermOfServicePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-10 px-2">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <TermsHeader />
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <AcceptanceNotice />
                </div>
                <div className="space-y-6 mb-6">
                    <TermsSection title="1. Tài khoản Người dùng">
                        <p>Khi tạo tài khoản với chúng tôi, bạn phải cung cấp thông tin chính xác, đầy đủ và cập nhật. Bạn chịu trách nhiệm bảo mật mật khẩu của mình và cho tất cả các hoạt động xảy ra dưới tài khoản của bạn.</p>
                    </TermsSection>
                    <TermsSection title="2. Quy định về Đặt hàng và Thanh toán">
                        <p>Khi bạn đặt hàng sách tại Coder-BookStore, bạn đồng ý cung cấp thông tin thanh toán chính xác và đầy đủ. Chúng tôi có quyền từ chối hoặc hủy bỏ đơn hàng của bạn vì một số lý do, bao gồm nhưng không giới hạn ở: lỗi sản phẩm hoặc giá cả, lỗi trong đơn hàng của bạn hoặc các vấn đề khác.</p>
                    </TermsSection>
                    <TermsSection title="3. Quyền sở hữu trí tuệ">
                        <p>Tất cả nội dung trên trang web này, bao gồm văn bản, đồ họa, logo, hình ảnh, sách điện tử và phần mềm, là tài sản của Coder-BookStore hoặc các nhà cung cấp nội dung của chúng tôi và được bảo vệ bởi luật bản quyền.</p>
                    </TermsSection>
                    <TermsSection title="4. Hạn chế sử dụng">
                        <p>Bạn không được phép sử dụng trang web cho bất kỳ mục đích bất hợp pháp hoặc bị cấm bởi các Điều Khoản này. Bạn không được sử dụng trang web theo bất kỳ cách nào có thể làm hỏng, vô hiệu hóa, quá tải hoặc làm suy yếu máy chủ của chúng tôi hoặc mạng được kết nối.</p>
                    </TermsSection>
                    <TermsSection title="5. Liên kết đến các trang web khác">
                        <p>Trang web của chúng tôi có thể chứa các liên kết đến các trang web hoặc dịch vụ của bên thứ ba không thuộc sở hữu hoặc kiểm soát của Coder-BookStore. Chúng tôi không chịu trách nhiệm về nội dung, chính sách bảo mật hoặc các hoạt động của bất kỳ trang web hoặc dịch vụ bên thứ ba nào.</p>
                    </TermsSection>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <AmendmentNotice />
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <GoverningLaw />
                </div>
            </div>
        </div>
    );
}
*/
