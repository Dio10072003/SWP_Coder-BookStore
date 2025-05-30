import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-black text-white flex justify-between items-center px-6 py-4">
      <div className="text-xl font-bold text-yellow-500">Coder_BookStore</div>
      <nav className="space-x-6">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/shop">Shop</Link>
        <Link href="/team">Delivery Team</Link>
        <Link href="/sellers">Sellers</Link>
      </nav>
      <div className="text-sm text-gray-300">user@bookpoint.com</div>
    </header>
  );
}
