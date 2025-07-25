import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "../lib/supabase";

// GET /api/books - List or get single book
export async function GET(request: NextRequest) {
  try {
    console.log("API called with URL:", request.url);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const { data, error } = await supabaseAdmin
        .from("books")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.error("Single book error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json(data);
    }

    // Test simple query first
    console.log("Testing basic database connection...");
    const { data: testData, error: testError } = await supabaseAdmin
      .from("books")
      .select("id, title")
      .limit(1);

    if (testError) {
      console.error("Database connection test failed:", testError);
      return NextResponse.json(
        { error: "Database connection failed", details: testError.message },
        { status: 500 }
      );
    }

    console.log("Database connection successful, test data:", testData);

    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const author = searchParams.get("author");
    const year = searchParams.get("year");
    const minYear = searchParams.get("minYear");
    const maxYear = searchParams.get("maxYear");
    const minRating = searchParams.get("minRating");
    const maxPrice = searchParams.get("maxPrice");
    const page = parseInt(searchParams.get("page") || "1") || 1;
    const limit = parseInt(searchParams.get("limit") || "12") || 12;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    console.log("Query params:", {
      category,
      search,
      author,
      year,
      minYear,
      maxYear,
      minRating,
      maxPrice,
      page,
      limit,
      from,
      to,
    });
    console.log("maxPrice type:", typeof maxPrice, "value:", maxPrice);

    // Start with basic query
    let query = supabaseAdmin.from("books").select("*", { count: "exact" });

    // Apply filters
    if (category && category !== "All") {
      query = query.eq("category", category);
    }
    if (search) {
      query = query.ilike("title", `%${search}%`);
    }
    if (author) {
      query = query.eq("author", author);
    }

    // Handle year filters - try different column names
    const minYearNum = minYear ? Number(minYear) : null;
    const maxYearNum = maxYear ? Number(maxYear) : null;
    const yearNum = year ? Number(year) : null;

    if (yearNum && !isNaN(yearNum)) {
      // Try multiple possible column names
      query = query.or(
        `publicyear.eq.${yearNum},publishyear.eq.${yearNum},publishYear.eq.${yearNum}`
      );
    } else {
      if (minYearNum && !isNaN(minYearNum)) {
        query = query.or(
          `publicyear.gte.${minYearNum},publishyear.gte.${minYearNum},publishYear.gte.${minYearNum}`
        );
      }
      if (maxYearNum && !isNaN(maxYearNum)) {
        query = query.or(
          `publicyear.lte.${maxYearNum},publishyear.lte.${maxYearNum},publishYear.lte.${maxYearNum}`
        );
      }
    }

    if (minRating) {
      const minRatingNum = Number(minRating);
      if (!isNaN(minRatingNum)) {
        query = query.gte("rating", minRatingNum);
      }
    }

    if (maxPrice) {
      const maxPriceNum = Number(maxPrice);
      if (!isNaN(maxPriceNum)) {
        // Lọc theo giá tối đa - chỉ hiển thị sách có giá <= maxPrice
        console.log(
          "Applying maxPrice filter:",
          maxPriceNum,
          "type:",
          typeof maxPriceNum
        );
        // Sử dụng lte để so sánh giá
        query = query.lte("price", maxPriceNum);
        console.log("Applied maxPrice filter:", maxPriceNum);
      }
    }

    // Apply pagination
    query = query.range(from, to);
    console.log("Executing query...");

    const { data, count, error } = await query;
    console.log("Query result:", { dataCount: data?.length, count, error });

    if (error) {
      console.error("Supabase query error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data: data || [], total: count || 0 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// POST /api/books
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, author, price, category } = body;
    // Mapping mọi biến thể về publishyear
    const publishyear =
      body.publishyear ??
      body.publishYear ??
      body.year ??
      body.Year ??
      body.publicyear ??
      body.publicYear;
    if (!title || !author || !price || !category || publishyear === undefined) {
      return NextResponse.json(
        { error: "Thiếu trường bắt buộc" },
        { status: 400 }
      );
    }
    const insertData = { ...body, publishyear };
    // Xóa các biến thể khác nếu có
    delete insertData.publishYear;
    delete insertData.year;
    delete insertData.Year;
    delete insertData.publicyear;
    delete insertData.publicYear;
    const { data, error } = await supabaseAdmin
      .from("books")
      .insert([insertData])
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

// PUT /api/books?id=...
export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Book ID is required" }, { status: 400 });
  }
  try {
    const body = await request.json();
    // Mapping mọi biến thể về publishyear
    if (
      body.publishyear ||
      body.publishYear ||
      body.year ||
      body.Year ||
      body.publicyear ||
      body.publicYear
    ) {
      body.publishyear =
        body.publishyear ??
        body.publishYear ??
        body.year ??
        body.Year ??
        body.publicyear ??
        body.publicYear;
      delete body.publishYear;
      delete body.year;
      delete body.Year;
      delete body.publicyear;
      delete body.publicYear;
    }
    const { data, error } = await supabaseAdmin
      .from("books")
      .update(body)
      .eq("id", id)
      .select()
      .single();
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

// DELETE /api/books?id=...
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Book ID is required" }, { status: 400 });
  }
  const { error } = await supabaseAdmin.from("books").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ message: "Book deleted successfully" });
}
/*
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../../lib/supabase'; // sửa đường dẫn nếu cần

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Book ID is required' }, { status: 400 });
    }

    // Có thể thêm kiểm tra định dạng id nếu cần:
    // if (!/^\d+$/.test(id)) return NextResponse.json({ error: 'Invalid Book ID' }, { status: 400 });

    const { error, count } = await supabaseAdmin
      .from('books')
      .delete()
      .eq('id', id)
      .select('*') // cần .select() để Supabase trả về số bản ghi xóa
      .single();   // dùng .single() nếu bạn muốn xóa một dòng duy nhất

    if (error) {
      console.error('Delete book error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Book deleted successfully' }, { status: 200 });

  }

*/
