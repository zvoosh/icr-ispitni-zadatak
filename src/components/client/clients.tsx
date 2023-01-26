import { CloseOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Drawer, Row, Skeleton } from 'antd';
import confirm from 'antd/es/modal/confirm';
import { useContext, useState } from 'react';
import { render } from 'react-dom';
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
        <div style={{ display: 'flex', flexDirection: 'column' }} className="clientWrap anima">
            {isLoading ? (
                <Skeleton paragraph={true} />
            ) : (
                <>
                    {/* onClick={() => {
                        setIsModalVisible((prev) => !prev)
                    }}
                    <PlusAndLabel color='#3333ff' label='Edit account' onClick={() => {
                        setIsModalVisible((prev) => !prev)
                    }} /> */}
                    <Client client={data} />
                    <Row justify={"end"} style={{ marginTop: '1rem' }}>
                        <Button type='primary' style={{ marginRight: '1rem' }} onClick={() => {
                            setIsModalVisible((prev) => !prev)
                        }}>EDIT</Button>
                        <Button type='primary' style={{ marginRight: '1rem' }} onClick={() => {
                            context?.setClient(null)
                        }}>LOGOUT</Button>
                        <Button type='primary' danger onClick={() => {
                            confirm({
                                title: 'Are you sure?',
                                icon: <ExclamationCircleFilled style={{ color: '#FF8C00' }} />,
                                content: 'Are you sure you want to delete your account?',
                                onOk() {
                                    deleteClientMutation.mutate({ id: data._id }, {
                                        onSuccess: () => {
                                            context?.setClient(null)
                                        }
                                    })
                                },
                                okCancel: true,
                                cancelText: 'No',
                                okText: 'Yes',
                                onCancel() {
                                    console.log('Cancel')
                                },
                            });

                        }} loading={deleteClientMutation.isLoading}>DELETE USER</Button>
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