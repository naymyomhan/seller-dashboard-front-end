/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'

import { logo } from '../assets'
import { Archive, ChevronLeftSquare, LayoutDashboard, Menu, MenuIcon, MessageSquareMore, ShoppingBasket, UsersRound } from 'lucide-react'

const Sidebar = () => {

    const [expanded, setExpanded] = useState(true);

    const menus = [
        {
            id: "dashboard",
            icon: <LayoutDashboard />,
            label: "Dashboard",
            alert: false,
        },
        {
            id: "products",
            icon: <Archive />,
            label: "Products",
            alert: false,
        },
        {
            id: "orders",
            icon: <ShoppingBasket />,
            label: "Orders",
            alert: true,
        },
        {
            id: "customers",
            icon: <UsersRound />,
            label: "Customers",
            alert: false,
        },
        {
            id: "reviews",
            icon: <MessageSquareMore />,
            label: "Reviews",
            alert: false,
        }
    ];

    const menuItems = ['dashboard', 'products', 'orders', 'customers', 'reviews'];

    useEffect(() => {
        console.log(window.location.hash);
    });

    return (
        <aside className='h-screen'>
            <nav className='h-full flex flex-col bg-white border-r shadow-sm z-50'>
                <div className={`flex flex-row items-center h-[70px] px-3 ${expanded ? "justify-between" : "justify-center"}`}>
                    <img
                        src={logo}
                        alt="logo"
                        className={`overflow-hidden transition-all ${expanded ? "h-11 mr-12" : "h-0"}`}
                    />
                    <button onClick={() => { setExpanded(!expanded) }}>
                        {expanded
                            ? (<ChevronLeftSquare size={30} className='text-gray-400' />)
                            : (<Menu size={30} className='text-gray-500' />)
                        }

                    </button>
                </div>
                <hr />

                <ul className='flex-1 px-3 py-5'>
                    {menus.map((menu) => (
                        <a key={menu.label} href={`#${menu.id}`}>
                            <li className={`
                            group relative flex items-center py-2 px-3 my-3 font-medium rounded-md cursor-pointer transition-colors 
                            ${menu.id === window.location.hash.substring(1).split('/')[0]
                                    ? "bg-green bg-gradient-to-tr from-blue-50 to-blue-100 text-blue-800"
                                    : "hover:bg-gray-100 text-gray-600"}
                        `}>
                                {menu.icon}
                                <span className={`overflow-hidden transition-all text-sm ${expanded ? "ml-3" : "w-0"}`}>{menu.label}</span>
                                {
                                    menu.alert && (
                                        <div className={`absolute right-2 w-2 h-2 rounded-full bg-blue-600 ${expanded ? "" : "top-2"}`} />
                                    )
                                }
                                {!expanded && (
                                    <div className={`
                                text-sm transition-all absolute left-full rounded-md px-2 py-1 ml-6 opacity-20 -translate-x-3 invisible
                                group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                                `}>
                                        {menu.label}
                                    </div>
                                )}
                            </li>
                        </a>
                    ))}
                </ul>
            </nav>
        </aside >
    )
}

export default Sidebar
