import { useEffect, useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import NameSurnameAgeInput from '@components/form-profile/name-surname-age-input';
import ProfilePassword from '@components/profile-password/profile-password';
import UploadPhoto from '@components/upload-photo/upload-photo';
import { PATHS } from '@constants/index';
import { history } from '@redux/configure-store';
import { Button } from 'antd';

import { IUser, useGetUserDataQuery } from '../../api/methods-api';

import './profile-details.scss';

const initUserState: IUser = {
    email: '',
    firstName: '',
    lastName: '',
    birthday: '',
    imgSrc: '',
    password: '',
};

const ProfileDetails = () => {
    const { data } = useGetUserDataQuery();
    const [user, setUser] = useState(initUserState);

    useEffect(() => {
        if (data) {
            setUser((prev) => ({...prev, ...data}));
            
        }
    }, [data]);

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
            <div className='main-profile-details'>
                <div className='text-title'>Личная информация</div>
                <div className='wrapper-profile-details'>
                    <div className='wrapper-upload-input'>
                        <UploadPhoto user={user} setUser={setUser} />
                        <NameSurnameAgeInput user={user} setUser={setUser} />
                    </div>
                    <div className='text-title private'>Приватность и авторизация</div>
                    <ProfilePassword user={user} setUser={setUser}/>
                    <div className='wrapper-btn-profile'>
                        <Button className='btn-profile' disabled={true}>
                            Сохранить изменения
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileDetails;
