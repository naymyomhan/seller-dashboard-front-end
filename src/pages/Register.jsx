/* eslint-disable no-unused-vars */
import { Building, Key, Mail, Map, MapPin, Milestone, Store, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import FormInputField from '../components/FormInputField';
import { Link, useNavigate } from 'react-router-dom';


import { google } from '../assets'
import Navbar from './layout/Navbar'
import ezio from '../ezio'

import { setUser } from '../features/auth/authSlice'
import { useDispatch } from 'react-redux';
import FullScreenLoading from '../components/FullScreenLoading';

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const [requestLoading, setRequestLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/');
        } else {
            setPageLoading(false);
        }
    }, []);


    const handleRegister = async (e) => {
        e.preventDefault();
        setRequestLoading(true);
        //Validation User Inputs

        ezio.post("/seller/register", {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,
        },).then((response) => {
            const { success, message, data } = response.data;
            //TODO:: need to check success true/false
            localStorage.setItem('token', data.token);

            //request verify code 
            ezio.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
            ezio.post('/seller/verification_token/request',)
                .then((response) => {
                    //TODO:: need to check success true/false
                    console.log(response.data.message);
                }).catch((error) => {
                    console.log(error.response.data.message);
                }).finally(() => {
                    setRequestLoading(false);
                    navigate("/verify-email");
                })
        }).catch((error) => {
            const { success, message } = error.response.data;
            setRequestLoading(false);
            setErrorMessage(message);
        })
    }

    const handleGoogleRegister = () => {
        alert("Google Register");
    }

    return (pageLoading ? <FullScreenLoading />
        : <div
            className='w-screen h-screen bg-gray-100 flex flex-col items-center justify-center sm:px-0 px-10'>
            <Navbar pageName='register' />
            <div className='flex flex-col bg-white shadow-md py-5 px-5 sm:w-[400px] sm:min-w-[400px] min-w-full rounded-lg'>
                <h2 className='text-lg font-bold mb-2'>Create Seller Account</h2>
                {errorMessage && <span className='text-sm text-red-500 text-wrap'>{errorMessage}</span>}
                <FormInputField
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type='text'
                    icon={<User size={20} className='text-gray-500' />}
                    placeholder='Username'
                    disable={requestLoading}
                />
                <FormInputField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type='email'
                    icon={<Mail size={20} className='text-gray-500' />}
                    placeholder='Email'
                    disable={requestLoading}
                />

                <FormInputField
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'
                    icon={<Key size={20} className='text-gray-500' />}
                    placeholder='Password'
                    disable={requestLoading}
                />

                <FormInputField
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    type='password'
                    icon={<Key size={20} className='text-gray-300' />}
                    placeholder='Confirm Password'
                    disable={requestLoading}
                />

                {/* Register Button */}
                <button
                    disabled={requestLoading}
                    className={`bg-blue-500 text-white py-2 rounded-md text-sm mt-5 ${!requestLoading && "hover:bg-blue-600"}`}
                    onClick={handleRegister}>
                    {requestLoading
                        ? "Loading..."
                        : "Register"}
                </button>

                <div className='flex w-full items-center justify-center text-sm my-3'>
                    <span className='text-gray-400'>or continue with</span>
                </div>

                {/* Google Register Button */}
                <button disabled={requestLoading}
                    className={`bg-white py-2 border border-gray-300 rounded-md flex items-center justify-center gap-2 ${!requestLoading && "hover:border-gray-400"}`}
                    onClick={handleGoogleRegister}>
                    <img src={google} alt="google" className='w-5 h-5' />
                    <span className='text-gray-700 font-bold text-sm'>Google</span>
                </button>

                <div className='flex w-full items-center justify-center mt-3 text-sm'>
                    <span className='text-gray-500 text-sm'>Already have an account?</span>
                    <Link to='/login' className='ml-2 font-bold text-blue-600 text-sm underline'>Log In</Link>
                </div>
            </div>
        </div>
    )
}

export default Register
