import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { HistoryRouter } from 'redux-first-history/rr6';
import { AuthStatusCard } from '@components/auth-status-card';
import { AuthForm } from '@components/form';
import ChangePassword from '@components/password-recovery/change-password/change-password';
import { PATHS } from '@constants/index';
import BasePage from '@pages/base-page/base-page';
import CalendarPage from '@pages/calendar-page/calendar-page';
import FeedBacks from '@pages/feed-backs/feed-backs';
import NotPage from '@pages/not-page/not-page';
import ProfilePage from '@pages/profile-page/profile-page';
import SettingsPage from '@pages/settings-page/settings-page';

import CardPasswordReset from './components/password-recovery/reset-password/reset-password';
import { AuthPage } from './pages/auth-page';
import { history,store } from './redux/configure-store';
import { MainPage } from './pages';

import 'normalize.css';
import './index.css';
import 'antd/dist/antd.css';

import errorIcon from '/assets/icons/error.svg';
import failed from '/assets/icons/failed.svg';
import success from '/assets/icons/success.svg';
import wrongIcon from '/assets/icons/wrong-icon.svg';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HistoryRouter history={history}>
                <Routes>
                    <Route path='/' element={<BasePage />}>
                        <Route index={true} element={<MainPage />} />
                        <Route path={PATHS.MAIN} element={<MainPage />} />
                        <Route path={PATHS.FEEDBACKS} element={<FeedBacks />} />
                        <Route path={PATHS.CALENDAR} element={<CalendarPage />} />
                        <Route path={PATHS.PROFILE} element={<ProfilePage />} />
                        <Route path={PATHS.SETTINGS} element={<SettingsPage />} />
                        <Route path={PATHS.NOT_PAGE} element={<NotPage />} />
                    </Route>
                    <Route
                        path={PATHS.AUTH}
                        element={
                            <AuthPage>
                                <AuthForm />
                            </AuthPage>
                        }
                    />
                    <Route
                        path={PATHS.AUTH_REGISTRATION}
                        element={
                            <AuthPage>
                                <AuthForm />
                            </AuthPage>
                        }
                    />
                    <Route
                        path={PATHS.RESULT_SUCCESS}
                        element={
                            <AuthPage>
                                <AuthStatusCard
                                    icon={success}
                                    title='Регистрация успешна'
                                    subtitle='Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.'
                                    btnText='Войти'
                                    path={PATHS.AUTH}
                                    dataTestId='registration-enter-button'
                                />
                            </AuthPage>
                        }
                    />
                    <Route
                        path={PATHS.RESULT_SUCCESS_CHANGE_PASSWORD}
                        element={
                            <AuthPage>
                                <AuthStatusCard
                                    icon={success}
                                    title='Пароль успешно изменен'
                                    subtitle='Теперь можно войти в аккаунт, используя свой логин и новый пароль.'
                                    btnText='Вход'
                                    path={PATHS.AUTH}
                                    dataTestId='change-entry-button'
                                />
                            </AuthPage>
                        }
                    />
                    <Route
                        path={PATHS.RESULT_ERROR_USER_EXIST}
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
                        path={PATHS.RESULT_ERROR_CHANGE_PASSWORD}
                        element={
                            <AuthPage>
                                <AuthStatusCard
                                    icon={errorIcon}
                                    title='Данные не сохранились'
                                    subtitle='Что-то пошло не так. Попробуйте ещё раз.'
                                    btnText='Повторить'
                                    path={PATHS.AUTH_CHANGE_PASSWORD}
                                    dataTestId='change-retry-button'
                                />
                            </AuthPage>
                        }
                    />
                    <Route
                        path={PATHS.RESULT_ERROR_USER_EXIST}
                        element={
                            <AuthPage>
                                <AuthStatusCard
                                    icon={errorIcon}
                                    title='Данные не сохранились'
                                    subtitle='Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.'
                                    btnText='Назад к регистрации'
                                    path={PATHS.AUTH_REGISTRATION}
                                    dataTestId='registration-back-button'
                                />
                            </AuthPage>
                        }
                    />
                    <Route
                        path={PATHS.RESULT_ERROR}
                        element={
                            <AuthPage>
                                <AuthStatusCard
                                    icon={errorIcon}
                                    title='Данные не сохранились'
                                    subtitle='Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.'
                                    btnText='Повторить'
                                    path={PATHS.AUTH_REGISTRATION}
                                    dataTestId='registration-retry-button'
                                />
                            </AuthPage>
                        }
                    />

                    <Route
                        path={PATHS.RESULT_ERROR_LOGIN}
                        element={
                            <AuthPage>
                                <AuthStatusCard
                                    icon={failed}
                                    title='Вход не выполнен'
                                    subtitle='Что-то пошло не так. Попробуйте еще раз'
                                    btnText='Повторить'
                                    path={PATHS.AUTH}
                                    dataTestId='login-retry-button'
                                />
                            </AuthPage>
                        }
                    />

                    <Route
                        path={PATHS.RESULT_ERROR_CHECK_EMAIL_NO_EXIST}
                        element={
                            <AuthPage>
                                <AuthStatusCard
                                    icon={errorIcon}
                                    title='Такой e-mail не зарегистрирован'
                                    subtitle='Мы не нашли в базе вашего e-mail. Попробуйте войти c другим e-mail.'
                                    btnText='Попробовать снова'
                                    path={PATHS.AUTH}
                                    dataTestId='check-retry-button'
                                    className='error-exist'
                                />
                            </AuthPage>
                        }
                    />
                    <Route
                        path={PATHS.RESULT_ERROR_CHECK_EMAIL}
                        element={
                            <AuthPage>
                                <AuthStatusCard
                                    icon={wrongIcon}
                                    title='Что-то пошло не так'
                                    subtitle='Произошла ошибка, попробуйте отправить форму ещё раз.'
                                    btnText='Назад'
                                    path={PATHS.AUTH}
                                    dataTestId='check-back-button'
                                    className='error-check'
                                />
                            </AuthPage>
                        }
                    />
                    <Route
                        path={PATHS.AUTH_CONFIRM_EMAIL}
                        element={
                            <AuthPage>
                                <CardPasswordReset />
                            </AuthPage>
                        }
                    />
                    <Route
                        path={PATHS.AUTH_CHANGE_PASSWORD}
                        element={
                            <AuthPage>
                                <ChangePassword />
                            </AuthPage>
                        }
                    />
                </Routes>
            </HistoryRouter>
        </Provider>
    </React.StrictMode>,
);
