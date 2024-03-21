import { CloseCircleFilled } from '@ant-design/icons';
import { Button, Modal } from 'antd';

import './model-data-save-error-calendar.scss';

interface ModelDataSaveErrorCalendarProps {
    open: boolean;
    setIsOpen: () => void;
}

const ModelDataSaveErrorCalendar = ({ open, setIsOpen }: ModelDataSaveErrorCalendarProps) => (
        <div className='wrapper-modal-data-save-error'>
            <Modal
                className='modal-data-save-error'
                open={open}
                centered={true}
                title={null}
                footer={null}
                closable={false}
                maskStyle={{
                    backgroundColor: 'rgba(121, 156, 212, 0.5)',
                    backdropFilter: 'blur(3px',
                }}
            >
                <div className='wrapper-error-title'>
                    <CloseCircleFilled style={{ color: 'red' }} />
                    <div className='text-description'>
                        <div className='title' data-test-id='modal-error-user-training-title'>
                            При сохранении данных произошла ошибка{' '}
                        </div>
                        <div
                            className='sub-title'
                            data-test-id='modal-error-user-training-subtitle'
                        >
                            Придётся попробовать ещё раз
                        </div>
                    </div>
                </div>
                <div className='wrapper-btn-close-data-save-error'>
                    <Button
                        className='btn-close-data-save-error'
                        data-test-id='modal-error-user-training-button'
                        onClick={setIsOpen}
                    >
                        Закрыть
                    </Button>
                </div>
            </Modal>
        </div>
    );

export default ModelDataSaveErrorCalendar;
