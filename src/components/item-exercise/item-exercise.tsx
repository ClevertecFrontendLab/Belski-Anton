import { CloseOutlined } from '@ant-design/icons';
import { Exercise } from '@redux/traninig-slice';
import { Input, InputNumber } from 'antd';

interface IItemProps {
    item: Exercise;
    onChange: (idx: number, newItem: Exercise) => void;
    idx: number;
}

const ItemExercise = ({ item, idx, onChange }: IItemProps) => {
    return (
        <div>
            <Input
                onChange={(e) => onChange(idx, { ...item, name: e.target.value })}
                value={item.name}
                placeholder='Упражнение'
                size='small'
                className='input-training'
            />
            <div className='wrapper-training-details'>
                <div className='repeat-training'>
                    <div>Подходы</div>
                    <InputNumber
                        value={item.approaches === 0 ? undefined : item.approaches}
                        onChange={(val) => onChange(idx, { ...item, approaches: Number(val) })}
                        controls={false}
                        addonBefore='+'
                        placeholder='1'
                        size='small'
                    />
                </div>
                <div className='wrapper-weight-amount-training'>
                    <div className='weight-training'>
                        <div>Вес, кг</div>
                        <InputNumber
                            placeholder='0'
                            controls={false}
                            size='small'
                            value={item.weight === 0 ? undefined : item.weight}
                            onChange={(val) => onChange(idx, { ...item, weight: Number(val) })}
                        />
                    </div>
                    <div className='wrapper-icon-closed'>
                        <CloseOutlined style={{ color: '#8c8c8c' }} />
                    </div>
                    <div className='amount-training'>
                        <div>Количество</div>
                        <InputNumber
                            placeholder='3'
                            controls={false}
                            size='small'
                            value={item.replays === 0 ? undefined : item.replays}
                            onChange={(val) => onChange(idx, { ...item, replays: Number(val) })}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemExercise;
