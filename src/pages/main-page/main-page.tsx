import { Layout } from 'antd';
import React, { useState } from 'react';
import './main-page.css';
import close from '/assets/icons/close.svg';
import open from '/assets/icons/icon-switcher.svg';
import { SideBar } from '@components/main-sidebar';
import { MainHeader } from '@components/main-header';
import { MainContent } from '@components/main-content';
import { MainFooter } from '@components/main-footer';



export const MainPage: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed)
    };

    return (
        <Layout>
            <SideBar collapsed={collapsed} />
            <Layout className='site-layout'>
                <img
                    className='switcher'
                    src={collapsed ? close : open}
                    alt='switcher icon'
                    onClick={toggleCollapsed}
                    data-test-id='sider-switch'
                />
                <MainHeader />

                <MainContent />
                <MainFooter />
            </Layout>
        </Layout>
    );
};

