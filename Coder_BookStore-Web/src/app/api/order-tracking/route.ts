import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../lib/supabase';

// GET /api/order-tracking - Get all order tracking records
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('order_tracking')
      .select('id, order_code, status, location, note, updated_at, created_at')
      .order('updated_at', { ascending: false });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/order-tracking - Create a new order tracking record
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { order_code, status, location, note } = body;
    if (!order_code || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const { data, error } = await supabaseAdmin
      .from('order_tracking')
      .insert([{ order_code, status, location, note }])
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