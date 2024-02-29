import Breadcrumbs from '@components/breadcrumb/breadcrumb';
import './feed-backs.scss'
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
    return (
        <div className='feed-backs-content'>
            <header>
                <Breadcrumbs items={routes} />
            </header>
        </div>
    );
};

export default FeedBacks;
