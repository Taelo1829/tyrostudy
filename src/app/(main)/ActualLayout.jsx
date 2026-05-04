"use client"
import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import SideNav from './components/SideNav';
import AutoInstall from './components/AutoInstall';

const ActualLayout = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [visibility, setVisibility] = useState("");
    const toggleSideNav = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setVisibility("blur-sm zIndexBottom");
        } else {
            setTimeout(() => {
                setVisibility("");
            }, 300);
        }
    }

    return (
        <div >
            <AutoInstall />
            <Header toggleSideNav={toggleSideNav} />
            <SideNav isOpen={isOpen} toggleSideNav={toggleSideNav} />
            {/* </>} */}
            <div className={visibility}>
                {children}
            </div>
        </div>
    )
}

export default ActualLayout