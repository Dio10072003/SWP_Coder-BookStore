import React from 'react';
import { FaLightbulb, FaBook, FaChartLine, FaGift } from 'react-icons/fa';

const reasons = [
  { icon: <FaLightbulb className="text-yellow-400 text-xl mr-2" />, text: 'Môi trường sáng tạo, năng động và thân thiện.' },
  { icon: <FaBook className="text-blue-500 text-xl mr-2" />, text: 'Tiếp cận nguồn tài liệu phong phú, cập nhật về công nghệ.' },
  { icon: <FaChartLine className="text-green-500 text-xl mr-2" />, text: 'Cơ hội phát triển bản thân, thăng tiến nghề nghiệp rõ ràng.' },
  { icon: <FaGift className="text-pink-500 text-xl mr-2" />, text: 'Chế độ đãi ngộ hấp dẫn, phúc lợi cạnh tranh.' },
];

const WhyJoinUs = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-blue-700 mb-3 flex items-center gap-2"><FaLightbulb className="text-yellow-400" />Tại sao nên gia nhập?</h2>
      <p className="mb-4 text-gray-700">Chúng tôi không chỉ bán sách, chúng tôi kiến tạo tri thức. Tại Coder-BookStore, bạn sẽ được:</p>
      <ul className="space-y-3">
        {reasons.map((r, idx) => (
          <li key={idx} className="flex items-center bg-blue-50 rounded-lg px-3 py-2 shadow-sm">
            {r.icon}
            <span className="text-gray-800">{r.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default WhyJoinUs;