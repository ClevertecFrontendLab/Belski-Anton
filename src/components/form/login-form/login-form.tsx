import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Button, Checkbox, Form, Input } from 'antd';
import { setFields } from '@redux/auth-slice';
import { history } from '@redux/configure-store';
import { setIsLoading } from '@redux/loading-slice';
import { useEffect, useState } from 'react';
import { useCheckEmailMutation, useLoginMutation } from '../../../api/auth-api';
import { IErrorResponse } from '../form';
import logoGoogle from '/assets/icons/google.svg';
import loginForm from './login-form.module.css';
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
        email: email,
        password: password,
        isRemember: false,
    });

    const handlerCheckEmail = () => {
        dispatch(setIsLoading(true));
        checkEmail(data.email)
            .unwrap()
            .then(() => {
                dispatch(setFields({ email: data.email, password: data.password }));
                history.push('/auth/confirm-email');
            })
            .catch((e: IErrorResponse) => {
                !email && dispatch(setFields({ email: data.email, password: data.password }));
                if (e.status === 404 && e.data.message === 'Email не найден') {
                    history.push('../../result/error-check-email-no-exist');
                } else {
                    history.push('../../result/error-check-email');
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
                    sessionStorage.setItem('token', res.accessToken);
                }
                history.push('../../main');
            })
            .catch(() => {
                history.push('../result/error-login');
            })
            .finally(() => dispatch(setIsLoading(false)));
    };
    console.log(history.location);
    

    useEffect(() => {
        if (
            email &&
            router.previousLocations &&
            router.previousLocations.length > 1 &&
            router.previousLocations[1].location?.pathname === '/result/error-check-email'
        ) {
            handlerCheckEmail();
        }
    }, [email, router.previousLocations]);
    return (
        <div className={loginForm['wrapper-form-login']}>
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
                        style={{padding:'10px',marginBottom:'26px'}}
                    />
                </Form.Item>

                <Form.Item>
                    <Form.Item name='remember' noStyle>
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
                        className={loginForm['login-form-forgot']}
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
                        className={loginForm['login-button']}
                    >
                        Войти
                    </Button>
                </Form.Item>

                <Form.Item>
                    <Button
                        disabled
                        type='primary'
                        htmlType='submit'
                        className={loginForm['login-google-btn']}
                    >
                        <div className={loginForm['wrapper-button-icon']}>
                            <img src={logoGoogle} alt='logo' className={loginForm['logo-google']} />
                            <div>Войти через Google</div>
                        </div>
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginForm;
