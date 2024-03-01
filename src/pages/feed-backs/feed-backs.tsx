import { Avatar, Comment, List, Rate, Tooltip } from 'antd';
import Breadcrumbs from '@components/breadcrumb/breadcrumb';
import avatar from '../../../public/assets/icons/avatar.svg';
import './feed-backs.scss';
import { UserOutlined } from '@ant-design/icons';
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
            <div className='wrapper-card-commit'>
                <div className='description-user'>
                    <div><Avatar size={42} icon={<UserOutlined />} /></div>
                    <div className='name-user'>
                       <span> Вероника </span>
                       <span> Киверова </span>
                        </div>
                </div>
               <div className='wrapper-rate-text'>
                    <div className='wrapper-rate-date'>
                        <Rate value={3} />
                        <div className='date-commit'>05.12.2023</div>
                    </div>
                    <p>
                        Я очень довольна этим приложением! Оно помогает мне следить за своим здоровьем и физической формой, предлагая разнообразные упражнения и питание. Я люблю, что приложение адаптируется к моему уровню и целям, и дает мне полезные советы и обратную связь. Я рекомендую это приложение всем, кто хочет улучшить свою жизнь!
                        </p>
               </div>
            </div>
        </div>
    );
};

export default FeedBacks;
