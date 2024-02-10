import { Layout } from 'antd';
import './main-header.css';
import { SettingOutlined } from '@ant-design/icons';
const { Header } = Layout;

export const CustomHeader = () => {
    return (
        <Header style={{ height: 'auto', lineHeight: '1', padding: '16px 40px 20px 24px' }}>
            <div className='breadcrumbs'>
                <span>Главная</span>
            </div>
            <div className='header-wrapper'>
                <div className='header-text'>
                    Приветствуем тебя в CleverFit — приложении, которое поможет тебе добиться своей
                    мечты!
                </div>
                <div className='wrapper-header-settings'>
                    <SettingOutlined />
                    <span>Настройки</span>
                </div>
            </div>
        </Header>
    );
};
