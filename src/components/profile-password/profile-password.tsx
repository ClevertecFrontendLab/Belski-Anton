import { Form, Input } from 'antd';

import './profile-password.scss';

const ProfilePassword = () => (
    <div className='wrapper-profile-password'>
        <Form
            className='form-profile-password'
            name='basic'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete='on'
        >
            <Form.Item
                name='email'
                rules={[
                    { required: true, message: '' },
                    {
                        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: 'Пожалуйста, введите правильный e-mail!',
                    },
                ]}
            >
                <Input addonBefore='e-mail'  />
            </Form.Item>

            <Form.Item
                dependencies={['password']}
                hasFeedback={true}
                name='password'
                rules={[
                    { required: true, message: 'Пожалуйста, введите свой пароль!!' },
                    {
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                        message: 'Пароль не менее 8 символов, заглавной буквой и цифрой!',
                    },
                ]}
                help='Пароль не менее 8 символов, c заглавной буквой и цифрой'
            >
                <Input.Password placeholder='Пароль' style={{ padding: '10px' }} />
            </Form.Item>

            <Form.Item
                name='confirmPassword'
                dependencies={['password']}
                rules={[
                    {
                        required: true,
                        message: '',
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
                    placeholder='Повторите пароль'
                    data-test-id='registration-confirm-password'
                    className='confirm-password'
                />
            </Form.Item>
        </Form>
    </div>
);

export default ProfilePassword;
