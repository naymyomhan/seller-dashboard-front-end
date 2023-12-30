/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Master from './layout/Master'
import { useNavigate } from 'react-router-dom';


import FullScreenLoading from '../components/FullScreenLoading';
import ezio from '../ezio'
import { useDispatch } from 'react-redux';
import { setUser } from '../features/auth/authSlice'

const Dashboard = () => {

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            ezio.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            ezio.get('/seller/profile', {})
                .then((response) => {
                    const { success, message, verified, data } = response.data;
                    if (!verified) {
                        navigate('/verify-email');
                    } else {
                        dispatch(setUser(data));
                        //TODO::check if user have phone, shop_name
                        if (data.phone === null || data.shop_name === null) {
                            //TODO::redirect to update info page
                            navigate('complete-information');
                        }
                    }
                })
                .catch((error) => {
                    if (error.response.status === 401) {
                        // console.log("Unauthorized");
                        localStorage.removeItem('token');
                        navigate('/login');
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
