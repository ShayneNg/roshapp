
// Utility script to generate Argon2id password hashes compatible with your app
// Usage: node scripts/generate_hash.js <password>

import { Argon2id } from 'oslo/password';

const password = process.argv[2];
if (!password) {
  console.error('Please provide a password as argument');
  console.error('Usage: node scripts/generate_hash.js <password>');
  process.exit(1);
}

async function generateHash() {
  try {
    const hash = await new Argon2id().hash(password);
    console.log(`Password: ${password}`);
    console.log(`Argon2id Hash: ${hash}`);
    console.log('\nSQL Update Statement:');
    console.log(`UPDATE users SET hashed_password = '${hash}' WHERE username = 'your_username';`);
  } catch (error) {
    console.error('Error generating hash:', error);
  }
}

generateHash();
