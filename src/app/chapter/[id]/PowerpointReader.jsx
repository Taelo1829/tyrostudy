"use client"
import React from 'react'
const PowerpointReader = () => {
    return (
        <div>
            <iframe
                src={`https://view.officeapps.live.com/op/embed.aspx?src=https://pub-d7475f21432949fd83e16ee9fdf86140.r2.dev/chapter1.pptx`}
                width="100%"
                height="250px"
            />
        </div>
    )
}

export default PowerpointReader