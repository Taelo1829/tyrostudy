import { sql } from "@vercel/postgres"
import { NextResponse } from "next/server"

export async function GET(request, { params }) {
    try {
        const { id } = await params
        let { rows } = await sql`
        Select module_questions.*, module_answers.answer as option FROM module_questions 
        left join module_answers on module_questions.id = module_answers.questionId
        WHERE topicId = ${id};`
        let questionsMap = new Map();
        rows.forEach(row => {
            if (!questionsMap.has(row.id)) {
                questionsMap.set(row.id, {
                    id: row.id,
                    question: row.question,
                    answers: [{
                        label: row.option,
                        correct: row.answerid === 1
                    }]
                });
            } else {
                let answers = questionsMap.get(row.id).answers
                questionsMap.get(row.id).answers.push({
                    label: row.option,
                    correct: row.answerid === answers.length
                });
            }
        })

        let answers = Array.from(questionsMap.values())
        return NextResponse.json(answers, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function PUT(request, { params }) {
    try {
        const { id } = await params
        const { question, topicId } = await request.json()
        let { rowCount } = await sql`
        Update module_questions 
        SET question = ${question}, TopicId = ${topicId}
         WHERE Id = ${id}; `

        return NextResponse.json({ rowCount }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}