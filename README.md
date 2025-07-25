# 📚 Coder Book Store Web Application

Dự án thực hiện trong khuôn khổ môn học Software Development Project (SWP391) tại FPT University.

## 🔖 Introduction

Coder Book Store là ứng dụng web quản lý và bán sách trực tuyến, phát triển với kiến trúc hiện đại sử dụng **Next.js** và **TypeScript**. Dự án hướng tới việc xây dựng một hệ thống thực tế, đáp ứng đầy đủ các nghiệp vụ của một cửa hàng sách online, mang lại trải nghiệm mua sắm tiện lợi cho người dùng và công cụ quản lý hiệu quả cho quản trị viên.

## 🎯 Project Goals

- Áp dụng kiến thức phát triển phần mềm hiện đại với các công nghệ và phương pháp tiên tiến.
- Thực hành teamwork, quản lý dự án, quy trình chuyên nghiệp.
- Xây dựng sản phẩm thực tế phục vụ học tập và nghiên cứu về thương mại điện tử.

## 🌟 Features

**Người dùng**
- 🔐 Đăng nhập / Đăng ký người dùng: Hệ thống xác thực an toàn, dễ sử dụng.
- 👤 Quản lý hồ sơ cá nhân: Xem và cập nhật thông tin cá nhân, đổi mật khẩu.
- 📚 Danh sách sách: Hiển thị sách theo danh mục, thể loại, tác giả, với khả năng phân trang.
- 🛒 Quản lý giỏ hàng & Đặt hàng: Thêm/xóa sản phẩm vào giỏ, đặt hàng và theo dõi trạng thái đơn hàng.
- 🔎 Tìm kiếm & Lọc nâng cao: Dễ dàng tìm kiếm sách theo từ khóa, lọc theo thể loại, tác giả, giá, đánh giá, v.v.
- ⭐ Đánh giá & Bình luận: Gửi đánh giá, nhận xét về sản phẩm, xem đánh giá của người dùng khác.
- 💬 Gửi phản hồi & Hỗ trợ: Gửi phản hồi, yêu cầu hỗ trợ, theo dõi lịch sử hỗ trợ.
- 📝 Đăng ký nhận bản tin: Đăng ký email để nhận thông báo về sách mới, khuyến mãi, sự kiện.

**Quản trị viên**
- 🧑‍💼 Trang quản trị (Admin Panel): Giao diện trực quan để quản lý người dùng, sách, danh mục, đơn hàng.
- 📦 Quản lý kho sách: Thêm, sửa, xóa sách, cập nhật số lượng tồn kho.
- 🗂️ Quản lý danh mục & tác giả: Thêm, sửa, xóa danh mục sách, tác giả.
- 🧑‍🤝‍🧑 Quản lý nhân viên: Thêm, phân quyền, reset mật khẩu nhân viên.
- 📊 Thống kê & báo cáo: Xem thống kê doanh thu, số lượng đơn hàng, sách bán chạy, hoạt động người dùng.
- 🏷️ Quản lý khuyến mãi & sự kiện: Tạo, chỉnh sửa các chương trình khuyến mãi, sự kiện, blog.
- 📨 Quản lý phản hồi & hỗ trợ: Xem, phản hồi các yêu cầu hỗ trợ, feedback từ người dùng.

**Tổng quan**
- 📱 Giao diện Responsive: Tối ưu hóa cho cả thiết bị Desktop và Mobile.
- 🌐 Đa ngôn ngữ: Hỗ trợ nhiều ngôn ngữ (có thể mở rộng).
- 🔔 Thông báo real-time: Nhận thông báo về trạng thái đơn hàng, phản hồi, khuyến mãi.
- 🛡️ Bảo mật: Xác thực JWT, hash mật khẩu, phân quyền truy cập.
- 🗄️ Lưu trữ file: Hỗ trợ upload ảnh bìa sách, avatar người dùng, tài liệu liên quan.
- 🕒 Lịch sử hoạt động: Lưu lại lịch sử mua hàng, đánh giá, hoạt động của người dùng.
- 🛠️ API RESTful hiện đại: Dễ dàng tích hợp với các hệ thống khác hoặc phát triển mobile app trong tương lai.

## 🚀 Technology Stack

| 🛠️ Công nghệ         | 💡 Mô tả                                                                 |
|----------------------|--------------------------------------------------------------------------|
| Next.js              | Framework React hiện đại, hỗ trợ SSR, SSG, tối ưu SEO                    |
| TypeScript           | Ngôn ngữ lập trình tĩnh, tăng độ an toàn và dễ bảo trì mã nguồn           |
| Tailwind CSS         | Thư viện CSS tiện dụng, giúp xây dựng giao diện nhanh, đẹp và linh hoạt   |
| Supabase             | Backend-as-a-Service: Auth, Database, Storage                            |
| PostgreSQL           | Cơ sở dữ liệu quan hệ mạnh mẽ, tin cậy và mở rộng tốt                    |
| pnpm / npm           | Quản lý package và phụ thuộc của dự án hiệu quả                          |
| Vercel               | Nền tảng triển khai và hosting ứng dụng web serverless hiệu suất cao     |
| ESLint, Prettier     | Kiểm tra và định dạng code tự động, đảm bảo chất lượng mã nguồn          |

## 🧩 Project Structure

```plaintext
Coder_BookStore-Web/
├── public/                 # Các tài nguyên tĩnh (ảnh, font...)
├── src/
│   ├── app/                # Cấu trúc App Router của Next.js
│   │   ├── api/            # API routes (vd: /api/auth, /api/books)
│   │   ├── (auth)/         # Routes liên quan đến xác thực (login, register)
│   │   ├── (main)/         # Routes chính của ứng dụng (homepage, product list)
│   │   ├── admin/          # Routes cho trang quản trị
│   │   ├── components/     # Các component UI tái sử dụng
│   │   ├── lib/            # Các hàm tiện ích, cấu hình
│   │   ├── styles/         # Global CSS và các định nghĩa Tailwind
│   │   └── layout.tsx      # Layout chung của ứng dụng
│   ├── services/           # Logic giao tiếp với API/Supabase (vd: bookService.ts)
│   ├── types/              # Định nghĩa TypeScript cho dữ liệu (interfaces, types)
│   └── utils/              # Các hàm tiện ích chung
├── .env.example            # File mẫu cấu hình biến môi trường
├── package.json            # Thông tin dự án và dependencies
├── pnpm-lock.yaml          # File lock của pnpm (hoặc package-lock.json nếu dùng npm)
├── postcss.config.js       # Cấu hình PostCSS
├── tailwind.config.ts      # Cấu hình Tailwind CSS
├── tsconfig.json           # Cấu hình TypeScript
└── README.md               # File README của dự án (bạn đang đọc)
```

## 👥 Team Members

| Họ tên           | MSSV      | Vai trò                |
| ---------------- | --------- | ---------------------- |
| Nguyễn Bình An   | QE190061  | Frontend Developer     |
| Phạm Nhật Bảo    | QE180165  | Backend Developer      |
| Đinh Ngọc Thiện  | QE180128  | Database & API         |
| Huỳnh Hoàng Đô   | QE170246  | Kiểm thử & Document    |

## 🧪 Local Development

```bash
# 1. Clone repository
git clone https://github.com/Dio10072003/swp-book-project.git
cd swp-book-project/Coder_BookStore-Web

# 2. Cài đặt dependencies
npm install
# Hoặc nếu bạn dùng pnpm:
# pnpm install

# 3. Thiết lập biến môi trường
cp src/app/api/env.example .env
# Sau đó, mở file .env và cập nhật các thông tin cần thiết từ dự án Supabase của bạn (API URL, Anon Key, JWT Secret, v.v.).

# 4. Chạy ứng dụng ở chế độ phát triển
npm run dev
# Hoặc nếu bạn dùng pnpm:
# pnpm dev
```

Ứng dụng sẽ chạy trên http://localhost:3000 (hoặc một cổng khác nếu 3000 đã được sử dụng).

## 🌐 Deployment

Dự án được triển khai tại:  
https://swp-coder-bookstore.onrender.com

## 🖼️ Demo Screenshots

Bạn có thể thêm các ảnh chụp màn hình vào thư mục `public/images/` và cập nhật đường dẫn tại đây để hiển thị giao diện chính của ứng dụng.

Ví dụ:  
`public/images/homepage.png`  
`public/images/product_detail.png`  
`public/images/admin_dashboard.png`

## 🤝 Contributing

Pull requests được hoan nghênh. Đối với các thay đổi lớn, vui lòng mở issue trước để thảo luận về những gì bạn muốn thay đổi.

Hãy đảm bảo cập nhật test khi cần thiết.

## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)
