import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// GET /api/users
export async function GET() {
    try {
        const { rows } = await sql`SELECT * FROM users ORDER BY created_at DESC`;
        return NextResponse.json({ users: rows });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST /api/users
export async function POST(request) {
    try {
        const { name, email } = await request.json();

        if (!name || !email) {
            return NextResponse.json({ error: 'Name and email required' }, { status: 400 });
        }

        const { rows } = await sql`
      INSERT INTO users (name, email)
      VALUES (${name}, ${email})
      RETURNING *
    `;

        return NextResponse.json({ user: rows[0] }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}