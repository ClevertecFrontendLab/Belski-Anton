import Breadcrumbs from '@components/breadcrumb/breadcrumb';
import ruRu from 'antd/es/calendar/locale/ru_RU';
import moment, { Moment } from 'moment';
import 'moment/locale/ru';
import './calendar-page.scss';
import { useState } from 'react';
import ModalErrorCalendar from '@components/popup/modal-error-calendar/modal-error-calendar';
import { Calendar } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import CardCreateTraine from '@components/card-cretate-traine/card-create-traine';
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
    const [clickDate, setClickDate] = useState('');
    const [value, setValue] = useState(moment());
    // const [isModalOpen, setIsModalOpen] = useState(false);

    // const showModal = () => {
    //     setIsModalOpen(true);
    // };

    // const handleOk = () => {
    //     setIsModalOpen(false);
    // };

    // const handleCancel = () => {
    //     setIsModalOpen(false);
    // };

    // console.log(clickDate);

    const clickOnDate = (date: Moment) => {
        setClickDate(moment(date).format('DD.MM.YYYY'));
        
    };
    const renderCard = (date: Moment) => {
        const currentDate = moment(date).format('DD.MM.YYYY');
        if (currentDate === clickDate) {
            return <CardCreateTraine clickDate={clickDate} />;
        }
    };

    console.log(value)

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
                        defaultValue={value}
                        value={value}
                        onChange={setValue}
                        onSelect={clickOnDate}
                        locale={ruRu}
                        disabledDate={(date) => moment(date).format('MM') !== moment(value).format('MM')}
                        className='wrapper-calendar'
                        dateCellRender={renderCard}
                        dateFullCellRender={(date) => (
                            <div className='cell-table' style={{ zIndex: 0 }}>
                                <div className='ant-picker-calendar-date-value'>
                                    {moment(date).format('DD')}
                                </div>
                                <div className='ant-picker-calendar-date-content'>
                                    {renderCard(date)}
                                </div>
                            </div>
                        )}
                    />
                </div>
            </div>
            {/* 
            <ModalErrorCalendar open={true} /> */}
        </>
    );
};

export default CalendarPage;
