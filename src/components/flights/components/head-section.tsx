import { STATUS, STATUS_LABEL } from "../../../types"

const HeadSection = ({title, status}: {title: string, status: `${STATUS}`}) => {
    return (
        <>
            <div className='mb-1'>
                <span className="flight-title">{title}</span>
            </div>
            <div className='status-flight' style={{ backgroundColor: `${STATUS_LABEL[status as STATUS].tagColor}`, color: status == STATUS.OBAVLJEN ? "gray" : 'white' }}>
                {status}
            </div>
        </>
    )
}

export { HeadSection }