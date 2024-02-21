import { Form, Input, Button } from 'antd';
import './change-password.css';
const ChangePassword = () => {
    return (
        <div className='wrapper-change-password'>
            <div className='text-change-pass'>Восстановление аккаунта</div>
            <Form>
                <Form.Item
                    wrapperCol={{ span: 12 }}
                    name='password'
                    rules={[
                        { required: true, message: 'Пожалуйста, введите свой пароль!!' },
                        {
                            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                            message: 'Пароль не менее 8 символов, заглавной буквой и цифрой!',
                        },
                    ]}
                >
                    <Input.Password placeholder='Новый пароль' />
                </Form.Item>
                <Form.Item
                    wrapperCol={{ span: 12 }}
                    style={{ display: 'flex', flexDirection: 'column' }}
                    name='confirm'
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
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
                <Form.Item>
                    <Button type='primary' style={{ width: '100%', backgroundColor: '#2F54EB' }}>
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ChangePassword;
