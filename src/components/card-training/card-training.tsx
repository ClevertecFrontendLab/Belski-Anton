/* eslint-disable import/no-extraneous-dependencies */
import React,{ useState } from 'react';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import ModelDataSaveErrorCalendar from '@components/popup/model-data-save-error-calendar/model-data-save-error-calendar';
import { DATE_FORMATS } from '@constants/index';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import iconCreateCard from '@public/icons/empty-image.svg';
import { setIsLoading } from '@redux/loading-slice';
import { setExercises, setName } from '@redux/traninig-slice';
import { Button, Divider, Select } from 'antd';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import {
    useCreateTrainigMutation,
    useGetTrainingListQuery,
    useGetTrainingQuery,
} from '../../api/methods-api';

import './card-training.scss';

interface ICardTrainingProps {
    openSidebar: () => void;
    close: () => void;
}
const CardTraining = ({ openSidebar, close }: ICardTrainingProps) => {
    const [createTraining] = useCreateTrainigMutation();
    const [isModalDataSaveError, setIsModalDataSaveError] = useState(false);

    const dispatch = useAppDispatch();
    const { name, exercises, date } = useAppSelector((store) => store.training);
    const { data: trainingListData } = useGetTrainingListQuery();
    const { data: trainingData } = useGetTrainingQuery();
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    const onSave = () => {
        dispatch(setIsLoading(true));
        createTraining({
            name,
            exercises,
            date: moment.utc(date, DATE_FORMATS.FULL).format(),
        })
            .unwrap()
            .then(() => close())
            .catch(() => setIsModalDataSaveError(true))
            .finally(() => dispatch(setIsLoading(false)));
    };

    const getActualList = () => {
        if (trainingData?.length && trainingListData?.length) {
            const currentList = trainingData
                .filter((el) => moment(date, 'DD.MM.YYYY').isSame(moment.utc(el.date), 'day'))
                .map((el) => el.name);

            return trainingListData.filter((el) => !currentList.includes(el.name));
        }

        return trainingListData || [];
    };

    const onChangeSelect = (val: string) => {
        dispatch(setName(val));
        dispatch(setExercises([]));
    };

    return (
        <React.Fragment>
            <div
                className='wrapper-card-training'
                onClick={handleClick}
                role="button"
                tabIndex={0}
                onKeyDown={()=> false}
                data-test-id='modal-create-exercise'
            >
                <div className='header-select'>
                    <ArrowLeftOutlined
                        onClick={close}
                        data-test-id='modal-exercise-training-button-close'
                    />
                    <Select
                        placeholder='Выбор типа тренировки'
                        options={getActualList()}
                        fieldNames={{
                            label: 'name',
                            value: 'name',
                        }}
                        value={name || 'Выбор типа тренировки'}
                        onChange={onChangeSelect}
                        data-test-id='modal-create-exercise-select'
                    />
                </div>
                <Divider className='divider-up' />
                {exercises.length ? (
                    <div className='wrapper-save-training'>
                        {exercises.map((el) => (
                            <div key={uuidv4()} className='item-save-training'>
                                <div>{el.name}</div>
                                <EditOutlined onClick={openSidebar} style={{ color: '#2F54EB' }} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='icon-card'>
                        <img src={iconCreateCard} alt='icon' />
                    </div>
                )}

                <Divider className='divider-down' />
                <div className='wrapper-btn-training'>
                    <Button className='btn-add-training' disabled={!name} onClick={openSidebar}>
                        Добавить упражнения
                    </Button>
                    <Button
                        disabled={!exercises.length}
                        className='btn-save-training'
                        onClick={onSave}
                    >
                        Сохранить
                    </Button>
                </div>
            </div>
            <ModelDataSaveErrorCalendar
                open={isModalDataSaveError}
                setIsOpen={() => setIsModalDataSaveError(false)}
            />
        </React.Fragment>
    );
};

export default CardTraining;
