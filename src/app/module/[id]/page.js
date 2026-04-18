"use client"
import React from 'react'
import FlashCards from '../../components/FlashCards'

const Page = async ({ params }) => {
    const { id } = await params

    return (
        <FlashCards id={id} />
    )
}

export default Page