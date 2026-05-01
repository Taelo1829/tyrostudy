import { sql } from "@vercel/postgres"
import { NextResponse } from "next/server"

export async function GET(request, { params }) {
    try {
        const { id } = await params
        const { rows } = await sql`
        Select module_subtopics.*, module_images.url,module_images.id as imageId FROM module_subtopics
        LEFT JOIN module_images ON module_subtopics.id = module_images.SubtopicId
        WHERE module_subtopics.Id = ${id};`

        let topic = {
            id: rows[0].id,
            title: rows[0].title,
            description: rows[0].description,
            images: [],
        }
        rows.forEach((row) => {
            if (row.url) {
                topic.images.push({ url: row.url, id: row.imageid })
            }
        })
        return NextResponse.json(topic, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}