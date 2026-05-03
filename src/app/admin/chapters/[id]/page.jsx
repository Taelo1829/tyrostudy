"use client"
import Card from '@/app/components/Card'
import Loading from '@/app/components/Loading'
import Modal from '@/app/components/Modal'
import React, { useEffect } from 'react'
import Chapter from './chapter'
import AddModal from '@/app/components/AddModal'

const page = ({ params }) => {
    const [id, setId] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [chapters, setChapters] = React.useState([])
    const [chapterId, setChapterId] = React.useState(0)
    const [isOpen, setIsOpen] = React.useState(false)
    const [title, setTitle] = React.useState('')
    const [order, setOrder] = React.useState(0)

    const onClose = () => setIsOpen(false)
    useEffect(() => {
        getId().then((id) => {
            getChapters(id)
        })
    }, [])

    function addChapter() {
        setIsOpen(true)
    }

    function handleEdit(chapter) {
        setTitle(chapter.title)
        setOrder(chapter.topic_order)
        setChapterId(chapter.id)
        setIsOpen(true)
    }

    function handleDelete(chapter) { }

    if (loading) return <Loading />
    return (
        <div className='main-content' >
            <div className='flex justify-between items-center p-5'>
                <div className='text-2xl'>Chapters</div>
                <div>
                    <button
                        onClick={addChapter}
                        disabled={loading}
                        className={"submitBtn p-2 " + (loading ? " submitBtnLoading" : "")}
                    >
                        Add Chapter +
                    </button>
                </div>
            </div>
            <div style={{
                maxHeight: 600,
                overflowY: "auto"
            }}>
                {chapters.map((chapter) => (
                    <Card
                        key={chapter.id}
                        title={
                            <Chapter
                                chapter={chapter}
                                href={`/admin/chapter/${chapter.id}`}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />}
                        nohref
                    />
                ))}
                <AddModal
                    isOpen={isOpen}
                    onClose={onClose}
                    title="Add Chapter"
                    label="Chapter Title"
                    value={title}
                    setValue={setTitle}
                    order={order}
                    setOrder={setOrder}
                    submit={postChapter}
                />
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
                setChapters(data)

            }
        } catch (error) {
            console.error("Error fetching chapters:", error)
        } finally {
            setLoading(false)
        }
    }

    async function postChapter(e) {
        try {
            e.preventDefault()
            setLoading(true)
            const response = await fetch(`/api/chapters/`, {
                method: chapterId ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    chapterId,
                    moduleId: id,
                    title,
                    orderNumber: order
                }),
            })
            if (response.ok) {
                const data = await response.json()
                getChapters(id)
                setIsOpen(false)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }
}

export default page