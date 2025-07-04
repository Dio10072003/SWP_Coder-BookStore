// app/layout.tsx
import './globals.css';
import React from 'react';
import Header from './Header';
import Footer from './Footer';

export const metadata = {
  title: 'Coder-Bookstore 🌈',
  description: 'Thế giới sách đa dạng cho bạn đọc muôn phương',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth bg-gradient-to-br from-purple-300 via-pink-300 to-yellow-300 dark:from-purple-900 dark:via-pink-900 dark:to-yellow-900">
      <body className="min-h-screen flex flex-col text-gray-900 dark:text-gray-100 font-sans selection:bg-pink-500 selection:text-white">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
