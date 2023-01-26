import { useRef } from 'react'
import { useQueryClient } from "react-query";
import { UploadOutlined } from "@ant-design/icons";
import { UploadRequestOption as RcCustomRequestOptions } from 'rc-upload/lib/interface';
import { format } from "date-fns";
import { Button, Col, DatePicker, Form, Input, InputNumber, Modal, Row, Select, TimePicker, Upload, UploadFile, UploadProps } from "antd";
import { useFlightMutations } from "../../hooks";
import { useDate, useNotification } from "../../lib";
import { CLASS, CLASS_LABEL, DATE_FORMAT, IFlight, STATUS, STATUS_LABEL, TIME_FORMAT } from "../../types";


const { Option } = Select;
const { TextArea } = Input;

const FlightForm = ({ success, activeItem }: { success: () => void, activeItem?: IFlight }) => {
    const [flightForm] = Form.useForm();
    const client = useQueryClient();
    const imageRef = useRef<any | null>(null);
    const { successNotification, errorNotification } = useNotification();
    const { dateFormat, parseToMoment } = useDate();
    const { createFlightMutation, editFlightMutation } = useFlightMutations();

    const dummyRequest = ({ file, onSuccess }: RcCustomRequestOptions<any>) => {
        setTimeout(() => {
            if (onSuccess) {
                onSuccess("ok");
            }
        }, 0);
    };

    const handleChange: UploadProps['onChange'] = (info) => {
        imageRef.current = info.file.originFileObj;
    }

    const onFinish = (values: any) => {
        const { takeoffDate, landingDate, takesoff, lands, ...rest } = values;

        values.takeoffDate = dateFormat(takeoffDate);
        values.landingDate = dateFormat(landingDate);
        if (!activeItem) {
            values.takesoff = format(new Date(takesoff.$d), TIME_FORMAT.HH_mm_ss);
            values.lands = format(new Date(lands.$d), TIME_FORMAT.HH_mm_ss);
        }
        if (activeItem) {
            values.takesoff = format(new Date(takesoff), TIME_FORMAT.HH_mm_ss);
            values.lands = format(new Date(lands), TIME_FORMAT.HH_mm_ss);
        }
        values.productImage = imageRef.current;

        let formData = new FormData();
        for (let key in values) {
            formData.append(key, values[key]);
        }
        if (!activeItem) {
            createFlightMutation.mutate({ obj: formData }, {
                onSuccess: () => {
                    successNotification('Successfully created a flight');
                    success();
                    client.invalidateQueries('flights')
                },
                onError: () => {
                    errorNotification('Failed to create a flight')
                }
            })
            return
        }
        if (activeItem) {
            editFlightMutation.mutate({ obj: formData, id: activeItem._id }, {
                onSuccess: () => {
                    successNotification('Successfully edited the flight');
                    success();
                },
                onError: () => {
                    errorNotification('Failed to edit the flight')
                }
            })
            return
        }
    }

    const init = activeItem ? {
        takeoffDate: parseToMoment(activeItem.takeoffDate),
        landingDate: parseToMoment(activeItem.landingDate),
        takesoff: parseToMoment(activeItem.takesoff, TIME_FORMAT.HH_mm_ss),
        lands: parseToMoment(activeItem.lands, TIME_FORMAT.HH_mm_ss),
        title: activeItem.title,
        starting: activeItem.starting,
        destination: activeItem.destination,
        class: activeItem.class,
        price: activeItem.price,
        rating: activeItem.rating,
        total: activeItem.total,
        status: activeItem.status,
        description: activeItem.description,
    } : {}

    return (<>
        <Form name='flightForm' initialValues={init} form={flightForm} onFinish={onFinish} layout="vertical" autoComplete="off">
            <Row gutter={12}>
                <Col span={8}>
                    <Form.Item
                        labelAlign="left"
                        label="Airline"
                        name="title"
                    >
                        <Input placeholder="Title..." />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        labelAlign="left"
                        label="Departing from"
                        name="starting"
                    >
                        <Input placeholder="Departing from..." />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        labelAlign="left"
                        label="Arriving in"
                        name="destination"
                    >
                        <Input placeholder="Lands in..." />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={12}>
                <Col span={8}>
                    <Form.Item
                        labelAlign="left"
                        label="Class"
                        name="class"
                    >
                        <Select placeholder="Class..."
                            style={{ width: '100%' }}
                            onChange={(value: `${CLASS}`) => {
                                flightForm.setFieldsValue({ class: value })
                            }}
                        >
                            <Option value={CLASS.ECONOMY}>
                                {CLASS_LABEL[CLASS.ECONOMY].label}
                            </Option>
                            <Option value={CLASS.BUSINESS}>
                                {CLASS_LABEL[CLASS.BUSINESS].label}
                            </Option>
                            <Option value={CLASS.FIRST_CLASS}>
                                {CLASS_LABEL[CLASS.FIRST_CLASS].label}
                            </Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        labelAlign="left"
                        label="Price"
                        name="price"
                    >
                        <Input placeholder="Price..." style={{ width: "100%" }} suffix={"€"} />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        labelAlign="left"
                        label="Rating"
                        name="rating"
                    >
                        <InputNumber disabled={activeItem ? true : false} placeholder="Rating..." style={{ width: "100%" }} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={12}>
                <Col span={8}>
                    <Form.Item
                        labelAlign="left"
                        label="Departing date"
                        name="takeoffDate"
                    >
                        <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        labelAlign="left"
                        label="Arriving date"
                        name="landingDate"
                    >
                        <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        labelAlign="left"
                        label="Total seats"
                        name="total"
                    >
                        <Input placeholder="Total seats..." />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={12}>
                <Col span={8}>
                    <Form.Item
                        labelAlign="left"
                        label="Departing time"
                        name="takesoff"
                    >
                        <TimePicker style={{ width: "100%" }} format={TIME_FORMAT.HH_mm} />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        labelAlign="left"
                        label="Arriving time"
                        name="lands"
                    >
                        <TimePicker style={{ width: "100%" }} format={TIME_FORMAT.HH_mm} />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        labelAlign="left"
                        label="Status"
                        name="status"
                    >
                        <Select placeholder="Status..."
                            style={{ width: '100%' }}
                            onChange={(value: `${STATUS}`) => {
                                flightForm.setFieldsValue({ status: value })
                            }}
                        >
                            <Option value={STATUS.PREDSTOJECI}>
                                {STATUS_LABEL[STATUS.PREDSTOJECI].label}
                            </Option>
                            <Option value={STATUS.OBAVLJEN}>
                                {STATUS_LABEL[STATUS.OBAVLJEN].label}
                            </Option>
                            <Option value={STATUS.OTKAZAN}>
                                {STATUS_LABEL[STATUS.OTKAZAN].label}
                            </Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Form.Item
                        labelAlign="left"
                        label="Description"
                        name={"description"}
                    >
                        <TextArea
                            maxLength={255}
                            autoSize={{
                                minRows: 8,
                                maxRows: 2,
                            }}
                            placeholder="Description..." />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={'end'} >
                <Form.Item name={'productImage'} rules={[{
                    required: true
                }]}>
                    <Upload multiple={false}
                        onChange={handleChange}
                        customRequest={dummyRequest} accept={'.jpeg' || '.png'}>
                        <Button icon={<UploadOutlined />} type="primary" htmlType="button" onClick={(event) => {
                            // flightForm.submit();
                        }}>Upload image</Button>
                    </Upload>
                </Form.Item>
            </Row>
            <Row justify='end'>
                <Button type="primary" htmlType="submit" loading={createFlightMutation.isLoading}>CREATE</Button>
            </Row>
        </Form>
    </>)
}

export { FlightForm }