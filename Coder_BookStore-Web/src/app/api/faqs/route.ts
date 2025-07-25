import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "../lib/supabase";

// GET /api/faqs – tất cả FAQs
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("faqs")
      .select("id, question, answer, created_at")
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

// POST /api/faqs – tạo mới
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, answer } = body;

    if (!question || !answer) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("faqs")
      .insert([{ question, answer }])
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

// GET /api/faqs – tất cả FAQs
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('faqs')
      .select('id, question, answer, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/faqs – tạo mới
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, answer } = body;

    if (!question || !answer) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('faqs')
      .insert([{ question, answer }])
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
