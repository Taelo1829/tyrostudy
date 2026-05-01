"use client"
import React, { useEffect } from 'react'

const page = ({ params }) => {
    const [id, setId] = React.useState()
    const [topics, setTopics] = React.useState({})
    useEffect(() => {
        getId().then(id => {
            getTopics(id)
        })
    }, [])
    return (
        <div className='main-content p-3'>
            <h1 className='h1'>{topics?.title}</h1>
        </div>
    )

    async function getId() {
        const { id } = await params
        setId(id)
        return id
    }

    async function getTopics(id) {
        try {
            const response = await fetch(`/api/topic/${id}`)
            const data = await response.json()
            console.log(data)
            setTopics(data)
        } catch (error) {
            console.error("Error fetching chapters:", error)
        }
    }
}

export default page