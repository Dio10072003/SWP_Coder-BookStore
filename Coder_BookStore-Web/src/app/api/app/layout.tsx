import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js + Supabase API Demo",
  description: "A sample Next.js application with Supabase integration",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
/*
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header"; // nếu bạn có Header
import Footer from "./components/Footer"; // nếu bạn có Footer

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js + Supabase API Demo",
  description: "A sample Next.js application with Supabase integration",
  keywords: ["Next.js", "Supabase", "API", "Demo"],
  authors: [{ name: "Your Name", url: "https://yourwebsite.com" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        {/* Optional Layout UI */
