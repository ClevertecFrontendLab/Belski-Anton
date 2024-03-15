import { Drawer, Input, InputNumber } from 'antd';
import { useState } from 'react';
import './sidebar-add-training.scss';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';

interface DrawerControls {
    onClose: () => void;
    open: boolean;
    clickDate: string;
}

const SideBarAddTraining = ({ onClose, open, clickDate }: DrawerControls) => {
    const [additionalItems, setAdditionalItems] = useState<JSX.Element[]>([]);

    const AddNewItem = () => {
        const newItem = (
            <div key={additionalItems.length}>
                <Input placeholder='Упражнение' size='small' className='input-training' />
                <div className='wrapper-training-details'>
                    <div className='repeat-training'>
                        <div>Подходы</div>
                        <InputNumber
                            controls={false}
                            addonBefore='+'
                            placeholder='1'
                            size='small'
                        />
                    </div>
                    <div className='wrapper-weight-amount-training'>
                        <div className='weight-training'>
                            <div>Вес, кг</div>
                            <InputNumber placeholder='0' controls={false} size='small' />
                        </div>
                        <div className='wrapper-icon-closed'>
                            <CloseOutlined style={{ color: '#8c8c8c' }} />
                        </div>
                        <div className='amount-training'>
                            <div>Количество</div>
                            <InputNumber placeholder='3' controls={false} size='small' />
                        </div>
                    </div>
                </div>
            </div>
        );
        setAdditionalItems([...additionalItems, newItem]);
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
                onClose={onClose}
                open={open}
                maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
                width={408}
            >
                <div className='wrapper-date-add-training'>{clickDate}</div>
                <Input placeholder='Упражнение' size='small' className='input-training' />
                <div className='wrapper-training-details'>
                    <div className='repeat-training'>
                        <div>Подходы</div>
                        <InputNumber
                            controls={false}
                            addonBefore='+'
                            placeholder='1'
                            size='small'
                        />
                    </div>
                    <div className='wrapper-weight-amount-training'>
                        <div className='weight-training'>
                            <div>Вес, кг</div>
                            <InputNumber placeholder='0' controls={false} size='small' />
                        </div>
                        <div className='wrapper-icon-closed'>
                            <CloseOutlined style={{ color: '#8c8c8c' }} />
                        </div>
                        <div className='amount-training'>
                            <div>Количество</div>
                            <InputNumber placeholder='3' controls={false} size='small' />
                        </div>
                    </div>
                </div>
                {additionalItems}

                <div className='btn-repeat' onClick={AddNewItem}>
                    <PlusOutlined style={{ color: '#2F54EB' }} />
                    <div>Добавить ещё</div>
                </div>
            </Drawer>
        </div>
    );
};

export default SideBarAddTraining;
