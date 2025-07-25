import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../lib/supabase";
import { verifyPassword } from "../../utils/passwordUtils";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing email or password" },
        { status: 400 }
      );
    }
    const { data, error } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("email", email)
      .single();
    if (error || !data) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }
    const isValid = await verifyPassword(password, data.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }
    // Destructure to exclude password fields from user data
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, passwordHash: __, ...userWithoutPassword } = data;
    return NextResponse.json({ user: userWithoutPassword }, { status: 200 });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

/*
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '../../lib/supabase';
import { verifyPassword } from '../../utils/passwordUtils';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
    }

    // Lấy thông tin user từ Supabase theo email
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      // Trả về lỗi nếu không tìm thấy user hoặc có lỗi từ DB
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // So sánh mật khẩu đã nhập với mật khẩu đã hash
    const isValid = await verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Loại bỏ thông tin nhạy cảm khỏi phản hồi
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _ignore1, passwordHash: _ignore2, ...safeUserData } = user;

    return NextResponse.json({ user: safeUserData }, { status: 200 });
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

*/
