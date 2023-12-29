/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import Topbar from './Topbar'
import Sidebar from './Sidebar'

const Master = (props) => {
    return (
        <div className='bg-gray-100 flex flex-row'>
            <Sidebar />
            <div className='flex flex-col flex-1'>
                <Topbar />
                {props.children}
            </div>
        </div>
    )
}

export default Master
