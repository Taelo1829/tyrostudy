"use client"
import React from 'react'
import Modal from './Modal'

const AddModal = ({ isOpen, onClose, title, label, value, setValue, order, setOrder, submit }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} >
            <div className='p-5'>
                <h2 className='text-2xl font-bold mb-4'>{title}</h2>
                <form>
                    <div className='mb-4'>
                        <label className='block text-gray-700 font-bold mb-2'>{label}</label>
                        <input
                            type='text'
                            className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500'
                            value={value}
                            onChange={e => setValue(e.target.value)}
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 font-bold mb-2'>Order Number</label>
                        <input
                            type='number'
                            className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500'
                            value={order}
                            onChange={(e) => setOrder(e.target.value)}
                        />
                    </div>

                    <div className='flex justify-end'>
                        <button
                            type='submit'
                            className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500'
                            onClick={submit}
                        >Submit</button>
                    </div>
                </form>
            </div>

        </Modal>
    )
}

export default AddModal