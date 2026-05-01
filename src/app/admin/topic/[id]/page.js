"use client"
import Loading from '@/app/components/Loading'
import Modal from '@/app/components/Modal'
import React, { useEffect, useState } from 'react'

const page = ({ params }) => {
    const [loading, setLoading] = useState(true)
    const [_, setId] = useState()
    const [topic, setTopic] = useState({})
    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => {
        getId().then(id => {
            getTopics(id)
        })
    }, [])

    console.log( process.env.R2_ACCOUNT_ID)
    if (loading) return <Loading />
    return (
        <div className='main-content p-3'>
            <div className='text-2xl'>Edit Topic</div>
            <hr />
            <div className='form-control-group pt-5'>
                <div>
                    <div>Topic</div>
                    <textarea className='form-control' placeholder='Enter topic title' value={topic?.title || ''} onChange={(e) => setTopic({ ...topic, title: e.target.value })} />
                </div>
                <div className='pt-1'>
                    <div>Description</div>
                    <textarea
                        className='form-control description'
                        placeholder='Enter topic description'
                        value={topic?.description || ''}
                        onChange={(e) => setTopic({ ...topic, description: e.target.value })} />
                </div>
                <div className='pt-1'>
                    <button className='add-image' onClick={() => setIsOpen(true)}>
                        Add Images
                    </button>
                </div>
            </div>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div>Add Images</div>
                <input type="file" className='form-control' />
            </Modal>
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
            setTopic(data)
            setLoading(false)
        } catch (error) {
            console.error("Error fetching chapters:", error)
        }
    }

    async function insertImage() {
        try {

        } catch (error) {
            console.error("Error inserting image:", error)
        }
    }
}

export default page