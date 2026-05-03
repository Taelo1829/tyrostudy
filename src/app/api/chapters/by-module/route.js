import { sql } from "@vercel/postgres"
import { NextResponse } from "next/server"

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const moduleId = searchParams.get("moduleId")
        let { rows } = await sql`
        Select * from module_topics
        WHERE moduleId = ${moduleId}
        ORDER BY topic_order
        ;`

        return NextResponse.json(rows, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}