/* eslint-disable import/no-extraneous-dependencies */
import { DatePicker, Form, Input } from 'antd';
import moment from 'moment';
import { IUser } from 'src/api/methods-api';

import './name-surname-age-input.scss';

export interface IPropsUser {
    user: IUser;
    setUser: (arg: IUser) => void;
}

const NameSurnameAgeInput = ({ user, setUser }: IPropsUser) => {
    const [form] = Form.useForm();

   
    return (
        <div className='wrapper-name-surname-age-input'>
            <Form form={form}>
                <Form.Item rules={[{ required: true }]}>
                    <Input
                        placeholder='Имя'
                        value={user.firstName}
                        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                    />
                </Form.Item>
                <Form.Item rules={[{ required: true }]}>
                    <Input
                        placeholder='Фамилия'
                        value={user.lastName}
                        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                    />
                </Form.Item>
                <Form.Item>
                    <DatePicker
                        value={user.birthday ? moment(user.birthday) : null}
                        onChange={(val) =>
                            setUser({ ...user, birthday: val ? val.toISOString() : undefined })
                        }
                        format='DD.MM.YYYY'
                        placeholder='Дата рождения'
                        style={{ width: '100%' }}
                    />
                </Form.Item>
            </Form>
        </div>
    );
};

export default NameSurnameAgeInput;
