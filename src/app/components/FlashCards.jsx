import React, { useEffect } from 'react'
import Loading from './Loading';

const FlashCards = ({ id }) => {
    const allCards = [
        { tag: "Core concept", q: "What is the central question of computer theory?", a: "Whether a task can be done at all — not how to do it best." },
        { tag: "Core concept", q: "What is a 'machine' in computer theory?", a: "A mathematical model used to study what types of tasks can be performed and their limitations." },
        { tag: "Core concept", q: "What is the 'language' of a machine?", a: "The set of all inputs on which the machine operates successfully." },
        { tag: "Three areas", q: "What are the three major areas of computer theory?", a: "Theory of automata, theory of formal languages, and theory of Turing machines." },
        { tag: "History", q: "What did Hilbert propose in 1900?", a: "A mechanical system to prove all true mathematical statements — essentially imagining a proof-generating algorithm before computers existed." },
        { tag: "History", q: "What did Gödel prove in 1931?", a: "No algorithm can prove all true statements in mathematics — either some truths are unprovable, or some false statements have proofs." },
        { tag: "History", q: "What did Turing prove about his universal machine?", a: "There are fundamental questions about the machine itself that the machine cannot answer." },
        { tag: "Key figures", q: "What did McCulloch and Pitts contribute to computer theory?", a: "A mathematical model of animal neural nets — a theoretical machine similar to Turing's but with certain limitations." },
        { tag: "Key figures", q: "What did Noam Chomsky contribute?", a: "Mathematical models for describing languages, which shed light on formal and computer languages." },
        { tag: "Key result", q: "What is the ultimate result of the course?", a: "No matter how powerful a machine is, there will always be simple, well-defined problems it cannot solve." },
        { tag: "Terminology", q: "Why is 'computation' a misleading name for this field?", a: "It implies arithmetic, but computers also do word processing, sorting, searching, and more — 'computer theory' is broader and more accurate." },
        { tag: "Core concept", q: "Why are computer languages easy for machines but human languages hard?", a: "We know exactly how machines parse instructions; human language understanding is far more complex and not fully understood." },
        { tag: "History", q: "What role did WW2 play in building the first computer?", a: "Military funding to break the German secret code provided the motivation and resources; Turing himself helped build the machine." },
        { tag: "Core concept", q: "What is an algorithm, and what steps are not allowed?", a: "A precise procedure or program. Steps like guessing or trying infinitely many possibilities at once are prohibited — only definite, executable steps are allowed." },
        { tag: "Method", q: "What is the core interplay method used throughout the course?", a: "Introduce a new machine → learn its language. Develop a new language → find a machine that corresponds to it." },
    ];
    const [question, setQuestion] = React.useState("");
    const [answer, setAnswer] = React.useState("");
    const [tag, setTag] = React.useState("");
    const [current, setCurrent] = React.useState(1);
    const [flipped, setFlipped] = React.useState(false);
    const [modules, setModules] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    let cards = [...allCards];

    console.log(modules)

    useEffect(() => {
        console.clear()
        loadModules()
    }, [])

    const viewNewCard = () => {
        const c = cards[current];
        setQuestion(c.q);
        setAnswer(c.a);
        setTag(c.tag);
        setFlipped(false)
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
                <span className="fc-counter" id="counter">Card {current + 1} of {allCards.length}</span>
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