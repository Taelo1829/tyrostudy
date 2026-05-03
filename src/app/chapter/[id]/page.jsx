"use client"
import Loading from '@/app/components/Loading'
import React from 'react'
import PowerpointReader from './PowerpointReader'
import Modal from '@/app/components/Modal'
import MultipleChoiceQuestion from '@/app/components/MultipleChoice'

const page = ({ params }) => {
    const [subchapters, setSubchapters] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [modalOpen, setModalOpen] = React.useState(false)
    const [questions, setQuestions] = React.useState([])
    React.useEffect(() => {
        getData()
    }, [])

    function attemptQuiz() {
        setModalOpen(true)
        setLoading(true)
        getQuestions()
    }
    if (loading) return <Loading />
    return (
        <div className='main-content p-2'>
            {subchapters.map((subchapter, index) => (
                <React.Fragment key={index}>
                    <h2 className='text-md font-bold mb-4'>{subchapter.title}</h2>
                    <PowerpointReader />
                </React.Fragment>
            ))}
            <div className='pt-5'>
                <button
                    className='add-image'
                    onClick={attemptQuiz}
                >
                    Attempt Quiz
                </button>
            </div>

            <Modal isOpen={modalOpen} defaultFullscreen onClose={() => setModalOpen(false)}>
                <div className='main-content'>
                    {questions.map((question, index) => (
                        <MultipleChoiceQuestion
                            key={index}
                            question={question.question}
                            options={question.answers}
                            onAnswer={(e) => console.log(e)}
                        />
                    ))}
                </div>
            </Modal>
        </div>
    )


    async function getData() {
        try {
            const { id } = await params
            const res = await fetch(`/api/chapters/${id}`)
            const data = await res.json()
            setSubchapters(data)
            setLoading(false)
        } catch (error) {
            console.error(error)
            setLoading(false)
        }
    }


    async function getQuestions() {
        try {
            const { id } = await params
            const res = await fetch(`/api/questions/${id}`)
            const data = await res.json()
            setQuestions(data)
            setLoading(false)
        } catch (error) {
            console.error(error)
        }
    }
}

export default page