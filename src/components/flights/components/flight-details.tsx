import { StarFilled } from "@ant-design/icons"

interface IFlightDetails {
    flightClass?: string
    pricePerSeat?: number,
    rating?: number[],
    children?: React.ReactNode
}

const FlightDetails = ({ flightClass, pricePerSeat, rating, children }: IFlightDetails) => {

    const ratingHandle = () => {
        if (rating) {
            const sum = rating.reduce((acc, curr) => acc + curr, 0)
            const result = sum / rating.length;
            const elements = [];
            for (let i = 1; i <= result; i++) {
                elements.push(<StarFilled style={{ color: '#1677ff', marginLeft: '.3rem' }} key={i} />)
            }
            return elements
        }
        return 'Not rated'
    }

    const res = ratingHandle();
    return (
        <div className="mb-3 box-shadow">
            <div className='flight-section-title'>
                <span>FLIGHT DETAILS</span>
            </div>
            <div className='flight-section-wrap'>
                <div className='info-section'>
                    <div className='coloredRowFlight' style={{ justifyContent: 'space-between' }}>
                        <span>Class: </span>
                        <span className="columFlight" style={{ marginRight: '1rem' }}>{flightClass || 'Not set'}</span>
                    </div>
                    <div className='normalRowFlight' style={{ justifyContent: 'space-between' }}>
                        <span>Price per seat:</span>
                        <span style={{ marginRight: '1rem' }}>{pricePerSeat + ' €' || 'Not set'}</span>
                    </div>
                    <div className='coloredRowFlight' style={{ justifyContent: 'space-between' }}>
                        <span>Rating: </span>
                        <span style={{ marginRight: '1rem' }}>
                            {ratingHandle()}
                        </span>
                    </div>
                </div>
                {children && children}
            </div>
        </div>
    )
}

export { FlightDetails }