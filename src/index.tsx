import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import { MainPage } from './pages';
import { AuthPage } from './pages/auth-page';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import { store, history } from './redux/configure-store';
import 'normalize.css';
import './index.css';
import 'antd/dist/antd.css';
import { AuthForm } from '@components/form';
import {LoginFailed} from '@components/login-failed';
const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router history={history}>
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
                        path='/login-failed'
                        element={
                            <AuthPage>
                                <LoginFailed />
                            </AuthPage>
                        }
                    />
                    <Route path='/' element={<Navigate to='/auth' />} />
                </Routes>
            </Router>
        </Provider>
    </React.StrictMode>,
);
