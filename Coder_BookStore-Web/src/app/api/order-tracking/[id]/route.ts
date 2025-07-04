import { NextResponse, NextRequest } from 'next/server';
import { supabaseAdmin } from '../../lib/supabase';

// GET /api/order-tracking/[id] - Get a single order tracking record by ID
export async function GET(request: Request, context: { params: { id: string } }) {
  const { id } = context.params;
  const { data, error } = await supabaseAdmin
    .from('order_tracking')
    .select('id, order_code, status, location, note, updated_at, created_at')
    .eq('id', id)
    .single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
  return NextResponse.json(data);
}

// PUT /api/order-tracking/[id] - Update an order tracking record by ID
export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  const body = await request.json();
  const { order_code, status, location, note } = body;
  if (!order_code || !status || !location || !note) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  const { data, error } = await supabaseAdmin
    .from('order_tracking')
    .update({ order_code, status, location, note })
    .eq('id', id)
    .select()
    .single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// DELETE /api/order-tracking/[id] - Delete an order tracking record by ID
export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  const { error } = await supabaseAdmin
    .from('order_tracking')
    .delete()
    .eq('id', id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ message: 'Order tracking deleted' });
} 