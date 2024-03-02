import { Button, Modal, Result } from 'antd';

const ModalSuccess = () => {
    return (
        <Modal title={null} open={isOpen} centered={centered} footer={null} closable={false}>
            <Result
                status='success'
                title='Отзыв успешно опубликован'
                subTitle=''
                extra={[
                    <Button type='primary' key='console'>
                        Отлично
                    </Button>,
                  
                ]}
            />
        </Modal>
    );
};

export default ModalSuccess;
