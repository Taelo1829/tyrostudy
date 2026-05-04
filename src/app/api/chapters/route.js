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

export async function GET(request) {
    try {
        let { rows } = await sql`
        Select Module_SubTopics.*, module_tags.Title as tag FROM Module_SubTopics
        LEFT JOIN module_tags ON module_tags.SubTopicId = Module_SubTopics.Id
        `

        let subtopicsMap = new Map();
        rows.forEach(row => {
            if (!subtopicsMap.has(row.id)) {
                subtopicsMap.set(row.id, {
                    id: row.id,
                    title: row.title,
                    description: row.description,
                    tags: row.tag ? [row.tag] : []
                });
            } else {
                subtopicsMap.get(row.id).tags.push(row.tag);
            }
        });
        rows = Array.from(subtopicsMap.values())
            .map(subtopic => {
                subtopic.tags = Array.from(new Set(subtopic.tags));
                return subtopic;
            })
        return NextResponse.json(rows, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}