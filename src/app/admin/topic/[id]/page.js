"use client"
import Loading from '@/app/components/Loading'
import Modal from '@/app/components/Modal'
import React, { useEffect, useState } from 'react'

const page = ({ params }) => {
    const [loading, setLoading] = useState(true)
    const [id, setId] = useState()
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
                    console.log(data)
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
                    <div className='p-5 flex'>
                        {images.map((url, index) => (
                            <img key={index} src={url} alt={`Image ${index}`} className='w-32 h-32' />
                        ))}
                    </div>
                </div>
            </div>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div>Add Images</div>
                <input type="file" className='form-control' onChange={uploadImage} />
                <div className='p-2 flex flex-end w-100'>
                    <button className='add-image' onClick={insertImage}>Insert</button>
                </div>
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
            console.log(data)
            setTopic(data)
            setLoading(false)
        } catch (error) {
            console.error("Error fetching chapters:", error)
        }
    }

    async function insertImage() {
        try {
            const response = await fetch("/api/images", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ subtopicId: id, url: images[images.length - 1] }),
            })
            const data = await response.json()
            setIsOpen(false)
        } catch (error) {
            console.error("Error inserting image:", error)
        }
    }
}

export default page