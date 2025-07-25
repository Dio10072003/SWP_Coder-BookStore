# 📚 Coder Book Store Project

> 🏫 Dự án thực hiện trong khuôn khổ môn học Software Development Project (SWP391)

## 🔖 Giới thiệu

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
