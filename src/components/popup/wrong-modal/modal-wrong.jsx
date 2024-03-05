import { Button, Modal, Result } from 'antd';
import { history } from '@redux/configure-store';
import { PATHS, STATUS_CODES } from '../../../constants/index'
import './modal-wrong.scss';
const ModalWrong = ({ isOpen, centered }) => {
    return (
        <Modal className='wrapper-wrong-module' title={null} open={isOpen} centered={centered} footer={null} closable={false}>
            <Result
                status={STATUS_CODES.INTERNAL_SERVER_ERROR}
                title='Что-то пошло не так'
                subTitle='Произошла ошибка, попробуйте ещё раз '
                extra={
                    <Button
                        onClick={() => {
                            history.push(PATHS.MAIN);
                        }}
                        type='primary'
                    >
                        Назад
                    </Button>
                }
            />
        </Modal>
    );
};

export default ModalWrong;
