'use server'
// export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../lib/supabase';

// GET /api/users – tất cả user
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/users – tạo user mới
export async function POST(request: NextRequest) {
  try {
    const { email, name, password, role } = await request.json();

    if (!email || !name || !password) {
      return NextResponse.json(
        { error: 'Email, name và password là bắt buộc' },
        { status: 400 },
      );
    }

    const { data, error } = await supabaseAdmin
      .from('users')
      .insert([{ email, name, password, role: role || 'User' }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/users – xóa toàn bộ user
export async function DELETE() {
  try {
    const { error } = await supabaseAdmin.from('users').delete().neq('id', '');
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'All users deleted' });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/users/seed – seed lại user mẫu
export async function POST_seed() {
  try {
    // Xóa toàn bộ user trước
    await supabaseAdmin.from('users').delete().neq('id', '');
    // Thêm user mẫu
    const rawUsers = [
      { email: 'alice@example.com', name: 'Alice Nguyen', role: 'Admin', password: 'alice123' },
      { email: 'bob@example.com', name: 'Bob Tran', role: 'Staff', password: 'bob123' },
      { email: 'carol@example.com', name: 'Carol Le', role: 'User', password: 'carol123' },
      { email: 'david@example.com', name: 'David Pham', role: 'User', password: 'david123' },
    ];
    const users = await Promise.all(rawUsers.map(async u => ({
      email: u.email,
      name: u.name,
      role: u.role,
    })));
    const { data, error } = await supabaseAdmin.from('users').insert(users).select();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'Seeded users', data });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
