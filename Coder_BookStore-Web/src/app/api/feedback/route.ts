import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../lib/supabase';

// GET /api/feedback - Lấy danh sách feedback
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('feedback')
      .select('id, name, email, content, rating, created_at, updated_at')
      .order('created_at', { ascending: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/feedback - Submit feedback
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, content, rating } = body;
    if (!name || !email || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const { data, error } = await supabaseAdmin
      .from('feedback')
      .insert([{ name, email, content, rating }])
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 