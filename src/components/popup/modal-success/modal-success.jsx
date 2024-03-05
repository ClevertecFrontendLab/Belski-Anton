import { Button, Modal, Result } from 'antd';
import { STATUS_CODES } from '../../../constants/index';

import './modal-success.scss';
const ModalSuccess = ({ isOpen, onCancel }) => {
    return (
        <Modal
            className='wrapper-success-modal'
            title={null}
            onCancel={onCancel}
            open={isOpen}
            centered={true}
            footer={null}
            closable={false}
        >
            <Result
                status={STATUS_CODES.SUCCESS}
                title='Отзыв успешно опубликован'
                subTitle=''
                extra={[
                    <Button type='primary' key='console' onClick={onCancel} className='success-btn'>
                        Отлично
                    </Button>,
                ]}
            />
        </Modal>
    );
};

export default ModalSuccess;
