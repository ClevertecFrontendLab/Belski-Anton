/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-extraneous-dependencies */
import React,{ useState } from 'react';
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import ModelDataSaveErrorCalendar from '@components/popup/model-data-save-error-calendar/model-data-save-error-calendar';
import { DATE_FORMATS } from '@constants/index';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setIsLoading } from '@redux/loading-slice';
import { Button, Divider, Select } from 'antd';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import { useUptadeTraningMutation } from '../../api/methods-api';

interface ICardTrainingProps {
    openSidebar: () => void;
    close: () => void;
    setError?: () => void
}
const CardTrainingEdit = ({ openSidebar, close, setError }: ICardTrainingProps) => {
    const [isModalDataSaveError, setIsModalDataSaveError] = useState(false);
    const [updateTraining] = useUptadeTraningMutation();
    const dispatch = useAppDispatch();
    const { name, exercises, date, _id } = useAppSelector((store) => store.training);
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };


    const onClickUpdate = () => {
        dispatch(setIsLoading(true));
        updateTraining({
            training: {
                name,
                exercises,
                date: moment.utc(date, DATE_FORMATS.FULL).format()
            },
            id: _id,
            isImplementation: moment(date, DATE_FORMATS.FULL).isBefore(moment(), 'day'),
        })
            .unwrap()
            .then(() => close())
            .catch(() => {
                if (setError) {
                    setError()
                } else {
                    setIsModalDataSaveError(true)
                }
            })
            .finally(() => dispatch(setIsLoading(false)));
    };

    return (
        <React.Fragment>
            <div 
            className='wrapper-card-training' 
            data-test-id='modal-create-exercise' 
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={()=> false}
            >
                <div className='header-select'>
                    <ArrowLeftOutlined onClick={close} />
                    <Select
                        style={{ width: '240px' }}
                        value={name}
                        options={[{ label: name, value: name }]}
                    />
                </div>
                <Divider className='divider-up' />
                <div className='wrapper-save-training'>
                    {!!exercises.length && exercises.map((el, idx) => (
                        <div key={uuidv4()} className='item-save-training'>
                            <div>{el.name}</div>
                            <EditOutlined
                                data-test-id={`modal-update-training-edit-button${idx}`}
                                onClick={openSidebar}
                                style={{ color: '#2F54EB' }}
                            /></div>
                    ))}
                </div>
                <Divider className='divider-down' />
                <div className='wrapper-btn-training'>
                    <Button className='btn-add-training' disabled={!name} onClick={openSidebar}>
                        Добавить упражнения
                    </Button>
                    <Button
                        disabled={!exercises.length}
                        className='btn-save-training'
                        onClick={onClickUpdate}
                    >
                        Сохранить изменения
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

export default CardTrainingEdit;
