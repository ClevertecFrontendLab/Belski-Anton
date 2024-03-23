import { SettingOutlined } from '@ant-design/icons';
import NameSurnameAgeInput from '@components/form-profile/name-surname-age-input';
import ProfilePassword from '@components/profile-password/profile-password';
import UploadPhoto from '@components/upload-photo-desktop/upload-photo';
import { PATHS } from '@constants/index';
import { history } from '@redux/configure-store';
import { Button } from 'antd';

import './profile-details.scss';

const ProfileDetails = () => (
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
                    <UploadPhoto />
                    <NameSurnameAgeInput />
                </div>
                <div className='text-title private'>Приватность и авторизация</div>
                <ProfilePassword />
                <div className=' wrapper-btn-profile'>
                    <Button className='btn-profile' disabled={true}>Сохранить изменения</Button>
                </div>
            </div>
        </div>
    </div>
);

export default ProfileDetails;
