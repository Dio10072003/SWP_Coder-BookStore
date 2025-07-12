import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../lib/supabase';
import { hashPassword } from '../../utils/passwordUtils';

export async function POST(request) {
  try {
    const { email, password, name, role } = await request.json();
    if (!email || !password || !name || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const hashedPassword = await hashPassword(password);
    const { data, error } = await supabaseAdmin
      .from('users')
      .insert([{ email, name, role, password, passwordHash: hashedPassword }])
      .select();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ user: { ...data[0], password: undefined, passwordHash: undefined } }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
} 