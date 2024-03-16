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

import SideBarAddTraining from '@components/sidebar-add-training/sidebar-add-training';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setDate } from '@redux/traninig-slice';
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
    const [value, setValue] = useState(moment());
    const [isModalOpenDateError, setIsModalOpenDateError] = useState(false);
    const [isContentVisible, setContentVisible] = useState(false);
    const [isAddTraining, setAddTraining] = useState(false);
    const { data: trainingData } = useGetTrainingQuery();
    const { data: trainingListData, isError, refetch } = useGetTrainingListQuery();
    const dispatch = useAppDispatch();
    const { date } = useAppSelector((store) => store.training);
    const openSidebar = () => {
        setAddTraining(!isAddTraining);
        console.log(isAddTraining);
    };

    const onClose = () => {
        setAddTraining(false);
    };

    const toggleContentVisibility = () => {
        setContentVisible(!isContentVisible);
    };

    const clickOnDate = (date: Moment) => {
        dispatch(setDate(moment(date).format('DD.MM.YYYY')));
    };

    const resetClickDate = () => dispatch(setDate(''));

    const renderCard = (d: Moment) => {
        const currentDate = d.format('DD.MM.YYYY');
        if (currentDate === date) {
            return isContentVisible ? (
                <CardTraining openSidebar={openSidebar} close={() => setContentVisible(false)}/>
            ) : (
                <CardCreateTraine
                    onClick={resetClickDate}
                    clickDate={date}
                    disabled={d.isBefore(moment().add(1, 'day'), 'day')}
                    onCloseClick={toggleContentVisibility}
                />
            );
        }
    };

    useEffect(() => {
        if (value.month()) {
            dispatch(setDate(''));
        }
    }, [value, dispatch]);

    useEffect(() => {
        if (isError) {
            setIsModalOpenDateError(true);
        } else {
            setIsModalOpenDateError(false);
        }
    }, [isError]);

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
                        dateFullCellRender={(d) => (
                            <div
                                className='cell-table'
                                style={{ zIndex: 0 }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    clickOnDate(d);
                                    setContentVisible(false);
                                }}
                            >
                                <div className='ant-picker-calendar-date-value'>
                                    {d.format('DD')}
                                </div>
                                <div className='ant-picker-calendar-date-content'>
                                    {date && renderCard(d)}
                                </div>
                            </div>
                        )}
                    />
                </div>
            </div>
            {isAddTraining && <SideBarAddTraining open={isAddTraining} onClose={onClose} />}
            <ModalDataOpenErrorCalendar
                onOk={refetch}
                open={isModalOpenDateError}
                onCancel={() => setIsModalOpenDateError(false)}
            />
        </>
    );
};

export default CalendarDekstop;
