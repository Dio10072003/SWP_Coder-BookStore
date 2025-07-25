Coder BookStore-Web
📚 Giới thiệu
Coder BookStore-Web là nền tảng bán sách trực tuyến hiện đại, tập trung vào cộng đồng lập trình viên và những người yêu công nghệ. Dự án cung cấp trải nghiệm mua sắm sách chuyên nghiệp, tích hợp nhiều tính năng quản lý, hỗ trợ khách hàng, và xây dựng cộng đồng chia sẻ tri thức.
🚀 Tính năng nổi bật
- Quản lý sách đa dạng: duyệt, tìm kiếm, lọc, xem chi tiết sách, tác giả, thể loại.
- Giỏ hàng, đặt hàng, theo dõi đơn hàng trực tuyến.
- Đăng ký, đăng nhập, quản lý hồ sơ cá nhân.
- Trang blog, sự kiện, khuyến mãi, FAQ, feedback.
- Trung tâm hỗ trợ khách hàng, gửi ticket, đánh giá dịch vụ.
- Trang quản trị cho admin: quản lý sách, tác giả, danh mục, đơn hàng, nhân viên, phân quyền, reset mật khẩu nhân viên.
- Giao diện hiện đại, tối ưu cho desktop và mobile.

🛠️ Công nghệ sử dụng
- **Next.js** (React framework) - Frontend & API routes
- **TypeScript** & **JavaScript**
- **Supabase** - Backend/database
- **Tailwind CSS** - Styling
- **pnpm** hoặc **npm** - Quản lý package
- **PostCSS**, **ESLint** - Công cụ hỗ trợ phát triển
📂 Cấu trúc thư mục chính

Coder_BookStore-Web/
├── public/                # Ảnh, font, logo, assets tĩnh
├── src/
│   └── app/
│       ├── Books/         # Trang sách, chi tiết sách
│       ├── Authors/       # Trang tác giả, chi tiết tác giả
│       ├── Categories/    # Trang danh mục sách
│       ├── CartPage/      # Giỏ hàng
│       ├── OrderTracking/ # Theo dõi đơn hàng
│       ├── admin/         # Trang quản trị
│       ├── api/           # API backend (RESTful)
│       │   ├── auth/      # Đăng nhập, đăng ký, đăng xuất
│       │   ├── books/     # API sách
│       │   ├── authors/   # API tác giả
│       │   └── ...        # Các API khác
│       ├── components/    # Component dùng chung
│       ├── services/      # Service gọi API, xử lý logic client
│       ├── utils/         # Hàm tiện ích
│       └── ...            # Các trang, module khác
├── package.json           # Thông tin package
├── pnpm-lock.yaml         # Lockfile pnpm
├── README.md              # Tài liệu này
└── ...
⚙️ Hướng dẫn cài đặt & chạy dự án

### 1. Clone repository
```bash
git clone <repo-url>
cd Coder_BookStore-Web
```

### 2. Cài đặt dependencies
```bash
pnpm install
# hoặc
npm install
```

### 3. Thiết lập biến môi trường
- Tạo file `.env` dựa trên mẫu `src/app/api/env.example` và điền các thông tin cần thiết (Supabase, API keys, ...).

### 4. Chạy dự án ở chế độ phát triển
```bash
pnpm dev
# hoặc
npm run dev

Truy cập: [http://localhost:3000](http://localhost:3000)

### 5. Build production
```bash
pnpm build
pnpm start
# hoặc
npm run build
npm start
```

---
👨‍💻 Hướng dẫn phát triển
- Sử dụng **Next.js** (App Router) cho các trang và API.
- Tách biệt rõ frontend (UI/UX) và backend (API routes).
- Sử dụng **Supabase** cho database, xác thực, lưu trữ file.
- Quản lý state với React hooks, context.
- Viết code sạch, tuân thủ chuẩn ESLint, sử dụng Prettier nếu cần.
- Đặt tên biến, hàm, component rõ ràng, dễ hiểu.
- Đóng góp code qua Pull Request, mô tả rõ thay đổi.

🤝 Đóng góp
1. Fork repository, tạo branch mới từ `main`.
2. Commit code nhỏ, có message rõ ràng.
3. Tạo Pull Request, mô tả chi tiết thay đổi.
4. Tham gia review, góp ý cho các PR khác.
5. Tôn trọng quy tắc teamwork, hỗ trợ lẫn nhau.

🔒 Bảo mật & quyền riêng tư
- Không commit thông tin nhạy cảm (API key, mật khẩu) lên repo.
- Sử dụng biến môi trường cho các thông tin bảo mật.
- Kiểm tra, validate dữ liệu đầu vào ở cả frontend và backend.
- Sử dụng hash password, xác thực token cho các API
📞 Liên hệ & hỗ trợ
- Nếu gặp vấn đề, vui lòng tạo Issue hoặc Pull Request.
- Email liên hệ: [TomOutfit2020@gmail.com]
- Đóng góp ý kiến, phản hồi qua trang Feedback hoặc Support Center trên website.

📑 Thông tin bổ sung
- Dự án phục vụ mục đích học tập, nghiên cứu, có thể mở rộng cho các mục đích thương mại.
- Mọi đóng góp, phản hồi đều được hoan nghênh để dự án ngày càng hoàn thiện.

---

**Cảm ơn bạn đã quan tâm và sử dụng Coder BookStore-Web!**
