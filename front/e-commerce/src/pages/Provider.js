import React, { useEffect, useState } from "react";
import { ProvidersWrapper } from "./Styles";
import { Breadcrumb, Button, Col, Drawer, Form, Input, Modal, Popconfirm, Row, Skeleton, Space, message } from "antd";
import TableComponent from "../components/Table";
import { deleteProvider, getProviderList, saveProvider } from "../services/Requests";
import { PlusOutlined } from '@ant-design/icons';


const Provider = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [change, setChange] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await getProviderList(1);
                setLoading(false);
                const { data } = response.data;
                const array = []
                for(const item of data){
                    const {id, name, business_name, address} = item;
                    array.push({
                        name,
                        businessName: business_name,
                        address,
                        key: id
                    })
                }
                setData(array);
            } catch (ex) {}
          };
        
        fetchData();
    }, [change]);

    const confirm = async (name) => {
        try{
            setConfirmLoading(true);
            await deleteProvider(name);
            setConfirmLoading(false);
            message.success("Proveedor eliminado");
            setChange(!change);
        }catch(ex){
            message.error("No se pudo eliminar al proveedor");
        }
      };
    
    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Razón Social',
            dataIndex: 'businessName',
            key: 'businessName',
        },
        {
            title: 'Dirección',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Popconfirm
                    title="Eliminar proveedor"
                    description="¿Seguro que quieres eliminar al proveedor?"
                    onConfirm={() => confirm(record.name)}
                    okText="Sí"
                    cancelText="No"
                    okButtonProps={{
                        loading: confirmLoading,
                    }}
                >
                    <Button danger>Delete</Button>
                </Popconfirm>
            ),
          },
    ];

    const showDrawer = () => {
        setOpen(true);
    };
    
    const onClose = () => {
        setOpen(false);
    };

    const onFinish = async (values) => {
        const { name, businessName, address} = values
        const params = {
            name,
            business_name: businessName,
            address
        }
        try{
            await saveProvider(params);
            setOpen(false);
            Modal.success({
                title: 'Éxito',
                content: 'El proveedor se agregó exitosamente',
              });
            form.resetFields();
            setChange(!change);
        }catch(ex){
            const { message } = ex.response.data
            if(message.includes("UNIQUE")){
                Modal.error({
                    title: 'Error',
                    content: 'Ya existe un proveedor con el mismo nombre',
                });
            }else{
                Modal.error({
                    title: 'Error',
                    content: 'Upps, algo salió mal. Intenta de nuevo',
                });
            }
                
        }
        
    }

    return(
        <ProvidersWrapper>
            <Row justify="center" align="middle" style={{ height: '100vh', }}>
                <Col xs={20} md={20}>
                    <h1>Lista de proveedores</h1>
                    <Breadcrumb
                        items={[
                        {
                            title: 'Home',
                            href: '/'
                        },
                        {
                            title: 'Lista de proveedores',
                        },
                        ]}
                    />
                    <Space
                        direction="vertical"
                        style={{
                            width: '100%',
                            margin: '20px 0 0 0'
                        }}
                        size={16}
                    >
                        <Skeleton loading={loading}>
                            <div style={{
                                width: '100%',
                                textAlign: 'right'
                            }}>
                                <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
                                    Agregar proveedor
                                </Button>
                            </div>
                            <TableComponent
                                columns={columns}
                                dataSource={data} 
                                pagination={{
                                    pageSize: 100,
                                    total: data.length,
                                }}
                            />
                        </Skeleton>
                    </Space>
                    
                </Col>
            </Row>
            <Drawer
                title="Agregar proveedor"
                width={350}
                onClose={onClose}
                open={open}
                styles={{
                body: {
                    paddingBottom: 80,
                },
                }}
            >
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{
                        name: '',
                        businessName: '',
                        address: ''
                    }}
                    form={form}
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="name"
                                label="Nombre"
                                rules={[
                                {
                                    required: true,
                                    message: 'Campo requerido',
                                },
                                ]}
                            >
                                <Input placeholder="Ingresa nombre del proveedor" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="businessName"
                                label="Razón Social"
                                rules={[
                                {
                                    required: true,
                                    message: 'Campo requerido',
                                },
                                ]}
                            >
                                <Input placeholder="Ingresa Razón Social" />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="address"
                                label="Dirección"
                                rules={[
                                {
                                    required: true,
                                    message: 'Campo requerido',
                                },
                                ]}
                            >
                                <Input placeholder="Ingresa dirección" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button htmlType="button" onClick={onClose}>Cancelar</Button>&nbsp;
                            <Button type="primary" htmlType="submit">Enviar</Button>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </ProvidersWrapper>
    )
}

export default Provider;