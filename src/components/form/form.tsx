import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { history } from '@redux/configure-store.ts';
import { Tabs } from 'antd';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LoginForm from './login-form/login-form.tsx';
import RegistrationForm from './registration-form/registration-form.tsx';
import logo from '/assets/icons/logo.svg';
import { PATHS } from '@constants/index.ts';
import './form.scss';

export interface IErrorResponse {
    data: { statusCode: number; error: string; message: string };
    status: number;
}

export const AuthForm = () => {
    const { pathname } = useLocation();
    const { token } = useAppSelector((state) => state.auth);
    const onChange = (key: string) => {
        history.push(key);
    };
    const checkedTab = pathname.includes('registration') ? PATHS.AUTH_REGISTRATION : PATHS.AUTH;
    useEffect(() => {
        if (token || localStorage.getItem('token')) {
            history.push(PATHS.MAIN);
        }
    }, [token, localStorage]);
    return (
        <>
            <div
                className={`wrapper-form-auth ${
                    pathname.includes('registration') ? 'registration' : ''
                }`}
            >
                <img src={logo} className='logo-form' alt='logo' />
                <Tabs
                    defaultActiveKey={checkedTab}
                    onChange={onChange}
                    items={[
                        {
                            label: `Вход`,
                            key: '/auth',
                            children: <LoginForm />,
                        },
                        {
                            label: `Регистрация`,
                            key: '/auth/registration',
                            children: <RegistrationForm />,
                        },
                    ]}
                />
            </div>
        </>
    );
};
