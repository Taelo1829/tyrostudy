"use client"
import Card from '@/app/components/Card'
import Loading from '@/app/components/Loading'
import React, { useEffect } from 'react'

const page = ({ params }) => {
    const [id, setId] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [chapters, setChapters] = React.useState([])
    useEffect(() => {
        getId().then((id) => {
            getChapters(id)
        })
    }, [])

    function addChapter() {
        console.log(id)
    }

    if (loading) return <Loading />
    return (
        <div className='main-content p-5'>
            <div>
                {chapters.map((chapter) => (
                    <Card key={chapter.id} title={chapter.title} href={`/admin/chapter/${chapter.id}`} />
                ))}
                <button
                    onClick={addChapter}
                    disabled={loading}
                    className={"submitBtn" + (loading ? " submitBtnLoading" : "")}
                >
                    Add Chapter +
                </button>
            </div>
        </div>
    )

    async function getId() {
        const { id } = await params
        setId(id)
        return id
    }

    async function getChapters(id) {
        try {
            const response = await fetch(`/api/chapters/by-module?moduleId=${id}`)
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                setChapters(data)

            }
        } catch (error) {
            console.error("Error fetching chapters:", error)
        } finally {
            setLoading(false)
        }
    }
}

export default page