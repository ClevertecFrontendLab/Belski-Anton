import 'normalize.css';
import './index.css';
import 'antd/dist/antd.css';

import React from 'react';
import failed from '/assets/icons/failed.svg';
import errorIcon from '/assets/icons/error.svg';
import success from '/assets/icons/success.svg';
import wrongIcon from '/assets/icons/wrong-icon.svg';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { MainPage } from './pages';
import { AuthPage } from './pages/auth-page';
import { HistoryRouter } from 'redux-first-history/rr6';
import { store, history } from './redux/configure-store';

import { AuthForm } from '@components/form';
import { AuthStatusCard } from '@components/auth-status-card';
import CardPasswordReset from './components/password-recovery/reset-password/reset-password';
import ChangePassword from '@components/password-recovery/change-password/change-password';
const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
const AuthRedirect = () => {
    const isAuthenticated = localStorage.getItem('token');

    return isAuthenticated ? <Navigate to='/main' replace /> : <Navigate to='/auth' replace />;
};

export default AuthRedirect;
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HistoryRouter history={history}>
                <Routes>
                    <Route path='/main' element={<MainPage />} />
                    <Route
                        path='/auth'
                        element={
                            <AuthPage>
                                <AuthForm />
                            </AuthPage>
                        }
                    />
                    <Route
                        path='/auth/registration'
                        element={
                            <AuthPage>
                                <AuthForm />
                            </AuthPage>
                        }
                    />
                    <Route
                        path='/result/success'
                        element={
                            <AuthPage>
                                <AuthStatusCard
                                    icon={success}
                                    title='Регистрация успешна'
                                    subtitle='Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.'
                                    btnText='Войти'
                                    path='../../auth'
                                    dataTestId='registration-enter-button'
                                />
                            </AuthPage>
                        }
                    />
                    <Route
                        path='/result/success-change-password'
                        element={
                            <AuthPage>
                                <AuthStatusCard
                                    icon={success}
                                    title='Пароль успешно изменен'
                                    subtitle='Теперь можно войти в аккаунт, используя свой логин и новый пароль.'
                                    btnText='Вход'
                                    path='../../auth'
                                    dataTestId=''
                                />
                            </AuthPage>
                        }
                    />
                    <Route
                        path='/result/error-user-exist'
                        element={
                            <AuthPage>
                                <AuthStatusCard
                                    icon={errorIcon}
                                    title='Данные не сохранились'
                                    subtitle='Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.'
                                    btnText='Назад к регистрации'
                                    path='/auth/registration'
                                    dataTestId='registration-back-button'
                                />
                            </AuthPage>
                        }
                    />
                    <Route
                        path='/result/error-change-password'
                        element={
                            <AuthPage>
                                <AuthStatusCard
                                    icon={errorIcon}
                                    title='Данные не сохранились'
                                    subtitle='Что-то пошло не так. Попробуйте ещё раз.'
                                    btnText='Повторить'
                                    path='/auth/change-password'
                                    dataTestId='change-retry-button'
                                />
                            </AuthPage>
                        }
                    />
                    <Route
                        path='/result/error-user-exist'
                        element={
                            <AuthPage>
                                <AuthStatusCard
                                    icon={errorIcon}
                                    title='Данные не сохранились'
                                    subtitle='Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.'
                                    btnText='Назад к регистрации'
                                    path='/auth/registration'
                                    dataTestId='registration-back-button'
                                />
                            </AuthPage>
                        }
                    />
                    <Route
                        path='/result/error'
                        element={
                            <AuthPage>
                                <AuthStatusCard
                                    icon={errorIcon}
                                    title='Данные не сохранились'
                                    subtitle='Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.'
                                    btnText='Повторить'
                                    path='/auth/registration'
                                    dataTestId='registration-retry-button'
                                />
                            </AuthPage>
                        }
                    />

                    <Route
                        path='/result/error-login'
                        element={
                            <AuthPage>
                                <AuthStatusCard
                                    icon={failed}
                                    title='Вход не выполнен'
                                    subtitle='Что-то пошло не так. Попробуйте еще раз'
                                    btnText='Повторить'
                                    path='/auth'
                                    dataTestId='login-retry-button'
                                />
                            </AuthPage>
                        }
                    />

                    <Route
                        path='/result/error-check-email-no-exist'
                        element={
                            <AuthPage>
                                <AuthStatusCard
                                    icon={errorIcon}
                                    title='Такой e-mail не зарегистрирован'
                                    subtitle='Мы не нашли в базе вашего e-mail. Попробуйте войти c другим e-mail.'
                                    btnText='Попробовать снова'
                                    path='/auth'
                                    dataTestId='check-retry-button'
                                />
                            </AuthPage>
                        }
                    />
                    <Route
                        path='/result/error-check-email'
                        element={
                            <AuthPage>
                                <AuthStatusCard
                                    icon={wrongIcon}
                                    title='Что-то пошло не так'
                                    subtitle='Произошла ошибка, попробуйте отправить форму ещё раз.'
                                    btnText='Назад'
                                    path='/auth'
                                    dataTestId='check-back-button'
                                />
                            </AuthPage>
                        }
                    />
                    <Route path='/auth/confirm-email' element={<CardPasswordReset />} />
                    <Route
                        path='/auth/change-password'
                        element={
                            <AuthPage>
                                <ChangePassword />
                            </AuthPage>
                        }
                    />
                    {/* <Route path='/auth/change-password' element={<ChangePassword />} /> */}

                    <Route path='/' element={<AuthRedirect />} />
                </Routes>
            </HistoryRouter>
        </Provider>
    </React.StrictMode>,
);
