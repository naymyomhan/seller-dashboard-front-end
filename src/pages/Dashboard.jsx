/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Master from './layout/Master'
import { useNavigate } from 'react-router-dom';


import FullScreenLoading from '../components/FullScreenLoading';
import ezio from '../ezio'

const Dashboard = () => {

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            ezio.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            ezio.get('/seller/profile', {})
                .then((response) => {
                    if (!response.data.verified) {
                        //TODO:: redirect to email verify page
                        navigate('/verify-email');
                    } else {
                        //TODO:: store user data
                    }
                })
                .catch((error) => {
                    if (error.response.status === 401) {
                        console.log("Unauthorized");
                        //TODO:: Delete Token and redirect to login
                    }
                }).finally(() => {
                    setLoading(false);
                });
        }
    });

    return (
        loading
            ? <FullScreenLoading />
            : <Master>

            </Master>
    )
}

export default Dashboard
