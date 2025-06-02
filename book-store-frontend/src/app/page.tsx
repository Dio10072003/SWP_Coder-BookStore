"use client";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white p-6 sm:p-12 font-sans">
      {/* Header */}
      <header className="flex flex-col items-center gap-4">
        <Image
          src="/next.svg"
          alt="Next.js Logo"
          width={160}
          height={40}
          className="dark:invert"
        />
        <p className="text-lg text-center max-w-xl">
          Welcome to your <span className="font-bold">Next.js Bookstore App</span> 🎉
        </p>
      </header>

      {/* Main Navigation Buttons */}
      <main className="flex flex-col items-center gap-6 text-center mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/HomePage">
            <div className="px-6 py-3 rounded bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer">
              🏠 Home Page
            </div>
          </Link>
          <Link href="/AboutPage">
            <div className="px-6 py-3 rounded bg-green-600 text-white hover:bg-green-700 transition cursor-pointer">
              📖 About Page
            </div>
          </Link>
          <Link href="/Contact">
            <div className="px-6 py-3 rounded bg-orange-500 text-white hover:bg-orange-600 transition cursor-pointer">
              ✉️ Contact
            </div>
          </Link>
          <Link href="/Book">
            <div className="px-6 py-3 rounded bg-purple-600 text-white hover:bg-purple-700 transition cursor-pointer">
              📚 Book List
            </div>
          </Link>
          <Link href="/Login">
            <div className="px-6 py-3 rounded bg-gray-700 text-white hover:bg-gray-800 transition cursor-pointer">
              🔐 Login
            </div>
          </Link>
          <Link href="/Register">
            <div className="px-6 py-3 rounded bg-pink-600 text-white hover:bg-pink-700 transition cursor-pointer">
              📝 Register
            </div>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex flex-wrap justify-center items-center gap-6 text-sm mt-16 border-t pt-6 w-full border-gray-200 dark:border-gray-700">
        <a
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          🌐 Visit Next.js Official
        </a>
        <a
          href="https://vercel.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          🚀 Deploy on Vercel
        </a>
      </footer>
    </div>
  );
}
