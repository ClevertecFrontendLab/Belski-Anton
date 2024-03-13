import Breadcrumbs from '@components/breadcrumb/breadcrumb';
import ruRu from 'antd/es/calendar/locale/ru_RU';
import moment from 'moment';
import 'moment/locale/ru';
import { Calendar } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import './calendar-mobile.scss'
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
const CalendarMobile = () => {
    return (
        <div className='wrapper-mobile-calendar'>
            <header>
                <Breadcrumbs items={routes} />
            </header>
            <div className='wrapper-setting-calendar'>
                <SettingOutlined />
            </div>
            <Calendar 
            locale={ruRu} 
            fullscreen={false}
            className='mobile-calendar'
            dateFullCellRender={(date)=>
                <div className='ant-picker-calendar-date-value'> {date.date()}</div>
            }
             />
        </div>
    );
};

export default CalendarMobile;
