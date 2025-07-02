import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../lib/supabase';

// GET /api/promotions - Get all promotions
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('promotions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/promotions - Create a new promotion
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, discount, start_date, end_date, image } = body;

    if (!title || !discount || !start_date || !end_date) {
      return NextResponse.json(
        { error: 'Title, discount, start_date, and end_date are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('promotions')
      .insert([{ title, description, discount, start_date, end_date, image }])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 