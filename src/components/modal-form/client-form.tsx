import { Form, Row, Col, Input } from 'antd'

const ClientForm = () => {
    const [clientForm] = Form.useForm();

    const onFinish = () => {
        console.log('dsan')
    }

    return (<>
        <Form form={clientForm} onFinish={onFinish} layout="vertical">
            <Row gutter={12}>
                <Col span={24}>
                    <Form.Item
                        labelAlign="left"
                        label="Username"
                        name="username"
                        className="mb-1 font-weight-bold"
                        >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    </>)
}

export { ClientForm }