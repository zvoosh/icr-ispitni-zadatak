import { Row } from 'antd';
import { PlusCircleTwoTone } from '@ant-design/icons';

interface IPlusAndLabel {
    label?: string;
    color?: string;
    onClick?: () => void;
}

const PlusAndLabel = ({
    label,
    color,
    onClick
}: IPlusAndLabel) => {
    return (<>
        <Row style={{ display: 'flex', paddingBottom: '1rem', paddingTop: '1rem', alignItems: 'center' }}>
            <div
                onClick={() => {
                    if (!onClick) return;
                    onClick();
                }}>
                <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <PlusCircleTwoTone
                        twoToneColor={color}
                        style={{ fontSize: '1rem', marginRight: '0.5rem', cursor: 'pointer' }}
                    />
                    <span style={{ color }}>{label}</span>
                </div>
            </div>
        </Row>
    </>)
}

export { PlusAndLabel }