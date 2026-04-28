"use client"
import React from 'react'
import Card from '../../components/Card'

const Page = async ({ params }) => {
    const { id } = await params

    return (
        <div className='main-content p-5'>
            <Card title="NOTES" href={`/notes/${id}`} />
            <Card title="FLASH CARDS" href={`/flashcards/${id}`} />
            <Card title="PRACTICE TEST" href={`/practice-test/${id}`} />
        </div>
    )
}

export default Page