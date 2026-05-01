"use client"
import Loading from '@/app/components/Loading'
import Modal from '@/app/components/Modal'
import React, { useEffect, useState } from 'react'

const page = ({ params }) => {
    const [loading, setLoading] = useState(true)
    const [id, setId] = useState()
    const [topic, setTopic] = useState({})
    const [isOpen, setIsOpen] = useState(false)
    const [isQuestionsOpen, setIsQuestionsOpen] = useState(false)
    const [images, setImages] = useState([])
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
                    <div className='p-5 flex image-container gap-5'>
                        {images.map((img, index) => (
                            <div className='position-relative'>
                                <button className='delete' onClick={() => setImages(images.filter((image) => image !== img))}>
                                    &times;
                                </button>
                                <img key={index} src={img.url} alt={`Image ${index}`} className='w-32 h-32' />
                            </div>
                        ))}
                    </div>
                    <div className='pt-2'>
                        <button className='add-image' onClick={() => setIsQuestionsOpen(true)}>
                            Add Questions
                        </button>
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
            setTopic(data)
            setImages(data.images)
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