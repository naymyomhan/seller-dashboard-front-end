import { useEffect, useState } from 'react';

const useHashRoutes = () => {
    const [mainRoute, setMainRoute] = useState('dashboard');

    useEffect(() => {
        console.log('USE HASH ROUTE');
        const handleRoutes = () => {
            if (!window.location.hash) {
                window.location.hash = "#dashboard";
            }

            const handleHashChange = () => {
                const hash = window.location.hash.substring(1);
                const parts = hash.split('/');
                const mainRoute = parts[0];
                setMainRoute(mainRoute);
            };

            window.addEventListener('hashchange', handleHashChange);
            handleHashChange();

            return () => {
                window.removeEventListener('hashchange', handleHashChange);
            };
        };

        handleRoutes();
    }, []);

    return mainRoute;
};

export default useHashRoutes;
