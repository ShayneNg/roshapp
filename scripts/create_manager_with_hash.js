
// Script to create a manager user with properly hashed password
// This ensures the user can actually log in through the frontend

import { Argon2id } from 'oslo/password';
import postgres from 'postgres';
import { config } from 'dotenv';

config();

const sql = postgres(process.env.DATABASE_URL);

async function createManagerUser() {
  try {
    console.log('🔨 Creating manager user with hashed password...');
    
    // Generate proper Argon2id hash
    const password = '1234567899';
    const hashedPassword = await new Argon2id().hash(password);
    
    // Check if manager role exists
    const managerRole = await sql`
      SELECT id FROM roles WHERE name = 'manager' LIMIT 1
    `;
    
    if (managerRole.length === 0) {
      console.log('📝 Creating manager role...');
      await sql`
        INSERT INTO roles (name) VALUES ('manager')
      `;
    }
    
    // Generate UUID for the user
    const userId = crypto.randomUUID();
    
    // Insert the user
    const [newUser] = await sql`
      INSERT INTO users (id, email, username, hashed_password, status, created_at, updated_at)
      VALUES (
        ${userId},
        'manager.john.doe@company.com',
        'mgr_johndoe',
        ${hashedPassword},
        'active',
        NOW(),
        NOW()
      )
      RETURNING *
    `;
    
    // Assign manager role
    await sql`
      INSERT INTO user_roles (user_id, role_id, assigned_at)
      VALUES (
        ${userId},
        (SELECT id FROM roles WHERE name = 'manager'),
        NOW()
      )
    `;
    
    console.log('✅ Manager user created successfully!');
    console.log('📧 Email: manager.john.doe@company.com');
    console.log('👤 Username: mgr_johndoe');
    console.log('🔑 Password: 1234567899');
    console.log('🎭 Role: manager');
    console.log(`🆔 User ID: ${userId}`);
    
    // Verify the user was created correctly
    const verification = await sql`
      SELECT 
        u.id,
        u.email,
        u.username,
        u.status,
        r.name as role,
        u.created_at
      FROM users u
      JOIN user_roles ur ON u.id = ur.user_id
      JOIN roles r ON ur.role_id = r.id
      WHERE u.username = 'mgr_johndoe'
    `;
    
    console.log('\n📋 User verification:', verification[0]);
    
  } catch (error) {
    console.error('❌ Error creating manager user:', error);
  } finally {
    await sql.end();
  }
}

createManagerUser();
