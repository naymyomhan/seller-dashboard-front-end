/* eslint-disable no-unused-vars */
import { ChevronDown, User } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setUser } from '../features/auth/authSlice';

const Topbar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(setUser(null));
        navigate('/login');
    }

    return (
        <div className='w-full h-16 min-h-16 flex flex-row items-center justify-between px-5 bg-white shadow-sm shadow-gray-200'>
            <span>Dashboard</span>
            <div className='flex flex-row items-center cursor-pointer'>
                <div className='flex flex-col items-end justify-center h-full'>
                    <span className='text-sm font-bold text-gray-800'>{user.name}</span>
                    <span className='text-sm text-gray-500'>{user.email}</span>
                </div>
                <div className='w-12 h-12 rounded-full bg-gray-200 ml-4  relative overflow-hidden'>
                    <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="profile-picture" className='absolute top-0 left-0 w-full h-full object-cover' />
                </div>
                <ChevronDown className='text-gray-500 ml-2' />
            </div>
        </div>
    )
}

export default Topbar
