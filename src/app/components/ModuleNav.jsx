import Link from 'next/link'
import React from 'react'

const ModuleNav = ({ toggle, href, title, key }) => {
    return (
        <div key={key}>
            <Link href={href} onClick={toggle}>
                <li className="m-4 pl-8">
                    {title}
                </li>
            </Link>
            <hr />
        </div>
    )
}

export default ModuleNav