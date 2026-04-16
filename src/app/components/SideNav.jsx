import React, { useState } from 'react'
import Link from "next/link"
import ModuleNav from './ModuleNav';
const SideNav = ({ toggleSideNav, isOpen }) => {
    //Create a side nav with 5 items using tailwind css that opens and closes smooth animation
    const showClass = isOpen ? "show" : "";
    const [isModulesOpen, setModulesOpen] = useState(false);
    const [modulesZIndex, setModulesZIndex] = useState("zIndexBottom");
    const direction = isModulesOpen ? "down" : "right";

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
                    <ModuleNav
                        title="COS2601 - Theoretical Computer Science II"
                        href="/module"
                        toggle={toggleSideNav}
                    />
                    <ModuleNav
                        title="COS2611 - Programming: Data Structures"
                        href="/login"
                        toggle={toggleSideNav}
                    />
                    <a href="#">
                        <li className="m-4 pl-8">
                            COS2614 - Programming: Contemporary Concepts
                        </li>
                    </a>
                    <hr />
                    <a href="#">
                        <li className="m-4 pl-8">
                            INF1505 - Introduction to Business Information Systems
                        </li>
                    </a>
                    <hr />
                    <a href="#">
                        <li className="m-4 pl-8">
                            INF1520 - Human-Computer Interaction I
                        </li>
                    </a>
                    <hr />
                    <a href="#">
                        <li className="m-4 pl-8">
                            MAT1503 - Linear Algebra I
                        </li>
                    </a>
                    <hr />
                </div>
            </ul >
        </div >
    )
}

export default SideNav