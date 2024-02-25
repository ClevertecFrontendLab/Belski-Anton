import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useRegistrationMutation } from '../../api/auth-api';
import { Button, Form, Input } from 'antd';
import { useState, useEffect } from 'react';
import { history } from '@redux/configure-store';
import { clearAuthState, setFields } from '@redux/auth-slice';
import { setIsLoading } from '@redux/loading-slice';
import { IErrorResponse } from './form';
import logoGoogle from '/assets/icons/google.svg';

const RegistrationForm = () => {
    const dispatch = useAppDispatch();
    const {
        auth: { email, password },
        router,
    } = useAppSelector((state) => state);
    const [registration] = useRegistrationMutation();
    const [data, setData] = useState({
        email: email,
        password: password,
        confirmPassword: password,
        isRemember: false,
    });

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
            .finally(() => dispatch(setIsLoading(false)));
    };

    useEffect(() => {
        if (
            email &&
            password &&
            router.previousLocations &&
            router.previousLocations.length > 1 &&
            router.previousLocations[1].location?.pathname === '/result/error'
        ) {
            registrationUser();
        }
    }, [email, password, router.previousLocations]);

    return (
        <>
            <div className='wrapper-form'>
                <Form
                    onFinish={registrationUser}
                    name='basic'
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    autoComplete='on'
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
                            data-test-id={'registration-email'}
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
                        help={'Пароль не менее 8 символов, c заглавной буквой и цифрой'}
                    >
                        <Input.Password
                            value={data.password}
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                            placeholder='Пароль'
                            data-test-id={'registration-password'}
                        />
                    </Form.Item>

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
                            onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
                            placeholder='Повторите пароль'
                            data-test-id='registration-confirm-password'
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            data-test-id={'registration-submit-button'}
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
                                {'Регистрация через Google'}
                            </div>
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default RegistrationForm;
