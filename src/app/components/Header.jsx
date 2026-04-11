import Image from 'next/image'
import React from 'react'
import Logo from "../assets/logo.png"

const Header = ({ toggleSideNav }) => {
    return (
        <div className='p-5 flex justify-between items-center shadow-2xl main-header'>
            <div>
                <i className="fa-solid fa-bars fa-3x cursor-pointer" onClick={toggleSideNav}></i>
            </div>
            <div >
                <Image src={Logo} alt="logo" height={70} />
            </div>
            <div></div>
        </div>
    )
}

export default Header