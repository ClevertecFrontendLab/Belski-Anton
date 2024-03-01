import { Button, Input, Modal, Rate } from 'antd';
const { TextArea } = Input;
import './modal-write.scss';
const ModalWrite = ({ isOpen, onOk, centered, onCancel }) => {
    return (
        <Modal
            title='Ваш отзыв'
            open={isOpen}
            onOk={onOk}
            centered={centered}
            onCancel={onCancel}
            footer={[
                <Button key='submit' type='primary' onClick={onOk}>
                    Опубликовать
                </Button>,
            ]}
        >    <Rate disabled />
            <TextArea />
        </Modal>
    );
};

export default ModalWrite;
