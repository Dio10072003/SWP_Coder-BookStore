import { NextResponse, NextRequest } from 'next/server';
import { supabaseAdmin } from '../../lib/supabase';

// GET /api/posts/[id] - Get a single post by ID
export async function GET(request: Request, context: { params: { id: string } }) {
  const { id } = context.params;
  const { data, error } = await supabaseAdmin
    .from('posts')
    .select('id, title, content, image, created_at')
    .eq('id', id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
  return NextResponse.json(data);
}

// PUT /api/posts/[id] - Update a post by ID
export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  const body = await request.json();
  const { title, content, image } = body;

  if (!title || !content) {
    return NextResponse.json(
      { error: 'Title and content are required' },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from('posts')
    .update({ title, content, image })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// DELETE /api/posts/[id] - Delete a post by ID
export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  const { error } = await supabaseAdmin
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ message: 'Post deleted' });
} 