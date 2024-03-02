import { Layout } from 'antd';
import { useState } from 'react';
import { AndroidFilled, AppleFilled } from '@ant-design/icons';
import { MainCard } from '@components/main-card';
import ModalWrong from '@components/popup/wrong-modal/modal-wrong';
const { Footer } = Layout;
import './main-footer.css';


const TitleCard = () => {
    return (
        <div className='title'>
            <span>Скачать на телефон</span>
            <span>Доступно в PRO-тарифе</span>
        </div>
    );
};

interface CustomFooterProps {
    onViewReviewsClick: () => void;
    
}



export const CustomFooter = ({ onViewReviewsClick }: CustomFooterProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    
    const handleOk = () => {
        setIsModalOpen(false);
    };
    
    const handleCancel = () => {
        setIsModalOpen(false);
    }
    return (
        <Footer className='main-footer' style={{ background: 'transparent', padding: '24px' }}>
            <div className='view-reviews' onClick={showModal}>
                Смотреть отзывы
            </div>
            <div className='wrapper-card'>
                <MainCard title={<TitleCard />}>
                    <div className='list-phones'>
                        <div className='phone'>
                            <AndroidFilled style={{ fontSize: '12px' }} />
                            <span>Android OS</span>
                        </div>
                        <div className='phone'>
                            <AppleFilled style={{ fontSize: '12px' }} />
                            <span>Apple iOS</span>
                        </div>
                    </div>
                </MainCard>
            </div>
            <ModalWrong
             isOpen={isModalOpen} 
             centered={true}
             />
        </Footer>
    );
};
