import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "../lib/supabase";

// GET /api/feedback – tất cả feedback
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("feedback")
      .select("id, name, email, content, rating, created_at, updated_at")
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

// POST /api/feedback – gửi feedback
export async function POST(request: NextRequest) {
  try {
    const { name, email, content, rating } = await request.json();

    if (!name || !email || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("feedback")
      .insert([{ name, email, content, rating }])
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

// GET /api/feedback – tất cả feedback
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('feedback')
      .select('id, name, email, content, rating, created_at, updated_at')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/feedback – gửi feedback
export async function POST(request: NextRequest) {
  try {
    const { name, email, content, rating } = await request.json();

    if (!name || !email || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('feedback')
      .insert([{ name, email, content, rating }])
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
