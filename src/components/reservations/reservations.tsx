import { Button, Col, Input, Row, Select, Skeleton, Table } from "antd";
import { useContext, useState } from "react"
import { useQueryClient } from "react-query";
import { useFetchFlights, useFlightColumns, useFlightMutations } from "../../hooks"
import { Context } from '../../context';
import { useNotification } from "../../lib";
import confirm from "antd/es/modal/confirm";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { IFlight } from "../../types";
import './reservations.css'
const { Option } = Select;

const Reservations = () => {
    const client = useQueryClient();
    const context = useContext(Context);
    const [searchParams, setSearchParams] = useState<string>('');
    const [statusParams, setStatusParams] = useState<string>('');
    const [searchParamValue, setSearchParamValue] = useState<string>();
    const [search, setSearch] = useState<{} | null>(null);
    const { successNotification, errorNotification } = useNotification();
    const { data, isLoading } = useFetchFlights(['flights', search])
    const reservedFlights = () => {
        if (data) {
            return data.filter((item: IFlight) => {
                for (let i = 0; i < item.filled.length; i++) {
                    return item.filled[i] === context!.client!._id!
                }
            })
        }
        return [];
    }
    const { unreserveFlightMutation } = useFlightMutations();
    const unreservation = (flightId: string) => {
        confirm({
            title: 'Are you sure?',
            icon: <ExclamationCircleFilled style={{ color: '#FF8C00' }} />,
            content: 'Are you sure you want to cancel this reservation?',
            onOk() {
                unreserveFlightMutation.mutate({ id: flightId, obj: { client_id: context!.client!._id! } }, {
                    onSuccess: () => {
                        client.invalidateQueries(['flights', search])
                        successNotification('Successfully unreserved flight.')
                    },
                    onError: () => {
                        errorNotification('Failed to unreserve flight.')
                    }
                })
            },
            okCancel: true,
            cancelText: 'No',
            okText: 'Yes',
            onCancel() {
                console.log('Cancel')
            },
        });
    };
    const { columns } = useFlightColumns({ unreservation, isReservationPage: true, client: context?.client?._id });
    return (<> {isLoading ?
        (
            <Skeleton />
        ) : (
            <div>
                <Row style={{ marginBottom: '.5rem' }}>
                    <Col span={4}>
                        <Select placeholder="Search status..."
                            style={{ width: '100%' }}
                            value={statusParams ? statusParams : null}
                            onChange={(value: string) => {
                                setStatusParams(value)
                            }}
                            allowClear={true}
                        >
                            <Option value={"predstojeci"}>
                                Upcoming
                            </Option>
                            <Option value={"otkazan"}>
                                Cancelled
                            </Option>
                            <Option value={"obavljen"}>
                                Done
                            </Option>
                        </Select>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '.5rem' }}>
                    <Col span={4}>
                        <Select placeholder="Search parameter..."
                            style={{ width: '100%' }}
                            onChange={(value: string) => {
                                setSearchParams(value)
                            }}
                        >
                            <Option value={"title"}>
                                Airline
                            </Option>
                            <Option value={"class"}>
                                Class
                            </Option>
                            <Option value={"starting"}>
                                Origin
                            </Option>
                            <Option value={"destination"}>
                                Destination
                            </Option>
                        </Select>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '.5rem' }}>
                    <Col span={12}>
                        <Input placeholder={`Search for ${searchParams === 'title' ? 'airline' : searchParams}...`} onChange={(i: any) => {
                            setSearchParamValue(i.target.value)
                        }} />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '1rem' }}>
                    <Col>
                        <Button type="primary" onClick={() => {
                            setSearch({
                                [searchParams]: searchParamValue,
                                status: statusParams
                            })
                            console.log(search)
                            client.invalidateQueries(['flights', search])
                        }}>SEARCH</Button>
                    </Col>
                </Row>
                <div className='flight-section-title'>
                    <span>RESERVED FLIGHTS</span>
                </div>
                <Table
                    dataSource={reservedFlights()}
                    columns={columns}
                    pagination={{
                        position: ["bottomLeft"],
                        pageSize: 5,
                    }}
                />
            </div>
        )}</>)
}

export { Reservations }