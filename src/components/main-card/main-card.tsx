import { Card as AntdCard } from 'antd';
import './main-card.scss'
interface MainCardProps {
    title: string| React.ReactNode;
    children: React.ReactNode
}

export const MainCard= ({ title,children }: MainCardProps) => {
    return (
            <AntdCard title={title} bordered={false} style={{minWidth: '160px', flex: '1' }}>
            {children}
            </AntdCard>
    );
};


