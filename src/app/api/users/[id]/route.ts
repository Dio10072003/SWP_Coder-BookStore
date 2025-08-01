import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../lib/supabase';

// GET /api/users/[id] - Get user theo id
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
  // No password or hash, but using var
  const { password, passwordHash, ...safeUser } = data;
  if (password || passwordHash) {
    
  }
  return NextResponse.json(safeUser);
}

// PUT /api/users/[id] - Cập nhật user theo id
export async function PUT(request: NextRequest, context: any) {
  const { id } = context.params;
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
  }
  return NextResponse.json(safeUser);
}

// DELETE /api/users/[id] - Delete user by id
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
