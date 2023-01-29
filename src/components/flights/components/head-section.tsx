import { STATUS, STATUS_LABEL } from "../../../types"

const HeadSection = ({ title, status, image }: { title: string, status: `${STATUS}`, image: string | null }) => {
    return (
        <div style={{width: '15%'}}>
            <div style={{backgroundColor: 'white'}}>
            <img src={`../images/${image}`} style={{ objectFit: 'contain', width: '200px', height: '200px' }}/>
            </div>
            <div className='mb-1' style={{display:"flex", justifyContent: 'center'}}>
                <span className="flight-title">{title}</span>
            </div>
            <div className='status-flight' style={{ backgroundColor: `${STATUS_LABEL[status as STATUS].tagColor}`, color: status == STATUS.OBAVLJEN ? "gray" : 'white' }}>
                {status}
            </div>
        </div>
    )
}

export { HeadSection }