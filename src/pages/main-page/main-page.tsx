import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
    CalendarTwoTone,
    HeartFilled,
    IdcardFilled,
    TrophyOutlined,
} from '@ant-design/icons';
import CustomFooter from '@components/main-footer/main-footer';

import logoFit from '/assets/icons/logo-fit-sidebar.svg';
import exit from '/assets/icons/icon-exit.svg';
import './main-page.css';
import CustomHeader from '@components/main-header/main-header';
import MainContent from '../../components/main-content/main-content';

const { Sider } = Layout;
const items = [
    {
        key: '1',
        icon: <CalendarTwoTone twoToneColor='#061178'/>,
        label: 'календарь',
    },
    {
        key: '2',
        icon: <HeartFilled style={{color: '#061178'}}/>,
        label: 'Тренировки',
    },
    {
        key: '3',
        icon: <TrophyOutlined style={{ color: '#061178' }}  />,
        label: 'Достижения',
    },
    {
        key: '4',
        icon: <IdcardFilled style={{ color: '#061178' }}  />,
        label: 'Профиль',
    },
    {
        key: '5',
        icon: <img src={exit} alt='logo' />,
        label: 'Выход',
    },
];

export const MainPage: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [logo, setLogo] = useState('assets/icons/logo.svg');

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
        setLogo(collapsed ? 'assets/icons/logo.svg' : logoFit);
    };

    return (
        <Layout>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{ width: '208px', backgroundColor: '#fff' }}
            >
                <div className='logo'>
                    <img
                        src={logo}
                        alt=''
                        className={`logo-image ${logo === logoFit ? 'fit-logo' : ''}`}
                        style={{
                            width: `${logo === logoFit ? '30px' : '130px'}`,
                            margin: '44px 0 50px',
                        }}
                    />
                </div>

                <Menu
                    style={{
                        backgroundColor: '#fff',
                        display: 'flex',
                        flexDirection: 'column',
                        height: 'calc(100vh - 80px)',
                    }}
                    items={items}
                />
            </Sider>
            <Layout className='site-layout'>
                <CustomHeader />

                <MainContent toggleCollapsed={toggleCollapsed} />

                <CustomFooter>Footer</CustomFooter>
            </Layout>
        </Layout>
    );
};

export default MainPage;
