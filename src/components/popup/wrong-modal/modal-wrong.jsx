import { PATHS, STATUS_CODES } from '@constants/index'
import { history } from '@redux/configure-store';
import { Button, Modal, Result } from 'antd';

import './modal-wrong.scss';

const ModalWrong = ({ isOpen, centered }) => (
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

export default ModalWrong;
