📚 Coder Book Store Project
> 🏫 Dự án thực hiện trong khuôn khổ môn học Software Development Project (SWP391)
🔖 Giới thiệu
Coder Book Store là ứng dụng web quản lý và bán sách trực tuyến, phát triển với kiến trúc hiện đại sử dụng Next.js và TypeScript. Dự án hướng tới việc xây dựng một hệ thống thực tế, đáp ứng đầy đủ các nghiệp vụ của một cửa hàng sách online.
🎯 Mục tiêu dự án
Áp dụng kiến thức phát triển phần mềm hiện đại
Thực hành teamwork, quản lý dự án, quy trình chuyên nghiệp
Xây dựng sản phẩm thực tế phục vụ học tập và nghiên cứu
🌟 Tính năng nổi bật
🔐 Đăng nhập / Đăng ký người dùng
📚 Danh sách sách theo danh mục, thể loại, tác giả
🛒 Quản lý giỏ hàng, đặt hàng, theo dõi đơn hàng
🧑‍💼 Trang quản trị (Admin panel): quản lý người dùng, sách, danh mục, đơn hàng
🔎 Tìm kiếm sách, lọc nâng cao
💬 Đánh giá, phản hồi, hỗ trợ khách hàng
📱 Giao diện responsive, tối ưu cho cả Desktop và Mobile

---
🚀 Công nghệ sử dụng

<img width="437" height="651" alt="{6991BEB0-CE9A-4E89-B99B-EB7045BB3D76}" src="https://github.com/user-attachments/assets/a60b6cf0-6cae-48b2-939c-8279581b0b41" />



---

🧩 Cấu trúc dự án
src/
├── app/                        # Thư mục chính chứa các trang (pages) và module nghiệp vụ
│   ├── Login/                  # Trang đăng nhập, các component liên quan đến đăng nhập
│   │   └── Components/         # Các thành phần nhỏ cho trang đăng nhập (form, button, input)
│   ├── Register/               # Trang đăng ký, các component liên quan đến đăng ký
│   │   └── Components/         # Các thành phần nhỏ cho trang đăng ký
│   ├── Books/                  # Trang danh sách sách, chi tiết sách
│   │   ├── [id]/               # Trang chi tiết từng cuốn sách (theo id)
│   │   └── Components/         # Các component: AddBookModal, BookGrid, SearchBar, Pagination,...
│   ├── Authors/                # Trang danh sách tác giả, chi tiết tác giả
│   │   ├── [id]/               # Trang chi tiết từng tác giả (theo id)
│   │   └── Components/         # Các component: AddAuthorModal, AuthorList, AuthorDetail,...
│   ├── Categories/             # Trang danh mục sách
│   │   ├── [Category]/         # Trang chi tiết từng danh mục
│   │   └── Components/         # Các component: CategoryCard, CategoryList,...
│   ├── CartPage/               # Trang giỏ hàng, quản lý sản phẩm trong giỏ
│   │   └── Components/         # Các component: CartItem, CartList, CartSummary,...
│   ├── OrderTracking/          # Trang theo dõi đơn hàng
│   │   └── Components/         # Các component: OrderOverview, OrderTimeline, OrderSupport,...
│   ├── admin/                  # Trang quản trị (Admin panel)
│   │   ├── StaffManagement/    # Quản lý nhân viên
│   │   │   └── Components/     # Các modal, bảng quản lý nhân viên
│   │   └── page.tsx            # Trang chính admin
│   ├── Profile/                # Trang hồ sơ cá nhân người dùng
│   ├── Feedback/               # Trang gửi phản hồi, đánh giá
│   │   └── Components/         # Các component: FeedbackForm, FeedbackList, StarRating,...
│   ├── Promotions/             # Trang khuyến mãi, sự kiện
│   │   └── Components/         # Các component: PromotionList, PromotionDetail,...
│   ├── Faq/                    # Trang câu hỏi thường gặp (FAQ)
│   │   └── Components/         # Các component: FaqCard,...
│   ├── Support-Center/         # Trung tâm hỗ trợ khách hàng
│   │   ├── Components/         # Các component: SupportCard, SupportForm, SupportHistory,...
│   │   └── ticket/             # Trang chi tiết từng ticket hỗ trợ
│   ├── HomePage/               # Trang chủ, các section nổi bật
│   │   └── Components/         # HeroSection, BestPicksSection, BlogSection,...
│   ├── components/             # Các component dùng chung toàn app (Error, Loading, Header, Footer, LogoutButton,...)
│   ├── services/               # Các service gọi API hoặc xử lý logic phía client (authorService, bookService, userService,...)
│   ├── utils/                  # Hàm tiện ích dùng chung (cartUtils.js, passwordUtils.js,...)
│   ├── hooks/                  # Custom React hooks (useBooks.ts,...)
│   ├── assets/                 # Hình ảnh, tài nguyên tĩnh dùng trong app
│   ├── globals.css             # File CSS toàn cục
│   └── layout.tsx              # Layout tổng thể cho app
│
├── public/                     # Ảnh, font, logo, icon, tài nguyên tĩnh phục vụ frontend
│   ├── images/                 # Hình ảnh minh họa, logo
│   ├── fonts/                  # Font chữ custom
│   └── ...                     # Các file SVG, favicon, ...
│
├── styles/                     # File cấu hình Tailwind, PostCSS, các file CSS bổ sung
│   └── ...
│
├── types/                      # Định nghĩa TypeScript types, interface cho toàn dự án
│   └── database.ts
│
├── api/                        # API routes (nếu tách riêng ngoài app/api)
│   └── ...
│
├── package.json                # Thông tin package, scripts, dependencies
├── pnpm-lock.yaml              # Lockfile cho pnpm
├── README.md                   # Tài liệu hướng dẫn dự án
└── ...                         # Các file cấu hình khác (tsconfig, eslint, v.v.)

## 👥 Thành viên nhóm

<img width="439" height="371" alt="{0480588A-51E0-42E6-94B3-DC0373C49056}" src="https://github.com/user-attachments/assets/018858ea-6628-4632-9bd4-e01738718912" />


---

## 🧪 Cách chạy dự án local

```bash
# 1. Clone repo
git clone https://github.com/Dio10072003/swp-book-project.git
cd swp-book-project/Coder_BookStore-Web

# 2. Cài dependencies
npm install
# hoặc nếu dùng pnpm
# pnpm install

# 3. Thiết lập environment variables
# Tạo file .env dựa trên mẫu
cp src/app/api/env.example .env
# => Sau đó chỉnh sửa thông tin Supabase, secret, v.v.

# 4. Chạy ứng dụng ở chế độ phát triển
npm run dev
# hoặc
# pnpm dev
🌐 Triển khai
👉 Dự án được triển khai tại Render:
🔗 https://swp-coder-bookstore.onrender.com

🖼️ Giao diện demo
Bạn có thể thêm ảnh vào thư mục public/ và cập nhật đường dẫn bên dưới nếu cần.


📄 License
MIT © Nhóm SWP - FPT University
```

# 📚 Book Store Web Application

A web-based application that allows customers to browse, search, and purchase books online. Admins can manage inventory, categories, and customer orders with ease.

---
