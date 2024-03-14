import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Divider, Select } from 'antd';
import iconCreateCard from '../../../public/assets/icons/empty-image.svg';
import './card-training.scss';

const options = [
    { value: 'legs', label: 'Ноги' },
    { value: 'hands', label: 'Руки' },
    { value: 'strength', label: 'Силовая' },
    { value: 'back', label: 'Спина' },
    { value: 'chest', label: 'Грудь' },
];

const CardTraining = () => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };
    return (
        <div className='wrapper-card-training' onClick={handleClick}>
            <div className='header-select'>
                <ArrowLeftOutlined />
                <Select
                    labelInValue
                    defaultValue={{ value: 'legs', label: 'Выбор типа тренировки' }}
                    options={options}
                    style={{ width: '240px' }}
                />
            </div>
            <Divider className='divider-up' />
            <div className='icon-card'>
                <img src={iconCreateCard} alt='icon' />
            </div>
            <Divider className='divider-down' />
            <div className='wrapper-btn-training'>
                <Button className='btn-add-training'>Добавить упражнения</Button>
                <Button disabled className='btn-save-training'>
                    Сохранить
                </Button>
            </div>
        </div>
    );
};

export default CardTraining;
