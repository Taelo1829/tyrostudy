import { sql } from "@vercel/postgres"
import { NextResponse } from "next/server"

export async function POST(request) {
    try {
        const { moduleId, title, orderNumber } = await request.json()
        let { rowCount } = await sql`
        INSERT INTO module_topics (moduleId, title, topic_order) 
        VALUES (${moduleId}, ${title}, ${orderNumber})
        ;`

        return NextResponse.json({ rowsInserted: rowCount }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function PUT(request) {
    try {
        const { chapterId, title, orderNumber } = await request.json()
        let { rowCount } = await sql`
        Update module_topics SET title = ${title}, topic_order = ${orderNumber} WHERE Id = ${chapterId}; `

        return NextResponse.json({ rowsUpdated: rowCount }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}