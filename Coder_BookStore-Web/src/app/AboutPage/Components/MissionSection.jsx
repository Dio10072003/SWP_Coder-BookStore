// AboutPage/Components/MissionSection.jsx
"use client";
import { useState } from "react";

const content = {
  en: {
    title: "Our Mission",
    story: "Our mission is to innovate, inspire, and create a better future for everyone. We strive to empower communities through technology and collaboration.",
  },
  vi: {
    title: "Sứ Mệnh",
    story: "Sứ mệnh của chúng tôi là đổi mới, truyền cảm hứng và kiến tạo tương lai tốt đẹp hơn cho mọi người. Coder-Bookstore luôn nỗ lực trao quyền cho cộng đồng thông qua công nghệ và sự kết nối.",
  },
  ja: {
    title: "私たちの使命",
    story: "私たちの使命は、革新し、インスピレーションを与え、すべての人により良い未来を創造することです。テクノロジーと協力を通じてコミュニティに力を与えることを目指しています。",
  },
};

export default function MissionSection() {
  const [lang, setLang] = useState("vi");
  return (
    <section className="py-12 px-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-end gap-2 mb-2">
          <button onClick={() => setLang("vi")} className={`px-2 py-1 rounded-full text-xs font-bold transition-all font-heading ${lang === "vi" ? "bg-yellow-300 text-blue-900 shadow" : "bg-white/20 hover:bg-yellow-200/60"}`}>VI</button>
          <button onClick={() => setLang("en")} className={`px-2 py-1 rounded-full text-xs font-bold transition-all font-heading ${lang === "en" ? "bg-yellow-300 text-blue-900 shadow" : "bg-white/20 hover:bg-yellow-200/60"}`}>EN</button>
          <button onClick={() => setLang("ja")} className={`px-2 py-1 rounded-full text-xs font-bold transition-all font-heading ${lang === "ja" ? "bg-yellow-300 text-blue-900 shadow" : "bg-white/20 hover:bg-yellow-200/60"}`}>日本語</button>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-pink-700 dark:text-pink-300 mb-3 animate-fade-in font-heading">{content[lang].title}</h2>
        <p className="text-base md:text-lg text-gray-700 dark:text-gray-200 leading-relaxed animate-fade-in-slow font-body">{content[lang].story}</p>
      </div>
    </section>
  );
}