import { Link } from 'react-router-dom'
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { BookOutlined, CompassOutlined } from '@ant-design/icons/lib/icons';
import avion from '../../assets/avionce.png'
import './menu-layout.css'
import { useContext } from 'react';
import { Context } from '../../context';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    disabled?: boolean
): MenuItem {
    return {
        key,
        icon,
        label,
        disabled
    } as MenuItem;
}


const MenuLayout = () => {
    const context = useContext(Context);

    console.log(context?.client)

    const isDisabled = () => {
        if (context?.client) {
            return false
        } else {
            return true
        }
    }

    return (
        <div className='wrap'>
            <span className='imageWrap'>
                <img src={avion} height={'100%'} />
            </span>
            <span className='title'>AskAir</span>
            <Menu
                mode="inline"
                style={{ width: 200, height: '100%' }}
                items={[
                    isDisabled() ? getItem(<Link to={'/'}>Login</Link>, 'login', <UserOutlined />) : null,
                    getItem(<Link onClick={(event: any) => {
                        if (isDisabled()) {
                            event.preventDefault()
                        }
                    }} to={'/clients'}>Client</Link>, 'clients', <UserOutlined />, isDisabled()),
                    getItem(<Link to={'/flights'}>Flights</Link>, 'flights', <CompassOutlined />),
                    getItem(<Link onClick={(event: any) => {
                        if (isDisabled()) {
                            event.preventDefault()
                        }
                    }} to={'/reservations'}>Reservations</Link>, 'reservations', <BookOutlined />, isDisabled()),
                ]}
            />
        </div>)
}

export { MenuLayout }