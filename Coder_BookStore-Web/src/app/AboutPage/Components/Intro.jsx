// AboutPage/Components/Intro.jsx
"use client";
import { useState } from "react";
import Image from 'next/image';
import coderTour from '@/assets/Coder-Tour.jpg';

const content = {
  en: {
    title: "About Us",
    story: "Welcome to our story! We are a passionate team dedicated to making a difference in the world of coding books. Our journey began with a simple dream: to inspire, connect, and empower coders everywhere.",
  },
  vi: {
    title: "Về Chúng Tôi",
    story: "Chào mừng bạn đến với câu chuyện của chúng tôi! Chúng tôi là một tập thể đam mê, khát khao lan tỏa tri thức và kết nối cộng đồng lập trình viên Việt Nam. Hành trình này bắt đầu từ một ước mơ giản dị: truyền cảm hứng, gắn kết và nâng tầm mọi coder.",
  },
  ja: {
    title: "私たちについて",
    story: "私たちの物語へようこそ！私たちは情熱的なチームであり、コーディングブックの世界に変化をもたらすことを目指しています。この旅は、すべてのコーダーにインスピレーションとつながり、力を与えるというシンプルな夢から始まりました。",
  },
};

export default function Intro() {
  const [lang, setLang] = useState("vi");
  return (
    <section className="bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 text-white py-14 px-4 text-center rounded-b-3xl shadow-xl relative">
      <div className="flex justify-center mb-4 z-20">
        <Image
          src={coderTour}
          alt="CoderTour Logo"
          width={64}
          height={64}
          className="rounded-full shadow-lg animate-float bg-white/80 p-1"
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <button onClick={() => setLang("vi")}
          className={`px-3 py-1 rounded-full text-sm font-bold transition-all font-heading ${lang === "vi" ? "bg-yellow-300 text-blue-900 shadow" : "bg-white/20 hover:bg-yellow-200/60"}`}>VI</button>
        <button onClick={() => setLang("en")}
          className={`px-3 py-1 rounded-full text-sm font-bold transition-all font-heading ${lang === "en" ? "bg-yellow-300 text-blue-900 shadow" : "bg-white/20 hover:bg-yellow-200/60"}`}>EN</button>
        <button onClick={() => setLang("ja")}
          className={`px-3 py-1 rounded-full text-sm font-bold transition-all font-heading ${lang === "ja" ? "bg-yellow-300 text-blue-900 shadow" : "bg-white/20 hover:bg-yellow-200/60"}`}>日本語</button>
      </div>
      <h1 className="text-3xl md:text-4xl font-extrabold mb-4 drop-shadow-lg tracking-wide animate-fade-in font-heading">
        {content[lang].title}
      </h1>
      <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed animate-fade-in-slow font-body">
        {content[lang].story}
      </p>
    </section>
  );
}