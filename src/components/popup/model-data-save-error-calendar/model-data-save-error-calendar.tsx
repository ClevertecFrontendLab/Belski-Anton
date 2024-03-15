import { Button, Modal } from 'antd';
import './model-data-save-error-calendar.scss';
import { CloseCircleFilled } from '@ant-design/icons';
interface ModelDataSaveErrorCalendarProps {
    open: boolean;
}

const ModelDataSaveErrorCalendar = ({ open }: ModelDataSaveErrorCalendarProps) => {
    return (
        <div className='wrapper-modal-data-save-error'>
            <Modal
                className='modal-data-save-error'
                open={open}
                centered
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
                        <div className='title'>При сохранении данных произошла ошибка </div>
                        <div className='sub-title'>Придётся попробовать ещё раз</div>
                    </div>
                </div>
                <div className='wrapper-btn-close-data-save-error'>
                    <Button className='btn-close-data-save-error'>Закрыть</Button>
                </div>
            </Modal>
        </div>
    );
};

export default ModelDataSaveErrorCalendar;
