import { Modal, Result } from 'antd';

import './modal-buy-tariff.scss';
import React from 'react';

interface IBuyTariff {
    open: boolean;
}
const ModalBuyTariff = ({ open }: IBuyTariff) => (
    <div className='wrapper-modal-buy-tariff'>
        <Modal
        className='modal-buy-tariff' 
        open={open} 
        footer={null}
        centered={true}
        >
            <div className='result-buy-tariff'>
                <Result
                    status='success'
                    title='Чек для оплаты y вас на почте'
                    subTitle={
                       <React.Fragment>
                            <div>Мы отправили инструкцию для оплаты вам на e-mail victorbyden@gmail.com. После подтверждения оплаты войдите в приложение заново.</div>
                            <div>He пришло письмо? Проверьте папку Спам.</div>
                       </React.Fragment>
                        
                    }
                />
            </div>
        </Modal>
    </div>
);

export default ModalBuyTariff;
