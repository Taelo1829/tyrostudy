import React, { useEffect } from 'react'
import Loading from './Loading';

const FlashCards = ({ id }) => {
    const [question, setQuestion] = React.useState("");
    const [answer, setAnswer] = React.useState("");
    const [tag, setTag] = React.useState("");
    const [current, setCurrent] = React.useState(1);
    const [flipped, setFlipped] = React.useState(false);
    const [modules, setModules] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    let cards = [...modules];

    useEffect(() => {
        console.clear()
        loadModules()
    }, [])

    const viewNewCard = () => {
        if (cards.length) {
            const c = cards[current];
            setQuestion(c.question);
            setAnswer(c.answer);
            setTag(c.tag);
            setFlipped(false)
        }
    }

    function flipCard() {
        setFlipped(!flipped);
        document.getElementById('card').classList.toggle('flipped', flipped);
    }

    function next() {
        if (current < cards.length - 1) {
            setCurrent(current + 1);
            if (!flipped) flipCard()
            viewNewCard()
        }
    }

    function prev() {
        if (current > 0) {
            setCurrent(current - 1);
            if (!flipped) flipCard()
            viewNewCard()
        }
    }
    if (loading) return <Loading />
    return (
        <div className="fc-wrap">
            <div className="fc-meta">
                <span className="fc-counter" id="counter">Card {current + 1} of {modules.length}</span>
            </div>
            <div className="fc-progress">
                <div className="fc-progress-fill" id="progress"
                    style={{
                        width: `${Math.round(((current + 1) / cards.length) * 100)}%`
                    }}
                >
                </div></div>

            <div className="fc-scene" onClick={flipCard}>
                <div className="fc-card" id="card">
                    <div className="fc-face front">
                        <span className="fc-tag" id="tag">
                            {tag}
                        </span>
                        <div className="fc-label">Question</div>
                        <div className="fc-text" id="q-text">
                            {question}
                        </div>
                    </div>
                    <div className="fc-face back">
                        <div className="fc-label">Answer</div>
                        <div className="fc-text" id="a-text">
                            {answer}
                        </div>
                    </div>
                </div>
            </div>

            <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}
            >
                <span
                    style={{ fontSize: "12px" }}
                >Click card or press Space to flip</span>
                {current === cards.length - 1 && <span
                    style={{ fontSize: "12px" }}
                    id="done-label">
                    LAST CARD !!!
                </span>}
            </div>

            <div className="fc-actions">
                <button className="fc-btn" onClick={prev}>← Prev</button>
                <button className="fc-btn primary" onClick={next}>Next →</button>
            </div>
        </div >
    )

    async function loadModules() {
        try {
            const response = await fetch("/api/modules/" + id, { method: "GET" })
            if (response.ok) {
                const body = await response.json()
                setModules(body)
                viewNewCard()
                setLoading(false)
            }
        } catch (error) {
            console.error(error)
        }
    }
}

export default FlashCards