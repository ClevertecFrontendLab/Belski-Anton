import Breadcrumbs from '@components/breadcrumb/breadcrumb';
import { Button } from 'antd';
import ruRu from 'antd/es/calendar/locale/ru_RU';

import moment from 'moment';
import 'moment/locale/ru';
import './calendar-page.scss';
import { useState } from 'react';
import ModalErrorCalendar from '@components/popup/modal-error-calendar/modal-error-calendar';
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
            {/* <div className='wrapper-calendar'>
                <header>
                    <Breadcrumbs items={routes} />
                </header>
                <div>
                    <Calendar locale={ruRu} />
                </div>
            </div> */}
            <Button type='primary' onClick={showModal}>
                Open Modal
            </Button>
            <ModalErrorCalendar open={isModalOpen}  />
        </>
    );
};

export default CalendarPage;
