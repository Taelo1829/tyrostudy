import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// GET /api/users
export async function GET() {
    try {
        const { rows } = await sql`SELECT * FROM modules`;
        return NextResponse.json(rows);
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
