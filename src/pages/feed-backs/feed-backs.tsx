import { Avatar, Comment, Rate } from 'antd';
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
        <div className='feed-backs-content'>
            <header>
                <Breadcrumbs items={routes} />
            </header>
            {!!reviews?.length &&
                reviews.slice(-4).map((el, idx) => (
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
                            <p>
                            {el.message || ''}
                            </p>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default FeedBacks;
