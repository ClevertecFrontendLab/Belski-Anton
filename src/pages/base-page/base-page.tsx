import { SideBar } from '@components/main-sidebar';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PATHS } from '@constants/index';
import Loader from '@components/loader/loader';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import ModalErrorCalendar from '@components/popup/modal-error-calendar/modal-error-calendar';
import './base-page.scss';
const BasePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isLoading } = useAppSelector((store) => store.load);
    const { isError } = useAppSelector((store) => store.error);
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const accessToken = queryParams.get('accessToken');

        if (accessToken) {
            localStorage.setItem('token', accessToken);
            navigate(PATHS.MAIN);
        }
    }, [navigate, location.search]);
    return (
        <>
            <Layout>
                {isLoading && <Loader />}
                <SideBar />
                <Layout className='site-layout'>
                    <Outlet />
                </Layout>
            </Layout>

            <ModalErrorCalendar open={isError} />
        </>
    );
};

export default BasePage;
