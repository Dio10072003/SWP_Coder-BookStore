import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { supabaseAdmin } from '../../lib/supabase';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  // Lấy user theo email
  const { data: users, error } = await supabaseAdmin.from('users').select('*').eq('email', email);
  if (error || !users || users.length === 0) {
    return NextResponse.json({ error: 'Email hoặc mật khẩu không đúng' }, { status: 401 });
  }
  const user = users[0];
  // So sánh password plain text
  if (user.password !== password) {
    return NextResponse.json({ error: 'Email hoặc mật khẩu không đúng' }, { status: 401 });
  }
  // Xóa password trước khi trả về
  const { password: _pw, ...userSafe } = user;
  return NextResponse.json({ user: userSafe });
} 