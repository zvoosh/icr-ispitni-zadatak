import { useContext, useState } from "react"
import { useQueryClient } from "react-query"
import { Button, Col, Form, Input, Modal, Row, Select, Skeleton, Table } from "antd"
import { Context } from '../../context';
import { useFetchFlights } from "../../hooks/fetch-hooks"
import { useNotification } from "../../lib"
import { FlightForm, ReserveForm } from "../modal-form"
import { PlusAndLabel } from "../ui"
import { useFlightColumns, useFlightMutations } from "../../hooks";

const { Option } = Select;

const Flights = () => {
    const client = useQueryClient();
    const context = useContext(Context);
    const [searchParams, setSearchParams] = useState<string>('');
    const [statusParams, setStatusParams] = useState<string>('');
    const [searchParamValue, setSearchParamValue] = useState<string>();
    const [search, setSearch] = useState<{} | null>(null);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [isReserveModalVisible, setIsReserveModalVisible] = useState<string | null>(null);
    const { successNotification, errorNotification } = useNotification();

    const { reserveFlightMutation } = useFlightMutations();

    const { data, isLoading } = useFetchFlights(['flights', search])

    const reserveFn = (count: any) => {
        reserveFlightMutation.mutate({ id: isReserveModalVisible!, obj: { client_id: context?.client?._id!, count } }, {
            onSuccess: () => {
                successNotification('Reservation successfull.');
                setIsReserveModalVisible(null)
            },
            onError: () => {
                errorNotification('Reservation failed.')
            }
        });
    }

    const { columns } = useFlightColumns({
        client: context?.client?._id!,
        isLoading: reserveFlightMutation.isLoading,
        setIsReserveModalVisible
    });


    return (<>
        {isLoading ?
            (
                <Skeleton />
            ) : (
                <>
                    {(context?.client?._id && context?.client?.isAdmin) && (
                        <PlusAndLabel color='#3333ff' label='Create flight' onClick={() => {
                            setIsModalVisible((prev) => !prev)
                        }} />
                    )}
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
                                value={searchParams}
                                onChange={(value: string) => {
                                    setSearchParams(value)
                                }}
                            >
                                <Option value={""}>
                                    No filter
                                </Option>
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
                            <Input value={searchParamValue} placeholder={`Search for ${searchParams === 'title' ? 'airline' : searchParams}...`} onChange={(i: any) => {
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
                    <Modal
                        open={isReserveModalVisible ? true : false}
                        title="Reserve flight"
                        footer={null}
                        onCancel={() => {
                            setIsReserveModalVisible(null)
                        }}
                        destroyOnClose={true}
                        width={500}>
                        <ReserveForm finishFn={reserveFn} />
                    </Modal>
                    <Table
                        dataSource={data}
                        columns={columns}
                        rowKey={'_id'}
                    />
                    <Modal
                        open={isModalVisible}
                        title={"Create flight"}
                        footer={null}
                        onCancel={() => {
                            setIsModalVisible(false)
                        }}
                        destroyOnClose={true}
                        width={800}>
                        <FlightForm success={() => {
                            setIsModalVisible(false)
                        }} />
                    </Modal>
                </>
            )}
    </>)
}

export { Flights }