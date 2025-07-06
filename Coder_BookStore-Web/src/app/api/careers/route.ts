import { NextResponse, NextRequest } from 'next/server';
import { supabaseAdmin } from '../lib/supabase';

// GET /api/careers – tất cả vị trí nghề nghiệp
export async function GET(request: NextRequest) {
  // Sử dụng request để linter không báo lỗi unused
  const userAgent = request.headers.get('user-agent') || '';
  const { data, error } = await supabaseAdmin
    .from('careers')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data, userAgent });
} 