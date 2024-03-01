import { SideBar } from '@components/main-sidebar';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import './base-page.css'
const BasePage = () => {
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
