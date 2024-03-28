/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { CalendarTwoTone, HeartFilled, IdcardOutlined, TrophyFilled } from '@ant-design/icons';
import { MAX_WIDTH_SIDEBAR, MIN_WIDTH_SIDEBAR, MOB_WIDTH_SIDEBAR, PATHS } from '@constants/index';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import close from '@public/icons/close.svg';
import exit from '@public/icons/icon-exit.svg';
import open from '@public/icons/icon-switcher.svg';
import logo from '@public/icons/logo.svg';
import logoFit from '@public/icons/logo-fit-sidebar.svg';
import { history } from '@redux/configure-store';
import { setIsError } from '@redux/error-training-slice';
import { setIsLoading } from '@redux/loading-slice';
import { Layout, Menu } from 'antd';

import { useLazyGetTrainingQuery } from '../../api/methods-api';

import './main-sidebar.scss';

const { Sider } = Layout;

export const SideBar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const { token } = useAppSelector((state) => state.auth);
    const [getTraining] = useLazyGetTrainingQuery();
    const dispatch = useAppDispatch();

    const hanleGetTraining = () => {
        dispatch(setIsLoading(true));
        getTraining()
            .unwrap()
            .then(() => history.push(PATHS.CALENDAR))
            .catch(() => dispatch(setIsError(true)))
            .finally(() => dispatch(setIsLoading(false)));
    };

    const items = [
        {
            key: '1',
            icon: <CalendarTwoTone twoToneColor='#061178' style={{ fontSize: '12.5px' }} />,
            label: (
                <span
                    role='button'
                    tabIndex={0}
                    onKeyDown={() => false}
                    data-test-id='modal-create-exercise'
                    onClick={hanleGetTraining}
                >
                    Календарь
                </span>
            ),
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
            label: (
                <span
                    role='button'
                    tabIndex={0}
                    onKeyDown={() => false}
                    data-test-id='modal-create-exercise'
                    onClick={() => history.push(PATHS.PROFILE)}
                >
                    Профиль
                </span>
            ),
        },
    ];

    const logOut = () => {
        localStorage.clear();
        history.push(PATHS.AUTH);
    };

    useEffect(() => {
        if (!token && !localStorage.getItem('token')) {
            history.push(PATHS.AUTH);
        }
    }, [token, localStorage]);

    return (
        <Sider
            trigger={null}
            collapsible={true}
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
                <img 
                src={collapsed && !isMobile ? logoFit : logo} alt='logo'
                 
                 onClick={()=>history.push(PATHS.MAIN)}
                 />
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
            <div
                role='button'
                tabIndex={0}
                onKeyDown={() => false}
                className='exit'
                onClick={logOut}
            >
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
