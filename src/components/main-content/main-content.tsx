import React from 'react';
import { Layout } from 'antd';
import './main-content.css';
const { Content } = Layout;

interface CustomContentProps {
    children: React.ReactNode;
}

const CustomContent: React.FC<CustomContentProps> = ({ children }) => {
    return <Content className=' main-content'>{children}</Content>;
};

export default CustomContent;
