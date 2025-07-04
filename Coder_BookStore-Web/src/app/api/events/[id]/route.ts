import { NextResponse, NextRequest } from 'next/server';
import { supabaseAdmin } from '../../lib/supabase';

// GET /api/events/[id] - Get a single event by ID
export async function GET(request: Request, context: any) {
  const { id } = context.params;
  const { data, error } = await supabaseAdmin
    .from('events')
    .select('id, title, description, location, start_time, end_time, image, created_at')
    .eq('id', id)
    .single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
  return NextResponse.json(data);
}

// PUT /api/events/[id] - Update an event by ID
export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
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
}

// DELETE /api/events/[id] - Delete an event by ID
export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  const { error } = await supabaseAdmin
    .from('events')
    .delete()
    .eq('id', id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ message: 'Event deleted' });
} 