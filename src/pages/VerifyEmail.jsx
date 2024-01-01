import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import ezio from '../ezio'

import EasyOtpInput from '../components/EasyOtpInput';
import FullScreenLoading from '../components/FullScreenLoading';
import Navbar from '../components/Navbar';

const VerifyEmail = () => {


    const [requestLoading, setRequestLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    const [otpCode, setOtpCode] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            ezio.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            ezio.get('/seller/profile', {})
                .then((response) => {
                    const { success, message, verified, data } = response.data;
                    if (verified) {
                        if (data.shop_name) {
                            navigate('/');
                        } else {
                            navigate('complete-information');
                        }
                    }
                })
                .catch((error) => {
                    if (error.response.status === 401) {
                        localStorage.removeItem('token');
                        navigate('/login');
                    }
                }).finally(() => {
                    setPageLoading(false);
                });
        }
    }, []);


    const handleVerify = (e) => {
        e.preventDefault();
        setRequestLoading(true);

        ezio.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        ezio.post('/seller/email/verify', {
            verification_token: otpCode,
        }).then((response) => {
            //TODO:: need to check success true/false
            if (response.data.verified) {
                navigate('/');
            }
        }).catch((error) => {
            console.log(error);
            if (error.response.status === 401) {
                console.log("Unauthorized");
                //TODO:: Logout and redirect to login
            }
        }).finally(() => {
            setRequestLoading(false);
        });

    }

    return (
        pageLoading
            ? <FullScreenLoading />
            : <div
                className='w-screen h-screen bg-gray-100 flex flex-col items-center justify-center sm:px-0 px-10'>
                <Navbar />
                <div className='flex flex-col bg-white shadow-md py-5 px-5 sm:w-[400px] sm:min-w-[400px] min-w-full rounded-lg items-center'>
                    <h2 className='text-lg font-bold mb-2 text-gray-500'>Email Verification {otpCode}</h2>
                    <span className='text-gray-500 text-sm'>Please enter the 6-digit verification code</span>
                    <span className='text-gray-500 text-sm'> that was send to your email</span>

                    <div className='flex flex-row justify-center mt-5'>
                        <EasyOtpInput
                            length={6}
                            number={true}
                            onChange={setOtpCode}
                            style={''}
                        />
                    </div>

                    <button
                        disabled={requestLoading || otpCode.length < 6}
                        className={`w-full text-white py-2 rounded-md text-sm mt-5 
                    ${(!requestLoading && otpCode.length === 6) && "hover:bg-blue-600"}
                    ${(!requestLoading && otpCode.length === 6) ? "bg-blue-500" : "bg-blue-300 hover:cursor-not-allowed"}`}
                        onClick={handleVerify}>
                        {requestLoading
                            ? "Loading..."
                            : "Continue"}
                    </button>

                    <div className='flex w-full items-center justify-center mt-3 text-sm'>
                        <span className='text-gray-500 text-sm'>Didn't receive an email?</span>
                        <Link to='/resend-email' className='ml-2 font-bold text-blue-600 text-sm'>Resend</Link>
                    </div>
                </div>
            </div>
    )
}

export default VerifyEmail
