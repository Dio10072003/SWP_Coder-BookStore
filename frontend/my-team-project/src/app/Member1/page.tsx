"use client";

import Image from "next/image";
import { FaReact, FaGithub, FaLinkedin, FaFigma, FaCoffee, FaLightbulb } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiTypescript } from "react-icons/si";
import { useEffect, useCallback } from "react";

export default function Member1() {
  const createPetal = useCallback(() => {
    const petal = document.createElement("div");
    petal.className = "petal";
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.animationDuration = `${5 + Math.random() * 5}s`;
    petal.style.opacity = `${0.5 + Math.random() * 0.5}`;
    document.body.appendChild(petal);
    return petal;
  }, []);

  useEffect(() => {
    const numberOfPetals = 15;
    const petals = Array.from({ length: numberOfPetals }).map(() => createPetal());

    return () => petals.forEach((p) => p.remove());
  }, [createPetal]);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-6 py-12 max-w-4xl mx-auto gap-12 text-slate-800 bg-gradient-to-br from-violet-50 via-pink-50 to-blue-50 overflow-hidden">
      {/* Avatar + Info Section */}
      <section className="flex flex-col sm:flex-row items-center gap-8 w-full bg-white/80 rounded-3xl p-8 shadow-2xl ring-2 ring-fuchsia-200 border border-fuchsia-100">
        <Image
          src="/avatar.png"
          alt="Avatar của Nguyễn Bình An"
          width={150}
          height={150}
          className="rounded-full ring-4 ring-fuchsia-300 shadow-lg"
          priority
        />
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold text-fuchsia-700 flex items-center gap-2 justify-center sm:justify-start">
            <span role="img" aria-label="Biểu tượng hoa anh đào">🌸</span> Nguyễn Bình An
          </h1>
          <p className="text-lg text-fuchsia-600 mt-2 flex items-center gap-2 justify-center sm:justify-start">
            👨‍💻 CEO Coder-Tour &nbsp;|&nbsp; Nghệ sĩ yêu sáng tạo
          </p>
          <p className="text-base text-slate-500 mt-1 flex items-center gap-2 justify-center sm:justify-start">
            <FaLightbulb className="text-yellow-400" aria-label="Biểu tượng bóng đèn" /> Code đẹp, sống vui!
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full bg-gradient-to-r from-blue-50 via-white to-pink-50 rounded-2xl p-8 shadow-md ring-1 ring-blue-100 border border-blue-50">
        <h2 className="text-2xl font-semibold mb-4 text-fuchsia-600 flex items-center gap-2">
          📝 Giới thiệu
        </h2>
        <p className="text-base text-blue-700 leading-relaxed flex items-center gap-2">
          <span role="img" aria-label="Biểu tượng nốt nhạc">🎵</span>
          Mình là coder chuyên nghiệp – ban ngày làm CEO Coder-Tour, ban đêm là nghệ sĩ đắm chìm trong nhạc và thiết kế.
          Yêu thích xây dựng giao diện đẹp, UX mượt, và cà phê <FaCoffee className="inline text-pink-400" aria-label="Biểu tượng cà phê" />.
        </p>
      </section>

      {/* Skills Section */}
      <section className="w-full bg-white/90 rounded-2xl p-8 shadow-lg ring-1 ring-fuchsia-100 border border-fuchsia-50">
        <h2 className="text-2xl font-semibold mb-6 text-blue-600 flex items-center gap-2 text-center sm:text-left">
          🛠️ Kỹ năng <span className="text-xl" role="img" aria-label="Biểu tượng lấp lánh">✨</span>
        </h2>
        <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Skill name="React" icon={<FaReact className="text-sky-500" />} />
          <Skill name="Next.js" icon={<SiNextdotjs className="text-black" />} />
          <Skill name="Tailwind CSS" icon={<SiTailwindcss className="text-cyan-400" />} />
          <Skill name="TypeScript" icon={<SiTypescript className="text-blue-600" />} />
          <Skill name="Git/GitHub" icon={<FaGithub className="text-gray-700" />} />
          <Skill name="Figma" icon={<FaFigma className="text-pink-500" />} />
          <Skill name="Coffee Brewing" icon={<FaCoffee className="text-amber-700" />} />
          <Skill name="Creative Thinking" icon={<FaLightbulb className="text-yellow-400" />} />
        </ul>
      </section>

      {/* Contact Section */}
      <section className="w-full bg-gradient-to-r from-pink-50 via-white to-blue-50 rounded-2xl p-8 shadow-md ring-1 ring-blue-100 border border-blue-50 text-center sm:text-left">
        <h2 className="text-2xl font-semibold mb-4 text-fuchsia-600 flex items-center gap-2">
          📬 Liên hệ
        </h2>
        <p className="mb-2 flex items-center gap-2 justify-center sm:justify-start">
          <span role="img" aria-label="Biểu tượng email">📧</span>
          <a href="mailto:TomOutfit2020@gmail.com" className="text-fuchsia-600 hover:underline font-medium">
            TomOutfit2020@gmail.com
          </a>
        </p>
        <p className="mb-2 flex items-center gap-2 justify-center sm:justify-start">
          <FaGithub className="text-gray-700" aria-label="Biểu tượng GitHub" />
          <a
            href="https://github.com/TomOutfit"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-fuchsia-600 font-medium"
          >
            github.com/TomOutfit
          </a>
        </p>
        <p className="flex items-center gap-2 justify-center sm:justify-start">
          <FaLinkedin className="text-sky-700" aria-label="Biểu tượng LinkedIn" />
          <a
            href="https://linkedin.com/in/yourlinkedin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-fuchsia-600 font-medium"
          >
            linkedin.com/in/yourlinkedin
          </a>
        </p>
      </section>
    </main>
  );
}

function Skill({ name, icon }: { name: string; icon: React.ReactNode }) {
  return (
    <li className="flex flex-col items-center justify-center gap-2 px-4 py-4 bg-gradient-to-br from-fuchsia-50 via-white to-blue-50 text-center text-sm font-medium text-fuchsia-700 rounded-xl shadow border border-fuchsia-100 hover:scale-105 transition-transform duration-200">
      <span className="text-2xl" aria-hidden="true">{icon}</span>
      <span>{name}</span>
    </li>
  );
}
