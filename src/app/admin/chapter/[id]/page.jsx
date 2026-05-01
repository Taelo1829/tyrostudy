"use client"
import Card from '@/app/components/Card'
import Loading from '@/app/components/Loading'
import React, { useEffect } from 'react'

const page = ({ params }) => {
    const [loading, setLoading] = React.useState(true)
    const [id, setId] = React.useState(null)
    const [topics, setTopics] = React.useState([])
    useEffect(() => {
        getId().then(id => {
            getTopics(id)
        })
    }, [])

    function addTopic() {

    }

    if (loading) return <Loading />
    return (
        <div className='main-content p-5'>
            <div>
                {topics.map((topic) => (
                    <Card key={topic.id} title={topic.title} href={'/admin/topic/' + topic.id} />
                ))}
                <button
                    onClick={addTopic}
                    disabled={loading}
                    className={"submitBtn" + (loading ? " submitBtnLoading" : "")}
                >
                    Add Topic +
                </button>
            </div>
        </div>
    )

    async function getId() {
        const { id } = await params
        setId(id)
        return id
    }

    async function getTopics(id) {
        try {
            const response = await fetch(`/api/chapters/${id}`)
            const data = await response.json()
            console.log(data)
            setTopics(data)
            setLoading(false)
        } catch (error) {
            console.error("Error fetching chapters:", error)
        }
    }
}

export default page