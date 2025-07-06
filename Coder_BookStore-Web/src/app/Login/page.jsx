'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUserAstronaut, FaLock, FaEnvelope, FaSignInAlt } from 'react-icons/fa';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('user', JSON.stringify(data.user));
      window.dispatchEvent(new Event('storage'));
      router.push('/Profile');
    } else {
      setError(data.error || 'Đăng nhập thất bại');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center universe-bg py-10 px-2">
      <form onSubmit={handleLogin} className="relative max-w-sm w-full mx-auto rounded-3xl shadow-2xl p-8 bg-white/10 backdrop-blur-md border-2 border-cyan-400/30 universe-text animate-fade-in overflow-hidden">
        <span className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 opacity-20 rounded-full blur-2xl animate-blob z-0" />
        <div className="relative z-10 flex flex-col items-center gap-2">
          <FaUserAstronaut className="text-5xl text-cyan-300 neon mb-2" />
          <h2 className="text-2xl font-extrabold neon mb-4 drop-shadow">Đăng nhập</h2>
          <div className="w-full flex flex-col gap-3">
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400 text-lg" />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-cyan-300 bg-white/30 text-cyan-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition placeholder-cyan-400"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400 text-lg" />
              <input
                type="password"
                placeholder="Mật khẩu"
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-cyan-300 bg-white/30 text-cyan-900 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition placeholder-cyan-400"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="text-pink-400 text-sm text-center animate-fade-in">{error}</div>}
            <button type="submit" className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-2 rounded-full shadow-lg hover:scale-105 hover:bg-cyan-700 transition-all text-lg mt-2"><FaSignInAlt /> Đăng nhập</button>
          </div>
        </div>
      </form>
    </div>
  );
}
