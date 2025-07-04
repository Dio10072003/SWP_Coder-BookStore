import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../lib/supabase';

// GET /api/promotions/[id] - Get single promotion by id
export async function GET(request: Request, context: any) {
  const { id } = context.params;
  const { data, error } = await supabaseAdmin
    .from('promotions')
    .select('*')
    .eq('id', id)
    .single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
  return NextResponse.json(data);
}

// PATCH /api/promotions/[id] - Update promotion by id
export async function PATCH(request: Request, context: any) {
  const { id } = context.params;
  const body = await request.json();
  // Cho phép update linh hoạt mọi trường
  type PromotionUpdate = {
    title?: string;
    description?: string;
    discount?: number;
    start_date?: string;
    end_date?: string;
    image?: string;
  };

  const updateData: PromotionUpdate = {};
  for (const key of ['title', 'description', 'discount', 'start_date', 'end_date', 'image'] as const) {
    if (body[key] !== undefined) {
      updateData[key] = body[key];
    }
  }
  const { data, error } = await supabaseAdmin
    .from('promotions')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// DELETE /api/promotions/[id] - Delete promotion by id
export async function DELETE(request: Request, context: any) {
  const { id } = context.params;
  const { error } = await supabaseAdmin
    .from('promotions')
    .delete()
    .eq('id', id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ message: 'Promotion deleted successfully' });
} 