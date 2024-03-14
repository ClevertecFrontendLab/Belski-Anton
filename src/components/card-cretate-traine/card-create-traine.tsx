import { Button, Divider } from 'antd';
import './card-create-traine.scss';
import { CloseOutlined } from '@ant-design/icons';
import iconCreateCard from '../../../public/assets/icons/empty-image.svg';
interface CardCreateTraineProps {
    clickDate: string;
    disabled: boolean;
    onClick: () => void;
    onCloseClick: () => void;
}
const CardCreateTraine = ({
    clickDate,
    disabled,
    onClick,
    onCloseClick,
}: CardCreateTraineProps) => {
    return (
        <div className='wrapper-card-create-traine'>
            <div className='header-card-create-traine'>
                <div className='title-card-create-traine'>
                    <div className='text-data-create-card'>{`Тренировки на ${clickDate}`}</div>
                    <span>Нет активных тренировок</span>
                </div>
                <CloseOutlined
                    className='close-card-create-traine'
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onClick();
                    }}
                />
            </div>
            <div className='wrapper-img'>
                <img src={iconCreateCard} alt='' />
            </div>
            <Divider style={{ margin: '0' }} />
            <div className='wrapper-btn-create-traine'>
                <Button
                    className='btn-create-traine'
                    disabled={disabled}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onCloseClick();
                    }}
                >
                    Создать тренировку
                </Button>
            </div>
        </div>
    );
};

export default CardCreateTraine;
