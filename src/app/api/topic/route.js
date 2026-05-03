import { sql } from "@vercel/postgres"
import { NextResponse } from "next/server"

export async function POST(request) {
    try {
        const { topicId, title, orderNumber } = await request.json()
        console.log(topicId, title, orderNumber)
        let { rowCount } = await sql`
        INSERT INTO module_subtopics (topicId, title,description, topic_order) 
        VALUES (${topicId}, ${title},'', ${orderNumber})
        ;`

        return NextResponse.json({ rowsInserted: rowCount }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

// export async function PUT(request) {
//     try {
//         const { chapterId, title, orderNumber } = await request.json()
//         let { rowCount } = await sql`
//         Update module_subtopics SET title = ${title}, topic_order = ${orderNumber} WHERE Id = ${chapterId}; `

//         return NextResponse.json({ rowsUpdated: rowCount }, { status: 200 })
//     } catch (error) {
//         console.error(error)
//         return NextResponse.json({ error: error.message }, { status: 500 })
//     }
// }