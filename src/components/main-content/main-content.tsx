import React from 'react';
import { Layout } from 'antd';
import './main-content.css';
import MainCard from '@components/main-card/main-card';
import switcher from '/assets/icons/icon-switcher.svg';
import { CalendarTwoTone, HeartTwoTone, IdcardFilled } from '@ant-design/icons';
const { Content } = Layout;

interface MainContentProps {
    toggleCollapsed: () => void;
    
}

const cardsData = [
    { title: 'Расписать тренировки', icon: <HeartTwoTone />, subtitle: 'Тренировки' },
    { title: 'Назначить календарь', icon: <CalendarTwoTone />, subtitle: 'Календарь' },
    { title: 'Заполнить профиль', icon: <IdcardFilled />, subtitle: 'Профиль' },
];

const MainContent: React.FC<MainContentProps> = ({ toggleCollapsed }: MainContentProps) => {
    return (
        <Content className='main-content'>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                    src={switcher}
                    alt='switcher icon'
                    onClick={toggleCollapsed}
                    data-test-id='sider-switch'
                />
            </div>
            <div className='wrapper-text'>
                <div className='main-text-description'>
                    С CleverFit ты сможешь:
                    <span>
                        -планировать свои тренировки на календаре,выбирая тип и уровень нагрузок
                    </span>
                    <span>
                        -отслеживать свои достижения в разделе статистики, сравнивая свои результаты
                        с нормами и рекордами;
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
                            key={index}
                            title={card.title}
                            icon={card.icon}
                            subtitle={card.subtitle}
                        />
                    ))}
                    </div>
            </div>
        </Content>
    );
};

export default MainContent;
