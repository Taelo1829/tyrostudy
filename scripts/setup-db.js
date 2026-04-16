require('dotenv').config({ path: '.env.local' });
const { sql } = require('@vercel/postgres');

async function setup() {
    await sql`
    CREATE TABLE IF NOT EXISTS Users (
      Id SERIAL PRIMARY KEY,
      FullName VARCHAR(255) NOT NULL,
      Email VARCHAR(255) UNIQUE NOT NULL,
      PasswordHash VARCHAR(255) NOT NULL,
      PasswordSALT VARCHAR(255) NOT NULL,
      LoginCookie VARCHAR(255),
      CreatedAt TIMESTAMP DEFAULT NOW()
    );
  `;
    console.log('Table created!');
    process.exit(0);
}

setup().catch(console.error);