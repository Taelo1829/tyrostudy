import React from 'react'

const PowerpointConstruction = ({ subchapter, counter }) => {
    return (
        <div>
            <div className='powerpoint' key={index}>
                <h2 className='powerpoint-h2'>SUBCHAPTER OVERVIEW</h2>
                <br />
                <p className='powerpoint-h1'>{subchapter.title}</p>
                <p className='powerpoint-h3'>{subchapter.description}</p>
                {subchapter.tags?.map((tag, idx) => (
                    <div key={`tag-${idx}`} className={`tag`}>
                        {tag}
                    </div>
                ))}
            </div>
            <div className='flex justify-between p-2'>
                {counter > 0 && <div className='tag p-2'>PREV</div>}
                <div className='tag p-2'>NEXT</div>
            </div>
        </div>
    )
}

export default PowerpointConstruction