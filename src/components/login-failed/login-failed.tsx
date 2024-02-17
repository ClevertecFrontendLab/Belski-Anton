import './login-failed.css';
import failed from '/assets/icons/failed.svg';
import { Button } from 'antd';
export const LoginFailed = () => {
    return (
        <div className='wrapper-logon-failed'>
            <div className='card-login-failed'>
                <div>
                    <img
                        src={failed}
                        alt='error'
                        style={{
                            width: '70px',
                            height: '60px',
                        }}
                    />
                </div>
                <div className='title-failed'>Вход не выполнен</div>
                <div>Что-то пошло не так. Попробуйте еще раз</div>
                <Button type='primary' style={{ width: '368px' }}>
                    Повторить
                </Button>
            </div>
        </div>
    );
};
