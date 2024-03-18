import { Layout } from 'antd';
import { CalendarTwoTone, HeartFilled, IdcardOutlined } from '@ant-design/icons';
import { MainCard } from '@components/main-card';
import { history } from '@redux/configure-store';
import { PATHS } from '@constants/index';
import { useLazyGetTrainingQuery } from '../../api/methods-api';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { setIsLoading } from '@redux/loading-slice';
import { setIsError } from '@redux/error-training-slice';
const { Content } = Layout;
import './main-content.scss';

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

export const MainContent = () => {
    const [getTraining] = useLazyGetTrainingQuery();
    const dispatch = useAppDispatch();

    const hanleGetTraining = () => {
        dispatch(setIsLoading(true));
        getTraining()
            .unwrap()
            .then(() => history.push(PATHS.CALENDAR))
            .catch(() => dispatch(setIsError(true)))
            .finally(() => dispatch(setIsLoading(false)));
    };
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
                        <div
                            className='content'
                            onClick={index === 1 ? hanleGetTraining : undefined}
                            data-test-id={index === 1 ? 'menu-button-calendar' : undefined}
                        >
                            <span>{card.icon}</span>
                            <span>{card.subtitle}</span>
                        </div>
                    </MainCard>
                ))}
            </div>
        </Content>
    );
};
