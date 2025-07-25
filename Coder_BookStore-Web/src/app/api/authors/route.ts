import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "../lib/supabase";

// GET /api/authors - Get all authors or single author by id
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (id) {
    const { data, error } = await supabaseAdmin
      .from("authors")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
  }

  const { data, error } = await supabaseAdmin
    .from("authors")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// POST /api/authors - Create a new author
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    const { data, error } = await supabaseAdmin
      .from("authors")
      .insert([body])
      .select()
      .single();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid author data" }, { status: 400 });
  }
}

// PUT /api/authors?id=xxx - Update author
export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const body = await request.json();
  const { data, error } = await supabaseAdmin
    .from("authors")
    .update(body)
    .eq("id", id)
    .select()
    .single();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// DELETE /api/authors?id=xxx - Delete author
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const { error } = await supabaseAdmin.from("authors").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ message: "Author deleted" });
}
/*
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../../lib/supabase'; // đảm bảo đường dẫn đúng

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing 'id' in query parameters" }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from("authors")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Author deleted successfully" }, { status: 200 });

  } catch (err) {
    console.error("Unexpected server error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

*/
