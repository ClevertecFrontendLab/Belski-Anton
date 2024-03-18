import { Badge, Drawer } from 'antd';
import { useState } from 'react';
import './sidebar-add-training.scss';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Exercise, setExercises } from '@redux/traninig-slice';
import ItemExercise from '@components/item-exercise/item-exercise';
import { WIDTH_TRAINING_SIDEBAR, color } from '@constants/index';

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

const SideBarAddTraining = ({ onClose, open, isMob = false }: DrawerControls) => {
    const dispatch = useAppDispatch();
    const { date, exercises, name } = useAppSelector((store) => store.training);
    const [allExercises, setAllExercises] = useState(
        exercises.length ? exercises : [initialItemState],
    );

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
    return (
        <div className='wrapper-drawer'>
            <Drawer
                data-test-id='modal-drawer-right'
                className='sidebar-add-training'
                placement={isMob ? 'bottom' : 'right'}
                height={isMob ? `87vh` : `100%`}
                title={
                    <div className='wrapper-title'>
                        <div className='wrapper-icon-plus'>
                            <PlusOutlined />
                        </div>
                        <div> Добавление упражнений</div>
                    </div>
                }
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
                    <ItemExercise item={el} key={idx} idx={idx} onChange={onChangeExercise} />
                ))}

                <div
                    className='btn-repeat'
                    onClick={() => setAllExercises([...allExercises, initialItemState])}
                >
                    <PlusOutlined style={{ color: '#2F54EB' }} />
                    <div>Добавить ещё</div>
                </div>
            </Drawer>
        </div>
    );
};

export default SideBarAddTraining;
