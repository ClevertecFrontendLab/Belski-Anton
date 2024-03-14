import { Modal, ModalProps } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd/lib/radio';
import './modal-data-open-error-calendar.scss';

const ModalDataOpenErrorCalendar = ({ open }: ModalProps) => {
    return (
        <div className='wrapper-modal-data-open-error-calendar'>
            <Modal
                open={open}
                className='modal-data-open-error-calendar'
                maskStyle={{
                    backgroundColor: 'rgba(121, 156, 212, 0.5)',
                    backdropFilter: 'blur(3px',
                }}
                centered
                footer={null}
            >
                <div className='wrapper-icon-title'>
                    <CloseCircleOutlined style={{ color: '#2F54EB' }} className='icon' />
                    <div className='title-modal-data-open-error-calendar'>
                        <span>При открытии данных</span>
                        <span>произошла ошибка</span>
                        <div className='subtitle-modal-data-open-error-calendar'>
                            Попробуйте ещё раз.
                        </div>
                    </div>
                </div>

                <div className='wrapper-btn-open-data-error-calendar'>
                    <Button className='btn-open-data-error-calendar'>Обновить</Button>
                </div>
            </Modal>
        </div>
    );
};

export default ModalDataOpenErrorCalendar;
