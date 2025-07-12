// AboutPage/Components/ContactSection.jsx
"use client";
import { useState } from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa";

const content = {
  en: {
    title: "Get in Touch",
    desc: "Have questions? Reach out to us!",
    email: "info@example.com",
    phone: "+1 (234) 567-890",
  },
  vi: {
    title: "Liên Hệ",
    desc: "Bạn có thắc mắc? Hãy kết nối với chúng tôi!",
    email: "info@example.com",
    phone: "+84 123 456 789",
  },
  ja: {
    title: "お問い合わせ",
    desc: "ご質問があれば、お気軽にご連絡ください！",
    email: "info@example.com",
    phone: "+81 123 456 789",
  },
};

export default function ContactSection() {
  const [lang, setLang] = useState("vi");
  return (
    <section className="py-12 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-end gap-2 mb-2">
          <button onClick={() => setLang("vi")} className={`px-2 py-1 rounded-full text-xs font-bold transition-all font-heading ${lang === "vi" ? "bg-yellow-300 text-blue-900 shadow" : "bg-white/20 hover:bg-yellow-200/60"}`}>VI</button>
          <button onClick={() => setLang("en")} className={`px-2 py-1 rounded-full text-xs font-bold transition-all font-heading ${lang === "en" ? "bg-yellow-300 text-blue-900 shadow" : "bg-white/20 hover:bg-yellow-200/60"}`}>EN</button>
          <button onClick={() => setLang("ja")} className={`px-2 py-1 rounded-full text-xs font-bold transition-all font-heading ${lang === "ja" ? "bg-yellow-300 text-blue-900 shadow" : "bg-white/20 hover:bg-yellow-200/60"}`}>日本語</button>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-blue-700 dark:text-yellow-300 mb-3 animate-fade-in font-heading">{content[lang].title}</h2>
        <p className="text-base md:text-lg text-gray-700 dark:text-gray-200 mb-4 animate-fade-in-slow font-body">{content[lang].desc}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
          <a href={`mailto:${content[lang].email}`} className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-pink-400 to-yellow-300 text-blue-900 font-bold rounded-full shadow hover:scale-105 hover:shadow-lg transition-all font-heading">
            <FaEnvelope /> {content[lang].email}
          </a>
          <a href={`tel:${content[lang].phone.replace(/[^\d+]/g,"")}`} className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-400 to-purple-300 text-white font-bold rounded-full shadow hover:scale-105 hover:shadow-lg transition-all font-heading">
            <FaPhone /> {content[lang].phone}
          </a>
        </div>
      </div>
    </section>
  );
}