import { SideBar } from '@components/main-sidebar';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './base-page.css';
const BasePage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const accessToken = queryParams.get('accessToken');

        if (accessToken) {
            localStorage.setItem('token', accessToken);
            navigate('/main');
        }
    }, [navigate, location.search]);
    return (
        <Layout>
            <SideBar />
            <Layout className='site-layout'>
                <Outlet />
            </Layout>
        </Layout>
    );
};

export default BasePage;
