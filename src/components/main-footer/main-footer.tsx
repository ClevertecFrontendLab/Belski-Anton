import { Layout } from 'antd';
import './main-footer.css';
import { AndroidFilled, AppleFilled } from '@ant-design/icons';
import { MainCard } from '@components/main-card';
const { Footer } = Layout;

const TitleCard = () =>{
    return (
        <div className='title'>
             <span>Скачать на телефон</span>
            <span>Доступно в PRO-тарифе</span>
        </div>
    )
}

 export const  CustomFooter = () => {
    return (
        <Footer className='main-footer' style={{ background: 'transparent', padding: '24px' }}>
        <div className='view-reviews'>Смотреть отзывы</div>
        <MainCard title={<TitleCard />}><div className="list-phones">
            <div className="phone">
                <AndroidFilled style={{ fontSize: '12px' }} />
                <span>Android OS</span>
            </div>
            <div className="phone">
                <AppleFilled style={{ fontSize: '12px' }} />
                <span>Apple iOS</span>
            </div>
        </div></MainCard>
    </Footer>
    );
};


