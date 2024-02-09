import React, { useState } from 'react';
import { Layout } from 'antd';
import CustomFooter from '@components/main-footer/main-footer';

import logoFit from '/assets/icons/logo-fit-sidebar.svg';
import './main-page.css';
import CustomHeader from '@components/main-header/main-header';
import MainContent from '../../components/main-content/main-content';
import SideBar from '@components/main-sidebar/main-sidebar';

export const MainPage: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [logo, setLogo] = useState('assets/icons/logo.svg');

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
        setLogo(collapsed ? 'assets/icons/logo.svg' : logoFit);
    };

    return (
        <Layout>
            <SideBar collapsed={collapsed} logo={logo} logoFit={logoFit} />
            <Layout className='site-layout'>
                <CustomHeader />

                <MainContent toggleCollapsed={toggleCollapsed} />

                <CustomFooter>Footer</CustomFooter>
            </Layout>
        </Layout>
    );
};

export default MainPage;
