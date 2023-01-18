import { Button, Space, Tag, Tooltip } from "antd"
import { EyeTwoTone } from "@ant-design/icons"
import { CLASS, CLASS_LABEL, IFlight, STATUS, STATUS_LABEL } from "../../types"
import './flight-col.css';

interface IUseFlightColumns {
    unreservation?: (flightId: string) => void,
    client?: string, isReservationPage?: boolean,
    isLoading?: boolean,
    setIsReserveModalVisible?: React.Dispatch<React.SetStateAction<string | null>>
}

const useFlightColumns = ({ unreservation, client, isReservationPage = false, isLoading, setIsReserveModalVisible }: IUseFlightColumns) => {
    let columns: any = [
        {
            title: '#',
            dataIndex: 'image',
            key: 'image',
            width: 150,
            render: (img: string) => (<img src={`./images/${img}`} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />)
        },
        {
            title: 'Airline',
            dataIndex: 'title',
            key: 'title',
            render: (text: string) => (text || '-'),
        },
        {
            title: 'Origin',
            dataIndex: 'starting',
            key: 'starting',
            render: (text: string) => (text || '-'),
        },
        {
            title: 'Destination',
            dataIndex: 'destination',
            key: 'destination',
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
            render: (text: string) => (<Tooltip title="Time applies in Greenwich Mean Time (GMT) timezone">{text}</Tooltip> || '-'),
        },
        {
            title: 'Arriving time',
            dataIndex: 'lands',
            key: 'lands',
            render: (text: string) => (<Tooltip title="Time applies in Greenwich Mean Time (GMT) timezone">{text}</Tooltip> || '-'),
        },
        {
            title: 'Class',
            dataIndex: 'class',
            key: 'class',
            render: (text: CLASS) => (
                <Tag color={CLASS_LABEL[text].tagColor}>
                    {CLASS_LABEL[text].label}
                </Tag>
                || '-'),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text: STATUS) => (
                <Tag color={STATUS_LABEL[text].tagColor}>
                    {STATUS_LABEL[text].label}
                </Tag> || '-'),
        },
        {
            title: 'Total seats',
            dataIndex: 'total',
            key: 'total',
            className: isReservationPage && 'd-none',
            render: (text: number) => (text || '-'),
        },
        {
            title: 'Cards',
            dataIndex: 'filled',
            key: 'filled',
            className: !isReservationPage && 'd-none',
            render: (text: string[]) => {
                const cardArr = text.map((i: any) => {
                    return i === client
                })
                return (
                    cardArr.length || '-'
                )
            },
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text: number, record: IFlight) => {
                const cardArr = record.filled.map((i: any) => {
                    return i === client
                })
                if (isReservationPage) {
                    return `${text * cardArr.length} €`
                }
                return (
                    `${text} €` || '-'
                )
            },
        },
        {
            title: "Actions",
            datIndex: 'actions',
            key: 'actions',
            render: (_: undefined, record: IFlight) => (
                <Space size={'middle'}>
                    {setIsReserveModalVisible && (
                        <Button type="primary" onClick={() => {
                            setIsReserveModalVisible(record._id)
                        }} loading={isLoading}>RESERVE</Button>
                    )}
                    {unreservation && (
                        <Button type="primary" onClick={() => {
                            unreservation(record._id)
                        }}>CANCEL</Button>
                    )}
                    <EyeTwoTone style={{ transform: 'scale(1.5)' }}
                    />
                </Space>
            )
        }
    ]
    return { columns }
}

export { useFlightColumns }