import { useState } from 'react';
import { Button, Modal } from 'antd';
import { PlusAndLabel } from '../ui';
import { Client } from './client';
import './clients.css';
import { ClientForm } from '../modal-form';


const Clients = () => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    return (<>
        <div style={{ display: 'flex', flexDirection: 'column' }} className="clientWrap">
            <PlusAndLabel
                label="Kreiraj klijenta"
                color={'#0066cc'}
                onClick={() => setIsModalVisible((prev)=>!prev)}
            />
            <Client client={{}} />
            <Modal
                title="Create account"
                open={isModalVisible}
                destroyOnClose={true}
                footer={null}
                onCancel={() => {
                    setIsModalVisible(false);
                }}
                width={700}
            >
                <ClientForm />
            </Modal>
        </div>
    </>)
}

export { Clients }