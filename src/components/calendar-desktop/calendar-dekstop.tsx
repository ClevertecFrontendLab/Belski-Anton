/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { EditOutlined, SettingOutlined } from '@ant-design/icons';
import Breadcrumbs from '@components/breadcrumb/breadcrumb';
import CardCreateTraine from '@components/card-creatate-traine/card-create-traine';
import CardTraining from '@components/card-training/card-training';
import CardTrainingEdit from '@components/card-training-edit/card-training-edit';
import ModalDataOpenErrorCalendar from '@components/popup/modal-data-open-error-calendar/modal-data-open-error-calendar';
import SideBarAddTraining from '@components/sidebar-add-training/sidebar-add-training';
import SidebarEditorTraining from '@components/sidebar-editor-training/sidebar-editor-training';
import { color, DATE_FORMATS, PATHS } from '@constants/index';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { history } from '@redux/configure-store';
import { setDate, setExercises, setName, setTraining, TrainingState } from '@redux/traninig-slice';
import { Badge, Calendar } from 'antd';
import ruRu from 'antd/es/calendar/locale/ru_RU';
import moment, { Moment } from 'moment';
import { v4 as uuidv4 } from 'uuid';

import { useGetTrainingListQuery, useGetTrainingQuery } from '../../api/methods-api';

import './calendar-dekstop.scss';

import 'moment/locale/ru';

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
    const [isEditCard, setIsEditCard] = useState(false);
    const [isEditorTraining, setIsEditTraining] = useState(false);
    const { data: trainingData } = useGetTrainingQuery();
    const { data: trainingListData, isError, refetch } = useGetTrainingListQuery();
    const dispatch = useAppDispatch();
    const { date } = useAppSelector((store) => store.training);
    const openSidebar = () => {
        setAddTraining(!isAddTraining);
    };

    const onClose = () => {
        setAddTraining(false);
    };
    const onCloseEdit = () => {
        setIsEditTraining(false);
    };

    const toggleContentVisibility = () => {
        setContentVisible(!isContentVisible);
        dispatch(setName(''));
        dispatch(setExercises([]));
    };

    const clickOnDate = (time: Moment) => {
        dispatch(setDate(moment(time).format(DATE_FORMATS.FULL)));
    };

    const onClickEdit = (training: TrainingState) => {
        setContentVisible(true);
        dispatch(setTraining({ ...training, date }));
        setIsEditCard(true);
    };

    const resetClickDate = () => dispatch(setDate(''));
    const renderTrainig = (d: Moment, isEdit = false) => {
        if (trainingData?.length && trainingListData) {
            const data = trainingData.filter((el) => moment(el.date).isSame(d, 'day'));

            return data.length ? (
                <div className='wrapper-badge-training'>
                    {data.map((el, idx) => (
                        <div className='item-badge' key={uuidv4()}>
                            <Badge
                                color={color.find((item) => item.name === el.name)?.color}
                                text={el.name}
                            />
                            {isEdit && (
                                <EditOutlined
                                    data-test-id={`modal-update-training-edit-button${idx}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        onClickEdit(el);
                                    }}
                                    style={{ color: '#2F54EB' }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            ) : null;
        }

        return null;
    };
    const renderCard = (d: Moment) => {
        const currentDate = d.format(DATE_FORMATS.FULL);

        if (currentDate === date) {
            return isContentVisible ? (
                isEditCard ? (
                    <CardTrainingEdit
                        openSidebar={() => setIsEditTraining(true)}
                        close={() => {
                            setContentVisible(false);
                            setIsEditCard(false);
                        }}
                    />
                ) : (
                    <CardTraining
                        openSidebar={openSidebar}
                        close={() => setContentVisible(false)}
                    />
                )
            ) : (
                <CardCreateTraine
                    onClick={resetClickDate}
                    clickDate={date}
                    disabled={
                        d.isBefore(moment().add(1, 'day'), 'day') ||
                        trainingData?.filter((el) => moment(el.date).isSame(d, 'day')).length ===
                            trainingListData?.length
                    }
                    onCloseClick={toggleContentVisibility}
                    child={renderTrainig(d, true)}
                />
            );
        }

        return null;
    };

    useEffect(() => {
        if (value.month()) {
            dispatch(setDate(''));
        }
    }, [value, dispatch]);

    useEffect(() => {
        setIsModalOpenDateError(isError);
    }, [isError]);

    const handleCellClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, d: Moment) => {
        e.preventDefault();
        e.stopPropagation();
        clickOnDate(d);
        setContentVisible(false);
    };

    const cellCalendar = (d: moment.Moment) => (
        <div
            onKeyDown={onClose}
            role='button'
            tabIndex={0}
            className='cell-table'
            style={{ zIndex: 0 }}
            onClick={(e) => {
                handleCellClick(e, d);
            }}
        >
            <div className='ant-picker-calendar-date-value'>{d.format(DATE_FORMATS.DAY)}</div>
            <div className='ant-picker-calendar-date-content'>
                {date && moment(date, 'DD.MM.YYYY').isSame(d, 'day')
                    ? renderCard(d)
                    : renderTrainig(d)}
            </div>
        </div>
    );

    return (
        <React.Fragment>
            <div className='wrapper-calendar-dekstop'>
                <header>
                    <Breadcrumbs items={routes} />
                </header>
                <div>
                    <div 
                    className='wrapper-setting-calendar' 
                    onClick={()=>history.push(PATHS.SETTINGS)}
                    role='button'
                    tabIndex={0}
                    onKeyDown={() => false}
                    >
                        <span className='title'>Настройки</span>
                        <SettingOutlined />
                    </div>
                    <Calendar
                        onChange={setValue}
                        locale={ruRu}
                        className='wrapper-calendar'
                        dateFullCellRender={(d) => cellCalendar(d)}
                    />
                </div>
            </div>
            {isAddTraining && <SideBarAddTraining open={isAddTraining} onClose={onClose} />}
            <ModalDataOpenErrorCalendar
                onOk={refetch}
                open={isModalOpenDateError}
                onCancel={() => setIsModalOpenDateError(false)}
            />
            <SidebarEditorTraining open={isEditorTraining} onClose={onCloseEdit} />
        </React.Fragment>
    );
};

export default CalendarDekstop;
