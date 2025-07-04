import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../../lib/supabase';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  // Query the users table directly
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('email', email)
    .eq('password', password)
    .single();
  if (error || !data) {
    return NextResponse.json({ error: 'Sai email hoặc mật khẩu' }, { status: 401 });
  }
  // Return all user fields
  return NextResponse.json({ user: data });
} 