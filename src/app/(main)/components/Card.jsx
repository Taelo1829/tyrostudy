import Link from 'next/link'
import React from 'react'

const Card = ({ title, href = "/", nohref }) => {
    let route = (<Link href={href}>
        {title}
    </Link>)
    if (nohref)
        route = title
    return (
        <div className='menu-item'>
            {route}
        </div>
    )
}

export default Card