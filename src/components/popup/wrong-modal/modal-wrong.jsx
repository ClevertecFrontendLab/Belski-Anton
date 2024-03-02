import { Button, Modal, Result } from 'antd';
import './modal-wrong.scss'
const ModalWrong = ({ isOpen, centered, }) => {
    return (
        <Modal 
        title={null}
        open={isOpen} 
        centered={centered} 
        footer={null}
        closable={false}
        >
            <Result
                status='500'
                title='Что-то пошло не так'
                subTitle='Произошла ошибка, попробуйте ещё раз '
                extra={<Button type='primary'>Hазад</Button>}
            />
        </Modal>
    );
};

export default ModalWrong;
