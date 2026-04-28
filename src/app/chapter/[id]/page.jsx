"use client"
import Loading from '@/app/components/Loading'
import React from 'react'

const page = ({ params }) => {
    const [subchapters, setSubchapters] = React.useState([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        getData()
    }, [])

    if (loading) return <Loading />
    return (
        <div className='main-content p-2'>
            {subchapters.map((subchapter, index) => (
                <>
                    <div className='powerpoint' key={index}>
                        <h2 className='powerpoint-h2'>SUBCHAPTER OVERVIEW</h2>
                        <br />
                        <p className='powerpoint-h1'>{subchapter.title}</p>
                        <p className='powerpoint-h3'>{subchapter.description}</p>
                        {subchapter.tags?.map((tag, idx) => (
                            <div key={`tag-${idx}`} className={`tag`}>
                                {tag}
                            </div>
                        ))}
                    </div>
                </>
            ))}
        </div>
    )


    async function getData() {
        try {
            const { id } = await params
            const res = await fetch(`/api/chapters/${id}`)
            const data = await res.json()
            setSubchapters(data)
            setLoading(false)
        } catch (error) {
            console.error(error)
            setLoading(false)
        }
    }
}

export default page