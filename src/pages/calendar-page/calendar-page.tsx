import Breadcrumbs from '@components/breadcrumb/breadcrumb';
import ruRu from 'antd/es/calendar/locale/ru_RU';

import moment from 'moment';
import 'moment/locale/ru';
import './calendar-page.scss';
import { useState } from 'react';
import ModalErrorCalendar from '@components/popup/modal-error-calendar/modal-error-calendar';
import { Calendar } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
moment.locale('ru');

moment.updateLocale('ru', {
    weekdaysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    monthsShort: [
        'Янв',
        'Фев',
        'Мар',
        'Апр',
        'Май',
        'Июн',
        'Июл',
        'Авг',
        'Сен',
        'Окт',
        'Ноя',
        'Дек',
    ],
    week: { dow: 1 },
});

const routes = [
    {
        path: 'main',
        name: 'Главная',
    },
    {
        name: 'Календарь',
    },
];

const CalendarPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <div className='wrapper-calendar-page'>
                <header>
                    <Breadcrumbs items={routes} />
                </header>
                <div>
                   <div className='wrapper-setting-calendar'>
                        <span className='title'>Настройки</span>
                        <SettingOutlined />
                   </div>
                    <Calendar 
                    locale={ruRu}  
                    className='wrapper-calendar'
                    />
                </div>
            </div>

            <ModalErrorCalendar open={isModalOpen} />
        </>
    );
};

export default CalendarPage;
