/* eslint-disable quotes */
/* eslint-disable import/no-extraneous-dependencies */
import { useEffect, useState } from 'react';
import { CloseOutlined, EditOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import ItemExercise from '@components/item-exercise/item-exercise';
import { color, WIDTH_TRAINING_SIDEBAR } from '@constants/index';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Exercise, setExercises } from '@redux/traninig-slice';
import { Badge, Button, Drawer } from 'antd';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import './sidebar-editor-training.scss';

interface DrawerControls {
    onClose: () => void;
    open: boolean;
    isMob?: boolean;
}

const initialItemState: Exercise = {
    name: '',
    replays: 0,
    weight: 0,
    approaches: 0,
    isImplementation: false,
};

const SidebarEditorTraining = ({ onClose, open, isMob = false }: DrawerControls) => {
    const dispatch = useAppDispatch();
    const [deleteItems, setDeleteItems] = useState<number[]>([]);
    const { date, name, exercises } = useAppSelector((store) => store.training);
    const [allExercises, setAllExercises] = useState(exercises);

    useEffect(() => {
        if (exercises) {
            setAllExercises(exercises);
        }
    }, [exercises]);

    const onChangeExercise = (idx: number, newItem: Exercise) => {
        setAllExercises((prevExercises) => {
            const updatedExercises = [...prevExercises];

            updatedExercises[idx] = newItem;

            return updatedExercises;
        });
    };
    const saveExercises = () => {
        const fillArray = allExercises.filter((el) => el.name);

        dispatch(setExercises(fillArray));
    };

    const onDeleteItems = () => {
        const actualItems = allExercises.filter((_, idx) => !deleteItems.includes(idx));

        setAllExercises(actualItems);
        setDeleteItems([]);
    };

    const onClickCheckbox = (idx: number) => {
        if (deleteItems.includes(idx)) {
            setDeleteItems(deleteItems.filter((el) => el !== idx));
        } else {
            setDeleteItems([...deleteItems, idx]);
        }
    };

    return (
        <div className='wrapper-drawer'>
            <Drawer
                data-test-id='modal-drawer-right'
                className='sidebar-add-training edit'
                title={
                    <div className='wrapper-title'>
                        <EditOutlined />
                        <div>Редактирование</div>
                    </div>
                }
                height={isMob ? `87vh` : `100%`}
                placement={isMob ? 'bottom' : 'right'}
                onClose={() => {
                    saveExercises();
                    onClose();
                }}
                open={open}
                maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
                width={WIDTH_TRAINING_SIDEBAR}
                closeIcon={
                    <CloseOutlined
                        data-test-id='modal-drawer-right-button-close'
                        onClick={() => {
                            saveExercises();
                            onClose();
                        }}
                    />
                }
            >
                <div className='wrapper-date-add-training'>
                    {name && (
                        <Badge
                            color={color.find((item) => item.name === name)?.color}
                            text={name}
                        />
                    )}
                    <div className='date'>{date}</div>
                </div>

                {allExercises.map((el, idx) => (
                    <ItemExercise
                        edit={true}
                        item={el}
                        key={uuidv4()}
                        idx={idx}
                        onChange={onChangeExercise}
                        onClickCheckbox={onClickCheckbox}
                        isChecked={!!(deleteItems.length && deleteItems.includes(idx))}
                    />
                ))}

                <div className='wrapper-action'>
                    <div
                        className='btn-repeat'
                        onClick={() => setAllExercises([...allExercises, initialItemState])}
                        role='button'
                        tabIndex={0}
                        onKeyDown={() => false}
                    >
                        <PlusOutlined style={{ color: '#2F54EB' }} />
                        <div>Добавить ещё</div>
                    </div>
                    <Button
                        onClick={onDeleteItems}
                        className='btn-delete'
                        disabled={!deleteItems.length}
                    >
                        <MinusOutlined />
                        Удалить
                    </Button>
                </div>
                {!!moment(date, 'DD.MM.YYYY').isBefore(moment(), 'day') && (
                    <div className='notification'>
                        После сохранения внесенных изменений отредактировать проведенную тренировку
                        будет невозможно
                    </div>
                )}
            </Drawer>
        </div>
    );
};

export default SidebarEditorTraining;
