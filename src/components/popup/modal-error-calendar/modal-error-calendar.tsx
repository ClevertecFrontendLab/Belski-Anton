import { Button, Modal, Result } from 'antd';
import { STATUS_CODES } from '../../../constants/index';
import './modal-error-calendar.scss';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { setIsError } from '@redux/error-training-slice';
interface ModalErrorCalendarProps {
    open: boolean;
}

const ModalErrorCalendar = ({ open }: ModalErrorCalendarProps) => {
    const dispatch = useAppDispatch();
    return (
        <Modal
            data-test-id='modal-no-review'
            className='wrapper-error-calendar'
            title={null}
            closable={false}
            footer={null}
            centered
            open={open}
            maskStyle={{ backgroundColor: 'rgba(121, 156, 212, 0.5)', backdropFilter: 'blur(3px' }}
        >
            <Result
                status={STATUS_CODES.INTERNAL_SERVER_ERROR}
                title='Что-то пошло не так'
                subTitle='Произошла ошибка, попробуйте ещё раз..'
                extra={
                    <Button type='primary' onClick={() => dispatch(setIsError(false))}>
                        Назад
                    </Button>
                }
            />
        </Modal>
    );
};

export default ModalErrorCalendar;
