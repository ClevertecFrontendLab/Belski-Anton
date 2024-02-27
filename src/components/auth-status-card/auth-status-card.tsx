import cardStyle from './auth-status-card.module.css';
import { Button } from 'antd';
import { history } from '@redux/configure-store';

interface IPropsCard {
    icon: string;
    title: string;
    subtitle: string;
    path: string;
    btnText: string;
    dataTestId: string;
    className?: string;
}

export const AuthStatusCard = ({
    icon,
    title,
    subtitle,
    btnText,
    dataTestId,
    path,
    className = '',
}: IPropsCard) => {
    return (
        <div className={`${cardStyle['wrapper-auth-status']} ${cardStyle[`${className}`]}`}>
            <div className={cardStyle['card-status']}>
                <div>
                    <img className={cardStyle['icon']} src={icon} alt='error' />
                </div>
                <div className={cardStyle['wrapper-title-subtitle']}>
                    <h3 className={cardStyle['status-description']}>{title}</h3>
                    <div className={cardStyle['text-subtitle']}>{subtitle}</div>
                </div>
                <Button
                    type='primary'
                    data-test-id={dataTestId}
                    onClick={() => history.push(path)}
                    className={cardStyle['btn-status-card']}
                >
                    {btnText}
                </Button>
            </div>
        </div>
    );
};
