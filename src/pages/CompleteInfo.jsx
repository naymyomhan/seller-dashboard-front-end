import React, { useEffect, useState } from 'react'
import FormInputField from '../components/FormInputField';
import { Building, Castle, Map, MapPin, Milestone, Phone, Store } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ezio from '../ezio';
import FullScreenLoading from '../components/FullScreenLoading';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/auth/authSlice';
import Navbar from '../components/Navbar';

const CompleteInfo = () => {

    const [shopName, setShopName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [postalCode, setPostalCode] = useState('');

    const [requestLoading, setRequestLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

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
                        if (data.shop_name) {
                            navigate('/');
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

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        setRequestLoading(true);

        ezio.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        ezio.post('/seller/profile/update', {
            shop_name: shopName,
            phone: phone,
            address: address,
            city: city,
            state: state,
            country: country,
            postal_code: postalCode,
        }).then((response) => {
            if (response.data.success) {
                navigate('/');
            }
            console.log(response);
        }).catch((error) => {
            console.log(error);
            if (error.response.status === 401) {
                // console.log("Unauthorized");
                localStorage.removeItem('token');
                navigate('/login');
            } else {
                setErrorMessage(error.response.data.message);
                setRequestLoading(false);
            }
        })
    }

    return (
        pageLoading
            ? <FullScreenLoading />
            : <div
                className='w-screen h-screen bg-gray-100 flex flex-col items-center justify-center sm:px-0 px-10'>
                <Navbar verified={true} />
                <div className='flex flex-col bg-white shadow-md py-5 px-5 sm:min-w-[400px] min-w-full rounded-lg'>
                    <h2 className='text-lg font-bold text-gray-500 mb-2'>Complete Seller Information</h2>
                    {errorMessage && <span className='text-sm text-red-500 text-wrap'>{errorMessage}</span>}
                    <FormInputField
                        value={shopName}
                        onChange={(e) => setShopName(e.target.value)}
                        type='text'
                        icon={<Store size={20} className='text-gray-500' />}
                        placeholder='Shop Name ( Required )'
                        disable={requestLoading}
                    />

                    <FormInputField
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        type='phone'
                        icon={<Phone size={20} className='text-gray-500' />}
                        placeholder='Phone ( Required )'
                        disable={requestLoading}
                    />

                    <FormInputField
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        type='text'
                        icon={<MapPin size={20} className='text-gray-500' />}
                        placeholder='Address'
                        disable={requestLoading}
                    />

                    <div className='flex flex-row items-center gap-3'>
                        <FormInputField
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            type='text'
                            icon={<Building size={20} className='text-gray-500' />}
                            placeholder='City'
                            disable={requestLoading}
                        />
                        <FormInputField
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            type='text'
                            icon={<Castle size={20} className='text-gray-500' />}
                            placeholder='State'
                            disable={requestLoading}
                        />
                    </div>

                    <div className='flex flex-row items-center gap-3'>
                        <FormInputField
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            type='text'
                            icon={<Map size={20} className='text-gray-500' />}
                            placeholder='Country'
                            disable={requestLoading}
                        />
                        <FormInputField
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            type='text'
                            icon={<Milestone size={20} className='text-gray-500' />}
                            placeholder='Postal Code'
                            disable={requestLoading}
                        />
                    </div>


                    {/* Login Button */}
                    <button
                        disabled={requestLoading || !shopName || !phone}
                        className={`text-white py-2 rounded-md text-sm mt-5 
                    ${!requestLoading && shopName.length > 2 ? "hover:bg-blue-600" : null}
                    ${!requestLoading && shopName.length > 2 ? "bg-blue-500" : "bg-blue-300 hover:cursor-not-allowed"}`}
                        onClick={handleUpdateProfile}>
                        {requestLoading
                            ? "Loading..."
                            : "Continue"}
                    </button>

                    <div className='flex w-full items-center justify-center mt-3 text-sm'>
                        <span className='text-gray-500 text-sm'>Need help?</span>
                        <Link to='/contact' className='ml-2 font-bold text-blue-600 text-sm underline'>Contact Us</Link>
                    </div>
                </div>
            </div>
    )
}

export default CompleteInfo
