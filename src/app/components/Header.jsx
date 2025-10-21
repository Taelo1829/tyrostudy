import Image from 'next/image'
import React from 'react'
import Logo from "../assets/logo.png"

const Header = () => {
    return (
        <div className='p-5 flex justify-between items-center'>
            <div>
                <i class="fa-solid fa-bars fa-2x"></i>
            </div>
            <div >
                <Image src={Logo} alt="logo" height={50} />
            </div>
        </div>
    )
}

export default Header