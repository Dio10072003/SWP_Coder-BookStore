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
    // Không trả về password hoặc hash
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const safeData = data.map(({ password: _pw, passwordHash: _ph, ...rest }) => rest);
    return NextResponse.json(safeData);
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

    // KHÔNG hash password ở đây, chỉ lưu plain text và passwordHash null
    const { data, error } = await supabaseAdmin
      .from('users')
      .insert([{ email, name, password, passwordHash: null, role: role || 'User' }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    // Không trả về password hoặc hash
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _pw, passwordHash: _ph, ...safeUser } = data;
    return NextResponse.json(safeUser, { status: 201 });
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
