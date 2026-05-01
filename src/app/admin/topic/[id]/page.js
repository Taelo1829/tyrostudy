"use client"
import Loading from '@/app/components/Loading'
import Modal from '@/app/components/Modal'
import React, { useEffect, useState } from 'react'

const page = ({ params }) => {
    const [loading, setLoading] = useState(true)
    const [_, setId] = useState()
    const [topic, setTopic] = useState({})
    const [isOpen, setIsOpen] = useState(false)
    const [images, setImages] = useState([])
    const [image, setImage] = useState(null)
    useEffect(() => {
        getId().then(id => {
            getTopics(id)
        })
    }, [])

    function uploadImage(file) {
        try {
            const formData = new FormData();
            formData.append("file", file.target.files[0]);
            fetch("/api/upload", {
                method: "POST",
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    setImages([...images, data.url])
                })
                .catch((error) => {
                    console.error("Error uploading image:", error)
                });
        } catch (error) {
            console.error("Error uploading image:", error)
        }
    }

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
                <input type="file" className='form-control' onChange={uploadImage} />
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