import { Form, Input, Button } from 'antd';
import './change-password.css';
import { useChangePasswordMutation } from '../../../api/methods-api';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setIsLoading } from '@redux/loading-slice';
import { history } from '@redux/configure-store';
import { setFields } from '@redux/auth-slice';
const ChangePassword = () => {
    const {
        auth: { password },
        router,
        load: { isLoading },
    } = useAppSelector((store) => store);
    const [changePassword] = useChangePasswordMutation();
    const [data, setData] = useState({
        password: password,
        confirmPassword: password,
    });

    const dispatch = useAppDispatch();

    const sendData = () => {
        dispatch(setIsLoading(true));
        changePassword(data)
            .unwrap()
            .then(() => history.push('../../result/success-change-password'))
            .catch(() => {
                !password &&
                    dispatch(
                        setFields({
                            password: data.password,
                            email: '',
                            token: '',
                        }),
                    );
                history.push('../../result/error-change-password');
            })
            .finally(() => dispatch(setIsLoading(false)));
    };
    useEffect(() => {
        if (
            password &&
            router.previousLocations &&
            router.previousLocations[1].location?.pathname === '/result/error-change-password' &&
            !isLoading
        ) {
            sendData();
        }
    }, [password, router.previousLocations, isLoading]);
    return (
        <div className='wrapper-change-password'>
            <div className='text-change-pass'>Восстановление аккаунта</div>
            <Form onFinish={sendData}>
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
                    <Input.Password
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                        placeholder='Новый пароль'
                        data-test-id='change-password'
                    />
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
                    <Input.Password
                        onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
                        placeholder='Повторите пароль'
                        data-test-id='change-confirm-password'
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        htmlType='submit'
                        type='primary'
                        style={{ width: '100%', backgroundColor: '#2F54EB' }}
                        data-test-id='change-submit-button'
                    >
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ChangePassword;
