import { Form, Row, Col, Input, Button } from 'antd'
import { useQueryClient } from 'react-query';
import { useClientMutations } from '../../hooks/mutation-hooks';
import { useNotification } from '../../lib';
import { IClient } from '../../types';

const ClientForm = ({ onSuccess, activeClient }: { onSuccess: () => void, activeClient?: IClient }) => {
    const [clientForm] = Form.useForm();
    const client = useQueryClient();
    const { successNotification, errorNotification } = useNotification();

    const { createClientMutation, editClientMutation } = useClientMutations();

    const onFinish = (values: any) => {
        if (activeClient) {
            editClientMutation.mutate({ id: activeClient._id!, obj: values }, {
                onSuccess: () => {
                    client.invalidateQueries(['client', activeClient._id!])
                    successNotification('Successfully edited your account!')
                    onSuccess();
                },
                onError: () => {
                    errorNotification('There was an error!')
                }
            })
            return;
        }
        createClientMutation.mutate({ obj: values }, {
            onSuccess: () => {
                client.invalidateQueries("clients")
                successNotification('Successfully created an account!')
                onSuccess();
            },
            onError: () => {
                errorNotification('There was an error!')
            }
        })
    }

    return (<>
        <Form form={clientForm} onFinish={onFinish} layout="vertical" autoComplete='off' initialValues={activeClient ? activeClient : {}}>
            <Row>
                <Col span={24}>
                    <Form.Item
                        labelAlign="left"
                        label="Username"
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
            <Row>
                <Col span={24}>
                    <Form.Item
                        labelAlign="left"
                        label="Password"
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
            <Row>
                <Col span={24}>
                    <Form.Item
                        labelAlign="left"
                        label="Name"
                        name="name"
                        rules={[{
                            required: true,
                            message: 'Required field'
                        }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Form.Item
                        labelAlign="left"
                        label="Email"
                        name="email"
                        rules={[{
                            required: true,
                            type: 'email',
                            message: 'Enter a valid email'
                        }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Form.Item
                        labelAlign="left"
                        label="Phone number"
                        name="phone"
                        rules={[{
                            required: true,
                            min: 7,
                            max: 13,
                            message: 'Minimum 7 or maximum of 13 characters'
                        }]}
                    >
                        <Input autoComplete='off' />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify="end">
                <Button type='primary' htmlType='submit'>{activeClient ? 'Edit' : 'Create'}</Button>
            </Row>
        </Form>
    </>)
}

export { ClientForm }