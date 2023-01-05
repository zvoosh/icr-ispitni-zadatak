import { CloseOutlined } from '@ant-design/icons';
import { Button, Drawer, Row, Skeleton } from 'antd';
import { useContext, useState } from 'react';
import { Context } from '../../context';
import { useFetchClient } from '../../hooks/fetch-hooks';
import { useClientMutations } from '../../hooks/mutation-hooks';
import { IClient } from '../../types';
import { ClientForm } from '../modal-form';
import { PlusAndLabel } from '../ui';
import { Client } from './client';
import './clients.css';


const Clients = () => {
    const context = useContext(Context);
    const [isModalVisible, setIsModalVisible] = useState<boolean>()

    const { data, isLoading } = useFetchClient({
        key: 'client',
        id: context!.client!._id!
    }, {
        onSuccess: () => {
            console.log(data)
        }
    });

    const { deleteClientMutation } = useClientMutations();

    return (<>
        <div style={{ display: 'flex', flexDirection: 'column' }} className="clientWrap">
            {isLoading ? (
                <Skeleton paragraph={true} />
            ) : (
                <>
                    <PlusAndLabel color='#3333ff' label='Edit account' onClick={() => {
                        setIsModalVisible((prev) => !prev)
                    }} />
                    <Client client={data} />
                    <Row justify={"end"} style={{ marginTop: '1rem' }}>
                        <Button type='primary' style={{ marginRight: '1rem' }} onClick={() => {
                            context?.setClient(null)
                        }}>LOGOUT</Button>
                        <Button type='primary' danger onClick={() => {
                            deleteClientMutation.mutate({ id: data._id }, {
                                onSuccess: () => {
                                    context?.setClient(null)
                                }
                            })
                        }}>DELETE USER</Button>
                    </Row>
                    <Drawer
                        placement="right"
                        onClose={() => {
                            setIsModalVisible(false);
                        }}
                        destroyOnClose={true}
                        maskClosable={true}
                        size={'large'}
                        closeIcon={<CloseOutlined className="color-black" />}
                        title="Create account"
                        open={isModalVisible}
                        footer={null}
                        width={700}
                    >
                        <ClientForm onSuccess={() => {
                            setIsModalVisible(false)
                        }} activeClient={data} />
                    </Drawer>
                </>
            )}
        </div>
    </>)
}

export { Clients }