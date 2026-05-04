import Image from 'next/image'
import React from 'react'
import Logo from "../../assets/logo.png"
import Link from 'next/link'

const Header = ({ toggleSideNav }) => {
    return (
        <div className='p-2 flex justify-between items-center shadow-md main-header'>
            <div>
                <i className="fa-solid fa-bars fa-3x cursor-pointer" onClick={toggleSideNav}></i>
            </div>
            <div >
                <Link href="/">
                    <Image src={Logo} alt="logo" height={70} />
                </Link>
            </div>
            <div></div>
        </div>
    )
}

export default Header