import { Layout } from 'antd';
import './main-content.css';
import { MainCard } from '@components/main-card';
import { CalendarTwoTone, HeartFilled, IdcardOutlined } from '@ant-design/icons';
const { Content } = Layout;

const cardsData = [
    {
        title: 'Расписать тренировки',
        icon: <HeartFilled twoToneColor='#2F54EB' style={{ fontSize: '12px' }} />,
        subtitle: 'Тренировки',
    },
    {
        title: 'Назначить календарь',
        icon: <CalendarTwoTone style={{ fontSize: '12px' }} twoToneColor='#2F54EB' />,
        subtitle: 'Календарь',
    },
    {
        title: 'Заполнить профиль',
        icon: <IdcardOutlined style={{ fontSize: '12px' }} twoToneColor='#2F54EB' />,
        subtitle: 'Профиль',
    },
];

 export const MainContent = () => {
    return (
        <Content className='main-content'>
            <div className='main-text-description'>
                С CleverFit ты сможешь:
                <span>
                    -планировать свои тренировки на календаре,выбирая тип и уровень нагрузок
                </span>
                <span>
                    -отслеживать свои достижения в разделе статистики, сравнивая свои результаты с
                    нормами и рекордами;
                </span>
                <span>
                    -создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы о
                    тренировках;
                </span>
                <span>
                    -выполнять расписанные тренировки для разных частей тела, следуя подробным
                    инструкциям и советам профессиональных тренеров.
                </span>
            </div>
            <div className='main-info-message'>
                CleverFit— это не просто приложение, а твой личный помощник в мире фитнеса. Не
                откладывай на завтра — начни тренироваться уже сегодня!
            </div>
            <div className='wrapper-list-cards'>
                {cardsData.map((card, index) => (
                    <MainCard
                        key={`car-${index}`}
                        title={card.title}
                    >
                        <div className='content'>
                            <span>{card.icon}</span>
                            <span>{card.subtitle}</span>
                        </div>
                    </MainCard>
                ))}
            </div>
        </Content>
    );
};
