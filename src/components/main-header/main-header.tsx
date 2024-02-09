import React from 'react';
import { Layout } from 'antd';
import './main-header.css';
import { SettingOutlined } from '@ant-design/icons';
const { Header } = Layout;

interface CustomContentProps {
    children?: React.ReactNode;
}

const CustomHeader: React.FC<CustomContentProps> = () => {
    return (
        <Header style={{ background: 'none', height: 'auto', lineHeight: 'none' }}>
            <div>
                <div>Главная страница</div>
                <div className='header-wrapper'>
                   <div className='header-text'>
                      Приветствуем тебя в CleverFit — приложении, которое поможет тебе добиться своей
                      мечты!
                   </div>
                   <div className='wraperr-header-settings'>
                   <div><SettingOutlined /></div>
                   <div> Настройка</div>
                   </div>
                </div>
            </div>
        </Header>
    );
};

export default CustomHeader;
