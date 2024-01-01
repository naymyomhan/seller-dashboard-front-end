import React, { useEffect, useState } from 'react'
import ProductList from './ProductList';
import CreateProduct from './CreateProduct';

const Products = () => {

    const [subRoute, setSubRoute] = useState('');
    const [routeParams, setRouteParams] = useState('');

    useEffect(() => {
        handleRoutes();
    }, []);

    const handleRoutes = () => {
        const handleHashChange = () => {
            const hash = window.location.hash.substring(1);
            const parts = hash.split('/');

            const subRoute = parts[1];
            const params = parts.slice(1);

            setSubRoute(subRoute);
            console.log(subRoute);
            setRouteParams(params);
        };

        window.addEventListener('hashchange', handleHashChange);
        handleHashChange();

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }

    let page;

    switch (subRoute) {
        case undefined:
            page = <ProductList />
            break;
        case 'create':
            page = <CreateProduct />
            break;

        default:
            break;
    }

    return (
        <div>{page}</div>
    )
}

export default Products
