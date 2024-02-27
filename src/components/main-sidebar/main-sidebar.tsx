import { CalendarTwoTone, HeartFilled, IdcardOutlined, TrophyFilled } from '@ant-design/icons';
import exit from '/assets/icons/icon-exit.svg';
import { Layout, Menu } from 'antd';
import logoFit from '/assets/icons/logo-fit-sidebar.svg';
import logo from '/assets/icons/logo.svg';
const { Sider } = Layout;
import close from '/assets/icons/close.svg';
import open from '/assets/icons/icon-switcher.svg';
import { useEffect, useState } from 'react';
import './main-sidebar.css';
import { MAX_WIDTH_SIDEBAR, MIN_WIDTH_SIDEBAR, MOB_WIDTH_SIDEBAR } from '@constants/index';
import { history } from '@redux/configure-store';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';

const items = [
    {
        key: '1',
        icon: <CalendarTwoTone twoToneColor='#061178' style={{ fontSize: '12.5px' }} />,
        label: 'Календарь',
    },
    {
        key: '2',
        icon: <HeartFilled style={{ fontSize: '12.5px', color: '#061178' }} />,
        label: 'Тренировки',
    },
    {
        key: '3',
        icon: <TrophyFilled style={{ fontSize: '12.5px', color: '#061178' }} />,
        label: 'Достижения',
    },
    {
        key: '4',
        icon: <IdcardOutlined style={{ fontSize: '12.5px', color: '#061178' }} />,
        label: 'Профиль',
    },
];

export const SideBar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const { token } = useAppSelector((state) => state.auth);
    const logOut = () => {
        localStorage.clear();
        history.push('/auth');
    };

    useEffect(() => {
        if (!token && !localStorage.getItem('token')) {
            history.push('/auth');
        }
    }, [token, localStorage]);
    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={isMobile ? false : collapsed}
            width={isMobile ? MOB_WIDTH_SIDEBAR : MAX_WIDTH_SIDEBAR}
            collapsedWidth={isMobile ? MOB_WIDTH_SIDEBAR : MIN_WIDTH_SIDEBAR}
            style={{
                backgroundColor: 'var(--color-White)',
                left: isMobile && !collapsed ? `-${MOB_WIDTH_SIDEBAR}px` : '0',
            }}
            breakpoint='sm'
            onBreakpoint={(broken) => setIsMobile(broken)}
        >
            <div className={`logo ${isMobile ? 'mob' : ''}`}>
                <img src={collapsed && !isMobile ? logoFit : logo} alt='' />
            </div>
            <Menu
                style={{
                    backgroundColor: 'var(--color-White)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                }}
                items={items}
            />
            <div className='exit' onClick={logOut}>
                {!isMobile && <img src={exit} alt='' />}
                {(!collapsed || isMobile) && <span>Выход</span>}
            </div>
            <img
                className='switcher'
                src={collapsed ? close : open}
                alt='switcher icon'
                onClick={() => setCollapsed(!collapsed)}
                data-test-id={isMobile ? 'sider-switch-mobile' : 'sider-switch'}
            />
        </Sider>
    );
};
