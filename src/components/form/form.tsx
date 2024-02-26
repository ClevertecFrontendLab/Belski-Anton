import { history } from '@redux/configure-store.ts';
import { Tabs } from 'antd';
import { useLocation } from 'react-router-dom';
import LoginForm from './login-form/login-form.tsx';
import RegistrationForm from './registration-form/registration-form.tsx';
import logo from '/assets/icons/logo.svg';
import form from './form.module.css';

export interface IErrorResponse {
    data: { statusCode: number; error: string; message: string };
    status: number;
}

export const AuthForm = () => {
    const { pathname } = useLocation();
    const onChange = (key: string) => {
        history.push(key);
    };
    const checkedTab = pathname.includes('registration') ? '/auth/registration' : '/auth';

    return (
        <>
            <div className={form['wrapper-form-auth']}>
                <img src={logo} className={form['logo-form']} alt='logo' />
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
