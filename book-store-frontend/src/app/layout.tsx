import React from 'react';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <nav style={{ padding: 20, backgroundColor: '#eee' }}>
          <a href="/HomePage">Home</a> | 
          <a href="/AboutPage">About</a> | 
          <a href="/Contact">Contact</a> | 
          <a href="/Books">Books</a> | 
          <a href="/Login">Login</a> | 
          <a href="/Register">Register</a>
        </nav>
        <main style={{ padding: 40 }}>{children}</main>
      </body>
    </html>
  );
}
