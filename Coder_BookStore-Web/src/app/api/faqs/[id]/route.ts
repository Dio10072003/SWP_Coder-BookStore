import { NextResponse, NextRequest } from 'next/server';
import { supabaseAdmin } from '../../lib/supabase';

// GET /api/faqs/[id] - Get a single FAQ by ID
export async function GET(request: Request, context: any) {
  const { id } = context.params;
  const { data, error } = await supabaseAdmin
    .from('faqs')
    .select('id, question, answer, created_at')
    .eq('id', id)
    .single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
  return NextResponse.json(data);
}

// PUT /api/faqs/[id] - Update a FAQ by ID
export async function PUT(request: NextRequest, context: any) {
  const { id } = context.params;
  const body = await request.json();
  const { question, answer } = body;
  if (!question || !answer) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  const { data, error } = await supabaseAdmin
    .from('faqs')
    .update({ question, answer })
    .eq('id', id)
    .select()
    .single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// DELETE /api/faqs/[id] - Delete a FAQ by ID
export async function DELETE(request: NextRequest, context: any) { 
  const { id } = context.params;
  const { error } = await supabaseAdmin
    .from('faqs')
    .delete()
    .eq('id', id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ message: 'FAQ deleted' });
} 