import { Layout } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
const { Header } = Layout;
import './main-header.scss';

export const CustomHeader = () => {
    return (
        <Header style={{ height: 'auto', lineHeight: '1', padding: '16px  24px 20px' }}>
            <div className='breadcrumbs'>
                <span>Главная</span>
            </div>
            <div className='header-wrapper'>
                <div className='header-text'>
                    Приветствуем тебя в CleverFit — приложении,
                    <br /> которое поможет тебе добиться своей мечты!
                </div>
                <div className='wrapper-header-settings'>
                    <SettingOutlined />
                    <span className='title'>Настройки</span>
                </div>
            </div>
        </Header>
    );
};
