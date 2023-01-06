import { Button } from "antd"
import { IFlight } from "../../types"

const useFlightColumns = () => {
    let columns: any = [
        {
            title: '#',
            dataIndex: 'image',
            width: 150,
            render: (img: string) => (img || '-')
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text: string) => (text || '-'),
        },
        {
            title: 'Departing from',
            dataIndex: 'starting',
            key: 'starting',
            render: (text: string) => (text || '-'),
        },
        {
            title: 'Arriving in',
            dataIndex: 'destination',
            key: 'destination',
            render: (text: string) => (text || '-'),
        },
        {
            title: 'Description',//////////////////////////
            dataIndex: 'description',
            key: 'description',
            render: (text: string) => (text || '-'),
        },
        {
            title: 'Class',
            dataIndex: 'class',
            key: 'class',
            render: (text: string) => (text || '-'),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text: string) => (text || '-'),
        },
        {
            title: "Daparting date",
            dataIndex: 'takeoffDate',
            key: 'takeoffDate',
            render: (text: string) => (text || '-')
        },
        {
            title: "Arriving date",
            dataIndex: 'landingDate',
            key: 'landingDate',
            render: (text: string) => (text || '-')
        },
        {
            title: 'Departing time',
            dataIndex: 'takesoff',
            key: 'takesoff',
            render: (text: string) => (text || '-'),
        },
        {
            title: 'Arriving time',
            dataIndex: 'lands',
            key: 'lands',
            render: (text: string) => (text || '-'),
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            render: (text: number) => (text || '-'),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text: string) => (text || '-'),
        },
        {
            title: 'Filled seats',
            dataIndex: 'filled',
            key: 'filled',
            render: (text: string[]) => (text || '-'),
        },
        {
            title: 'Total seats',
            dataIndex: 'total',
            key: 'total',
            render: (text: number) => (text || '-'),
        },
        {
            title: "Actions",
            datIndex: 'actions',
            key: 'actions',
            render: (_: undefined, record: IFlight) => (
                <Button type="primary">RESERVE</Button>
            )
        }
    ]
    return columns
}

export { useFlightColumns }