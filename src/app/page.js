
import React, { useState, useEffect } from 'react';
import questions from './questions.json';
import './App.css';
import Header from './Header';
import RenderQuestion from './components/RenderQuestion';
import RenderAnswers from './components/RenderAnswers';

function App() {
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [selected, setSelected] = useState(null);
    const [shuffledQuestions, setShuffledQuestions] = useState([]);

    useEffect(() => {
        const shuffled = [...questions].sort(() => Math.random() - 0.5);
        setShuffledQuestions(shuffled);
    }, []);

    const handleAnswer = (option) => {
        setSelected(option);
        setShowAnswer(true);
        if (option === shuffledQuestions[current].answer) {
            setScore(score + 1);
        }
    };

    const nextQuestion = () => {
        let answeredQuestions = JSON.parse(localStorage.getItem("answeredQuestions") ?? "[]")
        do {
            setCurrent(current + 1);
            setShowAnswer(false);
            setSelected(null);
        } while (answeredQuestions.includes(q.id)) {
            setCurrent(current + 1);
            setShowAnswer(false);
            setSelected(null);
        }
        answeredQuestions.push(q.id)
        localStorage.setItem("answeredQuestions", JSON.stringify(answeredQuestions))
    };



    if (current >= shuffledQuestions.length) {
        return (
            <div>
                <h1>Quiz Complete!</h1>
                <p>Your score: {score} / {shuffledQuestions.length}</p>
                <button onClick={() => window.location.reload()}>Restart</button>
            </div>
        );
    }

    const q = shuffledQuestions[current];

    return (
        <div>
            <Header />
            <div className='card'>
                <RenderQuestion question={q.question} type={q.type} data={q.data} />
                <RenderAnswers answer={q.answer} handleAnswer={handleAnswer} options={q.options} selected={selected}
                    showAnswer={showAnswer} type={q.answerType} />
            </div>
            <div className='next'>
                <div>
                    Score: {score} / {shuffledQuestions.length}
                </div>
                <div>
                    {showAnswer && <button onClick={nextQuestion}>Next</button>}
                </div>
            </div>
        </div>
    );
}

export default App;
