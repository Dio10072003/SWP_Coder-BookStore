import React from 'react';
import { FaFileAlt, FaSearch, FaComments, FaCheckCircle } from 'react-icons/fa';

const steps = [
  { icon: <FaFileAlt className="text-blue-500 text-2xl mr-2" />, label: 'Nộp hồ sơ trực tuyến', desc: 'Gửi CV và thư xin việc qua email tuyển dụng.' },
  { icon: <FaSearch className="text-purple-500 text-2xl mr-2" />, label: 'Sàng lọc hồ sơ', desc: 'Đội ngũ nhân sự sẽ xem xét hồ sơ của bạn.' },
  { icon: <FaComments className="text-pink-500 text-2xl mr-2" />, label: 'Phỏng vấn', desc: 'Ứng viên tiềm năng sẽ được mời phỏng vấn.' },
  { icon: <FaCheckCircle className="text-green-500 text-2xl mr-2" />, label: 'Nhận offer', desc: 'Ứng viên phù hợp sẽ nhận được đề nghị làm việc.' },
];

const ApplicationProcess = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-purple-700 mb-3 flex items-center gap-2"><FaFileAlt className="text-blue-500" />Quy trình Ứng tuyển</h2>
      <ol className="space-y-4">
        {steps.map((step, idx) => (
          <li key={idx} className="flex items-start gap-3 bg-purple-50 rounded-lg px-3 py-2 shadow-sm">
            {step.icon}
            <div>
              <div className="font-semibold text-gray-800">{step.label}</div>
              <div className="text-gray-600 text-sm">{step.desc}</div>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-gray-500 text-sm">Chúng tôi sẽ liên hệ với bạn trong vòng 7-10 ngày làm việc sau khi nhận được hồ sơ.</p>
    </section>
  );
};

export default ApplicationProcess;