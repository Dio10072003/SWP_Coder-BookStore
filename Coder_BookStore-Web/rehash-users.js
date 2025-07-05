const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

const supabaseUrl = 'https://chyvqyorpnpcxovbwujt.supabase.co';
const supabaseServiceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNoeXZxeW9ycG5wY3hvdmJ3dWp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3NTI3NTcsImV4cCI6MjA2NjMyODc1N30.EJ-RT30EArnGLJC8jWOaN9uuZYcSi-iBbVKzEtUCJ04';

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function main() {
  // Lấy user chưa có passwordHash
  const { data: users, error } = await supabase
    .from('users')
    .select('*')
    .or('passwordHash.is.null,passwordHash.eq.""');

  if (error) {
    console.error('Lỗi lấy user:', error);
    return;
  }

  for (const u of users) {
    if (!u.password) {
      console.log(`Bỏ qua user ${u.email} vì không có password gốc`);
      continue;
    }
    const hash = await bcrypt.hash(u.password, 10);
    const { error: updateError } = await supabase
      .from('users')
      .update({ passwordHash: hash })
      .eq('email', u.email);
    if (updateError) {
      console.error(`Lỗi cập nhật user ${u.email}:`, updateError);
    } else {
      console.log(`Đã hash mật khẩu cho user ${u.email}`);
    }
  }
}

main(); 