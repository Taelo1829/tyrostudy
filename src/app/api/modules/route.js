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


export async function POST(request) {
  const body = await request.json()
  console.log('Request body:', body) // see what's arriving
}