import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "../lib/supabase";

// GET /api/order-tracking - Get all order tracking records, optionally filter by order_code
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const order_code = searchParams.get("order_code");
  let query = supabaseAdmin
    .from("order_tracking")
    .select("id, order_code, status, location, note, updated_at, created_at")
    .order("updated_at", { ascending: false });

  if (order_code) {
    query = query.eq("order_code", order_code);
  }

  const { data } = await query;
  return NextResponse.json(data);
}

// POST /api/order-tracking - Create a new order tracking record
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { order_code, status, location, note } = body;
  if (!order_code || !status || !location || !note) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }
  const { data } = await supabaseAdmin
    .from("order_tracking")
    .insert({ order_code, status, location, note })
    .select();
  return NextResponse.json(data);
}
/*
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../lib/supabase';

// GET /api/order-tracking - Get all order tracking records, optionally filter by order_code
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const order_code = searchParams.get('order_code');
  let query = supabaseAdmin
    .from('order_tracking')
    .select('id, order_code, status, location, note, updated_at, created_at')
    .order('updated_at', { ascending: false });

  if (order_code) {
    query = query.eq('order_code', order_code);
  }

  const { data } = await query;
  return NextResponse.json(data);
}

// POST /api/order-tracking - Create a new order tracking record
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { order_code, status, location, note } = body;
  if (!order_code || !status || !location || !note) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  const { data } = await supabaseAdmin
    .from('order_tracking')
    .insert({ order_code, status, location, note })
    .select();
  return NextResponse.json(data);
} 
*/
