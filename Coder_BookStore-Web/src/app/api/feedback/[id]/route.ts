import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../lib/supabase';

// GET /api/feedback/[id] - Lấy chi tiết feedback
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(request: Request, { params }: any) {
  const { id } = params;
  const { data, error } = await supabaseAdmin
    .from('feedback')
    .select('id, name, email, content, rating, created_at, updated_at')
    .eq('id', id)
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json(data);
}

// PUT /api/feedback/[id] - Update feedback
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function PUT(request: Request, { params }: any) {
  const { id } = params;
  const body = await request.json();
  const { name, email, content, rating } = body;
  if (!name || !email || !content) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  const { data, error } = await supabaseAdmin
    .from('feedback')
    .update({ name, email, content, rating })
    .eq('id', id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// DELETE /api/feedback/[id] - Xóa feedback
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function DELETE(request: Request, { params }: any) {
  const { id } = params;
  const { error } = await supabaseAdmin
    .from('feedback')
    .delete()
    .eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: 'Feedback deleted' });
} 