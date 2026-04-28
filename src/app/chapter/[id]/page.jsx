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
        <div className='main-content p-5'>
            {subchapters.map((subchapter, index) => (
                <>
                    <div key={index} className='p-5 '>
                        <h2 className='text-md font-bold'><u>{subchapter.title}</u></h2>
                    </div>
                    <div className='powerpoint'></div>
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