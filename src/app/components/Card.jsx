import Link from 'next/link'
import React from 'react'

const Card = ({ title, href = "/" }) => {
    return (
        <div className='menu-item'>
            <Link href={href}>
                {title}
            </Link>
        </div>
    )
}

export default Card