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
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#a78bfa" />
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&family=Open+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col w-full bg-white text-gray-900 dark:text-gray-100 font-sans selection:bg-pink-500 selection:text-white">
        <Header />
        <main className="flex-grow w-full px-2 sm:px-4 md:px-8 lg:max-w-7xl lg:mx-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
