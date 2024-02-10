import { CalendarTwoTone, HeartFilled, IdcardOutlined, TrophyFilled } from '@ant-design/icons';
import exit from '/assets/icons/icon-exit.svg';
import { Layout, Menu } from 'antd';
import logoFit from '/assets/icons/logo-fit-sidebar.svg';
import logo from '/assets/icons/logo.svg';
const { Sider } = Layout;
import './main-sidebar.css';

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

interface IPropsSideBar {
    collapsed: boolean;
}

export const SideBar = ({ collapsed }: IPropsSideBar) => {
    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            width={208}
            collapsedWidth={64}
            style={{
                backgroundColor: '#fff',
            }}
        >
            <div className='logo'>
                <img
                    src={collapsed ? logoFit : logo}
                    alt=''
                    className={`logo-image ${collapsed ? 'fit-logo' : ''}`}
                />
            </div>
            <Menu
                style={{
                    backgroundColor: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                }}
                items={items}
            />
            <div className='exit'>
                <img src={exit} alt='' />
                {!collapsed && <span>Выход</span>}
            </div>
        </Sider>
    );
};
