import './auth-status-card.css';
import { Button } from 'antd';
import { history } from '@redux/configure-store';

interface IPropsCard {
    icon: string;
    title: string;
    subtitle: string;
    path: string;
    btnText: string;
    dataTestId: string;
}

export const AuthStatusCard = ({
    icon,
    title,
    subtitle,
    btnText,
    dataTestId,
    path,
}: IPropsCard) => {
    return (
        <div className='wrapper-auth-status'>
            <div className='card-status'>
                <div>
                    <img
                        src={icon}
                        alt='error'
                        style={{
                            width: '70px',
                            height: '60px',
                        }}
                    />
                </div>
                <div className='status-description'>{title}</div>
                <div className='text-subtitle'>{subtitle}</div>
                <Button
                    type='primary'
                    data-test-id={dataTestId}
                    onClick={() => history.push(path)}
                    style={{ width: '368px' ,background:' #2F54EB'}}
                >
                    {btnText}
                </Button>
            </div>
        </div>
    );
};
