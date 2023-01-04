import { Form, Row, Col, Input, Button } from 'antd'

const ClientForm = () => {
    const [clientForm] = Form.useForm();

    const onFinish = () => {
        console.log('dsan')
    }

    return (<>
        <Form form={clientForm} onFinish={onFinish} layout="vertical" autoComplete='off'>
            <Row>
                <Col span={24}>
                    <Form.Item
                        labelAlign="left"
                        label="Username"
                        name="username"
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
                    >
                        <Input autoComplete='off' />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify="end">
                <Button type='primary' htmlType='submit'>Create</Button>
            </Row>
        </Form>
    </>)
}

export { ClientForm }