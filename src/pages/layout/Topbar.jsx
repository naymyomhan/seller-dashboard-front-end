/* eslint-disable no-unused-vars */
import { ChevronDown, User } from 'lucide-react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../features/auth/authSlice';

const Topbar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(setUser(null));
        navigate('/login');
    }

    return (
        <div className='w-full h-16 flex flex-row items-center justify-between px-5 bg-white shadow-sm shadow-gray-200'>
            <span className='text-gray-600 font-bold text-md'>Dashboard</span>
            <button onClick={handleLogout} className='bg-red-400 text-white px-5 py-2'>Log Out</button>
            <div className='flex flex-row items-center cursor-pointer'>
                <div className='w-12 h-12 rounded-full bg-gray-200 ml-4'></div>
                <ChevronDown className='text-gray-500 ml-2' />
            </div>
        </div>
    )
}

export default Topbar
