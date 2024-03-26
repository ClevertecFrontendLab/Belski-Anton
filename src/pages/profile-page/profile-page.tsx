/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import UploadPhoto from '@components/upload-photo/upload-photo';
import { DATE_FORMATS, PATHS } from '@constants/index';
import { history } from '@redux/configure-store';
import { Button, DatePicker, Form, Input } from 'antd';
import moment from 'moment';

import { IUser, useGetUserDataQuery, useUpdateUserDataMutation } from '../../api/methods-api';

import './profile-page.scss';

interface IUserData extends IUser {
    confirmPassword: string;
}

const initUserState: IUserData = {
    email: '',
    firstName: '',
    lastName: '',
    birthday: '',
    imgSrc: '',
    password: '',
    confirmPassword: '',
};

const ProfilePage = () => {
    const [updateUserData] = useUpdateUserDataMutation();
    const { data } = useGetUserDataQuery();
    const [user, setUser] = useState<IUserData | null>(null);
    const [form] = Form.useForm();
    const [isDisabled, setDisabled] = useState(true);

    console.log(user);

    useEffect(() => {
        if (data) {
            setUser({ ...initUserState, ...data });
        }
    }, [data, setUser]);

    const updateUserPhoto = (url: string) => {
        if (user) {
            setUser({ ...user, imgSrc: url });
        }
    };

    const onChangeHandler = (_, fields: IUserData) => {
        const { confirmPassword, ...newFields } = fields;
        const isNotDifferentData = JSON.stringify(user) === JSON.stringify(newFields);

        setDisabled(isNotDifferentData);
    };

    const onSubmit = (values: IUserData) => {
        const { confirmPassword, ...newFields } = values;
        const differentValue = Object.entries(newFields).filter(
            ([key, value]) => data && data[key as keyof IUser] !== value && value,
        );
        const newData = differentValue.reduce((acc, [key, value]) => {
            acc[key as keyof IUser] = value;

            return acc;
        }, {} as IUser);

        if (user?.imgSrc !== data?.imgSrc) {
            newData.imgSrc = user?.imgSrc;
        }

        if (newFields?.birthday) {
            newData.birthday = moment.utc(newFields?.birthday, DATE_FORMATS.FULL).format();
        }

        updateUserData(newData).unwrap();
    };

    return (
        <div className='wrapper-profile-details'>
            <div className='header-profile-details'>
                <div className='inner-header'>
                    <div className='header-title'>Профиль</div>
                    <div
                        className='header-setting'
                        onClick={() => history.push(PATHS.SETTINGS)}
                        role='button'
                        tabIndex={0}
                        onKeyDown={() => false}
                    >
                        <SettingOutlined />
                        <span className='title'>Настройки</span>
                    </div>
                </div>
            </div>
            {!!user && (
                <div className='main-profile-details'>
                    <Form
                        className='form-container'
                        onFinish={onSubmit}
                        onValuesChange={onChangeHandler}
                        form={form}
                        initialValues={user}
                    >
                        <div className='text-title'>Личная информация</div>
                        <div className='wrapper-profile-details'>
                            <div className='wrapper-upload-input'>
                                <UploadPhoto
                                    setUserPhoto={updateUserPhoto}
                                    initialValue={data?.imgSrc || ''}
                                />
                                <div className='wrapper-name-surname-age-input'>
                                    <Form.Item name='firstName'>
                                        <Input placeholder='Имя' />
                                    </Form.Item>
                                    <Form.Item name='lastName'>
                                        <Input placeholder='Фамилия' />
                                    </Form.Item>
                                    {/* <Form.Item name="birthday">
                                    <DatePicker
                                        defaultValue={moment(user.birthday, 'DD.MM.YYYY')}
                                        format='DD.MM.YYYY'
                                        placeholder='Дата рождения'
                                        style={{ width: '100%' }}
                                    />
                                </Form.Item> */}
                                </div>
                            </div>
                            <div className='text-title private'>Приватность и авторизация</div>
                            <div className='wrapper-profile-password'>
                                <Form.Item
                                    rules={[
                                        { required: true, message: '' },
                                        {
                                            pattern:
                                                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: 'Пожалуйста, введите правильный e-mail!',
                                        },
                                    ]}
                                    name='email'
                                >
                                    <Input addonBefore='e-mail' />
                                </Form.Item>
                                <Form.Item
                                    dependencies={['password']}
                                    hasFeedback={true}
                                    name='password'
                                    rules={[
                                        {
                                            pattern:
                                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                                            message:
                                                'Пароль не менее 8 символов, заглавной буквой и цифрой!',
                                        },
                                    ]}
                                    help='Пароль не менее 8 символов, c заглавной буквой и цифрой'
                                >
                                    <Input.Password
                                        value={user.password}
                                        onChange={(e) =>
                                            setUser({ ...user, password: e.target.value })
                                        }
                                        placeholder='Пароль'
                                        style={{ padding: '10px' }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name='confirmPassword'
                                    dependencies={['password']}
                                    rules={[
                                        {
                                            required: form.getFieldValue('password') ?? false,
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }

                                                return Promise.reject(
                                                    new Error('Пароли не совпадают'),
                                                );
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
                            </div>
                            <Button
                                className='btn-profile'
                                type='primary'
                                disabled={isDisabled}
                                htmlType='submit'
                            >
                                Сохранить изменения
                            </Button>
                        </div>
                    </Form>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
