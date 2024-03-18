import Breadcrumbs from '@components/breadcrumb/breadcrumb';
import ruRu from 'antd/es/calendar/locale/ru_RU';
import moment, { Moment } from 'moment';
import 'moment/locale/ru';
import './calendar-dekstop.scss';
import { useEffect, useState } from 'react';
import { Badge, Calendar } from 'antd';
import { EditOutlined, SettingOutlined } from '@ant-design/icons';
import CardCreateTraine from '@components/card-creatate-traine/card-create-traine';
import ModalDataOpenErrorCalendar from '@components/popup/modal-data-open-error-calendar/modal-data-open-error-calendar';
import { useGetTrainingListQuery, useGetTrainingQuery } from '../../api/methods-api';
import CardTraining from '@components/card-training/card-training';

import SideBarAddTraining from '@components/sidebar-add-training/sidebar-add-training';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { TrainingState, setDate, setExercises, setName, setTraining } from '@redux/traninig-slice';
import { DATE_FORMATS, color } from '@constants/index';
import SidebarEditorTraining from '@components/sidebar-editor-training/sidebar-editor-training';
import CardTrainingEdit from '@components/card-training-edit/card-training-edit';
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

    const clickOnDate = (date: Moment) => {
        dispatch(setDate(moment(date).format(DATE_FORMATS.FULL)));
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
                        <div className='item-badge' key={`color-${idx}`}>
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
            ) : undefined;
        }
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
                                    handleCellClick(e, d);
                                }}
                            >
                                <div className='ant-picker-calendar-date-value'>
                                    {d.format(DATE_FORMATS.DAY)}
                                </div>
                                <div className='ant-picker-calendar-date-content'>
                                    {date && moment(date, 'DD.MM.YYYY').isSame(d, 'day')
                                        ? renderCard(d)
                                        : renderTrainig(d)}
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
            <SidebarEditorTraining open={isEditorTraining} onClose={onCloseEdit} />
        </>
    );
};

export default CalendarDekstop;
