import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../../lib/supabase';
import { User } from '../../types/database';

// GET /api/users/[id] - Lấy thông tin user theo id
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(request: NextRequest, context: any) {
  const { id } = context.params;
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('id', id)
    .single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
  const { id: uid, email, name, created_at, updated_at, role } = data as User;
  return NextResponse.json({ id: uid, email, name, created_at, updated_at, role });
}

// PUT /api/users/[id] - Cập nhật user theo id
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function PUT(request: NextRequest, context: any) {
  const { id } = context.params;
  const body: Partial<User> = await request.json();
  const { data, error } = await supabaseAdmin
    .from('users')
    .update(body)
    .eq('id', id)
    .select()
    .single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  const { id: uid, email, name, created_at, updated_at, role } = data as User;
  return NextResponse.json({ id: uid, email, name, created_at, updated_at, role });
}

// DELETE /api/users/[id] - Xóa user theo id
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function DELETE(request: NextRequest, context: any) {
  const { id } = context.params;
  const { error } = await supabaseAdmin
    .from('users')
    .delete()
    .eq('id', id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ message: 'User deleted successfully' });
}
