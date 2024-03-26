import { useEffect, useState } from 'react';
import { ArrowLeftOutlined, CheckOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import free from '@public/icons/free.svg';
import pro from '@public/icons/pro.svg';
import { history } from '@redux/configure-store';
import { Button, Card, Switch, Tooltip } from 'antd';
import { SwitchSize } from 'antd/lib/switch';

import './settings-profile.scss';

const SettingsProfile = () => {
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

    return (
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
                            extra={<a href='#'>Подробнее</a>}
                            cover={<img alt='icon' src={free} />}
                        >
                            <div className='status-free-tariff'>
                                <div className='text-status-free-tariff'>активен</div>
                                <CheckOutlined />
                            </div>
                        </Card>
                        <Card
                            title='PRO tarif'
                            extra={<a href='#'>Подробнее</a>}
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
                                   placement={tooltipPlacement === 'topLeft' ? 'topRight' : 'topLeft'}
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
    );
};

export default SettingsProfile;
