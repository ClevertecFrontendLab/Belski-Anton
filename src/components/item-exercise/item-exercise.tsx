import { CloseOutlined } from '@ant-design/icons';
import { Exercise } from '@redux/traninig-slice';
import { Checkbox, Input, InputNumber } from 'antd';

interface IItemProps {
    item: Exercise;
    onChange: (idx: number, newItem: Exercise) => void;
    idx: number;
    edit?: boolean;
    isChecked?: boolean;
    onClickCheckbox?: (arg: number) => void;
}

const ItemExercise = ({
    item,
    idx,
    onChange,
    edit = false,
    isChecked = false,
    onClickCheckbox,
}: IItemProps) => {
    return (
        <div>
            <Input
                data-test-id={`modal-drawer-right-input-exercise${idx}`}
                onChange={(e) => onChange(idx, { ...item, name: e.target.value })}
                value={item.name}
                placeholder='Упражнение'
                size='small'
                className='input-training'
                addonAfter={
                    edit ? (
                        <Checkbox
                            data-test-id={`modal-drawer-right-checkbox-exercise${idx}`}
                            checked={isChecked}
                            onChange={() => (onClickCheckbox ? onClickCheckbox(idx) : undefined)}
                        />
                    ) : null
                }
            />
            <div className='wrapper-training-details'>
                <div className='repeat-training'>
                    <div>Подходы</div>
                    <InputNumber
                        data-test-id={`modal-drawer-right-input-approach${idx}`}
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
                            data-test-id={`modal-drawer-right-input-weight${idx}`}
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
                            data-test-id={`modal-drawer-right-input-quantity${idx}`}
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
