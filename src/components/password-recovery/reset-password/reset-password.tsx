import recovery from '@public/assets/icons/recovery.svg';
import './reset-password.css';
import { Col, Input, Row } from 'antd';
const CardPasswordReset = () => {
    return (
        <div className='bg-wrapper-recovery-password'>
            <div className='wrapper-recovery-password'>
                <div className='card-recovery-password'>
                    <img src={recovery} alt='icon' style={{ height: '70px', width: '70px' }} />
                    <div className='password-title'>
                        <div>Введите код</div>
                        для восстановления аккауанта
                    </div>

                    <div className='site-input-group-wrapper'>
                        <Input.Group size='small'>
                            <Row gutter={8}>
                                <Col>
                                    <Input
                                        defaultValue=''
                                        style={{ width: '40px', height: '40px'}}
                                    />
                                </Col>
                                <Col>
                                    <Input
                                        defaultValue=''
                                        style={{ width: '40px', height: '40px' }}
                                    />
                                </Col>
                                <Col>
                                    <Input
                                        defaultValue=''
                                        style={{ width: '40px', height: '40px' }}
                                    />
                                </Col>
                                <Col>
                                    <Input
                                        defaultValue=''
                                        style={{ width: '40px', height: '40px' }}
                                    />
                                </Col>
                                <Col>
                                    <Input
                                        defaultValue=''
                                        style={{ width: '40px', height: '40px' }}
                                    />
                                </Col>
                                <Col>
                                    <Input
                                        defaultValue=''
                                        style={{ width: '40px', height: '40px' }}
                                    />
                                </Col>
                            </Row>
                        </Input.Group>
                    </div>
                    <div>Не пришло письмо? Проверьте папку Спам.</div>
                </div>
            </div>
        </div>
    );
};

export default CardPasswordReset;
