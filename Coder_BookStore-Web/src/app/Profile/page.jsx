"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaUserAstronaut,
  FaUserShield,
  FaUserTie,
  FaUser,
  FaSignOutAlt,
  FaCogs,
  FaBoxOpen,
  FaKey,
} from "react-icons/fa";
import Link from "next/link";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
    else router.push("/Login");
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("storage"));
    router.push("/Login");
  };

  if (!user) return null;

  // Avatar & icon theo role
  let avatarIcon = <FaUser className="text-5xl text-cyan-300 neon" />;
  let roleLabel = "Thành viên";
  let roleColor = "text-cyan-300";
  if (user.role === "Admin") {
    avatarIcon = <FaUserShield className="text-5xl text-pink-400 neon" />;
    roleLabel = "Quản trị viên";
    roleColor = "text-pink-400";
  } else if (user.role === "Staff") {
    avatarIcon = <FaUserTie className="text-5xl text-yellow-300 neon" />;
    roleLabel = "Nhân viên";
    roleColor = "text-yellow-300";
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center universe-bg py-10 px-2">
      <div className="relative max-w-md w-full mx-auto rounded-3xl shadow-2xl p-8 bg-white/10 backdrop-blur-md border-2 border-cyan-400/30 universe-text animate-fade-in overflow-hidden">
        <span className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 opacity-20 rounded-full blur-2xl animate-blob z-0" />
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="mb-2">{avatarIcon}</div>
          <h2 className="text-2xl font-extrabold neon mb-1 drop-shadow">
            {user.name}
          </h2>
          <div className="text-base text-cyan-200 mb-2">{user.email}</div>
          <div className={`font-bold mb-4 ${roleColor} neon`}>{roleLabel}</div>
          <div className="flex flex-col gap-2 w-full">
            {user.role === "Admin" && (
              <Link
                href="/admin"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold shadow hover:scale-105 transition-all"
              >
                <FaCogs /> Quản trị hệ thống
              </Link>
            )}
            {user.role === "Staff" && (
              <Link
                href="/staff"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-cyan-400 text-blue-900 font-bold shadow hover:scale-105 transition-all"
              >
                <FaCogs /> Trang nhân viên
              </Link>
            )}
            {user.role === "User" && (
              <>
                <Link
                  href="/OrderTracking"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold shadow hover:scale-105 transition-all"
                >
                  <FaBoxOpen /> Xem đơn hàng
                </Link>
                <Link
                  href="/Profile/ChangePassword"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-400 to-cyan-400 text-white font-bold shadow hover:scale-105 transition-all"
                >
                  <FaKey /> Đổi mật khẩu
                </Link>
              </>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="mt-8 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-2 rounded-full shadow-lg hover:scale-105 hover:bg-cyan-700 transition-all text-lg"
          >
            <FaSignOutAlt /> Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
}
/*
'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUserAstronaut, FaUserShield, FaUserTie, FaUser, FaSignOutAlt, FaCogs, FaBoxOpen, FaKey } from 'react-icons/fa';
import Link from 'next/link';

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

  // Avatar & icon theo role
  let avatarIcon = <FaUser className="text-5xl text-cyan-300 neon" />;
  let roleLabel = 'Thành viên';
  let roleColor = 'text-cyan-300';
  if (user.role === 'Admin') {
    avatarIcon = <FaUserShield className="text-5xl text-pink-400 neon" />;
    roleLabel = 'Quản trị viên';
    roleColor = 'text-pink-400';
  } else if (user.role === 'Staff') {
    avatarIcon = <FaUserTie className="text-5xl text-yellow-300 neon" />;
    roleLabel = 'Nhân viên';
    roleColor = 'text-yellow-300';
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center universe-bg py-10 px-2">
      <div className="relative max-w-md w-full mx-auto rounded-3xl shadow-2xl p-8 bg-white/10 backdrop-blur-md border-2 border-cyan-400/30 universe-text animate-fade-in overflow-hidden">
        <span className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 opacity-20 rounded-full blur-2xl animate-blob z-0" />
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="mb-2">{avatarIcon}</div>
          <h2 className="text-2xl font-extrabold neon mb-1 drop-shadow">{user.name}</h2>
          <div className="text-base text-cyan-200 mb-2">{user.email}</div>
          <div className={`font-bold mb-4 ${roleColor} neon`}>{roleLabel}</div>
          <div className="flex flex-col gap-2 w-full">
            {user.role === 'Admin' && (
              <Link href="/admin" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold shadow hover:scale-105 transition-all"><FaCogs /> Quản trị hệ thống</Link>
            )}
            {user.role === 'Staff' && (
              <Link href="/staff" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-cyan-400 text-blue-900 font-bold shadow hover:scale-105 transition-all"><FaCogs /> Trang nhân viên</Link>
            )}
            {user.role === 'User' && (
              <>
                <Link href="/OrderTracking" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold shadow hover:scale-105 transition-all"><FaBoxOpen /> Xem đơn hàng</Link>
                <Link href="/Profile/ChangePassword" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-400 to-cyan-400 text-white font-bold shadow hover:scale-105 transition-all"><FaKey /> Đổi mật khẩu</Link>
              </>
            )}
          </div>
          <button onClick={handleLogout} className="mt-8 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-2 rounded-full shadow-lg hover:scale-105 hover:bg-cyan-700 transition-all text-lg"><FaSignOutAlt /> Đăng xuất</button>
        </div>
      </div>
    </div>
  );
} 

*/
