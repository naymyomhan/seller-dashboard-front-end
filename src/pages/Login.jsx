/* eslint-disable no-unused-vars */
import { Building, Key, Mail, Map, MapPin, Milestone, Store, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import FormInputField from '../components/FormInputField';
import { Link, useNavigate } from 'react-router-dom';

import ezio from '../ezio'
import { google } from '../assets'
import FullScreenLoading from '../components/FullScreenLoading';
import Navbar from '../components/Navbar';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

    const handleLogin = (e) => {
        e.preventDefault();
        setRequestLoading(true);
        //Validation User Inputs

        ezio.post("/seller/login", {
            email: email,
            password: password,
        },).then((response) => {
            setRequestLoading(false);
            setErrorMessage(null);
            const { success, message, data, verified } = response.data;
            //stoe token in local storage
            localStorage.setItem('token', data.token);

            if (verified) {
                navigate("/");
            } else {
                navigate("/verify-email");
            }
        }).catch((error) => {
            setErrorMessage(error.response.data.message);
            setRequestLoading(false);
        });
    }

    const handleGoogleLogin = () => {
        alert("Google Login");
    }

    return (
        pageLoading ? <FullScreenLoading />
            : <div
                className='w-screen h-screen bg-gray-100 flex flex-col items-center justify-center sm:px-0 px-10'>
                <Navbar pageName='login' />
                <div className='flex flex-col bg-white shadow-md py-5 px-5 sm:w-[400px] sm:min-w-[400px] min-w-full rounded-lg'>
                    <h2 className='text-lg font-bold mb-2 text-gray-500'>Login Seller Portal</h2>
                    {errorMessage && <span className='text-sm text-red-500 text-wrap'>{errorMessage}</span>}
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


                    {/* Login Button */}
                    <button
                        disabled={requestLoading}
                        className={`bg-blue-500 text-white py-2 rounded-md text-sm mt-5 ${!requestLoading && "hover:bg-blue-600"}`}
                        onClick={handleLogin}>
                        {requestLoading
                            ? "Loading..."
                            : "Login"}
                    </button>

                    <div className='flex w-full items-center justify-center text-sm my-3'>
                        <span className='text-gray-400'>or continue with</span>
                    </div>

                    {/* Google Register Button */}
                    <button disabled={requestLoading}
                        className={`bg-white py-2 border border-gray-300 rounded-md flex items-center justify-center gap-2 ${!requestLoading && "hover:border-gray-400"}`}
                        onClick={handleGoogleLogin}>
                        <img src={google} alt="google" className='w-5 h-5' />
                        <span className='text-gray-700 font-bold text-sm'>Google</span>
                    </button>

                    <div className='flex w-full items-center justify-center mt-3 text-sm'>
                        <span className='text-gray-500 text-sm'>Already have an account?</span>
                        <Link to='/register' className='ml-2 font-bold text-blue-600 text-sm underline'>Register</Link>
                    </div>
                </div>
            </div>
    )
}

export default Login
