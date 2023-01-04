import { Link } from 'react-router-dom'
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { BookOutlined, CompassOutlined } from '@ant-design/icons/lib/icons';
import avion from '../../assets/avionce.png'
import './menu-layout.css'

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem(<Link to={'/'}>Clients</Link>, 'klijenti', <UserOutlined />),
    getItem(<Link to={'/flights'}>Flights</Link>, 'flights', <CompassOutlined />),
    getItem(<Link to={'/reservations'}>Reservations</Link>, 'reservations', <BookOutlined />),
]

const MenuLayout = () => {

    return (
        <div className='wrap'>
            <span className='imageWrap'>
                <img src={avion} height={'100%'}/>
            </span>
            <span className='title'>AskAir</span>
            <Menu
                mode="vertical"
                style={{ width: 256, height: '100%' }}
                items={items}
            />
        </div>)
}

export { MenuLayout }