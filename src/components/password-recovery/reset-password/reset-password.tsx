import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import errorIcon from '@public/assets/icons/error.svg';
import recovery from '@public/assets/icons/recovery.svg';
import { clearAuthState } from '@redux/auth-slice';
import { history } from '@redux/configure-store';
import { setIsLoading } from '@redux/loading-slice';
import { useEffect, useState } from 'react';
import VerificationInput from 'react-verification-input';
import { useConfirmEmailMutation } from '../../../api/methods-api';
import { PATHS } from '@constants/index';
import './reset-password.scss';
const CardPasswordReset = () => {
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);

    const [confirmEmail] = useConfirmEmailMutation();
    const {
        auth: { email },
        load: { isLoading },
    } = useAppSelector((store) => store);

    const dispatch = useAppDispatch();
    const sendData = () => {
        dispatch(setIsLoading(true));
        confirmEmail({
            email,
            code: value,
        })
            .unwrap()
            .then(() => {
                dispatch(clearAuthState());
                history.push(`../..${PATHS.AUTH_CHANGE_PASSWORD}`);
            })
            .catch(() => {
                setError(true);
                setValue('');
            })
            .finally(() => dispatch(setIsLoading(false)));
    };

    useEffect(() => {
        if (value.length === 6 && email && !isLoading) {
            sendData();
        }
    }, [value, email, isLoading]);

    return (
        <div className='wrapper-recovery-password'>
            <div className='card-recovery-password'>
                <img
                    src={error ? errorIcon : recovery}
                    alt='icon'
                    style={{ height: '70px', width: '70px' }}
                />
                <div className='wrapper-text-send'>
                    <div className='password-title'>
                        <div>{error && 'Неверный код. '}Введите код</div>
                        для восстановления аккауанта
                    </div>
                    <div className='text-send-email'>
                        Мы отправили вам на e-mail <span>{email}</span> шестизначный код. Введите
                        его в поле ниже.
                    </div>
                </div>
                <VerificationInput
                    validChars='0-9'
                    inputProps={{ inputMode: 'numeric', 'data-test-id': 'verification-input' }}
                    length={6}
                    value={value}
                    onChange={(val) => setValue(val)}
                    classNames={{ container: error ? 'error' : '' }}
                    placeholder=' '
                />

                <div className='text-input-verification'>
                    Не пришло письмо? Проверьте папку Спам.
                </div>
            </div>
        </div>
    );
};

export default CardPasswordReset;
