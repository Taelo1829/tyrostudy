import { sql } from "@vercel/postgres"
import { NextResponse } from "next/server"

export async function GET(request, { params }) {
    try {
        const { id } = await params
        const { rows } = await sql`
        Select * FROM module_topics
         WHERE ModuleId = ${id}
         Order by topic_order
         ;`
        return NextResponse.json(rows, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}