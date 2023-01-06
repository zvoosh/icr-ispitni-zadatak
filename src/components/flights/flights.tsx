import { Modal, Skeleton, Table } from "antd"
import { useState } from "react"
import { useFlightColumns } from "../../hooks"
import { useFetchFlights } from "../../hooks/fetch-hooks"
import { FlightForm } from "../modal-form"
import { PlusAndLabel } from "../ui"

const Flights = () => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const { data, isLoading } = useFetchFlights('flights', {
        onSuccess: (data: any) => {
            console.log(data)
        }
    })
    const { columns } = useFlightColumns();


    return (<>
        {isLoading ?
            (
                <Skeleton />
            ) : (
                <>
                    <PlusAndLabel color='#3333ff' label='Create flight' onClick={() => {
                        setIsModalVisible((prev) => !prev)
                    }} />
                    <Table
                        dataSource={data}
                        loading={isLoading}
                        columns={columns}
                    />
                    <Modal
                        open={isModalVisible}
                        title={"Create flight"}
                        footer={null}
                        onCancel={() => {
                            setIsModalVisible(false)
                        }}
                        destroyOnClose={true}
                        width={700}>
                        <FlightForm success={() => {
                            setIsModalVisible(false)
                        }} />
                    </Modal>
                </>
            )}
    </>)
}

export { Flights }