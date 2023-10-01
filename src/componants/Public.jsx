"use client"
import { Button, DatePicker, Divider, Form, Input, InputNumber, Layout, Modal, Popconfirm, Select, Space, Table, Typography } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { SearchOutlined } from "@ant-design/icons"
import moment from 'moment';
import * as Yup from 'yup';

const { Header, Content } = Layout;

//--------------------the years option in the header-----------------------------------
const options = [
    {
        label: '2023',
        value: '2023',
    },
    {
        label: '2022',
        value: '2022',
    },
    {
        label: '2021',
        value: '2021',
    },
    {
        label: '2020',
        value: '2020',
    },
    {
        label: '2019',
        value: '2019',
    },
    {
        label: '2018',
        value: '2018',
    },
    {
        label: '2017',
        value: '2017',
    },
];
//for the select in the header
const handleChange = (value) => {
    console.log(`Selected: ${value}`);
};
//-----------------------End---------------------------------
//-----------------validation inside the Modal-----------------------------------------
const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    date: Yup.date()
        .nullable() // Allow empty date
        .required('Date is required')
        .test('isValidDate', 'Invalid date format', (value) => {
            if (!value) return false; // Show error if date is empty
            return moment(value, 'YYYY-MM-DD', true).isValid();
        }),
    created: Yup.string().required("you have to fill field")


});


// the table data

const originData = [
    {
        key: '1',
        name: 'John Brown',
        date: 32,
        created: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        date: 42,
        created: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        date: 32,
        created: 'Sydney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Disabled User',
        date: 99,
        created: 'Sydney No. 1 Lake Park',
    },
];
//-----------------------edit------------------------------------

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    editable,
    handleSave,
    ...restProps
}) => {

    //edit function
    const inputNode = inputType === 'number' ? <Input /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

// rowSelection object indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
};


const Public = () => {
    // ?for pagination
    const [bottom] = useState('none');
    
    // -------------State variables for managing the modal
    const [isModalVisible, setIsModalVisible] = useState(false);
    //---------------------------
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');
    //    inputs state which edit inside the modal
    const [name, setName] = useState('');
    const [date, setDate] = useState(null);
    const [created, setCreated] = useState('');

    const [validationErrors, setValidationErrors] = useState({});
    // Function to show the modal
    const showModal = () => {
        setIsModalVisible(true);
    };


    const isEditing = (record) => record.key === editingKey;
    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            date: '',
            created: '',
            ...record,
        });
        setEditingKey(record.key);
    };
    const cancel = () => {
        setEditingKey('');
    };
    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };
    // the colums of the table
    const columns = [
        {
            title: 'Holiday Title',
            dataIndex: 'name',
            render: (text) => <a>{text}</a>,
            editable: true,
            key: 'name'
        },
        {
            title: 'Start Date',
            dataIndex: 'date',
            editable: true,
            key: 'date'
        },
        {
            title: 'Created by',
            dataIndex: 'created',
            editable: true,
            key: 'created'
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Button type="link" onClick={() => save(record.key)} style={{ marginRight: 8 }}>
                            Save
                        </Button>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <Button type="link">Cancel</Button>
                        </Popconfirm>
                    </span>
                ) : (
                    <>

                        <Button type="link" disabled={editingKey !== ''} onClick={() => edit(record)}>
                            Edit
                        </Button>
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                            <a>Delete</a>
                        </Popconfirm>
                    </>
                );
            },
        }
    ];
    //-----------------------------------delete row ---------------
    const handleDelete = (key) => {
        const newData = data.filter((item) => item.key !== key);
        setData(newData);
    };

    // the columns
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'date' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    //---------------------------add new row-----------------------------

    const handleAdd = async () => {
        try {
            await validationSchema.validate({ name, date, created }, { abortEarly: false });

            const newItem = {
                key: data.length + 1,
                name,
                date: date ? moment(date).format('MM/DD/YYYY') : '',
                created,
            };

            setData([...data, newItem]);
            setName('');
            setDate(null);
            setCreated('');
            setIsModalVisible(false);
        } catch (error) {
            // Handle validation errors and display error messages
            const errors = {};

            error.inner.forEach((e) => {
                errors[e.path] = e.message;
            });

            setValidationErrors(errors);
        }
    };
    return (
        <div>
            <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' ,background:'#222'}}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Typography.Title level={4} style={{ color: '#fff', margin: 0 }}>
                        Public Holidays Schedule
                    </Typography.Title>
                    <Typography.Title level={5} style={{ color: '#B3B3B3', margin: 0 }}>
                        Total # of Days (10)
                    </Typography.Title>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Typography.Title level={4} style={{ color: '#fff', margin: 0 }}>
                        Public Holidays Schedule
                    </Typography.Title>
                    <Space
                        direction="vertical"
                        style={{
                            width: '7%',
                        }}
                    >
                        <Select
                            size={'middle'}
                            defaultValue="2023"
                            onChange={handleChange}
                            style={{
                                width: 90,
                            }}
                            options={options}
                        />

                    </Space>
                </div>
            </Header>
            <Content>
                <Divider />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Space direction="horizontal">
                        <Input size="large" placeholder="Search" prefix={<SearchOutlined />} style={{ width: "100%" }} />
                        <Button type="primary" size={'large'} onClick={showModal}>
                            New
                        </Button>
                        <Button type="default" size={'large'}>
                            Delete
                        </Button>

                    </Space>
                    <Button type="default" size={'large'} style={{ width: "30%" }}>
                        Import Public Holidays
                    </Button>

                </div>
                {/* to add rows */}
                <Modal
                    title="Add New Holiday"
                    visible={isModalVisible}
                    onOk={handleAdd}
                    onCancel={() => setIsModalVisible(false)}>
                    <Form>
                        <Form.Item label="Holiday Title">
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <span style={{ color: 'red' }}>{validationErrors.name}</span>
                        </Form.Item>
                        <Form.Item label="Start Date">
                            <DatePicker
                                placeholder="Date"
                                value={date ? moment(date) : null}
                                onChange={(date, dateString) => setDate(dateString)}
                            /><br />
                            {validationErrors.date && (
                                <>
                                    <br />
                                    <span style={{ color: 'red' }}>{validationErrors.date}</span>
                                </>
                            )}
                        </Form.Item>
                        <Form.Item label="Created by">
                            <Input
                                value={created}
                                onChange={(e) => setCreated(e.target.value)}
                            />
                            <span style={{ color: 'red' }}>{validationErrors.created}</span>
                        </Form.Item>
                    </Form>
                </Modal>
                <div>
                    <Divider />
                    <Form form={form} component={false}>
                        <Table
                            rowSelection={{
                                type: 'checkbox',
                                ...rowSelection,
                            }}
                            components={{
                                body: {
                                    cell: EditableCell,
                                },
                            }}
                            bordered
                            dataSource={data}
                            columns={mergedColumns}
                            rowClassName="editable-row"
                            pagination={{
                                position: [bottom],
                            }}
                        />
                    </Form>
                </div>
            </Content>
        </div>
    )
}

export default Public