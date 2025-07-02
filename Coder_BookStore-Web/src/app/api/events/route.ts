import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../lib/supabase';

// GET /api/events – lấy tất cả
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('events')
      .select('id, title, description, location, start_time, end_time, image, created_at')
      .order('start_time', { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/events – tạo mới
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, location, start_time, end_time, image } = body;

    if (!title || !description || !location || !start_time || !end_time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('events')
      .insert([{ title, description, location, start_time, end_time, image }])
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
// PUT /api/events?id=… – cập nhật
export async function PUT(request: NextRequest) { 
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
    }

    const body = await request.json();
    const { title, description, location, start_time, end_time, image } = body;

    if (!title || !description || !location || !start_time || !end_time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('events')
      .update({ title, description, location, start_time, end_time, image })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}