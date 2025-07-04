import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../../lib/supabase'; // Assuming this uses the Service Role Key
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  try {
    // 1. Retrieve the user from the database by email
    //    Ensure your 'users' table has a column for the hashed password (e.g., 'password_hash')
    const { data: users, error } = await supabaseAdmin
      .from('users')
      // Select the hashed password along with other user details
      .select('*, password_hash')
      .eq('email', email);

    if (error || !users || users.length === 0) {
      // Return a generic error message for security reasons
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const user = users[0];

    // 2. Compare the provided plain-text password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      // Return a generic error message if password doesn't match
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // 3. Remove the sensitive password hash before sending the user data back
    //    Destructure to exclude 'password_hash' and keep other user fields
    const { password_hash, ...userSafe } = user;

    // 4. Return the sanitized user data
    return NextResponse.json({ user: userSafe });

  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}