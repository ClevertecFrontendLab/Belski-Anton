import { Card as AntdCard } from 'antd';
import React from 'react';
import './main-card.css'
interface MainCardProps {
    title: string;
    icon: JSX.Element;
    subtitle: string;
}

const MainCard: React.FC<MainCardProps> = ({ title, icon, subtitle }) => {
    return (
        <div className='site-card-border-less-wrapper'>
            <AntdCard title={title} bordered={false} style={{ width: 222 }}>
               <span> {icon}</span>
                <span>{subtitle}</span>
            </AntdCard>
        </div>
    );
};

export default MainCard;
