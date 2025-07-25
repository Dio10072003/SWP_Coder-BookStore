import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "../lib/supabase";

// GET /api/support-tickets – tất cả ticket
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("support_tickets")
      .select(
        "id, name, email, subject, message, status, created_at, updated_at"
      )
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/support-tickets – tạo ticket mới
export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("support_tickets")
      .insert([{ name, email, subject, message, status: "open" }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
/*
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../lib/supabase';

// GET /api/promotions – tất cả khuyến mãi
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('promotions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/promotions – tạo khuyến mãi mới
export async function POST(request: NextRequest) {
  try {
    const { title, description, discount, start_date, end_date, image } =
      await request.json();

    if (!title || !discount || !start_date || !end_date) {
      return NextResponse.json(
        { error: 'Title, discount, start_date, and end_date are required' },
        { status: 400 },
      );
    }

    const { data, error } = await supabaseAdmin
      .from('promotions')
      .insert([{ title, description, discount, start_date, end_date, image }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


*/
