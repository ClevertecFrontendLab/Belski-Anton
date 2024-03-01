import { Avatar, Button, Rate } from 'antd';
import Breadcrumbs from '@components/breadcrumb/breadcrumb';
import avatar from '../../../public/assets/icons/avatar.svg';
import './feed-backs.scss';

import { UserOutlined } from '@ant-design/icons';
import { useGetReviewsQuery } from '../../api/auth-api';
import { useState } from 'react';
import ModalWrite from '@components/modal-write/modal';
const routes = [
    {
        path: 'main',
        name: 'Главная',
    },
    {
        name: 'Отзывы пользователей',
    },
];

const FeedBacks = () => {
    const { data: reviews } = useGetReviewsQuery();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    }
    

    return (
        <div className='feedbacks-content'>
            <header>
                <Breadcrumbs items={routes} />
            </header>
            <div className='wrapper-feedbacks-conten'>
                <div className='wrapper-commit'>
                    {!!reviews?.length &&
                        reviews.slice(-4).map((el) => (
                            <div className='wrapper-card-commit' key={el.id}>
                                <div className='description-user'>
                                    <div>
                                        <Avatar
                                            size={42}
                                            src={el.imageSrc || ''}
                                            icon={!el.imageSrc ? <UserOutlined /> : undefined}
                                        />
                                    </div>
                                    <div className='name-user'>{el.fullName || 'Пользователь'}</div>
                                </div>
                                <div className='wrapper-rate-text'>
                                    <div className='wrapper-rate-date'>
                                        <Rate disabled value={el.rating} />
                                        <div className='date-commit'>
                                            {new Date(el.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <p>{el.message || ''}</p>
                                </div>
                            </div>
                        ))}
                </div>
                <div className='wrapper-commit-btn'>
                    <Button type='text' className='write-review-btn' onClick={showModal}>
                        Написать отзыв
                    </Button>
                    <Button type='text' className='expand-reviews-btn'>
                        Развернуть все отзывы
                    </Button>
                </div>
            </div>
            <ModalWrite 
            isOpen={isModalOpen} 
            onOk={handleOk} 
            onCancel={handleCancel} 
            centered={true}
             />
        </div>
    );
};


export default FeedBacks;
