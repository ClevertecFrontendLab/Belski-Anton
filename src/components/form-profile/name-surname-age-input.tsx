import { DatePicker, Form, Input } from 'antd';

import './name-surname-age-input.scss';

const NameSurnameAgeInput = () => (
    <div className='wrapper-name-surname-age-input'>
        <Form>
            <Form.Item name={['user', 'name']} rules={[{ required: true }]}>
                <Input placeholder='Имя' />
            </Form.Item>
            <Form.Item name={['user', 'surname']} rules={[{ required: true }]}>
                <Input placeholder='Фамилия' />
            </Form.Item>
            <Form.Item>
                <DatePicker format='YYYY.MM.DD' placeholder='Дата рождения' style={{ width: '100%' }} />
            </Form.Item>
        </Form>
    </div>
);

export default NameSurnameAgeInput;
