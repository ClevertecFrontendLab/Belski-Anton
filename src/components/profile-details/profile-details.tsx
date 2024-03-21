import { SettingOutlined } from '@ant-design/icons';
import UploadPhoto from '@components/upload-photo/upload-photo';

import './profile-details.scss';

const ProfileDetails = () => (
        <div className='wrapper-profile-details'>
            <div className='header-profile-details'>
                <div className='inner-header'>
                    <div className='header-text'>Профиль</div>
                    <div className='header-setting'>
                        <SettingOutlined />
                        <span className='title'>Настройки</span>
                    </div>
                </div>
            </div>
            <div className='main-profile-details'>
                <div>Личная информация</div>
            <div>
                <UploadPhoto/>
                </div>
            </div>
        </div>
    );

export default ProfileDetails;
