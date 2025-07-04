import { NextResponse, NextRequest } from 'next/server';
import { supabaseAdmin } from '../../lib/supabase';

type RouteContext = { params: { id: string } };

// GET /api/feedback/[id] - Lấy chi tiết feedback
export async function GET(request: Request, context: RouteContext) {
  const { id } = context.params;
  const { data, error } = await supabaseAdmin
    .from('feedback')
    .select('id, name, email, content, rating, created_at, updated_at')
    .eq('id', id)
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json(data);
}

// PUT /api/feedback/[id] - Update feedback
export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
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
export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  const { error } = await supabaseAdmin
    .from('feedback')
    .delete()
    .eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: 'Feedback deleted' });
} 