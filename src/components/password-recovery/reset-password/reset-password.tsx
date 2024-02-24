import recovery from '@public/assets/icons/recovery.svg';
import './reset-password.css';
import VerificationInput from 'react-verification-input';
import { useEffect, useState } from 'react';
import { useConfirmEmailMutation } from '../../../api/auth-api';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import errorIcon from '@public/assets/icons/error.svg';
import { setIsLoading } from '@redux/loading-slice';
import { clearAuthState } from '@redux/auth-slice';
import { history } from '@redux/configure-store';
const CardPasswordReset = () => {
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);
    const [confirmEmail] = useConfirmEmailMutation();
    const { auth:{email},load:{isLoading} } = useAppSelector((store) => store);

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
                history.push('../../auth/change-password');
            })
            .catch(() => {
                setError(true);
                setValue('');
            })
            .finally(() => dispatch(setIsLoading(false)));
    };
   
    useEffect(()=>{
       if(value.length === 6 && email && !isLoading){
        sendData()
       }
    },[value,email,isLoading])

    return (
        <div className='bg-wrapper-recovery-password'>
            <div className='wrapper-recovery-password'>
                <div className='card-recovery-password'>
                    <img
                        src={error ? errorIcon : recovery}
                        alt='icon'
                        style={{ height: '70px', width: '70px' }}
                    />
                    <div className='password-title'>
                        <div>{error && 'Неверный код. '}Введите код</div>
                        для восстановления аккауанта
                    </div>
                    <VerificationInput
                        validChars='0-9'
                        inputProps={{ inputMode: 'numeric' }}
                        length={6}
                        value={value}
                        onChange={(val) => setValue(val)}
                        classNames={{ container: error ? 'error' : '' }}
                    />

                    <div>Не пришло письмо? Проверьте папку Спам.</div>
                </div>
            </div>
        </div>
    );
};

export default CardPasswordReset;
