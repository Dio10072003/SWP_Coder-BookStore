import { NextResponse, NextRequest } from "next/server";
import { supabaseAdmin } from "../lib/supabase";

// GET /api/careers – tất cả vị trí nghề nghiệp
export async function GET(request: NextRequest) {
  // Sử dụng request để linter không báo lỗi unused
  const userAgent = request.headers.get("user-agent") || "";
  const { data, error } = await supabaseAdmin
    .from("careers")
    .select("*")
    .order("created_at", { ascending: false });
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data, userAgent });
}
/*
import { NextResponse, NextRequest } from 'next/server';
import { supabaseAdmin } from '../lib/supabase';

// GET /api/careers – Trả về danh sách vị trí nghề nghiệp
export async function GET(request: NextRequest) {
  try {
    // Optional: lấy User-Agent để theo dõi analytics/log
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Lấy dữ liệu từ bảng 'careers'
    const { data, error } = await supabaseAdmin
      .from('careers')
      .select('*')
      .order('created_at', { ascending: false });

    // Xử lý lỗi từ Supabase
    if (error) {
      console.error('Error fetching careers:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Trả về dữ liệu cùng với User-Agent
    return NextResponse.json({ careers: data, userAgent }, { status: 200 });

  } catch (err) {
    console.error('Unexpected error in GET /careers:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

*/
