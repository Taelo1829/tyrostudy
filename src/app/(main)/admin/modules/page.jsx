"use client"
import Card from '@/app/(main)/components/Card'
import Loading from '@/app/(main)/components/Loading'
import Modal from '@/app/(main)/components/Modal'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [loading, setLoading] = React.useState(true)
    const [modules, setModules] = React.useState([])
    const [open, setOpen] = useState(false)
    const [moduleCode, setModuleCode] = useState('')
    function addModule() {
        setOpen(true)
    }

    useEffect(() => {
        getModules()
    }, [])

    if (loading) return <Loading />
    return (
        <div className='main-content p-5'>
            <div className='modules' >
                {modules.map((module) => (
                    <Card key={module.id} title={module.modulecode + " - " + module.modulename} href={`/admin/chapters/${module.id}`} />
                ))}
            </div>

            <div>
                <button
                    onClick={addModule}
                    disabled={loading}
                    className={"submitBtn" + (loading ? " submitBtnLoading" : "")}
                >
                    Add Module +
                </button>
            </div>
            <Modal isOpen={open} onClose={() => setOpen(false)}>
                <h2 className='text-2xl font-bold mb-4'>Add Module</h2>
                <form>
                    <div className='mb-4'>
                        <label className='block text-gray-700 mb-2' htmlFor='moduleCode'>Module Code</label>
                        <input className='w-full px-3 py-2 border rounded' type='text' id='moduleCode' name='moduleCode' />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 mb-2' htmlFor='moduleName'>Module Name</label>
                        <input className='w-full px-3 py-2 border rounded' type='text' id='moduleName' name='moduleName' />
                    </div>
                    <button type='submit' className='submitBtn'>Submit</button>
                </form>
            </Modal>
        </div>
    )

    async function getModules() {
        try {
            const response = await fetch('/api/modules')
            const data = await response.json()
            setModules(data)
            console.log(data)
            setLoading(false)
        } catch (error) {
            console.error("Error fetching modules:", error)
        }
    }
}

export default page