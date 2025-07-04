import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../../lib/supabase';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  try {
    // Lấy user theo email
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user || !user.passwordHash) {
      return NextResponse.json({ error: 'Sai email hoặc mật khẩu' }, { status: 401 });
    }

    // So sánh password đã hash
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json({ error: 'Sai email hoặc mật khẩu' }, { status: 401 });
    }

    // Không trả về password hoặc hash
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _pw, passwordHash: _ph, ...safeUser } = user;
    return NextResponse.json({ user: safeUser });
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}