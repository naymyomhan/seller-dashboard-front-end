import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ezio from '../../ezio';
import { setUser } from '../../features/auth/authSlice';

const useCheckAuth = (setPageLoading) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("USE AUTH");
        const handleCheckAuth = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
            } else {
                setPageLoading(true);

                ezio.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                try {
                    const response = await ezio.get('/seller/profile', {});
                    const { success, message, verified, data } = response.data;
                    if (!verified) {
                        navigate('/verify-email');
                    } else {
                        dispatch(setUser(data));
                        if (!data.shop_name) {
                            navigate('complete-information');
                        }
                    }
                } catch (error) {
                    if (error.response && error.response.status === 401) {
                        localStorage.removeItem('token');
                        navigate('/login');
                    }
                } finally {
                    setPageLoading(false);
                }
            }
        };

        handleCheckAuth();
    }, [dispatch, navigate, setPageLoading]);

    return null;
};

export default useCheckAuth;
