import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { Button,Modal, ModalProps } from 'antd';

import './modal-data-open-error-calendar.scss';

const ModalDataOpenErrorCalendar = ({ open, onCancel, onOk }: ModalProps) => (
        <div className='wrapper-modal-data-open-error-calendar'>
            <Modal
                open={open}
                className='modal-data-open-error-calendar'
                maskStyle={{
                    backgroundColor: 'rgba(121, 156, 212, 0.5)',
                    backdropFilter: 'blur(3px',
                }}
                onCancel={onCancel}
                centered={true}
                footer={null}
                closeIcon={
                    <CloseOutlined
                        data-test-id='modal-error-user-training-button-close'
                        onClick={onCancel}
                    />
                }
            >
                <div className='wrapper-icon-title'>
                    <CloseCircleOutlined style={{ color: '#2F54EB' }} className='icon' />
                    <div className='title-modal-data-open-error-calendar'>
                        <span data-test-id='modal-error-user-training-title'>
                            При открытии данных
                            <br />
                            произошла ошибка
                        </span>
                        <div
                            className='subtitle-modal-data-open-error-calendar'
                            data-test-id='modal-error-user-training-subtitle'
                        >
                            Попробуйте ещё раз.
                        </div>
                    </div>
                </div>

                <div className='wrapper-btn-open-data-error-calendar'>
                    <Button
                        className='btn-open-data-error-calendar'
                        data-test-id='modal-error-user-training-button'
                        onClick={onOk}
                    >
                        Обновить
                    </Button>
                </div>
            </Modal>
        </div>
    );

export default ModalDataOpenErrorCalendar;
