"use client"
import Loading from '@/app/components/Loading'
import React from 'react'
import PowerpointReader from './PowerpointReader'

const page = ({ params }) => {
    const [subchapters, setSubchapters] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [counter, setCounter] = React.useState(0)

    React.useEffect(() => {
        getData()
    }, [])

    console.log(subchapters)
    if (loading) return <Loading />
    return (
        <div className='main-content p-2'>
            {subchapters.map((subchapter, index) => (
                <React.Fragment key={index}>
                    <h2 className='text-2xl font-bold mb-4'>{subchapter.title}</h2>
                    <PowerpointReader />
                </React.Fragment>
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