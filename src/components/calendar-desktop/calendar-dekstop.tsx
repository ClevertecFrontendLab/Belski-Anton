import Breadcrumbs from '@components/breadcrumb/breadcrumb';
import ruRu from 'antd/es/calendar/locale/ru_RU';
import moment, { Moment } from 'moment';
import 'moment/locale/ru';
import './calendar-dekstop.scss';
import { useEffect, useState } from 'react';
import { Calendar } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import CardCreateTraine from '@components/card-creatate-traine/card-create-traine';
import ModalDataOpenErrorCalendar from '@components/popup/modal-data-open-error-calendar/modal-data-open-error-calendar';
import { useGetTrainingListQuery, useGetTrainingQuery } from '../../api/methods-api';
import CardTraining from '@components/card-training/card-training';

import ModelDataSaveErrorCalendar from '@components/popup/model-data-save-error-calendar/model-data-save-error-calendar';
import SideBarAddTraining from '@components/sidebar-add-training/sidebar-add-training';
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

const CalendarDekstop = () => {
    const [clickDate, setClickDate] = useState('');
    const [value, setValue] = useState(moment());
    const [isModalOpenDateError, setisModalOpenDateError] = useState(false);
    const [isModalDataSaveError, setisModalDataSaveError] = useState(true);
    const [isContentVisible, setContentVisible] = useState(false);
    const [isAddTraining, setAddTraining] = useState(false);
    const { data: trainingData, isError, error } = useGetTrainingQuery();
    const { data: trainingListData } = useGetTrainingListQuery();
    // const [date, setDate] = useState(moment());
    console.log(trainingListData);

    const showModal = () => {
        setisModalOpenDateError(true);
        // isModalDataSaveError(true)
      };

    const openSidebar = () => {
        setAddTraining(!isAddTraining);
        console.log(isAddTraining);
    };

    // const showDrawer = () => {
    //     setAddTraining(true);
    // };

    const onClose = () => {
        setAddTraining(false);
    };

    const toggleContentVisibility = () => {
        setContentVisible(!isContentVisible);
    };

    const clickOnDate = (date: Moment) => {
        setClickDate(moment(date).format('DD.MM.YYYY'));
    };

    const resetClickDate = () => setClickDate('');

    const renderCard = (date: Moment) => {
        const currentDate = date.format('DD.MM.YYYY');
        if (currentDate === clickDate) {
            return isContentVisible ? (
                <CardTraining openSidebar={openSidebar} setClickDate={setClickDate}/>
            ) : (
                <CardCreateTraine
                    onClick={resetClickDate}
                    clickDate={clickDate}
                    disabled={date.isBefore(moment(), 'day')}
                    onCloseClick={toggleContentVisibility}
                />
            );
        }
    };

    useEffect(() => {
        if (value.month()) {
            setClickDate('');
        }
    }, [value]);

    return (
        <>
            <div className='wrapper-calendar-dekstop'>
                <header>
                    <Breadcrumbs items={routes} />
                </header>
                <div>
                    <div className='wrapper-setting-calendar'>
                        <span className='title'>Настройки</span>
                        <SettingOutlined />
                    </div>
                    <Calendar
                        onChange={setValue}
                        locale={ruRu}
                        className='wrapper-calendar'
                        dateFullCellRender={(date) => (
                            <div
                                className='cell-table'
                                style={{ zIndex: 0 }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    clickOnDate(date);
                                    setContentVisible(false);
                                }}
                            >
                                <div className='ant-picker-calendar-date-value'>
                                    {date.format('DD')}
                                </div>
                                <div className='ant-picker-calendar-date-content'>
                                    {clickDate && renderCard(date)}
                                </div>
                            </div>
                        )}
                    />
                </div>
            </div>
            {isAddTraining && <SideBarAddTraining open={isAddTraining} onClose={onClose} clickDate={clickDate}  />}
            <ModalDataOpenErrorCalendar open={isModalOpenDateError} />
           {/* < ModelDataSaveErrorCalendar open={isModalDataSaveError}/> */}
        </>
    );
};

export default CalendarDekstop;
