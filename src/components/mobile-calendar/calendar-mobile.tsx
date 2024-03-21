/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */

import React, { useEffect, useState } from 'react';
import { EditFilled, EditOutlined, SettingOutlined } from '@ant-design/icons';
import Breadcrumbs from '@components/breadcrumb/breadcrumb';
import CardCreateTraine from '@components/card-creatate-traine/card-create-traine';
import CardTraining from '@components/card-training/card-training';
import CardTrainingEdit from '@components/card-training-edit/card-training-edit';
import ModalDataOpenErrorCalendar from '@components/popup/modal-data-open-error-calendar/modal-data-open-error-calendar';
import ModelDataSaveErrorCalendar from '@components/popup/model-data-save-error-calendar/model-data-save-error-calendar';
import SideBarAddTraining from '@components/sidebar-add-training/sidebar-add-training';
import SidebarEditorTraining from '@components/sidebar-editor-training/sidebar-editor-training';
import { color, DATE_FORMATS } from '@constants/index';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    clearTraining,
    setDate,
    setExercises,
    setName,
    setTraining,
    TrainingState,
} from '@redux/traninig-slice';
import { Badge, Button, Calendar } from 'antd';
import ruRu from 'antd/es/calendar/locale/ru_RU';
import moment, { Moment } from 'moment';
import { v4 as uuidv4 } from 'uuid';

import { useGetTrainingListQuery, useGetTrainingQuery } from '../../api/methods-api';

import './calendar-mobile.scss';

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

const CalendarMobile = () => {
    const [isModalOpenDateError, setIsModalOpenDateError] = useState(false);
    const [isContentVisible, setContentVisible] = useState(false);
    const [isAddTraining, setAddTraining] = useState(false);
    const [isEditCard, setIsEditCard] = useState(false);
    const [isEditorTraining, setIsEditTraining] = useState(false);
    const { data: trainingData } = useGetTrainingQuery();
    const { data: trainingListData, isError } = useGetTrainingListQuery();
    const [isModalDataSaveError, setIsModalDataSaveError] = useState(false);
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
        if (moment(time).month() === moment().month()) {
            dispatch(setDate(moment(time).format('DD.MM.YYYY')));
        } else {
            dispatch(setDate(''));
        }
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
                        <div
                            className={`item-badge ${el.isImplementation ? 'disabled' : ''}`}
                            key={uuidv4()}
                        >
                            <Badge
                                color={color.find((item) => item.name === el.name)?.color}
                                text={el.name}
                            />
                            {isEdit && (
                                <Button
                                    style={{ border: 'none', backgroundColor: 'transparent' }}
                                    disabled={el.isImplementation}
                                    data-test-id={`modal-update-training-edit-button${idx}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        onClickEdit(el);
                                    }}
                                >
                                    {el.isImplementation ? (
                                        <EditFilled />
                                    ) : (
                                        <EditOutlined style={{ color: '#2F54EB' }} />
                                    )}
                                </Button>
                            )}
                        </div>
                    ))}
                </div>
            ) : undefined;
        }

        return undefined;
    };

    const setError = () => {
        dispatch(clearTraining());
        setIsModalDataSaveError(true);
    };
    const renderCard = (d: Moment) => {
        const currentDate = d.format(DATE_FORMATS.FULL);

        if (currentDate === date) {
            return isContentVisible ? (
                isEditCard ? (
                    <CardTrainingEdit
                        setError={setError}
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
        if (isError) {
            setIsModalOpenDateError(true);
        } else {
            setIsModalOpenDateError(false);
        }
    }, [isError]);

    const cellCalenderMobile = (d: moment.Moment) => (
        <React.Fragment>
            <div
                role='button'
                tabIndex={0}
                onKeyDown={() => false}
                className='ant-picker-calendar-date-value'
                onClick={() => {
                    clickOnDate(d);
                    setContentVisible(false);
                }}
            >
                {d.format(DATE_FORMATS.DAY_SHORT)}
            </div>
            <div className='ant-picker-calendar-date-content'>
                {!!(date && moment(date, DATE_FORMATS.FULL).isSame(d, 'day')) && renderCard(d)}
            </div>
        </React.Fragment>
    );

    return (
        <React.Fragment>
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
                    dateFullCellRender={(d) => cellCalenderMobile(d)}
                />
            </div>
            <ModalDataOpenErrorCalendar
                open={isModalOpenDateError}
                onCancel={() => setIsModalOpenDateError(false)}
            />
            {isAddTraining && (
                <SideBarAddTraining isMob={true} open={isAddTraining} onClose={onClose} />
            )}
            <SidebarEditorTraining isMob={true} open={isEditorTraining} onClose={onCloseEdit} />
            <ModelDataSaveErrorCalendar
                open={isModalDataSaveError}
                setIsOpen={() => setIsModalDataSaveError(false)}
            />
        </React.Fragment>
    );
};

export default CalendarMobile;
