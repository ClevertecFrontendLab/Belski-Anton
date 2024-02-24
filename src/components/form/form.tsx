import './form.css';
import { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Tabs } from 'antd';
import logo from '/assets/icons/logo.svg';
import logoGoogle from '/assets/icons/google.svg';
import { useLocation } from 'react-router-dom';
import {
    useCheckEmailMutation,
    useLoginMutation,
    useRegistrationMutation,
} from '../../api/auth-api.ts';
import { history } from '@redux/configure-store.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { clearAuthState, setFields } from '@redux/auth-slice.ts';
import { setIsLoading } from '@redux/loading-slice.ts';

interface IBaseForm {
    isRegistration: boolean;
}
interface IErrorResponse {
    data: { statusCode: number; error: string; message: string };
    status: number;
}

const BaseForm = ({ isRegistration}: IBaseForm) => {
    const dispatch = useAppDispatch();
    const {
        auth: { email, password },
        router,
    } = useAppSelector((state) => state);
    const [registration] = useRegistrationMutation();
    const [login] = useLoginMutation();
    const [checkEmail] = useCheckEmailMutation();
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [data, setData] = useState({
        email: email,
        password: password,
        confirmPassword: password,
        isRemember: false,
    });

    const handlerCheckEmail = () => {
        if (isEmailValid) {
            
            dispatch(setIsLoading(true))
            checkEmail(data.email)
                .unwrap()
                .then(() => {
                    dispatch(setFields({ email: data.email, password: data.password }));
                    history.push('../../auth/confirm-email');
                })
                .catch((e: IErrorResponse) => {
                    if (e.status === 404 && e.data.message === 'Email не найден') {
                        history.push('../../result/error-check-email-no-exist');
                    } else {
                        history.push('../../result/error-check-email');
                    }
                })
                .finally(() => dispatch(setIsLoading(false)));
        }
    };

    const handlerError = (e: IErrorResponse) => {
        switch (e.status) {
            case 409:
                history.push('../../result/error-user-exist');
                break;
            default:
                dispatch(setFields({ email: data.email, password: data.password }));
                history.push('../../result/error');
        }
    };

    const registrationUser = () => {
        dispatch(setIsLoading(true));
        registration({ email: data.email, password: data.password })
            .unwrap()
            .then(() => {
                if (email) {
                    dispatch(clearAuthState());
                }
                history.push('../../result/success');
            })
            .catch((e) => {
                handlerError(e);
            })
            .finally(() => dispatch(setIsLoading(false)))
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

    useEffect(() => {
        if (
            email &&
            password &&
            router.previousLocations &&
            router.previousLocations[1].location?.pathname ===
                '/result/error'
        ) {
            registrationUser();
        }
    }, [email, password, router.previousLocations]);
    return (
        <>
            <div className='wrapper-form'>
                <Form
                    onFinish={isRegistration ? registrationUser : loginUser}
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
                            { required: true, message: 'Пожалуйста, введите свой пароль' },
                            {
                                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: 'Пожалуйста, введите правильный e-mail!',
                            },
                        ]}
                    >
                        <Input
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                            addonBefore='e-mail'
                            data-test-id={isRegistration ? 'registration-email' : 'login-email'}
                        />
                    </Form.Item>

                    <Form.Item
                        name='password'
                        rules={[
                            { required: true, message: 'Пожалуйста, введите свой пароль!!' },
                            {
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                                message: 'Пароль не менее 8 символов, заглавной буквой и цифрой!',
                            },
                        ]}
                        help={
                            isRegistration
                                ? 'Пароль не менее 8 символов, c заглавной буквой и цифрой'
                                : ''
                        }
                    >
                        <Input.Password
                            value={data.password}
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                            placeholder='Пароль'
                            data-test-id={
                                isRegistration ? 'registration-password' : 'login-password'
                            }
                        />
                    </Form.Item>

                    {isRegistration ? (
                        <Form.Item
                            name='confirmPassword'
                            dependencies={['password']}
                            rules={[
                                {
                                    required: true,
                                    message: 'Пожалуйста, повторите свой пароль!!!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Пароли не совпадают'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                value={data.confirmPassword}
                                onChange={(e) =>
                                    setData({ ...data, confirmPassword: e.target.value })
                                }
                                placeholder='Повторите пароль'
                                data-test-id='registration-confirm-password'
                            />
                        </Form.Item>
                    ) : (
                        <Form.Item style={{ marginTop: '50px' }}>
                            <Form.Item name='remember' noStyle>
                                <Checkbox
                                    data-test-id='login-remember'
                                    checked={data.isRemember}
                                    onChange={(e) =>
                                        setData({ ...data, isRemember: e.target.checked })
                                    }
                                >
                                    Запомнить меня
                                </Checkbox>
                            </Form.Item>
                            <Button
                                data-test-id='login-forgot-button'
                                className='login-form-forgot'
                                style={{
                                    fontSize: '16px',
                                    border: 'none',
                                    color: '#2F54EB',
                                    padding: '0',
                                }}
                                onClick={() =>
                                    isEmailValid
                                        ?handlerCheckEmail()
                                        : undefined
                                }
                            >
                                Забыли пароль?
                            </Button>
                        </Form.Item>
                    )}

                    <Form.Item>
                        <Button
                            data-test-id={
                                isRegistration
                                    ? 'registration-submit-button'
                                    : 'login-submit-button'
                            }
                            type='primary'
                            htmlType='submit'
                            className='login-form-button'
                            style={{
                                width: '100%',
                                background: '#2F54EB',
                                fontSize: '16px',
                                lineHeight: '130%',
                                height: '40px',
                                marginBottom: '0',
                            }}
                        >
                            Войти
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            disabled
                            type='primary'
                            htmlType='submit'
                            className='login-form-button'
                            style={{
                                width: '100%',
                                background: '#fff',
                                fontSize: '16px',
                                lineHeight: '130%',
                                color: 'black',
                                height: '40px',
                            }}
                        >
                            <div className='wrapper-button-icon'>
                                <div>
                                    <img src={logoGoogle} alt='logo' />
                                </div>
                                {isRegistration
                                    ? 'Регистрация через Google'
                                    : 'Войти  через Google'}
                            </div>
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export const AuthForm = () => {
    const { pathname } = useLocation();
    const isRegistration = pathname.includes('registration');
    const onChange = (key: string) => {
        history.push(key);
    };
    const checkedTab = pathname.includes('registration') ? '/auth/registration' : '/auth';

    return (
        <>
            <div className='wrapper-form-auth'>
                <img src={logo} className='logo-form' alt='logo' />
                <Tabs
                    defaultActiveKey={checkedTab}
                    onChange={onChange}
                    items={[
                        {
                            label: `Вход`,
                            key: '/auth',
                            children: (
                                <BaseForm
                                    isRegistration={isRegistration}
                                />
                            ),
                        },
                        {
                            label: `Регистрация`,
                            key: '/auth/registration',
                            children: (
                                <BaseForm
                                    isRegistration={isRegistration}
                                />
                            ),
                        },
                    ]}
                />
            </div>
        </>
    );
};
