import { Layout } from 'antd';
import './main-content.css';
import { CalendarTwoTone, HeartFilled, IdcardOutlined } from '@ant-design/icons';
import { MainCard } from '@components/main-card';
import { history } from '@redux/configure-store';
import { PATHS } from '@constants/index';
import ModalErrorCalendar from '@components/popup/modal-error-calendar/modal-error-calendar';
const { Content } = Layout;

const cardsData = [
    {
        title: 'Расписать тренировки',
        icon: <HeartFilled twoToneColor='var(--color-Blue)' style={{ fontSize: '12px' }} />,
        subtitle: 'Тренировки',
    },
    {
        title: 'Назначить календарь',
        icon: <CalendarTwoTone style={{ fontSize: '12px' }} twoToneColor='var(--color-Blue)' />,
        subtitle: 'Календарь',
    },
    {
        title: 'Заполнить профиль',
        icon: <IdcardOutlined style={{ fontSize: '12px' }} twoToneColor='var(--color-Blue)' />,
        subtitle: 'Профиль',
    },
];
const handleHeartClick = () => {
    history.push(PATHS.CALENDAR);
    console.log(123);
    
};

export const MainContent = () => {
     // const [isModalOpen, setIsModalOpen] = useState(false);

    // const showModal = () => {
    //     setIsModalOpen(true);
    // };

    // const handleOk = () => {
    //     setIsModalOpen(false);
    // };

    // const handleCancel = () => {
    //     setIsModalOpen(false);
    // };
    return (
        <Content className='main-content'>
            <div className='main-text-description'>
                С CleverFit ты сможешь:
                <span>
                    — планировать свои тренировки на календаре, выбирая тип и уровень нагрузки
                </span>
                <span>
                    — отслеживать свои достижения в разделе статистики, сравнивая свои результаты с
                    нормами и рекордами;
                </span>
                <span>
                    — создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы о
                    тренировках;
                </span>
                <span>
                    — выполнять расписанные тренировки для разных частей тела, следуя подробным
                    инструкциям и советам профессиональных тренеров.
                </span>
            </div>
            <div className='main-info-message'>
                CleverFit — это не просто приложение, а твой личный помощник в мире фитнеса. Не
                откладывай на завтра — начни тренироваться уже сегодня!
            </div>
            <div className='wrapper-list-cards'>
                {cardsData.map((card, index) => (
                    <MainCard key={`card-${index}`} title={card.title}>
                        <div className='content' onClick={index === 1 ? handleHeartClick : undefined}>
                            <span>{card.icon}</span>
                            <span>{card.subtitle}</span>
                        </div>
                    </MainCard>
                ))}
            </div>
            {/* <ModalErrorCalendar open={true} /> */}

        </Content>
    );
};
