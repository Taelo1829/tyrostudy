import { sql } from "@vercel/postgres"
import { NextResponse } from "next/server"

export async function GET(request, { params }) {
    try {
        const { id } = await params
        let { rows } = await sql`
        Select Module_SubTopics.*, module_tags.Title as tag FROM Module_SubTopics
        LEFT JOIN module_tags ON module_tags.SubTopicId = Module_SubTopics.Id
        WHERE TopicId = ${id};`

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
        return NextResponse({ error: error.message }, { status: 500 })
    }
}