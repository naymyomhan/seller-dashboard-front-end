/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { logo } from '../../assets'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({ pageName }) => {

    const navigate = useNavigate();

    const handleNewRegister = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        navigate('/register');
    }

    return (
        <div className='w-screen h-[70px] bg-white fixed top-0 left-0 shadow-sm flex flex-row items-center justify-between px-10'>
            <img src={logo} alt="logo" className='h-10' />

            {localStorage.getItem('token') != null
                ? <ul className='list-none flex flex-row gap-4'>
                    <li
                        className={`${pageName == "register" ? "text-blue-500" : "text-gray-700 "} hover:text-blue-500 text-sm cursor-pointer`}>
                        <span>Don't have an account?</span>
                    </li>
                    <li
                        className={`font-bold text-sm cursor-pointer text-blue-500 underline`}>
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
                </ul>}

        </div>
    )
}

export default Navbar
