"use client"
import Card from '@/app/components/Card'
import Loading from '@/app/components/Loading'
import Modal from '@/app/components/Modal'
import Question from '@/app/components/Question'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const page = ({ params }) => {
    const [loading, setLoading] = useState(true)
    const [id, setId] = useState()
    const [topic, setTopic] = useState({})
    const [isOpen, setIsOpen] = useState(false)
    const [isQuestionsOpen, setIsQuestionsOpen] = useState(false)
    const [isQuestionOpen, setIsQuestionOpen] = useState(false)
    const [images, setImages] = useState([])
    const [questions, setQuestions] = useState([])
    const [question, setQuestion] = useState({})
    const [chapterTopics, setChapterTopics] = useState([])
    const [chapterTopicId, setChapterTopicId] = useState()
    useEffect(() => {
        getId().then(id => {
            getTopics(id)
            setChapterTopicId(id)
            getQuestions(id)
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
                    setImages([...images, data])
                })
                .catch((error) => {
                    console.error("Error uploading image:", error)
                });
        } catch (error) {
            console.error("Error uploading image:", error)
        }
    }

    if (loading) return <Loading />

    function handleEdit(e) {
        setLoading(true)
        getChapterTopics()
        setQuestion(e)
        setIsQuestionOpen(true)
    }

    function handleDelete(e) {
        console.log(e)
    }

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
                    <div className="grid grid-cols-3 gap-4 p-5">
                        {images.map((img, index) => {
                            let url = img.url
                            if (url.includes("url")) {
                                let bod = JSON.parse(url)
                                url = bod.url
                            }

                            return (
                                <div className='image-container' key={index}>
                                    <button className='delete' onClick={() => deleteImage(img.id)}>
                                        &times;
                                    </button>
                                    <Image
                                        src={url}
                                        alt={`Image ${index}`}
                                        width={256}
                                        height={256} />
                                </div>
                            )
                        })}
                    </div>
                    <div className='pt-2'>
                        <button className='add-image' onClick={() => setIsQuestionsOpen(true)}>
                            Add Questions
                        </button>
                    </div>
                    <div className='pt-5 question-container'>
                        {questions.map((question, index) => {
                            return (
                                <Card
                                    nohref
                                    key={index}
                                    title={
                                        <Question
                                            question={question}
                                            onDelete={handleDelete}
                                            onEdit={handleEdit}
                                        />
                                    }
                                />
                            )
                        })}
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
            <Modal isOpen={isQuestionsOpen} onClose={() => setIsQuestionsOpen(false)}>
                <div>Add Questions</div>
                <div>
                    <input type="file" className='form-control' onChange={uploadQuestion} />
                </div>
            </Modal>
            <Modal isOpen={isQuestionOpen} onClose={() => setIsQuestionOpen(false)}>
                <div>Edit Question</div>
                <textarea
                    style={{ height: 100 }}
                    type="text"
                    className='form-control'
                    value={question.question}
                    onChange={(e) => setQuestion({ ...question, question: e.target.value })} />
                <div>Topic</div>
                <Card
                    nohref
                    title={
                        <select value={chapterTopicId}>
                            {chapterTopics.map((topic) => (
                                <option key={topic.id} value={topic.id}>
                                    {topic.title}
                                </option>
                            ))}
                        </select>
                    }
                />

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

    async function deleteImage(imageId) {
        try {
            setImages(images.filter((img) => img.id !== imageId))
            const response = await fetch(`/api/images/${imageId}`, {
                method: "DELETE",
            })
            const data = await response.json()
        } catch (error) {
            console.error("Error deleting image:", error)
        }
    }

    async function uploadQuestion(file) {
        try {
            setLoading(true)
            const formData = new FormData();
            formData.append("file", file.target.files[0]);
            formData.append('id', id);
            fetch("/api/upload/questions", {
                method: "POST",
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    console.clear()
                    console.log(data)
                    setQuestions([...questions, data])
                    setLoading(false)
                })
                .catch((error) => {
                    console.error("Error uploading image:", error)
                });
        } catch (error) {
            console.error(error)
        } finally {
            setIsQuestionsOpen(false)
        }
    }

    async function getQuestions(topicId) {
        try {
            if (!topicId) topicId = id
            const response = await fetch(`/api/questions/${topicId}`)
            const data = await response.json()
            setQuestions(data)
            setLoading(false)
        } catch (error) {
            console.error(error)
        }
    }

    async function getChapterTopics() {
        try {
            let id = localStorage.getItem("chapter")
            const response = await fetch('/api/chapters/' + id)
            const data = await response.json()
            setLoading(false)
            setChapterTopics(data)
        } catch (error) {
            console.error(error)
        }
    }
}

export default page