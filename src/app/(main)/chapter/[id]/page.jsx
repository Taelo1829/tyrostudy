"use client"
import Loading from '@/app/(main)/components/Loading'
import React from 'react'
import PowerpointReader from './PowerpointReader'
import Modal from '@/app/(main)/components/Modal'
import MultipleChoiceQuestion from '@/app/(main)/components/MultipleChoice'

const page = ({ params }) => {
    const [subchapters, setSubchapters] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [modalOpen, setModalOpen] = React.useState(false)
    const [questions, setQuestions] = React.useState([])
    const [answeredQuestions, setAnsweredQuestions] = React.useState([])
    const [question, setQuestion] = React.useState({})
    React.useEffect(() => {
        console.clear()
        getData()
    }, [])

    function attemptQuiz() {
        setModalOpen(true)
        setLoading(true)
        getQuestions()
    }

    function getNextQuestion() {
        if (answeredQuestions.length === 5) return
        setTimeout(() => {
            let prevIndex = questions.findIndex(item => item.id === question.id)
            let index = Math.round(Math.random() * questions.length)
            while (answeredQuestions.includes(index)) {
                index = Math.round(Math.random() * questions.length)
            }
            setQuestion(questions[index])
            setAnsweredQuestions([...answeredQuestions, prevIndex])
        }, 1000)

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
                    <MultipleChoiceQuestion
                        question={question.question}
                        options={question.answers}
                        onAnswer={(e) => getNextQuestion(e)}
                    />
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
            setQuestion(data[0])
            setLoading(false)

        } catch (error) {
            console.error(error)
        }
    }
}

export default page