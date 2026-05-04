"use client"
import React, { useEffect } from 'react'
import Card from '../../components/Card'

const Page = ({ params }) => {
    const [moduleId, setId] = React.useState()
    useEffect(() => {
        getId()
    }, [])

    async function getId() {
        const { id } = await params
        setId(id)
    }

    return (
        <div className='main-content p-5'>
            <Card title="NOTES" href={`/notes/${moduleId}`} />
            <Card title="FLASH CARDS" href={`/flashcards/${moduleId}`} />
            <Card title="PRACTICE TEST" href={`/practice-test/${moduleId}`} />
        </div>
    )
}

export default Page