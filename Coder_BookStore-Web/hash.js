require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcrypt');

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function hashAndUpdateUsers() {
  // Fetch all users with their password and passwordHash
  const { data: users, error } = await supabase
    .from('users')
    .select('id, password, passwordHash');

  if (error) {
    console.error('Error fetching users:', error);
    return;
  }

  for (const user of users) {
    // Luôn hash lại nếu có password plaintext
    if (user.password) {
      try {
        const hash = await bcrypt.hash(user.password, 10);
        const { error: updateError } = await supabase
          .from('users')
          .update({ passwordHash: hash /*, password: null*/ })
          .eq('id', user.id);
        if (updateError) {
          console.error(`Error updating user ${user.id}:`, updateError);
        }
      } catch (err) {
        console.error(`Hashing failed for user ${user.id}:`, err);
      }
    }
  }
}

hashAndUpdateUsers();