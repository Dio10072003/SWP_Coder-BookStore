"use client";
import Image from "next/image";

export default function Member2() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] dark:from-[#1e1e1e] dark:to-[#111] text-gray-800 dark:text-white px-6 sm:px-12 py-12 font-sans flex flex-col items-center justify-center">
      {/* Avatar + Info */}
      <div className="flex flex-col sm:flex-row items-center gap-8 w-full max-w-4xl">
        <Image
          src="/avatar.png"
          alt="Ảnh đại diện Đinh Ngọc Thiện"
          width={150}
          height={150}
          className="rounded-full shadow-lg ring-4 ring-blue-200 dark:ring-blue-500"
          priority
        />
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold mb-2">Đinh Ngọc Thiện</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            👨‍💻 Backend Developer đam mê thiết kế hiện đại, tối giản và hiệu quả.
          </p>
        </div>
      </div>

      {/* About */}
      <section className="mt-12 max-w-3xl w-full text-center sm:text-left">
        <h2 className="text-2xl font-semibold mb-3">📝 Giới thiệu</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Mình là Thiện, sống tại Quy Nhơn. Mình yêu thích sử dụng Tailwind CSS cùng hệ sinh thái Next.js để tạo ra các giao diện mượt mà, dễ dùng. 
          Ngoài ra, mình cũng có kinh nghiệm với backend (Node.js, Express, MongoDB) để xây dựng API cho các ứng dụng web fullstack. 
          Khi rảnh, mình đọc sách, uống cà phê và chơi thể thao để thư giãn.
        </p>
      </section>

      {/* Skills */}
      <section className="mt-10 max-w-3xl w-full">
        <h2 className="text-2xl font-semibold mb-3 text-center sm:text-left">🛠️ Kỹ năng</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-gray-800 dark:text-gray-200">
          {[
            "React", "Next.js", "Tailwind CSS", "TypeScript",
            "Node.js", "Express", "MongoDB", "Git/GitHub", "Figma"
          ].map(skill => <Skill key={skill} name={skill} />)}
        </ul>
      </section>

      {/* Contact */}
      <section className="mt-10 max-w-3xl w-full text-center sm:text-left">
        <h2 className="text-2xl font-semibold mb-3">📬 Liên hệ</h2>
        <p>
          Email:{" "}
          <a
            className="text-blue-600 dark:text-blue-400 underline"
            href="mailto:dinhngocthien2004@gmail.com"
          >
            dinhngocthien2004@gmail.com
          </a>
        </p>
        <p>
          GitHub:{" "}
          <a
            className="text-blue-600 dark:text-blue-400 underline"
            href="https://github.com/dinhngocthien"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/dinhngocthien
          </a>
        </p>
        <p>
          LinkedIn:{" "}
          <a
            className="text-blue-600 dark:text-blue-400 underline"
            href="https://linkedin.com/in/dinhngocthien"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin.com/in/dinhngocthien
          </a>
        </p>
      </section>

      {/* Footer */}
      <footer className="mt-16 text-sm text-gray-500 dark:text-gray-400 text-center">
        © 2025 Đinh Ngọc Thiện. All rights reserved.
      </footer>
    </div>
  );
}

function Skill({ name }: { name: string }) {
  return (
    <li className="bg-white dark:bg-gray-800 rounded-xl shadow p-3 text-center hover:scale-105 transition-transform font-medium cursor-default">
      {name}
    </li>
  );
}
