"use client"
import AddModal from '@/app/components/AddModal'
import Card from '@/app/components/Card'
import Loading from '@/app/components/Loading'
import React, { useEffect } from 'react'

const page = ({ params }) => {
    const [loading, setLoading] = React.useState(true)
    const [id, setId] = React.useState(null)
    const [topics, setTopics] = React.useState([])
    const [isOpen, setIsOpen] = React.useState(false)
    const [title, setTitle] = React.useState('')
    const [order, setOrder] = React.useState(0)
    useEffect(() => {
        getId().then(id => {
            getTopics(id)
        })
    }, [])

    if (loading) return <Loading />
    return (
        <div className='main-content p-5'>
            <div>
                {topics.map((topic) => (
                    <Card key={topic.id} title={topic.title} href={'/admin/topic/' + topic.id} />
                ))}
                <button
                    onClick={() => setIsOpen(true)}
                    disabled={loading}
                    className={"submitBtn" + (loading ? " submitBtnLoading" : "")}
                >
                    Add Topic +
                </button>
            </div>
            <AddModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Add Topic"
                label="Topic Name"
                value={title}
                setValue={setTitle}
                order={order}
                setOrder={setOrder}
                submit={addTopic}
            />
        </div>
    )

    async function getId() {
        const { id } = await params
        setId(id)
        localStorage.setItem("chapter", id)
        return id
    }

    async function getTopics(id) {
        try {
            const response = await fetch(`/api/chapters/${id}`)
            const data = await response.json()
            setTopics(data)
            setLoading(false)
        } catch (error) {
            console.error("Error fetching chapters:", error)
        }
    }

    function addTopic() {
        try {
            setLoading(true)
            fetch("/api/topic", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ topicId: id, title, orderNumber: order }),
            }).then(() => {
                setIsOpen(false)
                getTopics(id)
            })
        } catch (error) {
            console.error(error)
        }
    }
}

export default page