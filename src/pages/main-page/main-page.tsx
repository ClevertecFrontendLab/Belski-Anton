import { Layout } from 'antd';
import './main-page.css';
import { SideBar } from '@components/main-sidebar';
import { MainHeader } from '@components/main-header';
import { MainContent } from '@components/main-content';
import { MainFooter } from '@components/main-footer';

export const MainPage = () => {
    return (
        <Layout>
            <SideBar />
            <Layout className='site-layout'>
                <MainHeader />
                <MainContent />
                <MainFooter />
            </Layout>
        </Layout>
    );
};
