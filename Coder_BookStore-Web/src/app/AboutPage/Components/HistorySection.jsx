// AboutPage/Components/HistorySection.jsx
"use client";
import { useState } from "react";

const content = {
  en: {
    title: "Our History",
    story: "Founded in 2025, we started as a small team with a big dream. Over the years, we have grown into a global organization, achieving milestones and impacting lives worldwide.",
  },
  vi: {
    title: "Lịch Sử Hình Thành",
    story: "Thành lập năm 2025, chúng tôi khởi đầu là một nhóm nhỏ với khát vọng lớn. Trải qua nhiều năm, Coder-Bookstore đã vươn mình trở thành một tổ chức toàn cầu, ghi dấu ấn với nhiều cột mốc và lan tỏa giá trị đến cộng đồng lập trình viên khắp nơi.",
  },
  ja: {
    title: "私たちの歴史",
    story: "2025年に設立された私たちは、小さなチームから始まりました。年月を重ね、グローバルな組織へと成長し、多くのマイルストーンを達成し、世界中の人々に影響を与えています。",
  },
};

export default function HistorySection() {
  const [lang, setLang] = useState("vi");
  return (
    <section className="py-12 px-4 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-end gap-2 mb-2">
          <button onClick={() => setLang("vi")} className={`px-2 py-1 rounded-full text-xs font-bold transition-all ${lang === "vi" ? "bg-yellow-300 text-blue-900 shadow" : "bg-white/20 hover:bg-yellow-200/60"}`}>VI</button>
          <button onClick={() => setLang("en")} className={`px-2 py-1 rounded-full text-xs font-bold transition-all ${lang === "en" ? "bg-yellow-300 text-blue-900 shadow" : "bg-white/20 hover:bg-yellow-200/60"}`}>EN</button>
          <button onClick={() => setLang("ja")} className={`px-2 py-1 rounded-full text-xs font-bold transition-all ${lang === "ja" ? "bg-yellow-300 text-blue-900 shadow" : "bg-white/20 hover:bg-yellow-200/60"}`}>日本語</button>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-blue-700 dark:text-yellow-300 mb-3 animate-fade-in">{content[lang].title}</h2>
        <p className="text-base md:text-lg text-gray-700 dark:text-gray-200 leading-relaxed animate-fade-in-slow">{content[lang].story}</p>
      </div>
    </section>
  );
}