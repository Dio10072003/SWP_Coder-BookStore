import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../../lib/supabase';

// GET /api/users/[id] - Lấy thông tin user theo id
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('id', id)
    .single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
  // Không trả về password hoặc hash, nhưng vẫn sử dụng biến
  const { password, passwordHash, ...safeUser } = data;
  if (password || passwordHash) {
    // Đã loại bỏ thông tin nhạy cảm
  }
  return NextResponse.json(safeUser);
}

// PUT /api/users/[id] - Cập nhật user theo id
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await request.json();
  const { data, error } = await supabaseAdmin
    .from('users')
    .update(body)
    .eq('id', id)
    .select()
    .single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  const { password, passwordHash, ...safeUser } = data;
  if (password || passwordHash) {
    // Đã loại bỏ thông tin nhạy cảm
  }
  return NextResponse.json(safeUser);
}

// DELETE /api/users/[id] - Xóa user theo id
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const { error } = await supabaseAdmin
    .from('users')
    .delete()
    .eq('id', id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ message: 'User deleted successfully' });
} 