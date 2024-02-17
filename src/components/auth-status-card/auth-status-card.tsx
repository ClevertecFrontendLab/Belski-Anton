import './auth-status-card.css';
import { Button, Card } from 'antd';

interface IPropsCard {
    icon: string;
    title: string;
    subtitle: string;
    path: string;
    btnText: string;
}

export const AuthStatusCard = ({ icon, title, subtitle, btnText }: IPropsCard) => {
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
                    <div>{subtitle}</div>
                    <Button type='primary' style={{ width: '368px' }}>
                      {btnText}
                    </Button>
                </div>
            </div>
    );
};
