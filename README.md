# 📚 SWP Book Store Project

> Đây là Project SWP của nhóm.

## 🔖 Giới thiệu

**SWP Book Store** là một ứng dụng web quản lý cửa hàng sách, được phát triển trong khuôn khổ môn học **Software Project (SWP)**. Dự án áp dụng kiến trúc hiện đại với **Next.js**, **TypeScript**, và tích hợp đầy đủ các tính năng như:

- Đăng nhập / Đăng ký người dùng
- Danh sách sách theo danh mục
- Quản lý người dùng (Admin panel)
- Tìm kiếm sách, lọc theo thể loại
- Responsive UI phù hợp cả Desktop và Mobile

---

## 🚀 Công nghệ sử dụng

| Công nghệ                   | Mô tả                                              |
| --------------------------- | -------------------------------------------------- |
| **Next.js (App Router)**    | Framework React mạnh mẽ, hỗ trợ SSR và SEO tốt     |
| **TypeScript**              | Ngôn ngữ lập trình tĩnh, giúp giảm lỗi runtime     |
| **Tailwind CSS**            | Thư viện CSS tiện dụng, viết giao diện nhanh chóng |
| **Prisma ORM**              | Giao tiếp database hiệu quả, dễ mở rộng            |
| **PostgreSQL / SQL Server** | Cơ sở dữ liệu quan hệ (tuỳ môi trường sử dụng)     |
| **Vercel**                  | Triển khai và hosting ứng dụng web serverless      |

---

## 🧩 Cấu trúc dự án

src/
├── app/ # App Router Pages (Next.js)
│ ├── login/ # Trang đăng nhập
│ ├── register/ # Trang đăng ký
│ ├── listbook/ # Trang danh sách sách
│ └── admin/ # Trang quản trị
├── components/ # Các component dùng chung (navbar, button...)
├── lib/ # Hàm tiện ích, config, Prisma client
├── styles/ # Tệp CSS/Tailwind config
├── types/ # TypeScript types
└── api/ # API Routes (auth, book, user)

yaml
Copy
Edit

---

## 👥 Thành viên nhóm

| Họ tên       | MSSV     | Vai trò             |
| ------------ | -------- | ------------------- |
| Nguyễn Văn A | SE150001 | Frontend            |
| Trần Thị B   | SE150002 | Backend             |
| Lê Văn C     | SE150003 | Database & API      |
| Phạm Thị D   | SE150004 | Kiểm thử & Document |

> 🛠️ _Chi tiết hơn xem trong thư mục `docs/` nếu có._

---

## 🧪 Cách chạy dự án local

```bash
# 1. Clone repo
git clone https://github.com/Dio10072003/swp-book-project.git
cd swp-book-project

# 2. Cài dependencies
npm install

# 3. Thiết lập environment variables
cp .env.example .env
# => Sau đó chỉnh sửa thông tin database, secret, v.v.

# 4. Khởi tạo database (nếu dùng Prisma)
npx prisma generate
npx prisma migrate dev

# 5. Chạy ứng dụng
npm run dev
🌐 Triển khai
👉 Dự án được triển khai tại Vercel:
🔗 https://swp-book-project.vercel.app

🖼️ Giao diện demo
Bạn có thể thêm ảnh vào thư mục public/ và cập nhật đường dẫn bên dưới nếu cần.


📄 License
MIT © Nhóm SWP - FPT University
```

# 📚 Book Store Web Application

A web-based application that allows customers to browse, search, and purchase books online. Admins can manage inventory, categories, and customer orders with ease.

---

## 📌 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Limitations](#limitations)
- [Future Improvements](#future-improvements)
- [Contributors](#contributors)
- [License](#license)

---

## 📖 Overview

**Book Store Web Application** is a simple yet powerful platform designed for online book retail. It provides a user-friendly interface for customers to explore books by genres, view details, add to cart, and place orders. Admins can manage books, categories, and order processing through a secure dashboard.

---

## ✨ Features

- 👤 Customer registration and login
- 🔍 Search and filter books by name, category, or price
- 🛒 Shopping cart and order placement
- 🧾 Order history and order details
- 📚 Admin management of books, categories, and inventory
- 📦 Track orders and update shipping status
- 📈 Dashboard for revenue and order tracking

---
