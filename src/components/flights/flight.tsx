import { useContext, useState, useRef } from 'react';
import { matchRoutes, useLocation, useParams } from 'react-router';
import { useQueryClient } from 'react-query';
import { Breadcrumb, Button, Card, Col, Drawer, Form, Input, Row, Select, Skeleton } from 'antd';
import { CloseOutlined, StarFilled } from '@ant-design/icons';
import './flight.css';
import { Context } from '../../context';
import { useFetchFlight } from "../../hooks/fetch-hooks"
import { STATUS } from '../../types';
import { FlightDetails, FlightInformation, HeadSection } from './components';
import { useFlightMutations } from '../../hooks';
import { useNotification } from '../../lib';
import { Link } from 'react-router-dom';

const { TextArea } = Input;
const { Option } = Select;

const Flight = () => {
    const { id } = useParams<{ id: string }>();
    const context = useContext(Context);
    const client = useQueryClient();
    const [commentForm] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState<boolean>();
    const ref = useRef<string | null>(null);
    const { successNotification, errorNotification } = useNotification();

    const routes = [{ path: '/reservations/:id' }, { path: '/flights/:id' }]

    const useCurrentPath = () => {
        const location = useLocation();
        const pathMatch = matchRoutes(routes, location)
        ref.current = pathMatch![0].route.path as string
    }

    useCurrentPath();

    const { setCommentMutation } = useFlightMutations();

    const { data, isLoading } = useFetchFlight(['one-flights', id!])

    const onFinish = (values: any) => {
        setCommentMutation.mutate({ id: id!, obj: { comments: values.comment, rating: values.rating, wroteComment: context!.client!.name! } }, {
            onSuccess: () => {
                client.invalidateQueries(['one-flights', id!]);
                successNotification('Successfully saved comment');
                setIsModalVisible(false);
            },
            onError: () => {
                errorNotification('Try again or contact support')
            }
        })
        return;
    }
    return (
        <>
            {isLoading && !data ? (
                <Skeleton />
            ) : (
                <div>
                    <Breadcrumb className='mb-1'>
                        <Breadcrumb.Item>
                            {ref.current === '/reservations/:id' ?
                                (
                                    <Link to={'/reservations'}>Reservations</Link>
                                ) :
                                <Link to={'/flights'}>Flights</Link>
                            }
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Flight information</Breadcrumb.Item>
                    </Breadcrumb>
                    <HeadSection status={(data?.status || 'predstojeci') as STATUS} title={data?.title || '-'} />
                    <FlightInformation
                        starting={data?.starting || '-'}
                        destination={data?.destination || '-'}
                        takeoffDate={data?.takeoffDate || '-'}
                        landingDate={data?.landingDate || '-'}
                        takeoffTime={data?.takesoff || '-'}
                        landingTime={data?.lands || '-'}
                        activeItem={data}
                        isAdmin={context?.client?.isAdmin}
                    />
                    <FlightDetails
                        flightClass={data?.class}
                        pricePerSeat={data?.price}
                        rating={data?.rating}
                    >
                        <div className='info-section'>
                            <div className='coloredRowFlight' style={{ borderLeft: '1px solid black', justifyContent: 'space-between' }}>
                                <span>Filled seats: </span>
                                <span style={{ marginRight: '1rem' }}>{data?.filled?.length || '0'}</span>
                            </div>
                            <div className='normalRowFlight' style={{ borderLeft: '1px solid black', justifyContent: 'space-between' }}>
                                <span>Total seats: </span>
                                <span style={{ marginRight: '1rem' }}>{data?.total || 'Not set'}</span>
                            </div>
                            <div className='coloredRowFlight' style={{ borderLeft: '1px solid black', justifyContent: 'space-between' }}>
                                <span>Seats reserved and total price: </span>
                                <span style={{ marginRight: '1rem' }}>{data && context?.client && context.client._id ? data.filled.filter((el: any) => el === context.client!._id).length : 0} seats in total price of {data && context?.client && context.client._id ? data.filled.filter((el: any) => el === context.client!._id).length * data.price + ' €' : 0 + ' €'} </span>
                            </div>
                        </div>
                    </FlightDetails>
                    <div className='mb-2'>
                        <div className='descriptionWrap'>
                            <span className='description-section-title'>DESCRIPTION</span>
                            <span className='mb-2' style={{ width: '55%', textAlign: 'justify', textAlignLast: 'center' }}>{data?.description}</span>
                        </div>
                    </div>
                    <div>
                        <div className='flightCommentsTitle'>
                            {data && data.comments && data.comments.length > 0 && !context?.client?._id && (
                                <>
                                    <span className='flight-section-title'>COMMENTS</span>
                                </>
                            )}
                            {data && data.comments && data.comments.length > 0 && context?.client?._id && (
                                <>
                                    <span className='flight-section-title'>COMMENTS</span>
                                    {data?.status === STATUS.OBAVLJEN && data.filled.includes(context.client._id) &&  (
                                        <Button type='primary' style={{ width: '20%', marginTop: '1rem' }} onClick={() => {
                                            setIsModalVisible((prev) => !prev)
                                        }}>WRITE COMMENT</Button>
                                    )}
                                </>
                            )}
                        </div>
                        <div className="comment-wrap">
                            {data && data.comments.map((el, index) => {
                                return (
                                    <div key={index} className="mr-1 mb-1">
                                        <Card title={<span >{data.wroteComment[index]} {Array.from(Array(data.rating[index + 1]), (e: any, i: any) => {
                                            return (
                                                <StarFilled style={{ color: '#1677ff', marginLeft: '.5rem' }} key={i} />
                                            )
                                        })}</span>} className='comment-card'>
                                            {el}
                                        </Card>
                                    </div>
                                )
                            })}
                        </div>
                        <Drawer
                            placement='right'
                            onClose={() => {
                                setIsModalVisible(false)
                            }}
                            destroyOnClose={true}
                            maskClosable={true}
                            size="large"
                            closeIcon={<CloseOutlined className="color-black" />}
                            title="Write a comment"
                            open={isModalVisible}
                            footer={null}
                            width={500}
                        >
                            <Form name='commentForm' form={commentForm} onFinish={onFinish} layout="vertical" autoComplete='off'>
                                <Row>
                                    <Col span={24}>
                                        <Form.Item
                                            labelAlign='left'
                                            label="Comment"
                                            name="comment"
                                            rules={[{
                                                required: true
                                            }]}>
                                            <TextArea
                                                maxLength={255}
                                                autoSize={{
                                                    minRows: 8,
                                                    maxRows: 2,
                                                }}
                                                placeholder="Comment..." />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <Form.Item
                                            labelAlign='left'
                                            label="Rating"
                                            name="rating"
                                            rules={[{
                                                required: true
                                            }]}>
                                            <Select placeholder="Rate your flight..."
                                                style={{ width: '100%' }}
                                                onChange={(value: number) => {
                                                    commentForm.setFieldsValue({
                                                        rating: value
                                                    })
                                                }}>

                                                <Option value={1}>
                                                    <StarFilled style={{ color: 'yellowgreen' }} />
                                                </Option>
                                                <Option value={2}>
                                                    <StarFilled style={{ color: 'yellowgreen' }} />
                                                    <StarFilled style={{ color: 'yellowgreen' }} />
                                                </Option>
                                                <Option value={3}>
                                                    <StarFilled style={{ color: 'yellowgreen' }} />
                                                    <StarFilled style={{ color: 'yellowgreen' }} />
                                                    <StarFilled style={{ color: 'yellowgreen' }} />
                                                </Option>
                                                <Option value={4}>
                                                    <StarFilled style={{ color: 'yellowgreen' }} />
                                                    <StarFilled style={{ color: 'yellowgreen' }} />
                                                    <StarFilled style={{ color: 'yellowgreen' }} />
                                                    <StarFilled style={{ color: 'yellowgreen' }} />
                                                </Option>
                                                <Option value={5}>
                                                    <StarFilled style={{ color: 'yellowgreen' }} />
                                                    <StarFilled style={{ color: 'yellowgreen' }} />
                                                    <StarFilled style={{ color: 'yellowgreen' }} />
                                                    <StarFilled style={{ color: 'yellowgreen' }} />
                                                    <StarFilled style={{ color: 'yellowgreen' }} />
                                                </Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row justify={'end'}>
                                    <Button type='primary' htmlType='submit'>Submit</Button>
                                </Row>
                            </Form>
                        </Drawer>
                    </div>

                </div>
            )}
        </>
    )
}

export { Flight }