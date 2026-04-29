import React, { useEffect, useState } from 'react'
import Link from "next/link"
import ModuleNav from './ModuleNav';
const SideNav = ({ toggleSideNav, isOpen }) => {
    //Create a side nav with 5 items using tailwind css that opens and closes smooth animation
    const showClass = isOpen ? "show" : "";
    const [isModulesOpen, setModulesOpen] = useState(false);
    const [modulesZIndex, setModulesZIndex] = useState("zIndexBottom");
    const [modules, setModules] = useState([])
    const direction = isModulesOpen ? "down" : "right";

    useEffect(() => {
        loadModules()
    }, [])
    const toggleModules = () => {
        setModulesOpen(!isModulesOpen);
        if (isModulesOpen) {
            setModulesZIndex("zIndexBottom");
        } else {
            setTimeout(() => {
                setModulesZIndex("");
            }, 300);

        }
    }
    return (
        <div className={"w-64 bg-gray-800 text-white h-screen " + showClass} id="side-nav">
            <div className="header bg-gray-800">
                <div className='flex justify-end text-3xl cursor-pointer m-2' onClick={toggleSideNav}>
                    X
                </div>
                <hr />
                <h2 className="text-lg font-bold h-20 flex justify-center items-center">Tyro Study</h2>
                <hr />
            </div>
            <ul>
                <div className='bg-gray-800 p-4'>
                    <a href="/" >
                        <li >
                            HOME
                        </li>
                    </a>
                </div>
                <hr />
                <div className='bg-gray-800 p-4'>
                    <li className="flex justify-between items-center cursor-pointer">
                        <Link href="/admin">Admin</Link>
                    </li>
                </div>
                <hr />
                <div className='bg-gray-800 p-4'>
                    <li className="flex justify-between items-center cursor-pointer">
                        <div>Time Table</div>
                    </li>
                </div>
                <hr />
                <div className='bg-gray-800 p-4'>
                    <li className="flex justify-between items-center cursor-pointer" onClick={toggleModules} >
                        <div>Modules</div>
                        <div>
                            <i className={'fa fa-chevron-' + direction}></i>
                        </div>
                    </li>
                </div>
                <hr />

                <div className={modulesZIndex + " " + (isModulesOpen ? "show" : "")} id="modules">
                    {modules.map((module, index) => (
                        <ModuleNav
                            key={index}
                            title={module.modulecode + " - " + module.modulename}
                            href={"/module/" + module.id}
                            toggle={toggleSideNav}
                        />
                    ))}
                    <hr />
                </div>
            </ul >
        </div >
    )

    async function loadModules() {
        try {
            const response = await fetch("/api/modules", { method: "GET" })
            if (response.ok) {
                const body = await response.json()
                setModules(body)
            }
        } catch (error) {
            console.error(error)
        }
    }
}

export default SideNav