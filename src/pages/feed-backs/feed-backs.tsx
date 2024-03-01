import { Avatar, Button, Rate } from 'antd';
import Breadcrumbs from '@components/breadcrumb/breadcrumb';
import avatar from '../../../public/assets/icons/avatar.svg';
import './feed-backs.scss';

import { UserOutlined } from '@ant-design/icons';
import { useGetReviewsQuery } from '../../api/auth-api';
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
                                        <div className='name-user'>
                                            {el.fullName || 'Пользователь'}
                                        </div>
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
                        <Button type='text' className='write-review-btn'>
                            Написать отзыв
                        </Button>
                        <Button type='text'>Развернуть все отзывы</Button>
                    </div>
                </div>
            </div>
    );
};

export default FeedBacks;
