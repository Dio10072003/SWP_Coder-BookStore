import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../lib/supabase';

// GET /api/posts – danh sách bài viết
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('posts')
      .select('id, title, content, image, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/posts – tạo bài viết mới
export async function POST(request: NextRequest) {
  try {
    const { title, content, user_id } = await request.json();

    if (!title || !content || !user_id) {
      return NextResponse.json(
        { error: 'Title, content, and user_id are required' },
        { status: 400 },
      );
    }

    const { data, error } = await supabaseAdmin
      .from('posts')
      .insert([{ title, content, user_id }])
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
