import React from 'react'
import ActualLayout from './ActualLayout'

const layout = ({ children }) => {
    return (
        <div>
            <ActualLayout>
                {children}
            </ActualLayout>
        </div>
    )
}

export default layout