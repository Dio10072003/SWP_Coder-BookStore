import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../lib/supabase';
import { verifyPassword } from '../../utils/passwordUtils';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
    }
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    if (error || !data) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }
    const isValid = await verifyPassword(password, data.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }
    // Destructure to exclude password fields from user data
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, passwordHash: __, ...userWithoutPassword } = data;
    return NextResponse.json({ user: userWithoutPassword }, { status: 200 });
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
} 