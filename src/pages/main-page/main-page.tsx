import { Layout } from 'antd';
import './main-page.css';
import { MainHeader } from '@components/main-header';
import { MainContent } from '@components/main-content';
import { MainFooter } from '@components/main-footer';
import { history } from '@redux/configure-store';

export const MainPage = () => {
    const handleViewReviewsClick = () => { 
        history.push('/feedbacks');
    };
    return (
        <Layout className='site-layout'>
            <MainHeader />
            <MainContent />
            <MainFooter  onViewReviewsClick={handleViewReviewsClick} />
        </Layout>
    );
};
