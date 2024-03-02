import { StarOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Rate } from 'antd';
import './modal-write.scss';
const { TextArea } = Input;
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
        >
            <Rate disabled character={<StarOutlined />} />
            <TextArea />
        </Modal>
    );
};

export default ModalWrite;
