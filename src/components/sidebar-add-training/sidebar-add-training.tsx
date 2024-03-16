import { Drawer, Input, InputNumber } from 'antd';
import { useState } from 'react';
import './sidebar-add-training.scss';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Exercise, setExercises } from '@redux/traninig-slice';
import Item from 'antd/lib/list/Item';
import ItemExercise from '@components/item-exercise/item-exercise';

interface DrawerControls {
    onClose: () => void;
    open: boolean;
}

const initialItemState: Exercise = {
    name: '',
    replays: 0,
    weight: 0,
    approaches: 0,
    isImplementation: false,
};

const SideBarAddTraining = ({ onClose, open }: DrawerControls) => {
    const dispatch = useAppDispatch();
    const { date, name, exercises } = useAppSelector((store) => store.training);
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
                className='sidebar-add-training'
                title={
                    <div className='wrapper-title'>
                        <div className='wrapper-icon-plus'>
                            <PlusOutlined />
                        </div>
                        <div> Добавление упражнений</div>
                    </div>
                }
                placement='right'
                onClose={() => {
                    saveExercises();
                    onClose();
                }}
                open={open}
                maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
                width={408}
            >
                <div className='wrapper-date-add-training'>
                    {name}
                    {date}
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
