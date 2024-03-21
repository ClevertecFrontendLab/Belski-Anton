/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useState } from 'react';
import { API_ROUTES, BASE_API_URL, PATHS } from '@constants/index';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setFields, setToken } from '@redux/auth-slice';
import { history } from '@redux/configure-store';
import { setIsLoading } from '@redux/loading-slice';
import { Button, Checkbox, Form, Input } from 'antd';

import { useCheckEmailMutation, useLoginMutation } from '../../../api/methods-api';
import { IErrorResponse } from '../form';

import './login-form.scss';

import logoGoogle from '/assets/icons/google.svg';

const LoginForm = () => {
    const dispatch = useAppDispatch();
    const {
        auth: { email, password },
        router,
    } = useAppSelector((state) => state);
    const [login] = useLoginMutation();
    const [checkEmail] = useCheckEmailMutation();
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [data, setData] = useState({
        email,
        password,
        isRemember: false,
    });

    const handlerCheckEmail = () => {
        dispatch(setIsLoading(true));
        checkEmail(data.email)
            .unwrap()
            .then(() => {
                dispatch(setFields({ email: data.email, password: data.password, token: '' }));
                history.push(PATHS. AUTH_CONFIRM_EMAIL);
            })
            .catch((e: IErrorResponse) => {
                !email &&
                    dispatch(setFields({ email: data.email, password: data.password, token: '' }));
                if (e.status === 404 && e.data.message === 'Email не найден') {
                    history.push(`../..${PATHS.RESULT_ERROR_CHECK_EMAIL_NO_EXIST}`);
                } else {
                    history.push(`../..${PATHS.RESULT_ERROR_CHECK_EMAIL}`);
                }
            })
            .finally(() => dispatch(setIsLoading(false)));
    };

    const loginUser = () => {
        dispatch(setIsLoading(true));
        login({ email: data.email, password: data.password })
            .unwrap()
            .then((res) => {
                if (data.isRemember) {
                    localStorage.setItem('token', res.accessToken);
                } else {
                    dispatch(setToken(res.accessToken));
                }
                history.push(`../..${PATHS.MAIN}`);
            })
            .catch(() => {
                history.push(`..${PATHS.RESULT_ERROR_LOGIN}`);
            })
            .finally(() => dispatch(setIsLoading(false)));
    };

    const handleGoogleAuth = () => {
        const googleAuthUrl = `${BASE_API_URL}${API_ROUTES.authGoogle}`;

        window.location.href = googleAuthUrl;
    };

    useEffect(() => {
        if (
            email &&
            router.previousLocations &&
            router.previousLocations.length > 1 &&
            router.previousLocations[1].location?.pathname === PATHS.RESULT_ERROR_CHECK_EMAIL
        ) {
            handlerCheckEmail();
        }
    }, [email, router.previousLocations]);

    return (
        <div className='wrapper-form-login'>
            <Form
                onFinish={loginUser}
                name='basic'
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                autoComplete='on'
                onFieldsChange={(_, allFields) => {
                    const emailField = allFields.find((field) => field.name[0] === 'email');
                    const isValid = emailField && !emailField?.errors?.length;

                    setIsEmailValid(!!isValid);
                }}
            >
                <Form.Item
                    name='email'
                    rules={[
                        { required: true, message: '' },
                        {
                            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: '',
                        },
                    ]}
                >
                    <Input
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        addonBefore='e-mail'
                        data-test-id={'login-email'}
                    />
                </Form.Item>

                <Form.Item
                    name='password'
                    rules={[
                        { required: true, message: '' },
                        {
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                            message: '',
                        },
                    ]}
                >
                    <Input.Password
                        value={data.password}
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                        placeholder='Пароль'
                        data-test-id={'login-password'}
                        style={{ padding: '10px', marginBottom: '26px' }}
                    />
                </Form.Item>

                <Form.Item>
                    <Form.Item name='remember' noStyle={true}>
                        <Checkbox
                            data-test-id='login-remember'
                            checked={data.isRemember}
                            onChange={(e) => setData({ ...data, isRemember: e.target.checked })}
                        >
                            Запомнить меня
                        </Checkbox>
                    </Form.Item>
                    <Button
                        data-test-id='login-forgot-button'
                        className='login-form-forgot'
                        onClick={() => (isEmailValid ? handlerCheckEmail() : undefined)}
                    >
                        Забыли пароль?
                    </Button>
                </Form.Item>

                <Form.Item>
                    <Button
                        data-test-id={'login-submit-button'}
                        type='primary'
                        htmlType='submit'
                        className='login-button'
                    >
                        Войти
                    </Button>
                </Form.Item>

                <Form.Item>
                    <Button
                        onClick={handleGoogleAuth}
                        type='primary'
                        htmlType='submit'
                        className='login-google-btn'
                        data-test-id='google-submit-button'
                    >
                        <div className='wrapper-button-icon'>
                            <img src={logoGoogle} alt='logo' className='logo-google' />
                            <div className='text-google'>Войти через Google</div>
                        </div>
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginForm;
