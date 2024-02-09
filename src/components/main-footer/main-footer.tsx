import React from 'react';
import { Layout } from 'antd';
import './main-footer.css';
import { AndroidFilled, AppleFilled } from '@ant-design/icons';
const { Footer } = Layout;

interface CustomContentProps {
    children: React.ReactNode;
}

const CustomFooter: React.FC<CustomContentProps> = () => {
    return (
        <Footer className='main-footer' style={{ background: 'transparent'}}>
            <div className='wrapper-download'>
                <div>Смотреть отзывы</div>
                <div className='download-tel'>
                    <div>Скачать на телефон</div>
                    <div>Доступно в PRO-тарифе</div>
                    <hr />
                    <AndroidFilled />
                    <span>Android OS</span>
                    <AppleFilled />
                    <span>Apple iOS</span>
                </div>
            </div>
        </Footer>
    );
};

export default CustomFooter;
