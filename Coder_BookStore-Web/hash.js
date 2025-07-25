require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcrypt');

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Using service role key for direct database operations
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Hashes plaintext passwords for users and updates their passwordHash field in the database.
 * Optionally, it can clear the plaintext password field after hashing.
 */
async function hashAndUpdateUsers() {
  // Fetch all users with their password (plaintext) and existing passwordHash
  const { data: users, error } = await supabase
    .from('users')
    .select('id, password, passwordHash');

  if (error) {
    console.error('Error fetching users:', error);
    return;
  }

  console.log(`Found ${users.length} users to process.`);

  for (const user of users) {
    // Only hash if a plaintext password exists
    if (user.password) {
      try {
        // Generate a hash for the plaintext password
        const hash = await bcrypt.hash(user.password, 10); // 10 is the salt rounds

        // Update the user's passwordHash in the database
        // Optionally, uncomment `password: null` to remove the plaintext password
        const { error: updateError } = await supabase
          .from('users')
          .update({ 
            passwordHash: hash 
            /* Uncomment the line below if you want to nullify the plaintext password field after hashing */
            // password: null 
          }) 
          .eq('id', user.id); // Target the specific user by their ID

        if (updateError) {
          console.error(`Error updating user ${user.id}:`, updateError.message);
        } else {
          console.log(`Successfully hashed and updated password for user ID: ${user.id}`);
        }
      } catch (err) {
        console.error(`Hashing failed for user ${user.id}:`, err.message);
      }
    } else {
      console.log(`User ID: ${user.id} has no plaintext password to hash. Skipping.`);
    }
  }
  console.log('Password hashing and update process completed.');
}

// Execute the function
hashAndUpdateUsers();
