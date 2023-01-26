import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Col, Drawer, Form, Input, Modal, Row } from 'antd'
import { CloseOutlined } from '@ant-design/icons';
import './login.css'
import avion from '../../assets/avionce.png'
import { ClientForm } from '../modal-form';
import { useFetchClients } from '../../hooks/fetch-hooks';
import { IClient } from '../../types';
import { Context } from '../../context';
import { useNotification } from '../../lib';

const Login = () => {
    const navigate = useNavigate();
    const [loginForm] = Form.useForm();
    const context = useContext(Context);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const { successNotification, errorNotification } = useNotification();

    const { data } = useFetchClients('clients');

    const onFinish = (values: any) => {
        if (!data) return;
        const client = data.filter((item: IClient) => {
            if (item.username === values.username && item.password === values.password) {
                return item
            }
        })
        if (client.length > 0) {
            successNotification('Successfully loged in')
            console.log(client)
            context?.setClient(client[0])
            navigate('/clients')
            return;
        }
        errorNotification('Wrong creditentials')
    }



    return (<>
        <div className='loginWrap'>
            <div className="loginCard">
                <span className='imageWrapLogin'>
                    <img src={avion} height={'100%'} />
                </span>
                <span className='title'>Login</span>
                <div className='formStyling'>
                    <Form name='loginForm' form={loginForm} onFinish={onFinish} layout="vertical" autoComplete='off' style={{ width: '100%' }}>
                        <Row justify={'center'}>
                            <Col span={12}>
                                <Form.Item
                                    labelAlign="left"
                                    label={<span style={{ fontWeight: 'bold' }}>Username</span>}
                                    name="username"
                                    rules={[{
                                        required: true,
                                        min: 7,
                                        message: 'Minimum 7 charachters'
                                    }]}
                                >
                                    <Input autoComplete='off' />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row justify={'center'}>
                            <Col span={12}>
                                <Form.Item
                                    labelAlign="left"
                                    label={<span style={{ fontWeight: 'bold' }}>Password</span>}
                                    name="password"
                                    rules={[{
                                        required: true,
                                        min: 7,
                                        message: 'Minimum 7 charachters'
                                    }]}
                                >
                                    <Input type='password' />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row justify={"center"}>
                            <a className='registerLink' onClick={() => {
                                setIsModalVisible((prev) => !prev)
                            }}>Register</a>
                        </Row>
                        <Row justify={"center"} style={{ marginTop: '10px' }}>
                            <Button type='primary' htmlType='submit'>Login</Button>
                        </Row>
                    </Form>
                </div>
            </div>
            <Drawer
                placement="right"
                onClose={() => {
                    setIsModalVisible(false);
                }}
                destroyOnClose={true}
                maskClosable={true}
                size={'large'}
                closeIcon={<CloseOutlined className="color-black" />}
                title="Create account"
                open={isModalVisible}
                footer={null}
                width={700}
            >
                <ClientForm onSuccess={() => {
                    setIsModalVisible(false)
                }} />
            </Drawer>
        </div>
    </>)
}

export { Login }