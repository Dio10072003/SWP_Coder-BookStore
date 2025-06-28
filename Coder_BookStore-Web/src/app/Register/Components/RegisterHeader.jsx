"use client";
import React, { useState, useEffect } from "react";

export default function RegisterHeader() {
  const [greet, setGreet] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreet("Chào buổi sáng ☀️");
      setMessage("Bắt đầu ngày mới cùng tri thức lập trình, kết nối cộng đồng và nhận ưu đãi hấp dẫn!");
    } else if (hour < 18) {
      setGreet("Chào buổi chiều 🌤️");
      setMessage("Tiếp thêm năng lượng, mở rộng kiến thức và khám phá thế giới coder cùng chúng tôi!");
    } else {
      setGreet("Chào buổi tối 🌙");
      setMessage("Thời điểm tuyệt vời để học hỏi, phát triển bản thân và gia nhập cộng đồng lập trình viên!");
    }
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold text-center text-yellow-400 mb-2">
        {greet} <span className="text-pink-400">Coder-BookStore</span>
      </h1>
      <p className="text-center text-gray-300 mb-4 text-sm">
        {message}
      </p>
    </>
  );
}
