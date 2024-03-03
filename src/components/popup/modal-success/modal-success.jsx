import { Button, Modal, Result } from 'antd';
import './modal-success.scss'
const ModalSuccess = ({ isOpen, onCancel }) => {
    return (
        <Modal title={null} onCancel={onCancel} open={isOpen} centered={true} footer={null} closable={false}>
            <Result
                status='success'
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
