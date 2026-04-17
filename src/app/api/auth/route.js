import { sql } from "@vercel/postgres";
import { cleanValue } from "../verify/users";
import { comparePassword, hashPassword } from "../users/hashPassword";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        let { email, password } = await request.json();
        email = cleanValue(email)

        const { rows } = await sql`Select * FROM Users WHERE Email = ${email};`
        if (await comparePassword(password, rows[0].passwordhash)) {
            return NextResponse.json({ loginCookie: rows[0].logincookie }, { status: 201 });
        } else {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }
    } catch (error) {
        console.error(error.message)
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}