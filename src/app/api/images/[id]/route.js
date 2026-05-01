import { NextResponse } from "next/server"

export async function DELETE(request, { params }) {
    try {
        const { id } = await params
        let results = await sql`
        Delete from module_images 
        where id = ${id};`

        return NextResponse.json(results, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}