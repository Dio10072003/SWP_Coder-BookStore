import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '../lib/supabase'

// GET /api/posts - Get all posts (basic fields only)
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('posts')
      .select('id, title, content, image, created_at')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/posts - Create a new post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, user_id } = body

    if (!title || !content || !user_id) {
      return NextResponse.json(
        { error: 'Title, content, and user_id are required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseAdmin
      .from('posts')
      .insert([{ title, content, user_id }])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// To complete CRUD for posts (blog), create a dynamic route at /api/posts/[id]/route.ts for GET, PUT, DELETE operations on a single post. 