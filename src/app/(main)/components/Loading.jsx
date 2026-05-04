import React from 'react'
import { CircleLoader } from 'react-spinners'

const Loading = () => {
    return (
        (<div className="flex justify-center items-center h-screen">
            <CircleLoader size={200} />
        </div>)
    )
}

export default Loading