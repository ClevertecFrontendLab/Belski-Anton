import React, { useEffect, useState } from 'react';
import { ArrowLeftOutlined, CheckOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import SidebarTariff from '@components/sidebar-tariff/sidebar-tariff';
import free from '@public/icons/free.svg';
import pro from '@public/icons/pro.svg';
import { history } from '@redux/configure-store';
import { Button, Card, Switch, Tooltip } from 'antd';
import { SwitchSize } from 'antd/lib/switch';

import { useGetTariffListQuery } from '../../api/methods-api';

import './settings-profile.scss';

const SettingsProfile = () => {
    const [isOpenTariff, setOpenTariff] = useState(false);

    const {data}=useGetTariffListQuery()
    console.log(data);
    

    const [switchSize, setSwitchSize] = useState<SwitchSize | undefined>('default');
    const [tooltipPlacement, setTooltipPlacement] = useState<
        'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight'
    >('bottomLeft');

    useEffect(() => {
        const handleResize = () => {
            const newSize = window.innerWidth < 500 ? 'small' : undefined;

            setSwitchSize(newSize);

            const newTooltipPlacement = window.innerWidth < 500 ? 'topLeft' : 'bottomLeft';

            setTooltipPlacement(newTooltipPlacement);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const openTariff = () => {
        setOpenTariff(true);
    };
    const closeTariff = () => {
        setOpenTariff(false);
    };

    return (
        <React.Fragment>
            <div className='wrapper-settings-profile'>
                <div className='wrapper-header-settings-profile'>
                    <div
                        className='header-settings-profile'
                        onClick={() => history.go(-1)}
                        role='button'
                        tabIndex={0}
                        onKeyDown={() => false}
                    >
                        <ArrowLeftOutlined />
                        <div className='text-setting'>Настройки</div>
                    </div>
                </div>
                <div className='wrapper-main-settings'>
                    <div className='inner-main-settings'>
                        <div className='title-main-settings'>Мой тариф</div>
                        <div className='wrapper-tariff'>
                            <Card
                                title='FREE tarif'
                                extra={<Button onClick={openTariff}>Подробнее</Button>}
                                cover={<img alt='icon' src={free} />}
                            >
                                <div className='status-free-tariff'>
                                    <div className='text-status-free-tariff'>активен</div>
                                    <CheckOutlined />
                                </div>
                            </Card>
                            <Card
                                title='PRO tarif'
                                extra={<Button onClick={openTariff}>Подробнее</Button>}
                                cover={<img alt='icon' src={pro} />}
                            >
                                <Button>Активировать</Button>
                            </Card>
                        </div>
                        <div className='wrapper-switcher'>
                            <div className='wrapper-switcher-training'>
                                <div className='switcher-training'>
                                    <span>Открыт для совместных тренировок</span>
                                    <Tooltip
                                        overlayStyle={{ width: 205 }}
                                        placement={tooltipPlacement}
                                        color='#000'
                                        title='включеная функция позволит участвовать в совместных тренировках'
                                    >
                                        <ExclamationCircleOutlined style={{ color: '#bfbfbf' }} />
                                    </Tooltip>
                                </div>
                                <Switch size={switchSize} />
                            </div>
                            <div className='wrapper-switcher-push'>
                                <div className='switcher-push'>
                                    Уведомления
                                    <Tooltip
                                        placement={
                                            tooltipPlacement === 'topLeft' ? 'topRight' : 'topLeft'
                                        }
                                        color='#000'
                                        title='включеная функция позволит получать уведомления об активностях'
                                        overlayStyle={{ width: 203 }}
                                    >
                                        <ExclamationCircleOutlined style={{ color: '#bfbfbf' }} />
                                    </Tooltip>
                                </div>
                                <Switch size={switchSize} />
                            </div>
                            <div className='wrapper-switcher-theme'>
                                <div className='switcher-theme'>
                                    Тёмная тема
                                    <Tooltip
                                        placement={tooltipPlacement}
                                        color='#000'
                                        overlayStyle={{ width: 97 }}
                                        title='темная тема доступна для PRO tarif'
                                    >
                                        <ExclamationCircleOutlined style={{ color: '#bfbfbf' }} />
                                    </Tooltip>
                                </div>
                                <Switch disabled={true} size={switchSize} />
                            </div>
                        </div>
                        <div className='wrapper-bnt'>
                            <Button>Написать отзыв </Button>
                            <Button>Смотреть все отзывы </Button>
                        </div>
                    </div>
                </div>
            </div>
            <SidebarTariff open={isOpenTariff} onClose={closeTariff} />
        </React.Fragment>
    );
};

export default SettingsProfile;
