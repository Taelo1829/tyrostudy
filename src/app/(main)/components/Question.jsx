"use client"
import React from 'react'

const Question = ({ question, onEdit, onDelete }) => {
    return (
        <div>
            <div>{question.question}</div>
            <div className='grid grid-cols-2'>
                <div className='btn' onClick={() => onEdit(question)}>Edit</div>
                <div className='btn' onClick={() => onDelete(question)}>Delete</div>
            </div>
        </div>
    )
}

export default Question