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
import Lottie from 'lottie-react';
import animationLoader from '../src/loader/animation.json';
const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

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
                                    path='/auth'
                                    dataTestId='registration-enter-button'
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
                                    path='/auth/registration'
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
                                    path='/auth/registration'
                                    dataTestId='check-back-button'
                                />
                            </AuthPage>
                        }
                    />

                    <Route path='/' element={<Navigate to='/auth' />} />
                </Routes>
            </HistoryRouter>
            <Lottie animationData={animationLoader} loop={true} data-test-id='loader' />
        </Provider>
    </React.StrictMode>,
);
