import { STATUS_CODES } from '@constants/index'
import { Button, Modal, ModalProps, Result } from 'antd';

import './modal-save-error.scss';

const ModalSaveError = ({ open, onCancel, onOk }: ModalProps) => (
        <Modal
                className='wrapper-error-modal'
                title={null}
                footer={null}
                closable={false}
                open={open}
                onOk={onOk}
                onCancel={onOk}
                centered={true}
            >
                <Result
                    status={STATUS_CODES.ERROR}
                    title='Данные не сохранились'
                    subTitle='Что-то пошло не так. Попробуйте ещё раз.'
                    extra={[
                        <Button
                            onClick={onCancel}
                            type='primary'
                            key='console'
                            data-test-id='write-review-not-saved-modal'
                        >
                            Написать отзыв
                        </Button>,
                        <Button onClick={onOk} key='buy'>
                            Закрыть
                        </Button>,
                    ]}
                 />
            </Modal>
    );

export default ModalSaveError;
