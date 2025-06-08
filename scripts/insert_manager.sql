-- Insert manager user with proper Argon2id hashed password
-- Password: 1234567899
-- This hash is generated using the same Argon2id settings as your app

-- Step 1: Insert the user into users table with proper UUID and real hashed password
INSERT INTO users (id, email, username, hashed_password, status, created_at, updated_at)
VALUES (
  gen_random_uuid()::text,                              -- Generate proper UUID
  'manager.john.doe@company.com',                       -- Manager email
  'mgr_johndoe',                                        -- Manager username  
  '$argon2id$v=19$m=19456,t=2,p=1$+BLHrcxHOcvYzJxH+5+aeA$Fh+5ddYh5HWw9E8hShcFeNMhIQiHqXy6fv9F2fXOJpI', -- Real Argon2id hash for "1234567899"
  'active',
  NOW(),
  NOW()
);

-- Step 2: Get the role ID for 'manager' role and assign it
INSERT INTO user_roles (user_id, role_id, assigned_at)
VALUES (
  (SELECT id FROM users WHERE username = 'mgr_johndoe'),  -- Get the user ID we just created
  (SELECT id FROM roles WHERE name = 'manager'),          -- Get the manager role ID
  NOW()
);

-- Verify the created user with role
SELECT 
    u.id,
    u.email,
    u.username,
    u.status,
    r.name as role,
    u.created_at,
    'Password: 1234567899' as login_info
FROM users u
JOIN user_roles ur ON u.id = ur.user_id
JOIN roles r ON ur.role_id = r.id
WHERE u.username = 'mgr_johndoe';