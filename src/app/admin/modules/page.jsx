"use client"
import React from 'react'

const page = () => {
    const [loading, setLoading] = React.useState(false)
    function addModule() {

    }
    return (
        <div className='main-content p-5'>
            <div>
                <button
                    onClick={addModule}
                    disabled={loading}
                    className={"submitBtn" + (loading ? " submitBtnLoading" : "")}
                >
                    Add Module +
                </button>
            </div>
        </div>
    )
}

export default page