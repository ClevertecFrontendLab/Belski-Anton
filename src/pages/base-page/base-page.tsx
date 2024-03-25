import React,{ useEffect } from 'react';
import { Outlet,useLocation,useNavigate } from 'react-router-dom';
import Loader from '@components/loader/loader';
import { SideBar } from '@components/main-sidebar';
import ModalErrorCalendar from '@components/popup/modal-error-calendar/modal-error-calendar';
import { PATHS } from '@constants/index';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Layout } from 'antd';

import { useGetUserDataQuery } from '../../api/methods-api';

import './base-page.scss';

const BasePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isLoading } = useAppSelector((store) => store.load);
    const { isError } = useAppSelector((store) => store.error);

   useGetUserDataQuery()

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const accessToken = queryParams.get('accessToken');

        if (accessToken) {
            localStorage.setItem('token', accessToken);
            navigate(PATHS.MAIN);
        }
    }, [navigate, location.search]);

    return (
        <React.Fragment>
            <Layout>
                {isLoading && <Loader />}
                <SideBar />
                <Layout className='site-layout'>
                    <Outlet />
                </Layout>
            </Layout>

            <ModalErrorCalendar open={isError} />
        </React.Fragment>
    );
};

export default BasePage;
