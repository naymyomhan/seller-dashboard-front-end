/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'


import FullScreenLoading from '../../components/FullScreenLoading';
import Topbar from '../../components/Topbar'
import Sidebar from '../../components/Sidebar'
import Dashboard from '../screens/Dashboard';
import Products from '../screens/Products/Products';
import useAuth from './useCheckAuth';
import useHashRoutes from './useHashRoute';

const Master = () => {

    const [pageLoading, setPageLoading] = useState(true);

    const mainRoute = useHashRoutes();
    useAuth(setPageLoading);

    let page;
    switch (mainRoute) {
        case "dashboard":
            page = <Dashboard />
            break;
        case "products":
            page = <Products />
            break;
        case "orders":
            page = "Orders"
            break;
        case "customers":
            page = "Customers"
            break;
        case "reviews":
            page = "Reviews"
            break;
        default:
            page = "Nothing Here"
            break;
    }

    return (
        pageLoading
            ? <FullScreenLoading />
            : <div className='bg-gray-100 flex flex-row h-screen overflow-hidden'>
                <Sidebar />
                <div className='flex flex-col flex-1 overflow-hidden h-screen'>
                    <Topbar />
                    <div className='flex-1 overflow-y-scroll'>
                        {page}
                    </div>
                </div>
            </div>
    )
}

export default Master
