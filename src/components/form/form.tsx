import './form.css';
import { Button, Checkbox, Form, Input } from 'antd';
import logo from '/assets/icons/logo.svg';
import logoGoogle from '/assets/icons/google.svg';
export const AuthForm = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div style={{ background: '#fff', position: 'relative', zIndex: '9999', height: '746px' }}>
            <div>
                <div className='wrapper-logo'>
                    <img src={logo} alt='logo' style={{ width: '309px' }} />
                </div>
                <div className='wrapper-button'>
                    <Button style={{ border: 'none' ,fontSize:'16px',padding:'0'}}>Вход </Button>
                    <Button style={{ border: 'none',fontSize:'16px',padding:'0' }}>Регистрация </Button>
                </div>
                <div className='wrapper-form'>
                    <Form
                        name='basic'
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete='off'
                    >
                        <Form.Item rules={[{ type: 'email' }]}>
                            <Input addonBefore='e-mail' />
                        </Form.Item>

                        <Form.Item
                            name='password'
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password placeholder='Пароль' />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name='remember' valuePropName='checked' noStyle>
                                <Checkbox>Запомнить меня</Checkbox>
                            </Form.Item>

                            <a className='login-form-forgot' href='' style={{ fontSize: '16px' }}>
                                Забыли пароль?
                            </a>
                        </Form.Item>

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
                                Войти
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
                                    <div><img src={logoGoogle} alt="logo" /></div>
                                    Войти через Google
                             </div>
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
};
