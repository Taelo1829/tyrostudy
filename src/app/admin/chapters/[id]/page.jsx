"use client"
import Card from '@/app/components/Card'
import Loading from '@/app/components/Loading'
import Modal from '@/app/components/Modal'
import React, { useEffect } from 'react'

const page = ({ params }) => {
    const [id, setId] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [chapters, setChapters] = React.useState([])
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

    if (loading) return <Loading />
    return (
        <div className='main-content p-5'>
            <div>
                {chapters.map((chapter) => (
                    <Card
                        key={chapter.id}
                        title={chapter.title}
                        href={`/admin/chapter/${chapter.id}`} />
                ))}
                <button
                    onClick={addChapter}
                    disabled={loading}
                    className={"submitBtn" + (loading ? " submitBtnLoading" : "")}
                >
                    Add Chapter +
                </button>
                <Modal isOpen={isOpen} onClose={onClose} >
                    <div className='p-5'>
                        <h2 className='text-2xl font-bold mb-4'>Add Chapter</h2>
                        <form>
                            <div className='mb-4'>
                                <label className='block text-gray-700 font-bold mb-2'>Chapter Title</label>
                                <input
                                    type='text'
                                    className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500'
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </div>
                            <div className='mb-4'>
                                <label className='block text-gray-700 font-bold mb-2'>Order Number</label>
                                <input
                                    type='number'
                                    className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500'
                                    value={order}
                                    onChange={(e) => setOrder(e.target.value)}
                                />
                            </div>

                            <div className='flex justify-end'>
                                <button
                                    type='submit'
                                    className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500'
                                    onClick={postChapter}
                                >Submit</button>
                            </div>
                        </form>
                    </div>

                </Modal>
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
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
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