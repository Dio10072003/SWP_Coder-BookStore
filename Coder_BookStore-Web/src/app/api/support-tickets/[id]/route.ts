import { NextResponse, NextRequest } from 'next/server';
import { supabaseAdmin } from '../../lib/supabase';

// GET /api/support-tickets/[id] - Get a single support ticket by ID
export async function GET(request: Request, context: { params: { id: string } }) {
  const { id } = context.params;
  const { data, error } = await supabaseAdmin
    .from('support_tickets')
    .select('id, name, email, subject, message, status, created_at, updated_at')
    .eq('id', id)
    .single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
  return NextResponse.json(data);
}

// PUT /api/support-tickets/[id] - Update a support ticket by ID
export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  const body = await request.json();
  const { name, email, subject, message, status } = body;
  if (!name || !email || !subject || !message || !status) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  const { data, error } = await supabaseAdmin
    .from('support_tickets')
    .update({ name, email, subject, message, status })
    .eq('id', id)
    .select()
    .single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// DELETE /api/support-tickets/[id] - Delete a support ticket by ID
export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  const { error } = await supabaseAdmin
    .from('support_tickets')
    .delete()
    .eq('id', id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ message: 'Support ticket deleted' });
} 