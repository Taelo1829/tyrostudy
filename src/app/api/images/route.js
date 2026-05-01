import { sql } from "@vercel/postgres"
import { NextResponse } from "next/server"

export async function POST(request) {
    try {
        const { subtopicId, url } = await request.json()
        let results = await sql`
        Insert into module_images (SubtopicId, Url) 
        values (${subtopicId}, ${url});`

        return NextResponse.json(results, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}