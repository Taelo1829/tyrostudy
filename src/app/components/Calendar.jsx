import React from 'react'

const Calendar = () => {
    return (
        <div className='p-4'>
            <div className='flex bg-gray-200 text-black pr-2 border-b-1 border-gray-500'>
                <div className='border-r-1 border-gray-500 px-6 text-center '></div>
                <div className='border-r-1 border-gray-500 pr-7 pl-2'>Mon</div>
                <div className='border-r-1 border-gray-500 pr-7 pl-2'>Tue</div>
                <div className='border-r-1 border-gray-500 pr-7 pl-2'>Wed</div>
                <div className='border-r-1 border-gray-500 pr-7 pl-2'>Thur</div>
                <div className='border-r-1 border-gray-500 pr-7 pl-2'>Fri</div>
                <div className='border-r-1 border-gray-500 pr-7 pl-2'>Sat</div>
                <div className='pr-7 pl-2'>Sun</div>
            </div>
            <div className='flex bg-gray-200 text-black pr-2'>
                <div className='border-r-1 border-gray-500 px-1 text-center '>08:00</div>
                <div className='border-r-1 border-gray-500 pr-7 pl-2'>Mon</div>
                <div className='border-r-1 border-gray-500 pr-7 pl-2'>Tue</div>
                <div className='border-r-1 border-gray-500 pr-7 pl-2'>Wed</div>
                <div className='border-r-1 border-gray-500 pr-7 pl-2'>Thur</div>
                <div className='border-r-1 border-gray-500 pr-7 pl-2'>Fri</div>
                <div className='border-r-1 border-gray-500 pr-7 pl-2'>Sat</div>
                <div className='pr-7 pl-2'>Sun</div>
            </div>
            <div className='flex bg-gray-200 text-black pr-2 border-t-1 border-black'>
                <div className='border-r-1 border-gray-500 px-1 text-center '>09:00</div>
                <div className='border-r-1 border-gray-500 pr-7 pl-2'>Mon</div>
                <div className='border-r-1 border-gray-500 pr-7 pl-2'>Tue</div>
                <div className='border-r-1 border-gray-500 pr-7 pl-2'>Wed</div>
                <div className='border-r-1 border-gray-500 pr-7 pl-2'>Thur</div>
                <div className='border-r-1 border-gray-500 pr-7 pl-2'>Fri</div>
                <div className='border-r-1 border-gray-500 pr-7 pl-2'>Sat</div>
                <div className='pr-7 pl-2'>Sun</div>
            </div>
        </div>
    )
}

export default Calendar