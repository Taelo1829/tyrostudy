"use client"
import Card from '@/app/components/Card'
import Loading from '@/app/components/Loading'
import React, { useEffect } from 'react'

const page = ({ params }) => {
    const [chapters, setChapters] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [moduleId, setModuleId] = React.useState(null)
    useEffect(() => {
        getData()
    }, [])

    if (loading) return <Loading />
    return (
        <div className='main-content p-5'>
            {chapters.map((chapter, index) => (
                <Card key={index} title={chapter.title} href={`/chapter/${chapter.id}`} />
            ))}
        </div>
    )

    async function getData() {
        try {
            const { id } = await params
            const res = await fetch(`/api/notes/${id}`)
            const data = await res.json()
            setChapters(data)
            setModuleId(id)
            setLoading(false)
        } catch (error) {
            console.error(error)
        }
    }
}

export default page