import { IPropsUser } from '@components/form-profile/name-surname-age-input';
import { Form, Input } from 'antd';

import './profile-password.scss';

const ProfilePassword = ({ user, setUser }: IPropsUser) => {
    const [form] = Form.useForm();

    return (
        <div className='wrapper-profile-password'>
            <Form
                form={form}
                className='form-profile-password'
                name='basic'
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                autoComplete='on'
            >
                <Form.Item
                    rules={[
                        { required: true, message: '' },
                        {
                            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Пожалуйста, введите правильный e-mail!',
                        },
                    ]}
                >
                    <Input
                        addonBefore='e-mail'
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
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
                    <Input.Password
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        placeholder='Пароль'
                        style={{ padding: '10px' }}
                    />
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
};

export default ProfilePassword;
