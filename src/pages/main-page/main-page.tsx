import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { CalendarTwoTone, HeartTwoTone, IdcardFilled } from '@ant-design/icons';
import CustomContent from '../../components/main-content/main-content';
import CustomFooter from '@components/main-footer/main-footer';
import switcher from '/assets/icons/icon-switcher.svg';
import logoFit from '/assets/icons/logo-fit-sidebar.svg';
import exit from '/assets/icons/icon-exit.svg'
import './main-page.css';
import CustomHeader from '@components/main-header/main-header';

const { Sider } = Layout;

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
                            marginBottom: '50px',
                        }}
                    />
                </div>
            <div className='wrapper-sidebar'>
                   <div>
                        <Menu
                            style={{ backgroundColor: '#fff' }}
                            items={[
                                {
                                    key: '1',
                                    icon: <CalendarTwoTone />,
                                    label: 'календарь',
                                },
                                {
                                    key: '2',
                                    icon: <HeartTwoTone />,
                                    label: 'Тренировки',
                                },
                                {
                                    key: '3',
                                    icon: <IdcardFilled />,
                                    label: 'Достижения',
                                },
                                {
                                    key: '4',
                                    icon: <IdcardFilled />,
                                    label: 'Профиль',
                                },
                            ]}
                        />
                   </div>
                 <div>
                        <div>
                            <img src={exit} alt="" />
                            <span>Выход</span>
                        </div>
                 </div>
            </div>
            </Sider>
            <Layout className='site-layout'>
                <CustomHeader />

                <div className='bg-wrapper'>
                    <CustomContent>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={switcher} alt='switcher icon' onClick={toggleCollapsed} />
                        </div>
                      < div className='wrapper-text'>
                            <div className='main-text-description'>
                                С CleverFit ты сможешь:
                                <span>-планировать свои тренировки на календаре,выбирая тип и уровень нагрузок</span>
                                <span>
                                    -отслеживать свои достижения в разделе статистики, сравнивая свои
                                    результаты с нормами и рекордами;
                                </span>
                                <span>
                                    -создавать свой профиль, где ты можешь загружать свои фото, видео и
                                    отзывы о тренировках;
                                </span>
                                <span>
                                    -выполнять расписанные тренировки для разных частей тела, следуя
                                    подробным инструкциям и советам профессиональных тренеров.
                                </span>
                            </div>
                            <div className='main-info-message'>
                            CleverFit— это не просто приложение, а твой личный помощник в мире фитнеса. Не откладывай на завтра — начни тренироваться уже сегодня!
                            </div>
                    </div>
                     
                    </CustomContent>
                    <CustomFooter>Footer</CustomFooter>
                </div>
            </Layout>
        </Layout>
    );
};

export default MainPage;
