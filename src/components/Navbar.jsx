/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { logo } from '../assets'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { ChevronDown } from 'lucide-react';
import { setUser } from '../features/auth/authSlice';

const Navbar = ({ pageName }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    const handleNewRegister = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        navigate('/register');
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(setUser(null));
        navigate('/login');
    }

    return (
        <div className='w-screen h-[70px] bg-white fixed top-0 left-0 shadow-sm flex flex-row items-center justify-between px-10'>
            <img src={logo} alt="logo" className='h-10' />
            {user
                ? <div className='flex flex-row items-center cursor-pointer'>
                    <div className='flex flex-col items-end justify-center h-full'>
                        <span className='text-sm font-bold text-gray-800'>{user.name}</span>
                        <span className='text-sm text-gray-500'>{user.email}</span>
                    </div>
                    <div className='w-12 h-12 rounded-full bg-gray-200 ml-4  relative overflow-hidden'>
                        <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="profile-picture" className='absolute top-0 left-0 w-full h-full object-cover' />
                    </div>
                    <ChevronDown className='text-gray-500 ml-2' />
                    <button onClick={handleLogout} className='bg-red-400 text-white px-5 py-2'>Log Out</button>
                </div>
                : localStorage.getItem('token') != null
                    ? <ul className='list-none flex flex-row gap-4'>
                        <li className={`text-sm cursor-pointer`}>
                            Don't have an account?
                        </li>
                        <li className={`font-bold text-sm cursor-pointer text-blue-500 underline`}>
                            <button onClick={handleNewRegister}><span className='underline'>Register</span></button>
                        </li>
                    </ul>
                    : <ul className='list-none flex flex-row gap-10'>
                        <li
                            className={`${pageName == "register" ? "text-blue-500" : "text-gray-700 "} hover:text-blue-500 text-sm cursor-pointer`}>
                            <Link to={`/register`}>Register</Link>
                        </li>
                        <li
                            className={`${pageName == "login" ? "text-blue-500" : "text-gray-700 "} hover:text-blue-500 text-sm cursor-pointer`}>
                            <Link to={`/login`}>Log In</Link>
                        </li>
                    </ul>
            }

        </div>
    )
}

export default Navbar
