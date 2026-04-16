import { NextResponse } from 'next/server';
import { hashPassword } from "./hashPassword";
import { sql } from '@vercel/postgres';
import { createUnique } from '../helper';
import { cleanValue } from '../verify/users';


export async function POST(request) {
    try {
        let loginCookie = createUnique()
        let { name, email, password } = await request.json();
        if (!name || !email) {
            return NextResponse.json({ error: 'Name and email required' }, { status: 400 });
        }
        name = cleanValue(name)
        email = cleanValue(email)

        const hashedPassword = await hashPassword(password);
        const { rows } = await sql`
        INSERT INTO users (FullName, Email,PasswordHash, PasswordSALT,LoginCookie, CreatedAt)
        VALUES (${name}, ${email}, ${hashedPassword}, 12,${loginCookie},NOW())
        RETURNING *
        `;

        return NextResponse.json({ user: rows[0] }, { status: 201 });
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

