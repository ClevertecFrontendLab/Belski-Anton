/* eslint-disable quotes */
import { CheckCircleFilled, CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import useWindowSize from '@hooks/use-window-size';
import { Button, Divider, Drawer, Radio } from 'antd';

import './sidebar-tariff.scss';

interface DrawerControls {
    open: boolean;
    onClose: () => void;
}

const SidebarTariff = ({ open, onClose }: DrawerControls) => {
    const isMob = useWindowSize(500);

    return (
        <Drawer
            className='sidebar-tariff'
            title={
                <div className='wrapper-title'>
                    <div>Сравнить тарифы</div>
                </div>
            }
            closeIcon={
                <CloseOutlined
                    onClick={() => {
                        onClose();
                    }}
                />
            }
            height={isMob ? `90vh` : `100%`}
            placement={isMob ? 'bottom' : 'right'}
            onClose={onClose}
            open={open}
            maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
        >
            <div className='wrapper-statistics-tariff'>
                <div className='title-statistics'>
                    <div>PRO</div>
                    <div>FREE</div>
                </div>

                <div className='statistics-data'>
                    <div className='statistics-month'>
                        <div className='title'> Статистика за месяц</div>
                        <CheckCircleFilled />
                        <CheckCircleFilled />
                    </div>

                    <div className='statistics-all'>
                        <div className='title'>Статистика за всё время</div>
                        <CloseCircleOutlined style={{ color: '#BFBFBF' }} />
                        <CheckCircleFilled />
                    </div>
                    <div className='training-together'>
                        <div className='title'> Совместные тренировки</div>
                        <CheckCircleFilled />
                        <CheckCircleFilled />
                    </div>
                    <div className='marathon'>
                        <div className='title'> Участие в марафонах</div>
                        <CloseCircleOutlined style={{ color: '#BFBFBF' }} />
                        <CheckCircleFilled />
                    </div>
                    <div className='ios'>
                        <div className='title'> Приложение iOS</div>
                        <CloseCircleOutlined style={{ color: '#BFBFBF' }} />
                        <CheckCircleFilled />
                    </div>
                    <div className='android'>
                        <div className='title'> Приложение Android</div>
                        <CloseCircleOutlined style={{ color: '#BFBFBF' }} />
                        <CheckCircleFilled />
                    </div>
                    <div className='gpt-chat'>
                        <div className='title'> Индивидуальный Chat GPT </div>
                        <CloseCircleOutlined style={{ color: '#BFBFBF' }} />
                        <CheckCircleFilled />
                    </div>
                </div>
                <div className='wrapper-tariff-cost'>
                    <div className='title-tariff-cost'>Стоимость тарифа</div>
                    <div className='wrapper-content-tariff-cost'>
                        <div className='content-tariff-cost'>
                            <div className='text-tariff-cost'>6 месяцев</div>
                            <div className='count-tariff-cost'>5,5 $</div>
                            <Radio />
                        </div>
                        <div className='content-tariff-cost'>
                            <div className='text-tariff-cost'>9 месяцев</div>
                            <div className='count-tariff-cost'>8,5 $</div>
                            <Radio />
                        </div>

                        <div className='content-tariff-cost'>
                            <div className='text-tariff-cost'>12 месяцев</div>
                            <div className='count-tariff-cost'>10 $</div>
                            <Radio />
                        </div>
                    </div>
                </div>
            </div>

            <div className='wrapper-btn-tariff'>
                <Divider style={{ marginBottom: '12px', marginTop: '0' }} />

                <Button className='btn-tariff' disabled={false}>
                    Выбрать и оплатить
                </Button>
            </div>
        </Drawer>
    );
};

export default SidebarTariff;
