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
            const response = NextResponse.json({ message: "authenticated" }, { status: 201 });
            response.cookies.set("auth-token", rows[0].logincookie, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                path: "/",
            });
            return response
        } else {
            return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
        }
    } catch (error) {
        console.error(error.message)
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}