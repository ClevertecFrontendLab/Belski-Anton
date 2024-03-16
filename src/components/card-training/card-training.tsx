import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Divider, Select } from 'antd';
import iconCreateCard from '../../../public/assets/icons/empty-image.svg';
import { useCreateTrainigMutation, useGetTrainingListQuery } from '../../api/methods-api';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setName } from '@redux/traninig-slice';
import { useState } from 'react';
import './card-training.scss';
import ModelDataSaveErrorCalendar from '@components/popup/model-data-save-error-calendar/model-data-save-error-calendar';
import { setIsLoading } from '@redux/loading-slice';
import moment from 'moment';

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
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    const onSave = () => {
        dispatch(setIsLoading(true));
        createTraining({
            name,
            exercises,
            date: moment.utc(date, 'DD.MM.YYYY').format(),
        })
            .unwrap()
            .then(() => close())
            .catch(() => setIsModalDataSaveError(true))
            .finally(() => dispatch(setIsLoading(false)));
    };
    return (
        <>
            <div className='wrapper-card-training' onClick={handleClick}>
                <div className='header-select'>
                    <ArrowLeftOutlined onClick={close} />
                    <Select
                        placeholder='Выбор типа тренировки'
                        options={trainingListData || []}
                        fieldNames={{
                            label: 'name',
                            value: 'name',
                        }}
                        style={{ width: '240px' }}
                        value={name || 'Выбор типа тренировки'}
                        onChange={(val) => dispatch(setName(val))}
                    />
                </div>
                <Divider className='divider-up' />
                {exercises.length ? (
                    <div className='wrapper-save-training'>
                        {exercises.map((el, idx) => (
                            <div key={idx}>{el.name}</div>
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
        </>
    );
};

export default CardTraining;
