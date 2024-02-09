import { CalendarTwoTone, HeartFilled, IdcardFilled, TrophyOutlined } from '@ant-design/icons';
import exit from '/assets/icons/icon-exit.svg';
import { Layout, Menu } from 'antd';
const { Sider } = Layout;

const items = [
    {
        key: '1',
        icon: <CalendarTwoTone twoToneColor='#061178' />,
        label: 'календарь',
    },
    {
        key: '2',
        icon: <HeartFilled style={{ color: '#061178' }} />,
        label: 'Тренировки',
    },
    {
        key: '3',
        icon: <TrophyOutlined style={{ color: '#061178' }} />,
        label: 'Достижения',
    },
    {
        key: '4',
        icon: <IdcardFilled style={{ color: '#061178' }} />,
        label: 'Профиль',
    },
    {
        key: '5',
        icon: <img src={exit} alt='logo' />,
        label: 'Выход',
    },
];

interface IPropsSideBar {
    collapsed: boolean;
    logo: string;
    logoFit: string;
}

const SideBar = ({ collapsed, logo, logoFit }: IPropsSideBar) => {
    return (
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
    );
};

export default SideBar;
