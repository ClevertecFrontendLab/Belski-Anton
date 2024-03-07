import Breadcrumbs from '@components/breadcrumb/breadcrumb';
import { Calendar } from 'antd';
import ruRu from 'antd/es/calendar/locale/ru_RU';
import moment from 'moment';
import 'moment/locale/ru';
import './calendar-page.scss';
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
    return (
        <div className='wrapper-calendar'>
            <header>
                <Breadcrumbs items={routes} />
            </header>
            <div>
                <Calendar locale={ruRu} />
            </div>
        </div>
    );
};

export default CalendarPage;