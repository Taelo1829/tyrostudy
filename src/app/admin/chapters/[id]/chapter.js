import Link from 'next/link'
import React from 'react'

const Chapter = ({ chapter, href, onDelete, onEdit }) => {

    return (
        <div>
            <div className='pb-2'>
                {chapter.title}
            </div>
            <div className='grid grid-cols-3'>
                <div className='btn'>
                    <Link href={href}>
                        View
                    </Link>
                </div>
                <div className='btn' onClick={() => onEdit(chapter)}>
                    Edit
                </div>
                <div className='btn' onClick={() => onDelete(chapter)}>
                    Delete
                </div>
            </div>
        </div>
    )
}

export default Chapter