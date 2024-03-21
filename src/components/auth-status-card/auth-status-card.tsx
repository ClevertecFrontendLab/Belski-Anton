import { history } from '@redux/configure-store';
import { Button } from 'antd';

import  './auth-status-card.scss';

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
}: IPropsCard) => (
        <div className={`wrapper-auth-status ${className}`}>
            <div className='card-status'>
                <div>
                    <img className='icon' src={icon} alt='error' />
                </div>
                <div className='wrapper-title-subtitle'>
                    <h3 className='status-description'>{title}</h3>
                    <div className='text-subtitle'>{subtitle}</div>
                </div>
                <Button
                    type='primary'
                    data-test-id={dataTestId}
                    onClick={() => history.push(path)}
                    className='btn-status-card'
                >
                    {btnText}
                </Button>
            </div>
        </div>
    );
