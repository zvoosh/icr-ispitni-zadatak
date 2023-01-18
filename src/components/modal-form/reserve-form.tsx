import { Button, Col, Form, InputNumber, Row } from "antd"

const ReserveForm = ({ finishFn }: { finishFn: (values:any, id?: string) => void }) => {
    const [reserveForm] = Form.useForm();

    const onFinish = (values: any) => {
        finishFn(values.count);
    }

    return (<>
        <Form form={reserveForm} onFinish={onFinish} layout="vertical" autoComplete="off" style={{ width: '100%', height: '100%' }}>
            <Row>
                <Col span={24}>
                    <Form.Item
                        labelAlign="left"
                        label="Number of cards"
                        name={'count'}>
                        <InputNumber placeholder="Number of seats/cards..." style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={'end'}>
                <Button type="primary" htmlType="submit">RESERVE</Button>
            </Row>
        </Form>
    </>)
}

export { ReserveForm }