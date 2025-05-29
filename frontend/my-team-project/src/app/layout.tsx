import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'CodeCrafters: Dev Squadron',
  description: 'Dive into the matrix with our elite team of coders hacking the future of web development',
  icons: {
    icon: '/favicon.ico', // Add a terminal or code-themed favicon in src/app/public/favicon.ico
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f0f0f0' },
    { media: '(prefers-color-scheme: dark)', color: '#0d1117' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&family=Inter:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">
        <header className="bg-background border-b-2 border-accent/30 p-4 flex items-center justify-center space-x-2">
          <span className="text-accent font-mono text-lg">$</span>
          <Link href="/" className="text-accent font-mono text-xl hover:text-secondary">
            codecrafters@team:~/home$
          </Link>
        </header>
        <main className="container mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}