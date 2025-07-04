'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
    else router.push('/Login');
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('storage'));
    router.push('/Login');
  };

  if (!user) return null;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Thông tin tài khoản</h2>
      <div className="mb-2"><b>Email:</b> {user.email}</div>
      <div className="mb-2"><b>Họ tên:</b> {user.name}</div>
      <div className="mb-2"><b>Vai trò:</b> {user.role}</div>
      <button onClick={handleLogout} className="w-full bg-red-600 text-white py-2 rounded mt-4">Đăng xuất</button>
    </div>
  );
} 