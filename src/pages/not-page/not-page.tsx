import { Button,Result } from 'antd';

import './not-page.scss'

const NotPage = () => (
    <div className='wrapper-not-page'>
        <Result
            status='404'
            title='Такой страницы нет'
            subTitle='Извините, страница не найдена, возможно, она была удалена или перемещена.'
            extra={<Button >На главную</Button>}
        />
    </div>
);

export default NotPage;
