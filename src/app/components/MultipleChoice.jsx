"use client"
import { useState } from "react";

const LETTERS = ['A', 'B', 'C', 'D',];

export default function MultipleChoiceQuestion({
    question,
    options,
    onAnswer,
}) {
    const [selected, setSelected] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const isCorrect = submitted && options[selected]?.correct;

    function handleSubmit() {
        if (selected === null || submitted) return;
        setSubmitted(true);
        onAnswer?.({ selectedIndex: selected, correct: options[selected].correct });
    }

    function handleReset() {
        setSelected(null);
        setSubmitted(false);
    }

    return (
        <div className="max-w-xl">
            <p className="text-[17px] font-medium leading-snug text-gray-900 mb-5">
                {question}
            </p>

            <div className="flex flex-col gap-2">
                {options.map((opt, i) => {
                    const state = !submitted
                        ? selected === i ? 'selected' : 'idle'
                        : i === selected
                            ? opt.correct ? 'correct' : 'incorrect'
                            : opt.correct && !isCorrect ? 'reveal' : 'idle';

                    return (
                        <button
                            key={i}
                            disabled={submitted}
                            onClick={() => setSelected(i)}
                            className={[
                                'flex items-start gap-3 px-3.5 py-3 rounded-lg border text-left transition-colors duration-150',
                                state === 'idle' && 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50',
                                state === 'selected' && 'border-blue-400 bg-blue-50',
                                state === 'correct' && 'border-green-600 bg-green-50',
                                state === 'incorrect' && 'border-red-500 bg-red-50',
                                state === 'reveal' && 'border-green-600 bg-green-50',
                            ].filter(Boolean).join(' ')}
                        >
                            {/* Letter badge */}
                            <span className={[
                                'w-5 h-5 min-w-[20px] rounded-full flex items-center justify-center text-[11px] font-medium mt-px border',
                                state === 'idle' && 'bg-gray-100 border-gray-300 text-gray-500',
                                state === 'selected' && 'bg-blue-500 border-blue-500 text-white',
                                state === 'correct' && 'bg-green-700 border-green-700 text-white',
                                state === 'incorrect' && 'bg-red-600 border-red-600 text-white',
                                state === 'reveal' && 'bg-green-700 border-green-700 text-white',
                            ].filter(Boolean).join(' ')}>
                                {state === 'correct' || state === 'reveal' ? '✓' : state === 'incorrect' ? '✗' : LETTERS[i]}
                            </span>

                            {/* Label */}
                            <span className={[
                                'text-[15px] leading-relaxed',
                                (state === 'correct' || state === 'reveal') && 'text-green-800',
                                state === 'incorrect' && 'text-red-800',
                                (state === 'idle' || state === 'selected') && 'text-gray-800',
                            ].filter(Boolean).join(' ')}>
                                {opt.label}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Feedback */}
            {submitted && (
                <div className={[
                    'mt-4 px-3.5 py-3 rounded-lg text-sm leading-relaxed border',
                    isCorrect
                        ? 'bg-green-50 text-green-800 border-green-300'
                        : 'bg-red-50 text-red-800 border-red-300',
                ].join(' ')}>
                    {options[selected].feedback}
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-3 mt-5">
                {!submitted ? (
                    <button
                        onClick={handleSubmit}
                        disabled={selected === null}
                        className="px-4 py-1.5 text-sm rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                        Check answer
                    </button>
                ) : (
                    <button
                        onClick={handleReset}
                        className="px-4 py-1.5 text-sm rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                        Try again
                    </button>
                )}

                {submitted && (
                    <span className={`text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                        {isCorrect ? 'Correct!' : 'Incorrect'}
                    </span>
                )}
            </div>
        </div>
    );
}