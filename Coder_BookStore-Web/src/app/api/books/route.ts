import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../lib/supabase';

// GET /api/books - List or get single book
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (id) {
    // Lấy chi tiết 1 book
    const { data, error } = await supabaseAdmin
      .from('books')
      .select('*')
      .eq('id', id)
      .single();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
  }

  // Lọc, phân trang
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const year = searchParams.get('year');
  const minRating = searchParams.get('minRating');
  const maxPrice = searchParams.get('maxPrice');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabaseAdmin.from('books').select('*', { count: 'exact' });
  if (category && category !== 'All') query = query.eq('category', category);
  if (search) query = query.ilike('title', `%${search}%`);
  if (year) query = query.eq('publishYear', parseInt(year));
  if (minRating) query = query.gte('rating', parseFloat(minRating));
  if (maxPrice) query = query.lte('price', parseFloat(maxPrice));
  query = query.range(from, to);

  const { data, count, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data, total: count });
}

// POST /api/books - Create new book
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title, author, price, img, rating, description, category,
      publishYear, pages, language, isbn
    } = body;
    if (!title || !author || !price || !category) {
      return NextResponse.json({ error: 'Thiếu trường bắt buộc' }, { status: 400 });
    }
    const { data, error } = await supabaseAdmin
      .from('books')
      .insert([{ title, author, price, img, rating, description, category, publishYear, pages, language, isbn }])
      .select()
      .single();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/books?id=... - Update book
export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Book ID is required' }, { status: 400 });
  }
  try {
    const body = await request.json();
    const { data, error } = await supabaseAdmin
      .from('books')
      .update(body)
      .eq('id', id)
      .select()
      .single();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/books?id=... - Delete book
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Book ID is required' }, { status: 400 });
  }
  const { error } = await supabaseAdmin
    .from('books')
    .delete()
    .eq('id', id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ message: 'Book deleted successfully' });
}
