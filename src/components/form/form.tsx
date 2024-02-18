import './form.css';
import { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import logo from '/assets/icons/logo.svg';
import logoGoogle from '/assets/icons/google.svg';

export const AuthForm = () => {
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [isRegistration, setIsRegistration] = useState(false);

    const toggleLoginForm = () => {
        setIsLoginForm(true);
        setIsRegistration(false);
    };

    const toggleRegistration = () => {
        setIsLoginForm(false);
        setIsRegistration(true);
    };

    return (
        <div style={{ background: '#fff', position: 'relative', zIndex: '9999', height: '746px' }}>
            <div>
                <div className='wrapper-logo'>
                    <img src={logo} alt='logo' style={{ width: '309px' }} />
                </div>
                <div className='wrapper-button'>
                    <Button
                        style={{ border: 'none', fontSize: '16px', padding: '0' }}
                        onClick={toggleLoginForm}
                    >
                        Вход
                    </Button>
                    <Button
                        style={{ border: 'none', fontSize: '16px', padding: '0' }}
                        onClick={toggleRegistration}
                    >
                        Регистрация
                    </Button>
                </div>
                <div className='wrapper-form'>
                    <Form
                        name='basic'
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        autoComplete='off'
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
                            <Input addonBefore='e-mail' />
                        </Form.Item>

                        <Form.Item
                            name='password'
                            rules={[
                                { required: true, message: 'Пожалуйста, введите свой пароль!!' },
                                {
                                    pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
                                    message:
                                        'Пароль не менее 8 символов, заглавной буквой и цифрой!',
                                },
                            ]}
                            help={isRegistration ?'Пароль не менее 8 символов, с заглавной буквой и цифрой':'' }
                        >
                            <Input.Password placeholder='Пароль' />
                        </Form.Item>

                        {isRegistration && (
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
                                <Input.Password placeholder='Повторите пароль' />
                            </Form.Item>
                        )}

                        {isLoginForm && (
                            <Form.Item>
                                <Form.Item name='remember' valuePropName='checked' noStyle>
                                    <Checkbox>Запомнить меня</Checkbox>
                                </Form.Item>
                                <a
                                    className='login-form-forgot'
                                    href=''
                                    style={{ fontSize: '16px' }}
                                >
                                    Забыли пароль?
                                </a>
                            </Form.Item>
                        )}

                        <Form.Item>
                            <Button
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
                                {isRegistration ? 'Войти' : 'Войти'}
                            </Button>
                        </Form.Item>

                        <Form.Item>
                            <Button
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
            </div>
        </div>
    );
};
