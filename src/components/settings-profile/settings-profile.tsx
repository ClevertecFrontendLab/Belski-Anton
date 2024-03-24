// import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { history } from '@redux/configure-store';

import './settings-profile.scss'

const SettingsProfile = () => (
      
      <div className='wrapper-settings-profile'>
         <div className='wrapper-header-settings-profile'>
            <div 
            className='header-settings-profile' 
            onClick={()=>history.go(-1)}
            role='button'
            tabIndex={0}
            onKeyDown={() => false}
            >
            <ArrowLeftOutlined  />
             <div>Настройки</div>
            </div>
         </div>
      </div>
   )



export default SettingsProfile;