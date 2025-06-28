// AboutPage/Components/TeamSection.jsx
"use client";
import { useState } from "react";

const content = {
  en: {
    title: "Our Team",
    members: [
      { name: "Binh An", role: "CEO - Frontend" },
      { name: "Nhat Bao", role: "Backend" },
      { name: "Ngoc Thien", role: "Backend" },
      { name: "Hoang Do", role: "Frontend" },
    ],
  },
  vi: {
    title: "Đội Ngũ",
    members: [
      { name: "Bình An", role: "CEO - Frontend" },
      { name: "Nhật Bảo", role: "Backend" },
      { name: "Ngọc Thiện", role: "Backend" },
      { name: "Hoàng Đô", role: "Frontend" },
    ],
  },
  ja: {
    title: "チーム紹介",
    members: [
      { name: "ビン・アン", role: "CEO・フロントエンド" },
      { name: "ニャット・バオ", role: "バックエンド" },
      { name: "ゴック・ティエン", role: "バックエンド" },
      { name: "ホアン・ドー", role: "フロントエンド" },
    ],
  },
};

export default function TeamSection() {
  const [lang, setLang] = useState("vi");
  return (
    <section className="py-12 px-4 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-end gap-2 mb-2">
          <button onClick={() => setLang("vi")} className={`px-2 py-1 rounded-full text-xs font-bold transition-all ${lang === "vi" ? "bg-yellow-300 text-blue-900 shadow" : "bg-white/20 hover:bg-yellow-200/60"}`}>VI</button>
          <button onClick={() => setLang("en")} className={`px-2 py-1 rounded-full text-xs font-bold transition-all ${lang === "en" ? "bg-yellow-300 text-blue-900 shadow" : "bg-white/20 hover:bg-yellow-200/60"}`}>EN</button>
          <button onClick={() => setLang("ja")} className={`px-2 py-1 rounded-full text-xs font-bold transition-all ${lang === "ja" ? "bg-yellow-300 text-blue-900 shadow" : "bg-white/20 hover:bg-yellow-200/60"}`}>日本語</button>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-purple-700 dark:text-yellow-300 mb-6 animate-fade-in">{content[lang].title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {content[lang].members.map((member, index) => (
            <div key={index} className="text-center animate-fade-in-slow">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-200 via-yellow-200 to-purple-200 dark:from-pink-900 dark:via-yellow-900 dark:to-purple-900 rounded-full mx-auto mb-3 shadow-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-700 dark:text-white">{member.name[0]}</span>
              </div>
              <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-1">{member.name}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}