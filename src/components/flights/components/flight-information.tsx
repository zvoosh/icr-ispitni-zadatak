import { useState } from "react"
import { useQueryClient } from "react-query";
import { Modal } from "antd";
import { ArrowRightOutlined, EditTwoTone } from "@ant-design/icons"
import { IFlight, STATUS } from "../../../types";
import { FlightForm } from "../../modal-form";
import { useParams } from "react-router";

interface IFlightInfoProps {
    starting: string,
    destination: string,
    takeoffDate: string,
    landingDate: string,
    takeoffTime: string,
    landingTime: string,
    activeItem?: IFlight
    isAdmin?: boolean;
}

const FlightInformation = ({ starting, destination, takeoffDate, takeoffTime, landingDate, isAdmin, landingTime, activeItem }: IFlightInfoProps) => {
    const client = useQueryClient();
    const { id } = useParams<{ id: string }>();
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    return (
        <div className="mb-3 box-shadow">
            <div className='flight-section-title'>
                <span>FLIGHT INFORMATION</span>
                {isAdmin && activeItem?.status !== STATUS.OBAVLJEN && (
                    <EditTwoTone style={{ transform: "scale(1.5)", marginLeft: '1rem' }} onClick={() => {
                        setIsModalVisible((prev) => !prev)
                    }} />
                )}
            </div>
            <div className='flight-section-wrap'>
                <div className='info-section'>
                    <div className='coloredRowFlight' style={{ justifyContent: 'center', backgroundImage: `linear-gradient(90deg, lightgray 0%, #090979 35%, #00d4ff 100%)`, color: 'white' }}>{starting}</div>
                    <div className='normalRowFlight'>
                        <span >Departing date: </span>
                        <span style={{ marginLeft: "1rem" }}>{takeoffDate}</span>
                    </div>
                    <div className='coloredRowFlight'>
                        <span>Departing time: </span>
                        <span style={{ marginLeft: "1rem" }}>{takeoffTime}</span>
                    </div>
                </div>
                <div className='arrow-section'>
                    <ArrowRightOutlined />
                </div>
                <div className='info-section'>
                    <div className='coloredRowFlight' style={{ justifyContent: 'center', backgroundImage: `linear-gradient(90deg, #00d4ff 0%, #090979 35%, lightgray 100%)`, color: 'white' }}>{destination}</div>
                    <div className='normalRowFlight' style={{ borderLeft: '1px solid black' }}>
                        <span >Arriving date: </span>
                        <span style={{ marginLeft: "1rem" }}>{landingDate}</span>
                    </div>
                    <div className='coloredRowFlight' style={{ borderLeft: '1px solid black' }}>
                        <span>Arriving time: </span>
                        <span style={{ marginLeft: "1rem" }}>{landingTime}</span>
                    </div>
                </div>
            </div>
            <Modal
                open={isModalVisible}
                title={"Edit flight"}
                footer={null}
                onCancel={() => {
                    setIsModalVisible(false)
                }}
                destroyOnClose={true}
                width={800}>
                <FlightForm success={() => {
                    setIsModalVisible(false)
                    client.invalidateQueries(['one-flights', id!])
                }} activeItem={activeItem} />
            </Modal>
        </div>)
}

export { FlightInformation }