import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../lib/supabase';

// GET /api/authors - Get all authors or single author by id
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (id) {
    const { data, error } = await supabaseAdmin
      .from('authors')
      .select('*')
      .eq('id', id)
      .single();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    return NextResponse.json(data);
  }
  const { data, error } = await supabaseAdmin
    .from('authors')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// POST /api/authors - Create a new author
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    const { data, error } = await supabaseAdmin
      .from('authors')
      .insert([body])
      .select()
      .single();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid author data' }, { status: 400 });
  }
}

// PUT /api/authors?id=... - Update author
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Author ID is required' }, { status: 400 });
    }
    const body = await request.json();
    const { data, error } = await supabaseAdmin
      .from('authors')
      .update({ ...body, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid author data' }, { status: 400 });
  }
}

// DELETE /api/authors?id=... - Delete author
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Author ID is required' }, { status: 400 });
    }
    const { error } = await supabaseAdmin
      .from('authors')
      .delete()
      .eq('id', id);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: 'Author deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete author' }, { status: 500 });
  }
} 